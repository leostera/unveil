import { Observable } from 'rxjs';
import '../lib/Rx.History';

import React from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';

import createHistory from 'history/lib/createHashHistory';
let history = createHistory({
  queryKey: false
});

const KEY_LEFT  = 37;
const KEY_UP    = 38;
const KEY_RIGHT = 39;
const KEY_DOWN  = 40;
const KEYS = [KEY_LEFT, KEY_UP, KEY_RIGHT, KEY_DOWN];

export default React.createClass({

  cleanUpPath: path => {
    if (path[0] === "/") {
      path = path.slice(1)
    }
    return path.trim().replace(' ','-');
  },

  componentWillMount: function () {
    Observable.fromEvent(document, "keyup")
      .pluck("keyCode")
      .filter(this.isKeyAllowed)
      .subscribe(this.onKey);

    Observable.fromHistory(history)
      .pluck("pathname")
      .map(this.cleanUpPath)
      .distinctUntilChanged()
      .map(this.pathToRoute)
      .map(this.lookupRoute)
      .subscribe(this.route);
  },

  isKeyAllowed: (code) => ( KEYS.indexOf(code) !== -1 ),

  onKey: function (code) {
    let transitionTo;
    let index = 0;
    let top;
    switch (code) {
      case KEY_LEFT: //look for previous top-level slide
        top = this.getTopLevelSlideFor(this.state.current)
        index = this.props.children.indexOf(top);
        let previous = this.props.children[index-1];
        if(previous !== undefined)
          transitionTo = previous.key;
        break;

      case KEY_RIGHT: //look for next top-level slide
        top = this.getTopLevelSlideFor(this.state.current)
        index = this.props.children.indexOf(top);
        let next = this.props.children[index+1];
        if(next !== undefined)
          transitionTo = next.key;
        break;

      case KEY_DOWN: //look for next sub-level slide
        break;

      case KEY_UP: //look for previous sub-level slide
        break;
    }
    transitionTo && history.push(transitionTo);
  },

  getTopLevelSlideFor: function (slide) {
    return this.props.children.filter( (top) => {
      return top.props.children.filter( (s) => {
        return s.key === slide.key;
      }).length > 0;
    })[0];
  },

  pathToRoute: (path) => {
    const [key, subKey] = path.split("/");
    return {key, subKey};
  },

  lookupRoute: function (route) {
    let byKey = (key) => {
      return (slide) => (slide.key === key)
    };
    let toChildren = (slide) => (slide.props.children)
    let children = this.props.children.filter(byKey(route.key))
      .map(toChildren)
      .reduce( (a,b) => a.concat(b) )

    if(route.subKey)
      return children.filter(byKey(route.subKey));
    else
      return children[0];
  },

  route: function (element) {
    this.setState({current: element});
  },

  render: function () {
    return (<div>
      <CSSTransitionGroup
        transitionName="slide"
        transitionEnterTimeout={250}
        transitionLeaveTimeout={250}
        transitionAppearTimeout={250}
        transitionAppear={true}
        >
        {this.state.current}
      </CSSTransitionGroup>
    </div>);
  }

});
