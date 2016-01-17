jest.dontMock('../Router');

const Router = require('../Router').default;
const createHistory = require('history/lib/createHashHistory');

let fixture = {
};

describe('Router', () => {
  let history;

  beforeEach( () => {
    history = createHistory({ queryKey: false });
  });

  afterEach( () => {
    // please destroy elements and node here
  });

  let checkPath = (route, path) => {
    return () => {
      history.push(route);
      let unlisten = history.listen((location) => {
        expect(location.pathname).toEqual(path);
      });
      unlisten();
    };
  }

  describe("Index to Name remapping", () => {
    let t = (name, path, route) => it(name, checkPath(path, route))

    t('routes from index to name', '/0', '/return-of-the-jedi')
    t('routes from index to default subindex name', '/1', '/pulp-fiction/vincent-vega')
    t('routes from subindex to name', '/3/1', '/3/donnie-darko')
    t('does not reroute if no nameis available for index', '/2', '/2')
    t('does not reroute if no name is available for subindex', '/3/0', '/3/0')
  });

  describe("Fallbacks", () => {
    let t = (name, path, route) => it(name, checkPath(path, route))

    t('fallbacks to first slide if slide index not found', '/7', '/return-of-the-jedi')
    t('fallbacks to first slide if slide name not found', '/whatever', '/return-of-the-jedi')
    t('fallbacks to first subslide if subslide not found', '/pulp-fiction/mia-wallace', '/pulp-fiction/vincent-vega')
    t('fallbacks to slide if no subslides', '/2/not-found', '/2')
  });

});
