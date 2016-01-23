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

  let r = (name, path, replacedPath) => it(name, (done) => {
    let key = Array.isArray(replacedPath) && 'indices' || 'path';
    let subscription = Observable.fromRouter(router)
      .subscribe( (state) => {
        expect(state[key]).toEqual(replacedPath);
        subscription.complete();
        done();
      });
    history.push(path);
  });

  // describe('Observability', () => {
  //   let t = (name, route, fixture, results) => it(name, (done) => {
  //     let subscription = Observable.fromRouter(router)
  //       .skip(1)
  //       .subscribe( (state) => {
  //         expect(state.indices).toEqual(results);
  //         done();
  //         subscription.unsubscribe();
  //       });
  //     router.start();
  //     history.push(route);
  //   });

  //   t('pushes new states to subscribers with nested first slide',
  //     '/1/1',
  //     fixtureWithNestedFirstSlide,
  //     [1, 1]);

  //   t('pushes new states to subscribers',
  //     '/3/1',
  //     fixtureWithoutNestedFirstSlide,
  //     [3, 1]);

  //   t('pushes new states to subscribers with nested first slide',
  //     '/1/1',
  //     fixtureWithNestedFirstSlide,
  //     [1, 1]);
  // });

  // xdescribe('Index to Name remapping', () => {
  //   beforeEach( () => {
  //     router = createRouter({history, map: fixture(), replaceUri: true});
  //   });


  //   r('routes from index to name', '/0', '/return-of-the-jedi');
  //   r('routes from index to default subindex name', '/1', '/pulp-fiction/vincent-vega');
  //   r('routes from subindex to name', '/3/1', '/3/donnie-darko');
  //   t('does not reroute if no name is available for index', '/2', '/2');
  //   t('does not reroute if no name is available for subindex', '/3/0', '/3/0');
  // });

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
      history.push('/234503957');
    });

    r('fallbacks to first slide if slide index not found', '/23503957', [0]);
    r('fallbacks to first slide if slide name not found', '/whatever', [0]);
    r('fallbacks to first subslide if subslide not found', '/pulp-fiction/mia-wallace', [1,0]);
    r('fallbacks to slide if no subslides', '/2/not-found', [2]);
  });

  //describe('Navigation', () => {
  //  let j = (name, target, result) => it(name, (done) => {
  //    let subscription = Observable.fromRouter(router)
  //      .subscribe( (state) => {
  //        expect(state.indices).toEqual(result);
  //        subscription.complete();
  //        done();
  //      });
  //    router.jump(target);
  //  });

  //  j('jumps to a specified path', [4, 1], [4, 1]);
  //});

});
