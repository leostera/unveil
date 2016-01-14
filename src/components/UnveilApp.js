import { Observable } from 'rxjs';
import '../lib/Rx.History';

import React from 'react';

import createHistory from 'history/lib/createHashHistory';
let history = createHistory({
  queryKey: false
});

export default React.createClass({

  cleanUpPath: path => {
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
      .map(this.pathToRoute)
      .map(this.lookupRoute)
      .subscribe(this.route);
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
    return (<div>{this.state.current}</div>);
  }

});
