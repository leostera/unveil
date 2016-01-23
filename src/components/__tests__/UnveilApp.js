jest.dontMock('../UnveilApp');
jest.dontMock('../Router');
jest.dontMock('../Navigator');
jest.dontMock('../UIControls');
jest.dontMock('../KeyControls');
jest.dontMock('../Slide');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const UnveilApp = require('../UnveilApp').default;
const Slide = require('../Slide').default;
const createHistory = require('history/lib/createHashHistory');

const UIControls  = require('../UIControls').default;
const KeyControls = require('../KeyControls').default;

const fixture    = require('./fixtures/TreeWithoutNestedFirstSlide').default;
const mapFixture = require('./fixtures/MapWithoutNestedFirstSlide').default;

let renderFixture = (options) => TestUtils.renderIntoDocument( fixture(options) );

describe('UnveilApp', () => {
  let history, elements, node, controls;

  let checkContentEquals = (content) => {
    expect(node.textContent).toEqual(content);
  };

  beforeEach( () => {
    history = createHistory({ queryKey: false });
    controls = [UIControls, KeyControls];
    elements = renderFixture({ history, controls });
    node = ReactDOM.findDOMNode(elements.refs['current-slide']);
  });

  afterEach( () => {
    elements = node = null;
  });

  it('creates correct map', () => {
    expect(elements.map).toEqual(mapFixture());
  });

  it('receives new states', () => {
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
