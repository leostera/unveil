jest.dontMock('../Router');

import { Observable } from 'rxjs';

const Router = require('../Router').default;
const createHistory = require('history/lib/createHashHistory');

let fixture = () => [
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
]

describe('Router', () => {
  let history, unlisten;

  beforeEach( () => {
    history = createHistory({ queryKey: false });

    Router
      .configure({history, map: fixture()})
      .start();
  });

  afterEach( () => {
    if (unlisten) unlisten();
    Router.stop();
  });

  /**
   * @todo resolve stupid fucking idiot hack
   * @param path what do I even know
   * @param done I hate life.
   * @see https://github.com/rackt/history/blob/master/modules/__tests__/describeBasename.js#L27-L34
   */
  let checkPath = (path, done) => {
    let index = 0;
    let checks = ['/return-of-the-jedi', path];
    unlisten = history.listen((location) => {
      expect(location.pathname).toEqual(checks[index++]);

      if (index === 1) done();
    });
  }

  let pushAndCheckPath = (route, path) => {
    return (done) => {
      checkPath(path, done);
      history.push(route);
    };
  }

  describe('Index to Name remapping', () => {
    let t = (name, path, route) => it(name, pushAndCheckPath(path, route))

    t('routes from index to name', '/0', '/return-of-the-jedi')
    t('routes from index to default subindex name', '/1', '/pulp-fiction/vincent-vega')
    t('routes from subindex to name', '/3/1', '/3/donnie-darko')
    t('does not reroute if no name is available for index', '/2', '/2')
    t('does not reroute if no name is available for subindex', '/3/0', '/3/0')
    ;
  });

  describe('Fallbacks', () => {
    let t = (name, path, route) => it(name, pushAndCheckPath(path, route))

    t('fallbacks to first slide if slide index not found', '/23503957', '/return-of-the-jedi')
    t('fallbacks to first slide if slide name not found', '/whatever', '/return-of-the-jedi')
    t('fallbacks to first subslide if subslide not found', '/pulp-fiction/mia-wallace', '/pulp-fiction/vincent-vega')
    t('fallbacks to slide if no subslides', '/2/not-found', '/2')
  });

  describe('Obversability', () => {
    it('pushes new states to subscribers', (done) => {
      let subscription = Observable.fromRouter(Router)
        .subscribe( (state) => {
          expect(state.current).toEqual([3,1]);
          subscription.unsubscribe();
          done();
        });

      history.push('/3/1');
    });
  });
  
  describe('Navigation', () => {
    let t = (name, path, res, method) => it(name, (done) => {
      checkPath(res, done);
      method('/' + path.join('/'));
    });

    let j = (name, path, res) => t(name, path, res, Router.jump);
    let n = function(name, nav, path, res) {
      history.push(path);
      t(name, nav, res, Router.navigate);
    };


    j('jumps to a specified path', [4, 1], '/4/1');

    //n('navigates right from slide', [1], '6', '7');
    //n('navigates left from slide', [-1], '7', '6');
    //n('stays on same when not moved', [0], '6', '6');
    //n('stays on same when moved illegally', [-1], '0', '0');
    //n('ignores subslide navigation on main slide', [0, -2], '6', '6');
    //n('resets subslide index on main slide change', [1], '4/1', '5/0');
    //
    //n('navigates up from subslide', [0, -1], '4/1', '4/0');
    //n('navigates down from subslide', [0, 1], '4/0', '4/1');
    //n('navigates from last subslide to next main', [0, 1], '3/1', '4/0');
    //n('navigates from first subslide to previous main', [0, -1], '4/0', '3/1');
  });

});
