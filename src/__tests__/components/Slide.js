jest.dontMock('components/Slide');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const Slide = require('components/Slide');

describe('Slide', () => {

  it("renders it's content when it doesn't have subslides", () => {

    let slide = TestUtils.renderIntoDocument(
      (<Slide> Hello </Slide>)
    );

    let slideNode = ReactDOM.findDOMNode(slide);

    expect(slideNode.textContent).toEqual('Hello');
  });

});
