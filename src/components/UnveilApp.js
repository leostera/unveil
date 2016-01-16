import { Observable } from 'rxjs';
import 'rx-history';

import React from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';

import Slide from './Slide';

import history from '../helpers/History';

import '../lib/Utils';

export default React.createClass({

  history: {},

  cleanUpPath: path => {
    if (path[0] === "/") {
      path = path.slice(1)
    }
    return path.trim().replace(' ','-');
  },

  emptyPath: path => (path.length > 0),

  componentWillMount: function () {
    this.history = this.props.history || history;

    let outAction = (action) => {
      return (e) => e.action !== action;
    };

    Observable.fromHistory(this.history)
      .filter(outAction("REPLACE"))
      .pluck("pathname")
      .map(this.cleanUpPath)
      .distinctUntilChanged()
      .map(this.toKeypair)
      .map(this.toIndices)
      .distinctUntilChanged()
      .do(this.replaceUri)
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
      .map(Slide.isSlide)
      .reduce( (a,b) => (a&&b), true );
  },

  /**
   * in:  ["hello", "world"]
   * out: [1, 3]
   */
  toIndices: function (keypair) {
    let list = this.props.children.toList();
    let first = this.pathToIndex(keypair[0], list) || 0;
    let second;
    let slide = this.getSlide(first, list);
    if(slide && this.areSlides(slide.props.children)) {
      second = this.pathToIndex(keypair[1], slide.props.children) || 0;
    }
    return [first, second].compact();
  },

  /*
   * Looks up a slide in a list of slides either by
   * index or by named key
   */
  pathToIndex: (key, list) => {
    let n = Number(key);
    if(Number.isInteger(n)) {
       return n < list.length && n || false;
    }

    let byKey = (el, index) => {
      if(el.props.name === key) return index;
    }

    return list.map(byKey).compact().pop();
  },

  getSlide: function(index, children) {
    if (typeof children !== "string") {
      return children.toList()[index];
    }
  },

  toSlide: function (indices) {
    let slide = this.getSlide(indices[0], this.props.children);
    if(indices.length > 1) {
      let subSlide = this.getSlide(indices[1], slide.props.children);
      if(subSlide) {
        slide = subSlide
      }
    }
    return slide;
  },

  getSlideName: function(slide) {
    if (slide && slide.props.name) {
      return slide.props.name;
    }
  },

  replaceUri: function (indices) {
    let slide = this.getSlide(indices[0], this.props.children);
    let subSlide = this.getSlide(indices[1], slide.props.children);

    let uri = '/' + [
        this.getSlideName(slide) || indices[0],
        this.getSlideName(subSlide) || indices[1]
      ].compact().join('/');

    this.history.replace(uri);
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
