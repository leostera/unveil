jest.dontMock('../UnveilApp');
jest.dontMock('../Slide');
jest.dontMock('../../helpers/History');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const UnveilApp = require('../UnveilApp').default;
const Slide = require('../Slide').default;
const history = require('../../helpers/History').default;

let fixture = () => (
    <UnveilApp>
        <slide name="return-of-the-jedi">
            Luke
        </slide>
        <slide name="pulp-fiction">
            <slide name="vinnie-vincent">
              Vincent Vega
            </slide>
            <slide name="jules">
              Jules effing Winnfield
            </slide>
        </slide>
    </UnveilApp>
);

let checkContentEquals = (text) => {
  checkContentEqualsWithFixture(text, fixture);
};

let checkContentEqualsWithFixture = (text, fixture) => {
  let unveil = TestUtils.renderIntoDocument(fixture());
  let unveilNode = ReactDOM.findDOMNode(unveil);
  expect(unveilNode.textContent).toEqual(text);
};

describe('UnveilApp', () => {

  it('renders the first slide', () => {
    checkContentEquals('Luke');
  })

  it('renders slide according to path', () => {
    history.push('/1');
    checkContentEquals('Vincent Vega');
  })

  it('renders subslide according to path', () => {
    history.push('/1/1');
    checkContentEquals('Jules effing Winnfield');
  })

  it('routes by name', () => {
    history.push('/return-of-the-jedi/luke')
    checkContentEquals('Luke');
  })

});
