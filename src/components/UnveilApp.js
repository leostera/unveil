// import { Observable } from 'rxjs';

import React from 'react';
// import CSSTransitionGroup from 'react-addons-css-transition-group';

import Slide from './Slide';
// import Presenter from './Presenter';

// import Router from './Router';
// import history from '../helpers/History';

import '../lib/Utils';

export default React.createClass({

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

    //this.history = history;
    //this.router = Router.fromMap(map);

    //let isNewState = (e) => e.type === "state.new"

    //Observable.fromRouter(this.router)
    //  .filter(isNewState)
    //  .subscribe(this.update);
  },

  //update: function (e) {
  //  // e.data = {
  //  //  indices: [n,m],
  //  //  availableRoutes: {
  //  //    next: true,
  //  //    previous: false, up: true
  //  //  }
  //  // }
  //  this.setState({ currentSlide: this.getSlide(indices) });
  //},

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
