import React from 'react';
import ReactDOM from 'react-dom';

import UnveilApp from './components/UnveilApp';
import Slide from './components/Slide';

ReactDOM.render( (
  <UnveilApp>
    <Slide key="intro">
      <Slide key="first">
        {`
# ls

> List directory contents.

- List all files, even hidden:

\`ls -a\`
         `}
      </Slide>

      <Slide key="second"> # Second Slide</Slide>
      <Slide key="third"> # Second Slide</Slide>
    </Slide>
    <Slide key="outro">
      <Slide key="fourth"> # Bye World </Slide>
      <Slide key="fifth"> # Fourth Slide</Slide>
    </Slide>
  </UnveilApp>
), document.getElementById('unveil'));
