import { Observable } from 'rxjs';

import React from 'react';

import Slide     from './Slide';
import Presenter from './Presenter';

import KeyControls from './KeyControls';
import UIControls  from './UIControls';

import getDirections        from '../getDirections';
import createRouter         from './Router';
import createNavigator      from './Navigator';
import history              from '../helpers/History';

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
          entry.children = this.buildMap(slide.props.children.toList());

        return entry;
      }
    }).compact();
  },

  componentWillMount: function () {
    this.controls       = this.props.controls || [UIControls, KeyControls];
    this.history        = this.props.history || history;
    this.slides         = this.props.children.toList();
    this.map            = this.buildMap(this.slides);
    this.getDirections  = this.props.getDirections || getDirections;

    this.routerState = { directions: [] };
    this.router = createRouter({
      map: this.map,
      history: this.history,
      getDirections: this.getDirections
    });

    this.navigator = (this.props.navigator || createNavigator)({
      stateObservable: this.router.asObservable().pluck('directions')
    });

    this.router.asObservable()
      .subscribe(this.updateState);

    this.navigator.asObservable()
      .subscribe(this.router.go);

    this.router.start();
  },

  /**
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
    this.routerState = s;
    this.setState({ currentSlide: this.getSlide(s.indices) });
  },

  getSlide: function (indices) {
    let slide = this.slides[indices[0]];
    if(indices.length > 1 )
      return slide.props.children.toList()[indices[1]];
    else
      return slide
  },

  areSlides: function (children) {
    return children.toList()
      .map(Slide.isSlide)
      .reduce( (a,b) => (a&&b), true );
  },

  controlsElements: function () {
    let controls = this.controls.map( (control) => {
      const props = {
        key: control.displayName,
        navigator: this.navigator
      };
      return React.createElement(control, props);
    });

    return React.createElement('controls', null, controls);
  },

  render: function () {
    return (<div>
      {this.controlsElements()}
      <current ref="current-slide">{this.state.currentSlide}</current>
    </div>);
  }

});
