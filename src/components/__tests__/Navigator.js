jest.dontMock('../Navigator');

const createNavigator = require('../Navigator').default;
const possibleMoves = [
  {next: [0], previous: [2]},
  {next: false, previous: [1, 1]}
];

const directions = ['left', 'right', 'up', 'down'];

describe('Navigator', () => {
  let navigator;

  beforeEach( () => {
    navigator = createNavigator();
  });

  describe('Direction Names', () => {
    it('returns correct direction names', () => {
      let names = navigator.getDirectionNames();
      expect(names.length).toEqual(4);
      directions.forEach(function(direction) {
        expect(names.indexOf(direction)).not.toEqual(-1);
      });
    });
  });

  describe('Possible directions', () => {
    let t = (name, left, right, up, down, moves) => it(name, () => {
      navigator.setPossibleMoves(moves);
      let values = [left, right, up, down];
      values.forEach((val, i) => {
        expect(navigator.isDirectionPossible(directions[i])).toEqual(val);
      });
    });

    t('computes possible directions before setting moves', false, false, false, false, []);
    t('computes possible directions after setting moves', true, true, true, false, possibleMoves);
  });

  describe('Go', () => {
    beforeEach(() => {
      navigator.setPossibleMoves(possibleMoves);
    });

    let expectNewState = (target, done) => {
      let subscription = navigator.asObservable().subscribe((newState) => {
        expect(newState).toEqual(target);
        subscription.unsubscribe();
        done();
      });

      navigator.go(target);
    };

    it('goes to invalid state', (done) => {
      expectNewState([1], done);
    });

    // @todo how can we test this?
    xit('does not go to invalid state', (done) => {
      expect(() => expectNewState('left', done)).toThrow();
    });
  });

  describe('Move', () => {
    beforeEach(() => {
      navigator.setPossibleMoves(possibleMoves);
    });

    let expectNewState = (direction, target, done) => {
      let subscription = navigator.asObservable().subscribe((newState) => {
        expect(newState).toEqual(target);
        subscription.unsubscribe();
        done();
      });

      navigator.move(direction);
    };

    it('moves up', (done) => {
      expectNewState('up', [1, 1], done);
    });

    // @todo: how do we test this?
    xit('does not move diagonally', (done) => {
      expect(() => expectNewState('diagonally', [], done)).toThrow();
    });

    xit('does not move down', (done) => {
      expect(() => expectNewState('down', [], done)).toThrow();
    });
  });
});
