jest.dontMock('../Presenter');
jest.dontMock('../Slide');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const Slide     = require('../Slide').default;
const Presenter = require('../Presenter').default;

let fixture = (slide) => ( <Presenter currentSlide={slide} />);

let renderFixture = (slide) => TestUtils.renderIntoDocument( fixture(slide) );

describe('Presenter', () => {
  let elements, node;

  let checkContentEquals = (content) =>
    expect(node.textContent).toEqual(content)

  beforeEach( () => {
  });

  afterEach( () => {
    // please destroy elements and node here
    elements = node = null;
  });

  it('renders html slide', () => {
    elements = renderFixture(<Slide><h1>Hello</h1></Slide>);
    node = ReactDOM.findDOMNode(elements);

    let children = node.children;
    expect(children.length).toEqual(1);
    expect(children[0].textContent).toEqual('Hello');
  });

});
