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
    <Slide name="return-of-the-jedi">
      Luke
    </Slide>
    <Slide name="pulp-fiction">
      <Slide name="vinnie-vincent">
        Vincent Vega
      </Slide>
      <Slide name="jules">
        Jules effing Winnfield
      </Slide>
    </Slide>
    <Slide>
      <h1>One</h1>
      <p> What happens here? </p>
      <code> Some codez </code>
    </Slide>
    <Slide>
      <Slide><h1>Heading</h1></Slide>
      <Slide name="donnie-darko"><h1>Donnie Darko</h1></Slide>
    </Slide>
  </UnveilApp>
);

let checkContentEquals = (text) => {
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

  it('routes to html slide', () => {
    history.push('/2');
    let unveil = TestUtils.renderIntoDocument(fixture());
    // escape the wrapping div
    let unveilNode = ReactDOM.findDOMNode(unveil).children[0];
    expect(unveilNode.children.length).toEqual(3);
    expect(unveilNode.children[0].textContent).toEqual('One');
  })

});
