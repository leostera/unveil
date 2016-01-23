jest.dontMock('../Router');

import { Observable } from 'rxjs';

const createRouter = require('../Router').default;
const createHistory = require('history/lib/createHashHistory');

const fixtureWithoutNestedFirstSlide = require('./fixtures/MapWithoutNestedFirstSlide').default;
const fixtureWithNestedFirstSlide = require('./fixtures/MapWithNestedFirstSlide').default;

describe('Router', () => {
  let history, router, fixture;

  beforeEach( () => {
    history = createHistory({ queryKey: false });
    fixture = fixtureWithoutNestedFirstSlide;
    router  = createRouter({history, map: fixture(), replaceUri: false});
    router.start();
  });

  afterEach( () => {
    if (router) router.stop();
    history = null;
  });

  let t = (name, path, replacedPath, skip) => it(name, (done) => {
    let key = Array.isArray(replacedPath) && 'indices' || 'path';
    let subscription = Observable.fromRouter(router)
      .subscribe( (state) => {
        console.log(" ===> subscribe called with ", state);
        console.log(" ===> should use key ", key);
        expect(state[key]).toEqual(replacedPath);
        subscription.unsubscribe();
        done();
      }, () => {});
    router.go(path.slice(1));
  });

  describe('Observability', () => {
    t('pushes new states to subscribers with nested first slide',
      '/1/1',
      [1, 1]);

    t('pushes new states to subscribers',
      '/3/1',
      [3, 1]);

    t('pushes new states to subscribers with nested first slide',
      '/1/1',
      [1, 1]);
  });

  describe('Index to Name remapping', () => {
    beforeEach( () => {
      router.stop();
      console.log("===== REMAPPING =====");
      router = createRouter({history, map: fixture(), replaceUri: true});
      router.start();
    });

    t('routes from index to name', '/0', '/return-of-the-jedi');
    t('routes from index to default subindex name', '/1', '/pulp-fiction/vincent-vega');
    t('routes from subindex to name', '/3/1', '/3/donnie-darko');
    t('does not reroute if no name is available for index', '/2', '/2');
    t('does not reroute if no name is available for subindex', '/3/0', '/3/0');
  });

  describe('Fallbacks', () => {
    it('fallbacks to first slide and subslide if slide index not found', (done) => {
      fixture = fixtureWithNestedFirstSlide;
      router = createRouter({ history, map: fixture(), replaceUri: false});
      router.start();
      let result = [0,0];
      let subscription = Observable.fromRouter(router)
        .subscribe( (state) => {
          expect(state.indices).toEqual(result);
          subscription.complete();
          done();
        });
      router.go('234503957');
    });

    t('fallbacks to first slide if slide index not found', '/23503957', [0]);
    t('fallbacks to first slide if slide name not found', '/whatever', [0]);
    t('fallbacks to first subslide if subslide not found', '/pulp-fiction/mia-wallace', [1,0]);
    t('fallbacks to slide if no subslides', '/2/not-found', [2]);
  });

});
