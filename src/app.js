import React from 'react';
import ReactDOM from 'react-dom';

import UnveilApp from './components/UnveilApp';
import Slide from './components/Slide';

ReactDOM.render( (
  <UnveilApp>
    <Slide name="star-wars">
      <Slide name="episode-1" markdown={true}>
        {`
# Star Wars

Turmoil has engulfed the Galactic Republic. The taxation of trade routes to outlying star systems is in dispute.
Hoping to resolve the matter with a blockade of deadly battleships, the greedy Trade Federation has stopped all shipping to the small planet of Naboo.
While the congress of the Republic endlessly debates this alarming chain of events, the Supreme Chancellor has secretly dispatched two Jedi Knights, the guardians of peace and justice in the galaxy, to settle the conflict....
         `}
      </Slide>
      <Slide name="second"> # Second Slide</Slide>
      <Slide name="third"> # Second Slide</Slide>
    </Slide>
    <Slide name="return-of-the-jedi">
      Luke
    </Slide>
    <Slide name="pulp-fiction">
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
), document.getElementById('unveil'));
