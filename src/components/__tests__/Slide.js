jest.dontMock('../Slide')
jest.dontMock('marked')

import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'

const Slide = require('../Slide').default

describe('Slide', () => {

  it('renders it\'s content', () => {
    let slide = TestUtils.renderIntoDocument( (<Slide>Hello</Slide>) )
    let slideNode = ReactDOM.findDOMNode(slide)
    expect(slideNode.textContent).toEqual('Hello')
  })

  it('renders markdown content', () => {
    let slide = TestUtils.renderIntoDocument( (<Slide markdown={true}># Hello</Slide>) )
    let slideNode = ReactDOM.findDOMNode(slide)
    expect(slideNode.textContent).toEqual('Hello')
  })

  it('renders html content', () => {
    let slide = TestUtils.renderIntoDocument( (<Slide><h1>Hello</h1></Slide>) )
    let slideNode = ReactDOM.findDOMNode(slide)
    expect(slideNode.textContent).toEqual('Hello')
  })

  it('properly sets default properties', () => {
    let slide = (<Slide></Slide>);
    expect(slide.props.transitionName).toEqual('slide-fade');
    expect(slide.props.transitionEnter).toEqual(true);
  })

  it('overrides default properties', () => {
    let slide = (<Slide transitionName="nope"></Slide>);
    expect(slide.props.transitionName).toEqual('nope');
    expect(slide.props.transitionEnter).toEqual(true);
  })

})
