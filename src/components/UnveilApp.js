import { Observable } from 'rxjs';
import 'rx-history';

import React from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';

import Slide from './Slide';

import history from '../helpers/History';

import '../lib/Utils';

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
      .map(this.cleanUpPath)
      .distinctUntilChanged()
      .map(this.toKeypair)
      .map(this.toIndices)
      .map(this.toSlide)
      .subscribe(this.route);
  },

  /**
   * in:  "hello/world"
   * out: ["hello", "world"]
   */
  toKeypair: (path) => {
    const [a,b] = path.split("/");
    return [a || 0, b || 0].compact();
  },

  areSlides: function (children) {
    return children.toList()
    .map( (slide) => {
      return Slide.isSlide(slide);
    })
      .reduce( (a,b) => a&&b, true);
  },
  /**
   * in:  ["hello", "world"]
   * out: [1, 3]
   */
  toIndices: function (keypair) {
    let list = this.props.children.toList();
    let [first, children] = this.pathToIndex(keypair[0], list);
    let second;
    if(this.areSlides(children)) {
      [second] = this.pathToIndex(keypair[1], children.toList());
    }
    return [first, second].compact();
  },

  /*
   * Looks up a slide in a list of slides either by
   * index or by named key
   */
  pathToIndex: (key, list) => {
    let n = Number(key);
    let getChildren = (element) => {
      return element.props.children;
    };

    let byKey = (el, index) => {
      if(el.props.name===key)
        return [index, getChildren(el)];
    };

    if(Number.isInteger(n)) {
      return [n, getChildren(list[n])];
    }
    else {
      return list.map(byKey).flatten().compact();
    }
  },

  toSlide: function (indices) {
    let slide = this.props.children.toList()[indices[0]];
    if(indices.length > 1) {
      let children = slide.props.children;
      if(typeof children !== "string") {
        slide = children.toList()[indices[1]];
      }
    }
    return slide;
  },

  route: function (current) {
    this.setState({current});
  },

  render: function () {
    return (<div>
      {this.state.current}
    </div>);

  }

});
