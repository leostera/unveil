jest.dontMock('../UIControls');
jest.dontMock('../Navigator');
jest.dontMock('marked');

import React           from 'react';
import ReactDOM        from 'react-dom';
import TestUtils       from 'react-addons-test-utils';

const createNavigator = require('../Navigator').default;
const UIControls      = require('../UIControls').default;

describe('UIControls', () => {
  let controller, node, navigator, directions, motions;

  directions = [
    {next: [0], previous: [0]},
    {next: [0], previous: [0]},
    {next: [0], previous: [0]},
    {next: [0], previous: [0]}
  ];
  motions    = {
    left:  { level: 0, direction: 'previous' },
    up:    { level: 1, direction: 'previous' },
    right: { level: 0, direction: 'next' },
    down:  { level: 1, direction: 'next' }
  };

  navigator = createNavigator();

  beforeEach( () => {
    navigator = createNavigator();
    navigator.setPossibleMoves(directions);
    navigator.move = jest.genMockFunction();

    controller = TestUtils.renderIntoDocument( (
      <UIControls
        navigator={navigator}
      >
      </UIControls>));

    node = ReactDOM.findDOMNode(controller);
  });

  let find = (name) =>
    ReactDOM.findDOMNode(controller.refs[`button-${name}`]);

  Object.keys(motions).forEach( (motion) => {
    it(`calls navigate(${motion}) when pressing ${motion}`, () => {
      node = find(motion);
      TestUtils.Simulate.click(node);
      expect(navigator.move).toBeCalledWith(motion);
    });
  });


});
