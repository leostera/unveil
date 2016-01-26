jest.dontMock('../Navigator');

import { Observable, Subject } from 'rxjs';

const createNavigator = require('../Navigator').default;
const possibleMoves = [
  {next: [0], previous: [2]},
  {next: false, previous: [1, 1]}
];

const motions = ['left', 'right', 'up', 'down'];

describe('Navigator', () => {
  let navigator, stateSubject;

  beforeEach( () => {
    stateSubject = new Subject();
    let stateObservable = stateSubject;
    navigator = createNavigator({stateObservable});
  });

  describe('Motion Names', () => {
    it('returns correct motion names', () => {
      let names = navigator.motionNames;
      expect(names.length).toEqual(4);
      motions.forEach(function(motion) {
        expect(names.indexOf(motion)).not.toEqual(-1);
      });
    });
  });

  describe('Possible motions', () => {
    let t = (name, possibleMotions, directions) => it(name, () => {
      stateSubject.next(directions);
      possibleMotions.forEach((val, i) => {
        expect(navigator.isPossibleMotion(motions[i])).toEqual(val);
      });
    });

    t('computes possible motions before setting moves', [false, false, false, false], []);
    t('computes possible motions after setting moves', [true, true, true, false], possibleMoves);
  });

  describe('Go', () => {
    let mockSubscriber, subscription;

    beforeEach(() => {
      stateSubject.next(possibleMoves);
      mockSubscriber = jest.genMockFn();
      subscription   = navigator.asObservable().subscribe(mockSubscriber);
    });

    afterEach(() => {
      if (subscription) subscription.unsubscribe();
    });

    let t = (name, next, expectation) => {
      return it(name, () => {
        navigator.next(next);
        expectation();
      });
    }

    t('does not go to invalid state', ['not'], () => expect(mockSubscriber).not.toBeCalled() );
    t('does not move diagonally', 'diagonally', () => expect(mockSubscriber).not.toBeCalled() );
    t('does not move down', 'down', () => expect(mockSubscriber).not.toBeCalled() );
    t('goes to valid state', [1], () => expect(mockSubscriber).toBeCalledWith([1]) );
    t('goes to valid string state', [1], () => expect(mockSubscriber).toBeCalledWith([1]) );
    t('moves up', 'up', () => expect(mockSubscriber).toBeCalledWith([1, 1]) );
  });
});
