import { Observable } from 'rxjs';
import fromHistory from '../lib/Rx.History';
Observable.fromHistory = fromHistory;

import React from 'react';

import createHistory from 'history/lib/createHashHistory';
let history = createHistory({
  queryKey: false
});

export default React.createClass({

  cleanUpPath:  path => {
    if (path[0] === "/") {
      path = path.slice(1)
    }
    return path.trim().replace(' ','-');
  },

  componentWillMount: function () {
    Observable.fromHistory(history)
      .pluck("pathname")
      .map(this.cleanUpPath)
      .distinctUntilChanged()
      .subscribe(this.route);
  },

  route: function (path) {
    const [slide, subslide] = path.split("/");
    //@todo: make a mixin to get children's always as list
    let children = this.props.children
      .filter(this.byName(slide));

    if(children.length > 1) {
      throw Error("There can't be two Slides with the same key");
    }

    let current = children[0];
    if(subslide && Array.isArray(current.props.children) ) {
      current = children[0].props.children.filter(this.byName(subslide));
    }

    this.setState({current});
  },

  byName: (slide) => {
    return (child) => (child.key === slide);
  },

  render: function () {
    return (<div>{this.state.current}</div>);
  }

});
