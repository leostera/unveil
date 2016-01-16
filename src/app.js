import React from 'react';
import ReactDOM from 'react-dom';

import UnveilApp from './components/UnveilApp';
import Slide from './components/Slide';

ReactDOM.render( (
  <UnveilApp>
    <Slide key="0" name="star-wars">
      <Slide key="1" name="episode-1">
        {`
          Turmoil has engulfed the Galactic Republic. The taxation of trade routes to outlying star systems is in dispute.
          Hoping to resolve the matter with a blockade of deadly battleships, the greedy Trade Federation has stopped all shipping to the small planet of Naboo.
          While the congress of the Republic endlessly debates this alarming chain of events, the Supreme Chancellor has secretly dispatched two Jedi Knights, the guardians of peace and justice in the galaxy, to settle the conflict....
         `}
      </Slide>
      <Slide key="2" name="second"> # Second Slide</Slide>
      <Slide key="3" name="third"> # Second Slide</Slide>
    </Slide>
    <Slide key="4" name="outro">
      <Slide key="5" name="fourth"> # Bye World </Slide>
      <Slide key="6" name="fifth"> # Fourth Slide</Slide>
    </Slide>
  </UnveilApp>
), document.getElementById('unveil'));
