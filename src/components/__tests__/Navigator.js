jest.dontMock('../Navigator');

const createNavigator = require('../Navigator').default;

let fixture = () => [
  {
    index: 0,
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
    index: 1,
    name: false
  },
  {
    index: 2,
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
    index: 3,
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
  }
];

describe('Navigator', () => {
  let navigator = createNavigator(fixture());

  describe('returns correct directions', () => {
    let t = (name, state, level, direction, result) => it(name, () => {
      let directions = navigator.getDirections(state);
      expect(directions[level][direction]).toEqual(result);
    });

    let n = (name, state, level, result) => t(name, state, level, 'next', result);
    let p = (name, state, level, result) => t(name, state, level, 'previous', result);

    n('for main slide with next slide', [2], 0, [3]);
    n('for main slide with previous slide', [2], 0, [1]);
    n('for main slide without next slide', [3], 0, false);
    n('for main slide without previous slide', [0], 0, false);

    //it('for sub slide with next slide');
    //it('for sub slide with previous slide');
    //it('for sub slide without next slide');
    //it('for sub slide without previous slide');
  });
});
