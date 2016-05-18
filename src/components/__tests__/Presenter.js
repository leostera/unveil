jest.dontMock('../Presenter')
jest.dontMock('../Slide')

import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'

const Slide     = require('../Slide').default
const Presenter = require('../Presenter').default

let fixture = (opts) => ( <Presenter {...opts} /> )

describe('Presenter', () => {
  let presenter, node, renderer, render

  beforeEach( () => {
    renderer = TestUtils.createRenderer();
    render = (opts) => (renderer.render(fixture(opts)))
  })

  it('passes slide\'s transition properties to the transition group', () => {
    presenter = render({
      slides: [(<Slide transitionName="nope"><h1>Hello</h1></Slide>)],
      routerState: {
        indices: [0]
      }
    })
    node = renderer.getRenderOutput();
    let children = node.props.children
    expect(children.props.transitionName).toEqual('nope')

  });

  it('renders html slide', () => {
    presenter = render({
      slides: [(<Slide><h1>Hello</h1></Slide>)],
      routerState: {
        indices: [0]
      }
    })
    node = renderer.getRenderOutput();
    let slide = node.props.children
    let h1 = slide.props.children
    expect(h1.props.children).toEqual('Hello')
  })

})
