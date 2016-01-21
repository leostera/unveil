jest.dontMock('../UIController');
jest.dontMock('marked');

import React     from 'react';
import ReactDOM  from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const UIController = require('../UIController').default;

describe('UIController', () => {
  let controller, node, navigate, directions;

  beforeEach( () => {
    directions = [];
    navigate   = jest.genMockFunction();
    controller = TestUtils.renderIntoDocument( (
      <UIController navigate={navigate} directions={directions}>
      </UIController>));
    node = ReactDOM.findDOMNode(controller);
  });

  it('calls navigate with the correct motion', () => {
    TestUtils.Simulate.click(node);
    expect(navigate).toBeCalledWith('down');
  });

});
