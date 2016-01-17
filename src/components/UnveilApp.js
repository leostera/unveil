 import { Observable } from 'rxjs';

import React from 'react';
// import CSSTransitionGroup from 'react-addons-css-transition-group';

import Slide from './Slide';
// import Presenter from './Presenter';

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

    this.router = Router.configure({
      map: this.map,
      history
    }).start();

    Observable.fromRouter(this.router)
      .subscribe(this.updateState);
  },

  updateState: function (e) {
    console.log(e);
    //this.setState({ currentSlide: this.getSlide(indices) });
  },

  //navigate: function (direction) {
  //  // Router.onNext("navigate.up");
  //},

  areSlides: function (children) {
    return children.toList()
      .map(Slide.isSlide)
      .reduce( (a,b) => (a&&b), true );
  },

  //navigate: function (direction) {
  //  subject.onNext( {type: "navigate", direction} );
  //}

  render: function () {
    //<UIController {...this.uiControllerOptions()} />
    //<KeyListener navigate={this.navigate}/>
      //<Presenter {...this.presenterOptions()}>
    return (<div> {this.props.children} </div>);
  }

});
