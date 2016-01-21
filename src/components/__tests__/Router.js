jest.dontMock('../Router');

import { Observable } from 'rxjs';

const createRouter = require('../Router').default;
const createHistory = require('history/lib/createHashHistory');

const fixtureWithoutNestedFirstSlide = require('./fixtures/MapWithoutNestedFirstSlide').default;
const fixtureWithNestedFirstSlide = require('./fixtures/MapWithNestedFirstSlide').default;

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

  let checkPath = (result, done) => {
    let index = 0;
    let checks = result.toList();

    unlisten = history.listen((location) => {
      console.log(location);
      if (location.action === 'POP') return;
      expect(location.pathname).toEqual(checks[index].pathname);
      expect(location.action).toEqual(checks[index].action);

      index += 1;

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

  xdescribe('Observerability', () => {
    let t = (name, route, fixture, results) => it(name, (done) => {
      history = createHistory({ queryKey: false });
      router = createRouter({history, map: fixture()});

      let index = 0;

      let subscription = Observable.fromRouter(router)
        .subscribe( (state) => {
          expect(state.current).toEqual(results[index]);

          if (++index === results.length) {
            done();
            subscription.unsubscribe();
          }
        });

      router.start();
      history.push(route);
    });

    // @todo once walk is somewhere testable, this can be moved. this method tests if walk
    //       returns the right nested fallback ([0, 0] instead of just [0] if what is
    //       passed is either [] (1st test) or ['nonexistent'] (3rd test)
    t('pushes new states to subscribers with nested first slide', '/1/1', fixtureWithNestedFirstSlide, [[0, 0], [1, 1]]);
    t('pushes new states to subscribers', '/3/1', fixtureWithoutNestedFirstSlide, [[0], [3, 1]]);
    t('pushes new states to subscribers with nested first slide', '/1/1', fixtureWithNestedFirstSlide, [[0, 0], [1, 1]]);
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

  xdescribe('Fallbacks', () => {
    let r = (name, route, result) => it(name, getPushAndCheckPath(route, toPushReplacePath([route, result])));

    it('fallbacks to first slide and subslide if slide index not found', (done) => {
      fixture = fixtureWithNestedFirstSlide;
      pushAndCheckPath('/23503957', toPushReplacePath(['/23503957', '/star-wars/episode-4']), done);
    });

    r('fallbacks to first slide if slide index not found', '/23503957', '/return-of-the-jedi');
    r('fallbacks to first slide if slide name not found', '/whatever', '/return-of-the-jedi');
    r('fallbacks to first subslide if subslide not found', '/pulp-fiction/mia-wallace', '/pulp-fiction/vincent-vega');
    r('fallbacks to slide if no subslides', '/2/not-found', '/2');
  });
  
  describe('Navigation', () => {
    let j = (name, target, result) => it(name, (done) => {
      checkPath(toPushPath(result), done);
      router = createRouter({history, map: fixture()});
      router.jump(target);
      router.start();
    });

    let n = (name, nav, start, result) => it(name, (done) => {
      checkPath([toPushPath(start), toPushPath(result)], done);
      router = createRouter({history, map: fixture()});
      history.push(start);
      router.start();
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
