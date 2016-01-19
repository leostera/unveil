jest.dontMock('../Router');

import { Observable } from 'rxjs';

const createRouter = require('../Router').default;
const createHistory = require('history/lib/createHashHistory');

let fixtureWithoutNestedFirstSlide = () => [
  {
    index: 0,
    name: 'return-of-the-jedi'
  },
  {
    index: 1,
    name: 'pulp-fiction',
    children: [
      {
        index: 0,
        name: 'vincent-vega'
      },
      {
        index: 1,
        name: 'jules'
      },
      {
        index: 2,
        name: false
      },
    ]
  },
  {
    index: 2,
    name: false
  },
  {
    index: 3,
    name: false,
    children: [
      {
        index: 0,
        name: false
      },
      {
        index: 1,
        name: 'donnie-darko'
      }
    ]
  },
  {
    index: 4,
    name: false,
    children: [
      {
        index: 0,
        name: false
      },
      {
        index: 1,
        name: false
      }
    ]
  },
  {
    index: 5,
    name: false,
    children: [
      {
        index: 0,
        name: false
      },
      {
        index: 1,
        name: false
      }
    ]
  },
  {
    index: 6,
    name: false
  },
  {
    index: 7,
    name: false
  }
];

let fixtureWithNestedFirstSlide = () => [
  {
    index: 0,
    name: 'star-wars',
    children: [
      {
        index: 0,
        name: 'episode-4'
      },
      {
        index: 1,
        name: 'episode-5'
      }
    ]
  },
  {
    index: 1,
    name: 'fight-club',
    children: [
      {
        index: 0,
        name: 'tyler'
      },
      {
        index: 1,
        name: 'tyler'
      }
    ]
  }
];

describe('Router', () => {
  let history, unlisten;
  let router;
  let fixture;

  beforeEach( () => {
    history = createHistory({ queryKey: false });
    fixture = fixtureWithoutNestedFirstSlide;
  });

  afterEach( () => {
    if (unlisten) unlisten();
    // @todo the histortySubscription at this point is just {}
    if(router) router.stop();
    history = null;
  });

  /**
   * @todo resolve this hack!
   * @see https://github.com/rackt/history/blob/master/modules/__tests__/describeBasename.js#L27-L34
   */
  let checkPath = (result, done) => {
    console.log("new test", result);
    let index = 0;
    let checks = result.toList();

    unlisten = history.listen((location) => {
      console.log("inside check path", location);
      if (location.action === 'POP') return;
      //if (index > 0) {
        expect(location.pathname).toEqual(checks[index].pathname);
        expect(location.action).toEqual(checks[index].action);
      //}

      ++index;

      if (index === checks.length) done();
    });
  };

  // @todo find better name for this function
  let pushAndCheckPath = (route, result, done) => {
    checkPath(result, done);
    router = createRouter({history, map: fixture()});
    history.push(route);
    router.start();
  };

  // @todo also find better name for this one
  let getPushAndCheckPath = (route, result) => {
    return (done) => {
      pushAndCheckPath(route, result, done);
    };
  };

  let toPath = (path, action) => {
    return {pathname: path, action: action}
  };

  let toPushPath = (path) => {
    return toPath(path, 'PUSH');
  };

  let toReplacePath = (path) => {
    return toPath(path, 'REPLACE');
  };

  let toPushReplacePath = (paths) => {
    return [toPushPath(paths[0]), toReplacePath(paths[1])];
  };

  describe('Observerability', () => {
    it('pushes new states to subscribers', (done) => {
      history = createHistory({ queryKey: false });
      router = createRouter({history, map: fixture()});

      let results = [[0, 0], [1, 1]];
      let index = 0;

      let subscription = Observable.fromRouter(router)
        .subscribe( (state) => {
          console.log(state.current, results, index);
          expect(state.current).toEqual(results[index]);

          if (++index === results.length + 2) {
            done();
            subscription.unsubscribe();
          }
        });

      router.start();
      history.push('/1/1');
    });
  });

  xdescribe('Index to Name remapping', () => {
    let r = (name, route, result) => it(name, getPushAndCheckPath(route, toPushReplacePath([route, result])));
    let t = (name, route, result) => it(name, getPushAndCheckPath(route, toPushPath(result)));

    r('routes from index to name', '/0', '/return-of-the-jedi');
    r('routes from index to default subindex name', '/1', '/pulp-fiction/vincent-vega');
    r('routes from subindex to name', '/3/1', '/3/donnie-darko');
    t('does not reroute if no name is available for index', '/2', '/2');
    t('does not reroute if no name is available for subindex', '/3/0', '/3/0');
  });

  describe('Fallbacks', () => {
    let r = (name, route, result) => it(name, getPushAndCheckPath(route, toPushReplacePath([route, result])));
    let t = (name, route, result) => it(name, getPushAndCheckPath(route, toPushPath(result)));


    xit('fallbacks to first slide and subslide if slide index not found', (done) => {
      fixture = fixtureWithNestedFirstSlide;
      pushAndCheckPath('/23503957', toPushReplacePath(['/23503957', '/star-wars/episode-4']), done);
    });

    //r('fallbacks to first slide if slide index not found', '/23503957', '/return-of-the-jedi');
    //r('fallbacks to first slide if slide name not found', '/whatever', '/return-of-the-jedi');
    //r('fallbacks to first subslide if subslide not found', '/pulp-fiction/mia-wallace', '/pulp-fiction/vincent-vega');
    r('fallbacks to slide if no subslides', '/2/not-found', '/2');
  });
  
  xdescribe('Navigation', () => {
    let j = (name, target, result) => it(name, (done) => {
      checkPath(result, done);
      router.jump(target);
    });

    let n = (name, nav, start, result) => it(name, (done) => {
      checkPath([start, start, result, result], done);
      history.push(start);
      router.navigate(nav);
    });


    j('jumps to a specified path', [4, 1], '/4/1');

    //n('navigates right from slide', [1], '/6', '/7');
    //n('navigates left from slide', [-1], '/7', '/6');
    //n('stays on same when not moved', [0], '/6', '/6');
    //n('stays on same when moved illegally', [-1], '/0', '/0');
    //n('ignores subslide navigation on main slide', [0, -2], '/6', '/6');
    //n('resets subslide index on main slide change', [1], '/4/1', '/4/0');

    //n('navigates up from subslide', [0, -1], '/4/1', '/4/0');
    //n('navigates down from subslide', [0, 1], '/4/0', '/4/1');
    //n('navigates from last subslide to next main', [0, 1], '/3/1', '/4/0');
    //n('navigates from first subslide to previous main', [0, -1], '/4/0', '/3/1');
  });

});
