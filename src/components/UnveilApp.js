import { Observable } from 'rxjs';

import React from 'react';

import Slide from './Slide';
import Presenter from './Presenter';
import KeyController from './KeyController';

import createNavigator from './Navigator';
import createRouter from './Router';
import history from '../helpers/History';

import '../lib/Utils';

export default React.createClass({

  /*
   * Recursively build a route map from all the slides.
   */
  buildMap: function (nodes) {
    return nodes.map( (slide, index) => {
      if(Slide.isSlide(slide)) {
        let entry = {
          index,
          name: slide.props.name || false
        };

        if(this.areSlides(slide.props.children))
          entry.children = this.buildMap(slide.props.children);

        return entry;
      }
    }).compact();
  },

  componentWillMount: function () {
    this.history = this.props.history || history;
    this.map = this.buildMap(this.props.children);
    this.slides = this.props.children;

    this.navigator = createNavigator();

    this.router = createRouter({
      map: this.map,
      history: this.history,
      navigator: this.navigator
    });

    this.router.asObservable()
      .do((e) => console.log("updating state", e))
      .subscribe(this.updateState);

    this.navigator.asObservable()
      .filter(this.isValidMotion)
      .map(this.toLevelAndDirection)
      .map(this.toState)
      .filter(this.isValidState)
      .subscribe(this.router.jump);

    this.router.start();
  },

  motions: {
    up:    { level: 1, direction: 'previous' },
    down:  { level: 1, direction: 'next' },
    left:  { level: 0, direction: 'previous' },
    right: { level: 0, direction: 'next' },
  },
  isValidMotion: function (motion) {
    return Object.keys(this.motions).indexOf(motion.toLowerCase()) !== -1;
  },
  isValidState: function (state) {
    return Array.isArray(state);
  },
  toLevelAndDirection: function (motion) {
    return this.motions[motion];
  },
  toState: function (motion) {
    let level = this.routerState.directions[motion.level]
    return level && level[motion.direction];
  },

  getInitialState: function() {
    let getFirstChildIfSlides = (slide) => {
      if (!this.areSlides(slide.props.children)) {
        return slide;
      } else {
        getFirstChildIfSlides(slide.props.children[0]);
      }
    };

    return {
      currentSlide: getFirstChildIfSlides(this.props.children[0])
    };
  },

  updateState: function (s) {
    console.log("updateState",s);
    this.routerState = s;
    this.setState({ currentSlide: this.getSlide(s.indices) });
  },

  getSlide: function (indices) {
    let slide = this.slides[indices[0]];
    if(indices.length > 1 )
      return slide.props.children[indices[1]];
    else
      return slide
  },

  areSlides: function (children) {
    return children.toList()
      .map(Slide.isSlide)
      .reduce( (a,b) => (a&&b), true );
  },

  navigate: function(motion) {
    this.navigator.asObservable().next(motion);
  },

  render: function () {
    console.log(this.state);
    return (<div>
      <KeyController navigate={this.navigate} />
      {this.state.currentSlide}
    </div>);
  }

});
