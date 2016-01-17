jest.dontMock('../UnveilApp');
jest.dontMock('../Slide');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const UnveilApp = require('../UnveilApp').default;
const Slide = require('../Slide').default;
const createHistory = require('history/lib/createHashHistory');

let fixture = () => (
  <UnveilApp>
    <Slide key="0" name="return-of-the-jedi">
      Luke
    </Slide>
    <Slide key="1" name="pulp-fiction">
      <Slide name="vincent-vega">
        Vincent Vega
      </Slide>
      <Slide name="jules">
        Jules effing Winnfield
      </Slide>
      <Slide>
        Marsellus Wallace
      </Slide>
    </Slide>
    <Slide key="2">
      <h1>One</h1>
      <p> What happens here? </p>
      <code> Some codez </code>
    </Slide>
  </UnveilApp>
);

let mapFixture = () => [
  {
    index: 0,
    name: "return-of-the-jedi"
  },
  {
    index: 1,
    name: "pulp-fiction",
    children: [
      {
        index: 0,
        name: "vincent-vega"
      },
      {
        index: 1,
        name: "jules"
      },
      {
        index: 2,
        name: false
      },
    ]
  },
  {
    index: 2,
    name: false
  }
];

let renderFixture = () => TestUtils.renderIntoDocument( fixture() );

describe('UnveilApp', () => {
  let elements, node;

  let checkContentEquals = (content) =>
    expect(node.textContent).toEqual(content)

  beforeEach( () => {
    elements = renderFixture();
    node = ReactDOM.findDOMNode(elements);
  });

  afterEach( () => {
    elements = node = null;
  });

  it("creates the right map", () => {
    expect(elements.map).toEqual(mapFixture());
  });
});
