import React from 'react';

import TransitionGroup from 'react-addons-css-transition-group';

import '../lib/Utils';

export default React.createClass({

  propTypes: {
    slides: React.PropTypes.array.isRequired,
    routerState: React.PropTypes.object.isRequired
  },

  getSlide: function (indices) {
    let slide = this.props.slides.toList()[indices[0]];
    if(indices.length > 1 )
      return slide.props.children.toList()[indices[1]];
    else
      return slide
  },

  render: function () {
    let slide = this.getSlide(this.props.routerState.indices);
    let opts = {
      transitionName: "slide-fade",
      transitionAppear: true,
      transitionAppearTimeout: 1,
      transitionEnterTimeout: 500,
      transitionLeaveTimeout: 120,
    };
    return React.createElement(TransitionGroup, opts, slide);
  }

});
