jest.dontMock('../KeyControls');
jest.dontMock('../Navigator');
jest.dontMock('marked');

import React           from 'react';
import ReactDOM        from 'react-dom';
import TestUtils       from 'react-addons-test-utils';

const createNavigator = require('../Navigator').default;
const KeyControls     = require('../KeyControls').default;

describe('KeyControls', () => {
  let controls, node, navigator, directions, mappings;

  directions = [
    {next: [0], previous: [0]},
    {next: [0], previous: [0]},
    {next: [0], previous: [0]},
    {next: [0], previous: [0]}
  ];
  mappings = {
    'left': 37,
    'up': 38,
    'right': 39,
    'down': 40
  };

  navigator = createNavigator();

  beforeEach( () => {
    navigator = createNavigator();
    navigator.setPossibleMoves(directions);
    navigator.move = jest.genMockFunction();

    controls = TestUtils.renderIntoDocument( (
      <KeyControls
        navigator={navigator}
      >
      </KeyControls>));

    node = ReactDOM.findDOMNode(controls);
  });

  Object.keys(mappings).forEach( (direction) => {
    let key = mappings[direction];
    it(`calls navigate(${direction}) when pressing ${direction}-arrow-key (${key})`, () => {
      let event = new KeyboardEvent('keyup', {'keyCode': key});
      document.dispatchEvent(event);
      expect(navigator.move).toBeCalledWith(direction);
    });
  });

  it(`does not react to non-mapped keyUps`, () => {
    let event = new KeyboardEvent('keyup', {'keyCode': 65});
    document.dispatchEvent(event);
    expect(navigator.move).not.toBeCalled();
  });


});
