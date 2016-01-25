import { Observable } from 'rxjs';

import React from 'react';
import ReactDOM from 'react-dom';

import marked from 'marked';

export default React.createClass({

  propTypes: {
    name: React.PropTypes.string
  },

  statics: {
    isSlide: function (e) {
      return React.isValidElement(e) && e.type.displayName === 'Slide';
    }
  },

  defaults: (overrides) => (Object.assign({
    className: 'slide-content'
  }, overrides)),

  fromMarkdown: function () {
    return marked(this.props.children).trim();
  },

  shouldUseMarkdown: function () {
    return this.props.markdown && !Array.isArray(this.props.children);
  },

  getInitialState: function () {
    return { scale: 1 };
  },

  getScale: function () {
    let verticalScale   = this.refs['slide-container'].offsetHeight / this.refs.slide.offsetHeight;
    let horizontalScale = this.refs['slide-container'].offsetWidth  / this.refs.slide.offsetWidth;
    return Math.min(verticalScale, horizontalScale);
  },

  componentDidMount: function () {
    ['load', 'resize'].forEach( function (event) {
      Observable.fromEvent(window, event)
      .subscribe( function () {
        this.setState({scale: this.getScale()});
      }.bind(this));
    }.bind(this));
  },

  options: function () {
    let opts = {
      ref: 'slide',
      id: this.props.name || "",
      style: {
        transform: `translate(-50%, -50%) scale(${this.state.scale})`
      }
    };
    if(this.shouldUseMarkdown())
      opts.dangerouslySetInnerHTML = {__html: this.fromMarkdown()};
    else
      opts.children = this.props.children;
    return this.defaults(opts);
  },

  render: function () {
    return (<section ref="slide-container" className="slide">
      <section {...this.options()} />
    </section>);
  }

});
