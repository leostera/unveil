jest.dontMock('../UnveilApp');
jest.dontMock('../Slide');
jest.dontMock('../../helpers/History');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const UnveilApp = require('../UnveilApp').default;
const Slide = require('../Slide').default;
const createHistory = require('history/lib/createHashHistory');

let fixture = (history) => (
  <UnveilApp history={history}>
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

let renderFixture = (history) => TestUtils.renderIntoDocument( fixture(history) );

let checkContentEquals = (node, assertion) => {
  expect(node.textContent).toEqual(assertion);
};

let checkContentAfterRoutingEquals = (history, route, assertion) => {
  history.push(route);
  checkContentEquals(assertion);
};

let checkHashAfterRoutingEquals = (history, route, assertion) => {
  history.push(route);
  let unlisten = history.listen((location) => {
    expect(location.pathname).toEqual(assertion);
  });
  unlisten();
};

describe('UnveilApp', () => {
  let history, elements, node

  beforeEach( () => {
    history = createHistory({ queryKey: false });
    elements = renderFixture(history);
    node = ReactDOM.findDOMNode(elements);
  });

  afterEach( () => {
    // please destroy elements and node here
  });

  it('renders the first slide', () => {
    checkContentEquals(node, 'Luke');
  });

  it('renders slide according to path', () => {
    checkContentAfterRoutingEquals(history, '/1', 'Vincent Vega');
  });

  it('renders subslide according to path', () => {
    checkContentAfterRoutingEquals(history, '/1/1', 'Jules effing Winnfield');
  });

  it('routes by name', () => {
    checkContentAfterRoutingEquals(history, '/return-of-the-jedi/luke', 'Luke');
  });

  it('routes to html slide', () => {
    history.push('/2');
    let children = node.children[0].children;
    expect(children.length).toEqual(3);
    expect(children[0].textContent).toEqual('One');
  });

  it('routes to html sub slide', () => {
    history.push('/3/1');
    let children = node.children[0].children;
    expect(children[0].tagName.toLowerCase()).toEqual('h1');
    expect(children[0].textContent).toEqual('Donnie Darko');
  });

  it('routes from index to name', () => {
    checkHashAfterRoutingEquals(history, '/0', '/return-of-the-jedi');
  });

  it('reroutes from index to default subindex name', () => {
    checkHashAfterRoutingEquals(history, '/1', '/pulp-fiction/vincent-vega');
  });

  it('reroutes from subindex to name', () => {
    checkHashAfterRoutingEquals(history, '/3/1', '/3/donnie-darko');
  });

  it('does not reroute if no name is available for index', () => {
    checkHashAfterRoutingEquals(history, '/2', '/2');
  });

  it('does not reroute if no name is available for subindex', () => {
    checkHashAfterRoutingEquals(history, '/3/0', '/3/0');
  });

});
