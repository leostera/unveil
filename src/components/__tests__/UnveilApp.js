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
    <Slide key="3">
      <Slide><h1>Heading</h1></Slide>
      <Slide name="donnie-darko"><h1>Donnie Darko</h1></Slide>
    </Slide>
  </UnveilApp>
);

let renderFixture = () => TestUtils.renderIntoDocument( fixture() );

let getNode = () => ReactDOM.findDOMNode( renderFixture() ) ;
let getWrappedChildren = () => getNode().children[0];

let checkContentEquals = (assertion) => {
  expect(getNode().textContent).toEqual(assertion);
};

let checkContentAfterRoutingEquals = (route, assertion) => {
  history.push(route);
  checkContentEquals(assertion);
};

let checkHashAfterRoutingEquals = (route, assertion) => {
  history.push(route);
  renderFixture();
  let unlisten = history.listen((location) => {
    expect(location.pathname).toEqual(assertion);
  });
  unlisten();
};

describe('UnveilApp', () => {

  it('renders the first slide', () => {
    checkContentEquals('Luke');
  });

  it('renders slide according to path', () => {
    checkContentAfterRoutingEquals('/1', 'Vincent Vega');
  });

  it('renders subslide according to path', () => {
    checkContentAfterRoutingEquals('/1/1', 'Jules effing Winnfield');
  });

  it('routes by name', () => {
    checkContentAfterRoutingEquals('/return-of-the-jedi/luke', 'Luke');
  });

  it('routes to html slide', () => {
    history.push('/2');
    let unveilNodeChildren = getWrappedChildren();
    expect(unveilNodeChildren.children.length).toEqual(3);
    expect(unveilNodeChildren.children[0].textContent).toEqual('One');
  });

  it('routes to html sub slide', () => {
    history.push('/3/1');
    let unveilNodeChildren = getWrappedChildren();
    expect(unveilNodeChildren.children[0].tagName.toLowerCase()).toEqual('h1');
    expect(unveilNodeChildren.children[0].textContent).toEqual('Donnie Darko');
  });

  it('routes from index to name', () => {
    checkHashAfterRoutingEquals('/0', '/return-of-the-jedi');
  });

  it('reroutes from index to default subindex name', () => {
    checkHashAfterRoutingEquals('/1', '/pulp-fiction/vincent-vega');
  });

  it('reroutes from subindex to name', () => {
    checkHashAfterRoutingEquals('/3/1', '/3/donnie-darko');
  });

  it('does not reroute if no name is available for index', () => {
    checkHashAfterRoutingEquals('/2', '/2');
  });

  it('does not reroute if no name is available for subindex', () => {
    checkHashAfterRoutingEquals('/3/0', '/3/0');
  });

});
