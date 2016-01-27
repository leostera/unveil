jest.dontMock('../Presenter');
jest.dontMock('../Slide');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const Slide     = require('../Slide').default;
const Presenter = require('../Presenter').default;

let fixture = (opts) => ( <Presenter {...opts} />);

let renderFixture = (opts) => TestUtils.renderIntoDocument( fixture(opts) );

describe('Presenter', () => {
  let elements, node;

  it('renders html slide', () => {
    elements = renderFixture({
      slides: [(<Slide><h1>Hello</h1></Slide>)],
      routerState: {
        indices: [0]
      }
    });
    node = ReactDOM.findDOMNode(elements);

    let children = node.children;
    expect(children.length).toEqual(1);
    expect(children[0].textContent).toEqual('Hello');
  });

});
