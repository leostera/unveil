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
    let controls  = this.props.controls || [UIControls, KeyControls];
    let presenter = this.props.presenter || Presenter;

    this.modes    = this.props.modes || {
      default: {
        controls : controls,
        presenter: presenter
      }
    };

    this.history        = this.props.history || history;
    this.slides         = this.props.children.toList();
    this.map            = this.buildMap(this.slides);
    this.getDirections  = this.props.getDirections || getDirections;

    this.routerState = { directions: [], query: {} };
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
      .subscribe(function(e) {
        this.router.go(e, this.routerState.query)
      }.bind(this));

    this.router.start();
  },

  getMode: function () {
    return this.modes[this.state.mode] || this.modes['default'];
  },

  getInitialState: function() {
    let getFirstChildIfSlides = (slide) => {
      if (!this.areSlides(slide.props.children)) {
        return slide;
      } else {
        return getFirstChildIfSlides(slide.props.children[0]);
      }
    };

    return {
      currentSlide: getFirstChildIfSlides(this.props.children[0]),
      mode: 'default'
    };
  },

  updateState: function (s) {
    this.routerState = s;
    this.setState({ mode: s.query.mode || 'default' });
  },

  areSlides: function (children) {
    return children.toList()
      .map(Slide.isSlide)
      .reduce( (a,b) => (a&&b), true );
  },

  controlsElements: function () {
    let controls = this.getMode().controls.map( (control) => {
      const props = {
        key: control.displayName,
        navigator: this.navigator
      };
      return React.createElement(control, props);
    });

    return React.createElement('controls', null, controls);
  },

  presenterElement: function() {
    return React.createElement(
      this.getMode().presenter,
      {
        routerState: this.routerState,
        slides: this.slides,
        ref: 'current-slide'
      }
    );
  },

  render: function () {
    return (
      <div>
        {this.controlsElements()}
        {this.presenterElement()}
      </div>
    );
  }

});
