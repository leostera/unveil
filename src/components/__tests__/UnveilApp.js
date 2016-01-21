jest.dontMock('../UnveilApp');
jest.dontMock('../Router');
jest.dontMock('../Slide');

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
    <Slide>
      <Slide><h1>Heading</h1></Slide>
      <Slide name="donnie-darko"><h1>Donnie Darko</h1></Slide>
    </Slide>
  </UnveilApp>
);

const mapFixture = require('./fixtures/MapWithoutNestedFirstSlide').default;

let renderFixture = (history) => TestUtils.renderIntoDocument( fixture(history) );

describe('UnveilApp', () => {
  let history, elements, node;

  let checkContentEquals = (content) => {
    expect(node.textContent).toEqual(content);
  };

  beforeEach( () => {
    history = createHistory({ queryKey: false });
    elements = renderFixture(history);
    node = ReactDOM.findDOMNode(elements);
  });

  afterEach( () => {
    elements = node = null;
  });

  it('creates correct map', () => {
    expect(elements.map).toEqual(mapFixture());
  });

  xit('receives new states', () => {
    elements.updateState = jest.genMockFunction();
    history.push('/0/0');
    console.log(elements.updateState.mock);
    expect(elements.updateState).toBeCalled();
  });

  let checkContentOnRoute = (route, content) => {
    return () => {
      history.push(route);
      checkContentEquals(content);
    }
  };

  let t = (name, path, content) => it(name, checkContentOnRoute(path, content));

  t('routes to first slide', '/', 'Luke');
  t('routes by index',       '/1', 'Vincent Vega');
  t('routes by indices',     '/1/1', 'Jules effing Winnfield');
  t('routes by name',        '/return-of-the-jedi/luke', 'Luke');
});
