# unveil.js

> The Reactive Javascript Presentation Library

[![Build Status](https://travis-ci.org/ostera/unveil.js.svg?branch=master)](https://travis-ci.org/ostera/unveil.js)

## Get Presenting!

Getting `unveil.js` installed in your project is dead simple, just run `npm i unveil --save` and you'll be able to include it as follows:

```js

var unveil = require('unveil');

var StarWarsSlide = React.createElement(unveil.Slide, { name: "Star Wars" });

```

Or if you fancy ES6 and JSX syntax:

```jsx

import { UnveilApp, Slide } from 'unveil';

ReactDOM.render(
  <UnveilApp>
    <Slide name="star wars">
      What a great movie!
    </Slide>
  </UnveilApp>
);

```

`unveil` supports many features that are traditionally overseen in presentation frameworks, such as:

* A very flexible Router with an extensible Navigator interface
* Deep nesting allowed and encouraged over N-levels (7-dimensional Presentations are no longer impossible)
* Complete control over the presentation logic (Overviews, zooming, 2-slides at a time, notes)
* Out-of-the box support for Modes, allowing you to switch controls or goodies on custom defined modes

and last but not least,

* A pluggable interface to tap into the presentation and do crazy things like @irisSchaffer did with her
Network Relay and Network Sync controllers that let you synchronize any number of viewers with a single
presenter.
