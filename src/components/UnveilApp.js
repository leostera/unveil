import { Observable } from 'rxjs';

import React from 'react';

import Slide from './Slide';
import Presenter from './Presenter';

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
    this.slides = this.props.children;
    this.map = this.buildMap(this.props.children);
    this.history = this.props.history || history;

    this.router = createRouter({
      map: this.map,
      history: this.history
    });

    Observable.fromRouter(this.router)
      .do((e) => console.log("updating state", e))
      .subscribe(this.updateState);

    this.router.start();
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
    this.setState({ currentSlide: this.getSlide(s.current) });
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

  render: function () {
    console.log(this.state);
    return (<div>{this.state.currentSlide}</div>);
  }

});
