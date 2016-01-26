'use strict';

var _rxjs = require('rxjs');

jest.dontMock('../Router');

var createRouter = require('../Router').default;
var createHistory = require('history/lib/createHashHistory');

var fixtureWithoutNestedFirstSlide = require('./fixtures/MapWithoutNestedFirstSlide').default;
var fixtureWithNestedFirstSlide = require('./fixtures/MapWithNestedFirstSlide').default;

describe('Router', function () {
  var history = undefined,
      router = undefined,
      fixture = undefined;

  beforeEach(function () {
    history = createHistory({ queryKey: false });
    fixture = fixtureWithoutNestedFirstSlide;
    router = createRouter({ history: history, map: fixture(), replaceUri: false });
    router.start();
  });

  afterEach(function () {
    if (router) router.stop();
    history = null;
  });

  var t = function t(name, path, replacedPath, skip) {
    return it(name, function (done) {
      var key = Array.isArray(replacedPath) && 'indices' || 'path';
      var subscription = _rxjs.Observable.fromRouter(router).subscribe(function (state) {
        expect(state[key]).toEqual(replacedPath);
        subscription.unsubscribe();
        done();
      }, function () {});
      router.go(path.slice(1));
    });
  };

  describe('Observability', function () {
    t('pushes new states to subscribers with nested first slide', '/1/1', [1, 1]);

    t('pushes new states to subscribers', '/3/1', [3, 1]);

    t('pushes new states to subscribers with nested first slide', '/1/1', [1, 1]);
  });

  describe('Index to Name remapping', function () {
    beforeEach(function () {
      router.stop();
      router = createRouter({ history: history, map: fixture(), replaceUri: true });
      router.start();
    });

    t('routes from index to name', '/0', '/return-of-the-jedi');
    t('routes from index to default subindex name', '/1', '/pulp-fiction/vincent-vega');
    t('routes from subindex to name', '/3/1', '/3/donnie-darko');
    t('does not reroute if no name is available for index', '/2', '/2');
    t('does not reroute if no name is available for subindex', '/3/0', '/3/0');
  });

  describe('Fallbacks', function () {
    it('fallbacks to first slide and subslide if slide index not found', function (done) {
      fixture = fixtureWithNestedFirstSlide;
      router = createRouter({ history: history, map: fixture(), replaceUri: false });
      router.start();
      var result = [0, 0];
      var subscription = _rxjs.Observable.fromRouter(router).subscribe(function (state) {
        expect(state.indices).toEqual(result);
        subscription.complete();
        done();
      });
      router.go('234503957');
    });

    t('fallbacks to first slide if slide index not found', '/23503957', [0]);
    t('fallbacks to first slide if slide name not found', '/whatever', [0]);
    t('fallbacks to first subslide if subslide not found', '/pulp-fiction/mia-wallace', [1, 0]);
    t('fallbacks to slide if no subslides', '/2/not-found', [2]);
  });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL19fdGVzdHNfXy9Sb3V0ZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLEtBQUssUUFBTCxDQUFjLFdBQWQ7O0FBSUEsSUFBTSxlQUFlLFFBQVEsV0FBUixFQUFxQixPQUFyQjtBQUNyQixJQUFNLGdCQUFnQixRQUFRLCtCQUFSLENBQWhCOztBQUVOLElBQU0saUNBQWlDLFFBQVEsdUNBQVIsRUFBaUQsT0FBakQ7QUFDdkMsSUFBTSw4QkFBOEIsUUFBUSxvQ0FBUixFQUE4QyxPQUE5Qzs7QUFFcEMsU0FBUyxRQUFULEVBQW1CLFlBQU07QUFDdkIsTUFBSSxtQkFBSjtNQUFhLGtCQUFiO01BQXFCLG1CQUFyQixDQUR1Qjs7QUFHdkIsYUFBWSxZQUFNO0FBQ2hCLGNBQVUsY0FBYyxFQUFFLFVBQVUsS0FBVixFQUFoQixDQUFWLENBRGdCO0FBRWhCLGNBQVUsOEJBQVYsQ0FGZ0I7QUFHaEIsYUFBVSxhQUFhLEVBQUMsZ0JBQUQsRUFBVSxLQUFLLFNBQUwsRUFBZ0IsWUFBWSxLQUFaLEVBQXZDLENBQVYsQ0FIZ0I7QUFJaEIsV0FBTyxLQUFQLEdBSmdCO0dBQU4sQ0FBWixDQUh1Qjs7QUFVdkIsWUFBVyxZQUFNO0FBQ2YsUUFBSSxNQUFKLEVBQVksT0FBTyxJQUFQLEdBQVo7QUFDQSxjQUFVLElBQVYsQ0FGZTtHQUFOLENBQVgsQ0FWdUI7O0FBZXZCLE1BQUksSUFBSSxTQUFKLENBQUksQ0FBQyxJQUFELEVBQU8sSUFBUCxFQUFhLFlBQWIsRUFBMkIsSUFBM0I7V0FBb0MsR0FBRyxJQUFILEVBQVMsVUFBQyxJQUFELEVBQVU7QUFDN0QsVUFBSSxNQUFNLE1BQU0sT0FBTixDQUFjLFlBQWQsS0FBK0IsU0FBL0IsSUFBNEMsTUFBNUMsQ0FEbUQ7QUFFN0QsVUFBSSxlQUFlLGlCQUFXLFVBQVgsQ0FBc0IsTUFBdEIsRUFDaEIsU0FEZ0IsQ0FDTCxVQUFDLEtBQUQsRUFBVztBQUNyQixlQUFPLE1BQU0sR0FBTixDQUFQLEVBQW1CLE9BQW5CLENBQTJCLFlBQTNCLEVBRHFCO0FBRXJCLHFCQUFhLFdBQWIsR0FGcUI7QUFHckIsZUFIcUI7T0FBWCxFQUlULFlBQU0sRUFBTixDQUxELENBRnlEO0FBUTdELGFBQU8sRUFBUCxDQUFVLEtBQUssS0FBTCxDQUFXLENBQVgsQ0FBVixFQVI2RDtLQUFWO0dBQTdDLENBZmU7O0FBMEJ2QixXQUFTLGVBQVQsRUFBMEIsWUFBTTtBQUM5QixNQUFFLDBEQUFGLEVBQ0UsTUFERixFQUVFLENBQUMsQ0FBRCxFQUFJLENBQUosQ0FGRixFQUQ4Qjs7QUFLOUIsTUFBRSxrQ0FBRixFQUNFLE1BREYsRUFFRSxDQUFDLENBQUQsRUFBSSxDQUFKLENBRkYsRUFMOEI7O0FBUzlCLE1BQUUsMERBQUYsRUFDRSxNQURGLEVBRUUsQ0FBQyxDQUFELEVBQUksQ0FBSixDQUZGLEVBVDhCO0dBQU4sQ0FBMUIsQ0ExQnVCOztBQXdDdkIsV0FBUyx5QkFBVCxFQUFvQyxZQUFNO0FBQ3hDLGVBQVksWUFBTTtBQUNoQixhQUFPLElBQVAsR0FEZ0I7QUFFaEIsZUFBUyxhQUFhLEVBQUMsZ0JBQUQsRUFBVSxLQUFLLFNBQUwsRUFBZ0IsWUFBWSxJQUFaLEVBQXZDLENBQVQsQ0FGZ0I7QUFHaEIsYUFBTyxLQUFQLEdBSGdCO0tBQU4sQ0FBWixDQUR3Qzs7QUFPeEMsTUFBRSwyQkFBRixFQUErQixJQUEvQixFQUFxQyxxQkFBckMsRUFQd0M7QUFReEMsTUFBRSw0Q0FBRixFQUFnRCxJQUFoRCxFQUFzRCw0QkFBdEQsRUFSd0M7QUFTeEMsTUFBRSw4QkFBRixFQUFrQyxNQUFsQyxFQUEwQyxpQkFBMUMsRUFUd0M7QUFVeEMsTUFBRSxvREFBRixFQUF3RCxJQUF4RCxFQUE4RCxJQUE5RCxFQVZ3QztBQVd4QyxNQUFFLHVEQUFGLEVBQTJELE1BQTNELEVBQW1FLE1BQW5FLEVBWHdDO0dBQU4sQ0FBcEMsQ0F4Q3VCOztBQXNEdkIsV0FBUyxXQUFULEVBQXNCLFlBQU07QUFDMUIsT0FBRyxnRUFBSCxFQUFxRSxVQUFDLElBQUQsRUFBVTtBQUM3RSxnQkFBVSwyQkFBVixDQUQ2RTtBQUU3RSxlQUFTLGFBQWEsRUFBRSxnQkFBRixFQUFXLEtBQUssU0FBTCxFQUFnQixZQUFZLEtBQVosRUFBeEMsQ0FBVCxDQUY2RTtBQUc3RSxhQUFPLEtBQVAsR0FINkU7QUFJN0UsVUFBSSxTQUFTLENBQUMsQ0FBRCxFQUFHLENBQUgsQ0FBVCxDQUp5RTtBQUs3RSxVQUFJLGVBQWUsaUJBQVcsVUFBWCxDQUFzQixNQUF0QixFQUNoQixTQURnQixDQUNMLFVBQUMsS0FBRCxFQUFXO0FBQ3JCLGVBQU8sTUFBTSxPQUFOLENBQVAsQ0FBc0IsT0FBdEIsQ0FBOEIsTUFBOUIsRUFEcUI7QUFFckIscUJBQWEsUUFBYixHQUZxQjtBQUdyQixlQUhxQjtPQUFYLENBRFYsQ0FMeUU7QUFXN0UsYUFBTyxFQUFQLENBQVUsV0FBVixFQVg2RTtLQUFWLENBQXJFLENBRDBCOztBQWUxQixNQUFFLG1EQUFGLEVBQXVELFdBQXZELEVBQW9FLENBQUMsQ0FBRCxDQUFwRSxFQWYwQjtBQWdCMUIsTUFBRSxrREFBRixFQUFzRCxXQUF0RCxFQUFtRSxDQUFDLENBQUQsQ0FBbkUsRUFoQjBCO0FBaUIxQixNQUFFLG1EQUFGLEVBQXVELDJCQUF2RCxFQUFvRixDQUFDLENBQUQsRUFBRyxDQUFILENBQXBGLEVBakIwQjtBQWtCMUIsTUFBRSxvQ0FBRixFQUF3QyxjQUF4QyxFQUF3RCxDQUFDLENBQUQsQ0FBeEQsRUFsQjBCO0dBQU4sQ0FBdEIsQ0F0RHVCO0NBQU4sQ0FBbkIiLCJmaWxlIjoiUm91dGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiamVzdC5kb250TW9jaygnLi4vUm91dGVyJyk7XG5cbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuY29uc3QgY3JlYXRlUm91dGVyID0gcmVxdWlyZSgnLi4vUm91dGVyJykuZGVmYXVsdDtcbmNvbnN0IGNyZWF0ZUhpc3RvcnkgPSByZXF1aXJlKCdoaXN0b3J5L2xpYi9jcmVhdGVIYXNoSGlzdG9yeScpO1xuXG5jb25zdCBmaXh0dXJlV2l0aG91dE5lc3RlZEZpcnN0U2xpZGUgPSByZXF1aXJlKCcuL2ZpeHR1cmVzL01hcFdpdGhvdXROZXN0ZWRGaXJzdFNsaWRlJykuZGVmYXVsdDtcbmNvbnN0IGZpeHR1cmVXaXRoTmVzdGVkRmlyc3RTbGlkZSA9IHJlcXVpcmUoJy4vZml4dHVyZXMvTWFwV2l0aE5lc3RlZEZpcnN0U2xpZGUnKS5kZWZhdWx0O1xuXG5kZXNjcmliZSgnUm91dGVyJywgKCkgPT4ge1xuICBsZXQgaGlzdG9yeSwgcm91dGVyLCBmaXh0dXJlO1xuXG4gIGJlZm9yZUVhY2goICgpID0+IHtcbiAgICBoaXN0b3J5ID0gY3JlYXRlSGlzdG9yeSh7IHF1ZXJ5S2V5OiBmYWxzZSB9KTtcbiAgICBmaXh0dXJlID0gZml4dHVyZVdpdGhvdXROZXN0ZWRGaXJzdFNsaWRlO1xuICAgIHJvdXRlciAgPSBjcmVhdGVSb3V0ZXIoe2hpc3RvcnksIG1hcDogZml4dHVyZSgpLCByZXBsYWNlVXJpOiBmYWxzZX0pO1xuICAgIHJvdXRlci5zdGFydCgpO1xuICB9KTtcblxuICBhZnRlckVhY2goICgpID0+IHtcbiAgICBpZiAocm91dGVyKSByb3V0ZXIuc3RvcCgpO1xuICAgIGhpc3RvcnkgPSBudWxsO1xuICB9KTtcblxuICBsZXQgdCA9IChuYW1lLCBwYXRoLCByZXBsYWNlZFBhdGgsIHNraXApID0+IGl0KG5hbWUsIChkb25lKSA9PiB7XG4gICAgbGV0IGtleSA9IEFycmF5LmlzQXJyYXkocmVwbGFjZWRQYXRoKSAmJiAnaW5kaWNlcycgfHwgJ3BhdGgnO1xuICAgIGxldCBzdWJzY3JpcHRpb24gPSBPYnNlcnZhYmxlLmZyb21Sb3V0ZXIocm91dGVyKVxuICAgICAgLnN1YnNjcmliZSggKHN0YXRlKSA9PiB7XG4gICAgICAgIGV4cGVjdChzdGF0ZVtrZXldKS50b0VxdWFsKHJlcGxhY2VkUGF0aCk7XG4gICAgICAgIHN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICBkb25lKCk7XG4gICAgICB9LCAoKSA9PiB7fSk7XG4gICAgcm91dGVyLmdvKHBhdGguc2xpY2UoMSkpO1xuICB9KTtcblxuICBkZXNjcmliZSgnT2JzZXJ2YWJpbGl0eScsICgpID0+IHtcbiAgICB0KCdwdXNoZXMgbmV3IHN0YXRlcyB0byBzdWJzY3JpYmVycyB3aXRoIG5lc3RlZCBmaXJzdCBzbGlkZScsXG4gICAgICAnLzEvMScsXG4gICAgICBbMSwgMV0pO1xuXG4gICAgdCgncHVzaGVzIG5ldyBzdGF0ZXMgdG8gc3Vic2NyaWJlcnMnLFxuICAgICAgJy8zLzEnLFxuICAgICAgWzMsIDFdKTtcblxuICAgIHQoJ3B1c2hlcyBuZXcgc3RhdGVzIHRvIHN1YnNjcmliZXJzIHdpdGggbmVzdGVkIGZpcnN0IHNsaWRlJyxcbiAgICAgICcvMS8xJyxcbiAgICAgIFsxLCAxXSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdJbmRleCB0byBOYW1lIHJlbWFwcGluZycsICgpID0+IHtcbiAgICBiZWZvcmVFYWNoKCAoKSA9PiB7XG4gICAgICByb3V0ZXIuc3RvcCgpO1xuICAgICAgcm91dGVyID0gY3JlYXRlUm91dGVyKHtoaXN0b3J5LCBtYXA6IGZpeHR1cmUoKSwgcmVwbGFjZVVyaTogdHJ1ZX0pO1xuICAgICAgcm91dGVyLnN0YXJ0KCk7XG4gICAgfSk7XG5cbiAgICB0KCdyb3V0ZXMgZnJvbSBpbmRleCB0byBuYW1lJywgJy8wJywgJy9yZXR1cm4tb2YtdGhlLWplZGknKTtcbiAgICB0KCdyb3V0ZXMgZnJvbSBpbmRleCB0byBkZWZhdWx0IHN1YmluZGV4IG5hbWUnLCAnLzEnLCAnL3B1bHAtZmljdGlvbi92aW5jZW50LXZlZ2EnKTtcbiAgICB0KCdyb3V0ZXMgZnJvbSBzdWJpbmRleCB0byBuYW1lJywgJy8zLzEnLCAnLzMvZG9ubmllLWRhcmtvJyk7XG4gICAgdCgnZG9lcyBub3QgcmVyb3V0ZSBpZiBubyBuYW1lIGlzIGF2YWlsYWJsZSBmb3IgaW5kZXgnLCAnLzInLCAnLzInKTtcbiAgICB0KCdkb2VzIG5vdCByZXJvdXRlIGlmIG5vIG5hbWUgaXMgYXZhaWxhYmxlIGZvciBzdWJpbmRleCcsICcvMy8wJywgJy8zLzAnKTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ0ZhbGxiYWNrcycsICgpID0+IHtcbiAgICBpdCgnZmFsbGJhY2tzIHRvIGZpcnN0IHNsaWRlIGFuZCBzdWJzbGlkZSBpZiBzbGlkZSBpbmRleCBub3QgZm91bmQnLCAoZG9uZSkgPT4ge1xuICAgICAgZml4dHVyZSA9IGZpeHR1cmVXaXRoTmVzdGVkRmlyc3RTbGlkZTtcbiAgICAgIHJvdXRlciA9IGNyZWF0ZVJvdXRlcih7IGhpc3RvcnksIG1hcDogZml4dHVyZSgpLCByZXBsYWNlVXJpOiBmYWxzZX0pO1xuICAgICAgcm91dGVyLnN0YXJ0KCk7XG4gICAgICBsZXQgcmVzdWx0ID0gWzAsMF07XG4gICAgICBsZXQgc3Vic2NyaXB0aW9uID0gT2JzZXJ2YWJsZS5mcm9tUm91dGVyKHJvdXRlcilcbiAgICAgICAgLnN1YnNjcmliZSggKHN0YXRlKSA9PiB7XG4gICAgICAgICAgZXhwZWN0KHN0YXRlLmluZGljZXMpLnRvRXF1YWwocmVzdWx0KTtcbiAgICAgICAgICBzdWJzY3JpcHRpb24uY29tcGxldGUoKTtcbiAgICAgICAgICBkb25lKCk7XG4gICAgICAgIH0pO1xuICAgICAgcm91dGVyLmdvKCcyMzQ1MDM5NTcnKTtcbiAgICB9KTtcblxuICAgIHQoJ2ZhbGxiYWNrcyB0byBmaXJzdCBzbGlkZSBpZiBzbGlkZSBpbmRleCBub3QgZm91bmQnLCAnLzIzNTAzOTU3JywgWzBdKTtcbiAgICB0KCdmYWxsYmFja3MgdG8gZmlyc3Qgc2xpZGUgaWYgc2xpZGUgbmFtZSBub3QgZm91bmQnLCAnL3doYXRldmVyJywgWzBdKTtcbiAgICB0KCdmYWxsYmFja3MgdG8gZmlyc3Qgc3Vic2xpZGUgaWYgc3Vic2xpZGUgbm90IGZvdW5kJywgJy9wdWxwLWZpY3Rpb24vbWlhLXdhbGxhY2UnLCBbMSwwXSk7XG4gICAgdCgnZmFsbGJhY2tzIHRvIHNsaWRlIGlmIG5vIHN1YnNsaWRlcycsICcvMi9ub3QtZm91bmQnLCBbMl0pO1xuICB9KTtcblxufSk7XG4iXX0=