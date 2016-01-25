import { Observable } from 'rxjs';

import React from 'react';

import marked from 'marked';

export default React.createClass({

  scale: 1,

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

  componentDidUpdate: function () {
    let scale = this.getScale();
    if(this.scale !== scale) {
      this.scale = scale;
      this.forceUpdate();
    }
  },

  getScale: function () {
    let verticalScale   = this.refs['slide-container'].offsetHeight / this.refs.slide.offsetHeight;
    let horizontalScale = this.refs['slide-container'].offsetWidth  / this.refs.slide.offsetWidth;
    let scale = Math.min(verticalScale, horizontalScale);
    return scale > 1 && 1 || scale;
  },

  componentDidMount: function () {
    ['load', 'resize'].forEach( function (event) {
      Observable.fromEvent(window, event)
      .subscribe( function () {
        this.scale = this.getScale();
        this.forceUpdate();
      }.bind(this));
    }.bind(this));
  },

  options: function () {
    let opts = {
      ref: 'slide',
      id: this.props.name || "",
      style: {
        transform: `translate(-50%, -50%) scale(${this.scale})`
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
