jest.dontMock('../../getDirections')
jest.dontMock('../KeyControls')
jest.dontMock('../../Navigator')
jest.dontMock('../Presenter')
jest.dontMock('../../Router')
jest.dontMock('../Slide')
jest.dontMock('../UIControls')
jest.dontMock('../UnveilApp')

import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'

import { useQueries, createHashHistory } from 'history'
const createHistory = (opts) => (useQueries(createHashHistory)(opts))

const UnveilApp = require('../UnveilApp').default

const UIControls  = require('../UIControls').default
const KeyControls = require('../KeyControls').default

const fixture    = require('./fixtures/TreeWithoutNestedFirstSlide').default
const mapFixture = require('./fixtures/MapWithoutNestedFirstSlide').default

let renderFixture = (options) => TestUtils.renderIntoDocument( fixture(options) )

describe('UnveilApp', () => {
  let history, elements, node, controls

  let checkContentEquals = (content) => {
    node = ReactDOM.findDOMNode(elements.refs['current-slide'])
    expect(node.textContent).toEqual(content)
  }

  beforeEach( () => {
    history = createHistory({ queryKey: false })
    controls = [UIControls, KeyControls]
    elements = renderFixture({ history, controls })
  })

  afterEach( () => {
    elements.router.stop()
    elements = node = null
  })

  it('creates correct map', () => {
    expect(elements.map).toEqual(mapFixture())
  })

  it('saves new states', () => {
    history.push('/1')
    expect(elements.routerState.indices).toEqual([1, 0])
  })

  let t = (name, path, content) => {
    it(name, () => {
      history.push(path)
      checkContentEquals(content)
    })
  }

  t('routes to first slide', '/', 'Luke')
  t('routes by index',       '/1', 'Vincent Vega')
  t('routes by indices',     '/1/1', 'Jules effing Winnfield')
  t('routes by name',        '/return-of-the-jedi/luke', 'Luke')
})
