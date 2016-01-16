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

let checkContentEquals = (assertion) => {
  let unveil = TestUtils.renderIntoDocument(fixture());
  let unveilNode = ReactDOM.findDOMNode(unveil);
  expect(unveilNode.assertionContent).toEqual(assertion);
};

let checkContentAfterRoutingEquals = (route, assertion) => {
  history.push(route);
  checkContentEquals(assertion);
};

let getUnveilNodeChildren = () => {
  let unveil = TestUtils.renderIntoDocument(fixture());
  // escape the wrapping div
  return ReactDOM.findDOMNode(unveil).children[0];
};

describe('UnveilApp', () => {

  it('renders the first slide', () => {
    checkContentEquals('Luke');
  });

  it('renders slide according to path', () => {
    checkContentAfterRoutingEquals('/1', 'Vincent Vega');
  });

  it('renders subslide according to path', () => {
    checkContentAfterRoutingEquals('1/1', 'Jules effing Winnfield');
  });

  it('routes by name', () => {
    checkContentAfterRoutingEquals('/return-of-the-jedi/luke', 'Luke');
  });

  it('routes to html slide', () => {
    history.push('/2');
    let unveilNodeChildren = getUnveilNodeChildren();
    expect(unveilNodeChildren.children.length).toEqual(3);
    expect(unveilNodeChildren.children[0].textContent).toEqual('One');
  });

  it('routes to html sub slide', () => {
    history.push('/3/1');
    let unveilNodeChildren = getUnveilNodeChildren();
    expect(unveilNodeChildren.children[0].tagName.toLowerCase()).toEqual('h1');
    expect(unveilNodeChildren.children[0].textContent).toEqual('Donnie Darko');
  });

});
