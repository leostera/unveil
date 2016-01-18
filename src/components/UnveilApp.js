 import { Observable } from 'rxjs';

import React from 'react';

import Slide from './Slide';
import Presenter from './Presenter';

import Router from './Router';
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
    this.map = this.buildMap(this.props.children);
    this.history = this.props.history || history;

    this.router = Router.configure({
      map: this.map,
      history: this.history
    }).start();

    Observable.fromRouter(this.router)
      .subscribe(this.updateState);
  },

  updateState: function (s) {
    this.setState({ currentSlide: this.getSlide(s.indices) });
  },

  getInitialState: function () {
    return { currentSlide: this.getSlide([0]) };
  },

  getSlide: function (indices) {
    let slide = this.props.children[indices[0]];
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
    return (<div> {this.state.currentSlide} </div>);
  }

});
