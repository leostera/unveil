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

  describe('directions', () => {
    let t = (name, state, level, direction, result) => it(name, () => {
      let directions = navigator.getDirections(state);
      expect(directions[level][direction]).toEqual(result);
    });

    let n = (name, state, level, result) => t(name, state, level, 'next', result);
    let p = (name, state, level, result) => t(name, state, level, 'previous', result);

    n('gets directions for 1st level with successor', [1], 0, [2]);
    p('gets directions for 1st level with predecessor', [1], 0, [0]);
    n('gets directions for 1st level without successor', [3, 0], 0, false);
    p('gets directions for 1st level without predecessor', [0, 0], 0, false);

    n('gets directions for 2nd level with successor', [3, 0], 1, [3, 1]);
    p('gets directions for 2nd level with predecessor', [3, 1], 1, [3, 0]);
    n('gets directions for 2nd level without successor', [2, 1], 1, false);
    p('gets directions for 2nd level without predecessor', [2, 0], 1, false);
  });
});
