jest.dontMock('../UIController');
jest.dontMock('marked');

import React     from 'react';
import ReactDOM  from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const UIController = require('../UIController').default;

describe('UIController', () => {
  let controller, node, navigate, directions, motions

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
    down:  { level: 1, direction: 'next' },
  };

  beforeEach( () => {
    navigate   = jest.genMockFunction();
    controller = TestUtils.renderIntoDocument( (
      <UIController
        navigate={navigate}
        directions={directions}
        motions={motions}>
      </UIController>));

    node = ReactDOM.findDOMNode(controller);
  });

  let find = (name) =>
    ReactDOM.findDOMNode(controller.refs[`button-${name}`]);

  Object.keys(motions).forEach( (motion) => {
    it(`calls navigate(${motion}) when pressing ${motion}`, () => {
      node = find(motion)
      TestUtils.Simulate.click(node);
      expect(navigate).toBeCalledWith(motion);
    });
  });


});