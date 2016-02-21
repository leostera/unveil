import React from 'react'

import UnveilApp from '../../UnveilApp'
import Slide from '../../Slide'

import Base from './MapBase'

const fixture = (options) => {
  return (
  <UnveilApp {...options}>
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
    <Slide>
      <Slide><h1>Beading</h1></Slide>
      <Slide><h1>Superbar</h1></Slide>
    </Slide>
    <Slide>
      <Slide><h1>Kneading</h1></Slide>
      <Slide><h1>Leonard Nimoy</h1></Slide>
    </Slide>
    <Slide>
      Han
    </Slide>
    <Slide>
      Leia
    </Slide>
  </UnveilApp>)
}

export default fixture
