import React from 'react';
import ReactDOM from 'react-dom';


import GithubRibbon from './components/GithubRibbon';

import UnveilApp from './components/UnveilApp';
import Slide from './components/Slide';

import KeyControls from './components/KeyControls';
import UIControls  from './components/UIControls';

const controls = [KeyControls, UIControls];

ReactDOM.render( (
<section>
  <GithubRibbon path="ostera/unveil.js" />
  <UnveilApp controls={controls}>
    <Slide name="star-wars" markdown={true}>
      {`
# Star Wars
`}
    </Slide>

    <Slide name="episode-1" markdown={true}>
      <Slide name="intro" markdown={true}>
        {`
# The Phantom Menace

Turmoil has engulfed the Galactic Republic. The taxation of trade routes to outlying star systems is in dispute.

Hoping to resolve the matter with a blockade of deadly battleships, the greedy Trade Federation has stopped all shipping to the small planet of Naboo.

While the congress of the Republic endlessly debates this alarming chain of events, the Supreme Chancellor has secretly dispatched two Jedi Knights, the guardians of peace and justice in the galaxy, to settle the conflict....
         `}
      </Slide>
      <Slide name="characters" markdown={true}>
        {`
* Obi-wan Kenobi
* Qui-gonn Jinn
* Nobody cares about the rest
          `}
      </Slide>
      <Slide name="screenshots" markdown={true}>
        {`
![obi-wan and qui-gonn jin](http://static1.squarespace.com/static/51b3dc8ee4b051b96ceb10de/t/5479f9a4e4b05e2320d89a2e/1417279908429/)
          `}
      </Slide>
    </Slide>

    <Slide name="episode-2" markdown={true}>
      <Slide name="intro" markdown={true}>
        {`
  # Attack of the Clones

  Turmoies unrest in the Galactic Senate. Several thousand solar systems have declared their intentions to leave the Republic.

  This separatist movement, under the leadership of the mysterious Count Dooku, has made it difficult for the limited number of Jedi Knights to maintain peace and order in the galaxy.

  Senator Amidala, the former Queen of Naboo, is returning to the Galactic Senate to vote on the critical issue of creating an ARMY OF THE REPUBLIC to assist the overwhelmed Jedi....
          `}
      </Slide>
    </Slide>

    <Slide name="episode-3" markdown={true}>
      {`
# The Revenge of the Sith

War! The Republic is crumbling under attacks by the ruthless Sith Lord, Count Dooku.  There are heroes on both sides.  Evil is everywhere.

In a stunning move, the fiendish droid leader, General Grievous, has swept into the Republic capital and kidnapped Chancellor Palpatine, leader of the Galactic Senate.

As the Separatist Droid Army attempts to flee the besieged capital with their valuable hostage, two Jedi Knights lead a desperate mission to rescue the captive Chancellor....
       `}
    </Slide>
  </UnveilApp>
</section>
), document.getElementById('unveil'));
