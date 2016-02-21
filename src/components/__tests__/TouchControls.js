jest.dontMock('../TouchControls')
jest.dontMock('../Navigator')
jest.dontMock('marked')

import React       from 'react'
import ReactDOM    from 'react-dom'
import TestUtils   from 'react-addons-test-utils'
import { Subject } from 'rxjs'

const createNavigator = require('../Navigator').default
const TouchControls     = require('../TouchControls').default

describe('TouchControls', () => {
  let controls, node, navigator, stateSubject, mappings

  let swipeStart = {x: 200, y: 200}
  let moves = {
    'left':  {x: 10, y: 0},
    'right': {x: -10, y: 0},
    'up':    {x: 0, y: -10},
    'down':  {x: 0, y: 10}
  }

  beforeEach( () => {
    stateSubject = new Subject()
    navigator = createNavigator({stateObservable: stateSubject})
    stateSubject.next({ direction: [] })
    navigator.next = jest.genMockFunction()

    controls = TestUtils.renderIntoDocument( (
      <TouchControls
        navigator={navigator}
      >
      </TouchControls>))

    node = ReactDOM.findDOMNode(controls)
  })

  let dispatchEvent = (type, clientX, clientY) => {
    let event = new TouchEvent(type, {touches: [{
      clientX: clientX,
      clientY: clientY
    }]})
    document.dispatchEvent(event)
  }

  let simulateSwipe = (move) => {
    this.dispatchEvent('touchstart', swipeStart.x, swipeStart.y)
    this.dispatchEvent('touchstart', swipeStart.x - move.x, swipeStart.y - move.y)
  }
  
  Object.keys(moves).forEach( (direction) => {
    xit(`calls navigate(${direction}) when swiping ${direction}`, () => {
      simulateSwipe(moves[direction])
      expect(navigator.next).toBeCalledWith(direction)
    })
  })

})
