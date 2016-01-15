jest.dontMock('../Slide');
jest.dontMock('marked');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const Slide = require('../Slide').default;

describe('Slide', () => {

  it('renders it\'s content', () => {
    let slide = TestUtils.renderIntoDocument( (<Slide>Hello</Slide>) );
    let slideNode = ReactDOM.findDOMNode(slide);
    expect(slideNode.textContent).toEqual('Hello');
  });

  it('renders markdown content', () => {
    let slide = TestUtils.renderIntoDocument( (<Slide markdown={true}># Hello</Slide>) );
    let slideNode = ReactDOM.findDOMNode(slide);
    expect(slideNode.textContent).toEqual('Hello');
  });

  it('renders html content', () => {
    let slide = TestUtils.renderIntoDocument( (<Slide><h1>Hello</h1></Slide>) );
    let slideNode = ReactDOM.findDOMNode(slide);
    expect(slideNode.textContent).toEqual('Hello');
  });

});
