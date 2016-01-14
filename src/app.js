import React from 'react';

import UnveilApp from './components/UnveilApp';
import Slide from './components/Slide';

React.render( (
  <UnveilApp>
    <Slide key="intro">
      <Slide key="hello"> # Hello World </Slide>
      <Slide key="second"> # Second Slide</Slide>
    </Slide>
    <Slide key="outro">
      <Slide key="bye"> # Bye World </Slide>
      <Slide key="fourth"> # Fourth Slide</Slide>
    </Slide>
  </UnveilApp>
), document.getElementById('unveil'));
