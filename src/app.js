import React from 'react';

import UnveilApp from './components/UnveilApp';
import Slide from './components/Slide';

React.render( (
  <UnveilApp>
    <Slide key="intro">
      <Slide key="first"> # Hello World </Slide>
      <Slide key="second"> # Second Slide</Slide>
      <Slide key="third"> # Second Slide</Slide>
    </Slide>
    <Slide key="outro">
      <Slide key="fourth"> # Bye World </Slide>
      <Slide key="fifth"> # Fourth Slide</Slide>
    </Slide>
  </UnveilApp>
), document.getElementById('unveil'));
