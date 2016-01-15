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
            <slide name="luke">Luke</slide>
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

describe('UnveilApp', () => {

  it('renders the first slide', () => {
    let unveil = TestUtils.renderIntoDocument(fixture());
    let unveilNode = ReactDOM.findDOMNode(unveil);
    expect(unveilNode.textContent).toEqual('Luke');
  }),

  it('renders the first subslide', () => {
    let unveil = TestUtils.renderIntoDocument(fixture());
    let unveilNode = ReactDOM.findDOMNode(unveil);
    expect(unveilNode.textContent).toEqual('Luke');
  }),

  it('renders slide according to path', () => {
    history.push('/1');
    let unveil = TestUtils.renderIntoDocument(fixture());
    let unveilNode = ReactDOM.findDOMNode(unveil);
    expect(unveilNode.textContent).toEqual('Vincent Vega');
  }),

  it('renders subslide according to path', () => {
    history.push('/1/1');
    let unveil = TestUtils.renderIntoDocument(fixture());
    let unveilNode = ReactDOM.findDOMNode(unveil);
    expect(unveilNode.textContent).toEqual('Jules effing Winnfield');
  }),

  it('routes by name', () => {
    history.push('/return-of-the-jedi/luke')
    let unveil = TestUtils.renderIntoDocument(fixture());
    let unveilNode = ReactDOM.findDOMNode(unveil);
    expect(unveilNode.textContent).toEqual('Luke');
  })

});
