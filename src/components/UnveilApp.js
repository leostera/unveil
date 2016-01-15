import { Observable } from 'rxjs';
import 'rx-history';

import React from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';

import history from '../helpers/History';

export default React.createClass({

  cleanUpPath: path => {
    if (path[0] === "/") {
      path = path.slice(1)
    }
    return path.trim().replace(' ','-');
  },

  emptyPath: path => (path.length > 0),

  componentWillMount: function () {
    Observable.fromHistory(history)
      .pluck("pathname")
      .startWith("/0")
      .map(this.cleanUpPath)
      .filter(this.emptyPath)
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
    let toChildren = (slide) => (slide.props.children);
    let children = this.props.children;
    if (!Array.isArray(children)) {
      children = [children];
    }
    children = children.filter(byKey(route.key))
      .map(toChildren)
      .reduce( (a,b) => (a.concat(b)), [] );

    if (route.subKey) {
      return children.filter(byKey(route.subKey));
    } else if (typeof children === "String") {
      return children;
    } else {
      return children[0];
    }
  },

  route: function (element) {
    this.setState({current: element});
  },

  render: function () {
    return (<div>
      {this.state.current}
    </div>);

  }

});
