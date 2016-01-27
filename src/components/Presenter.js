import React from 'react';

export default React.createClass({

  propTypes: {
    slides: React.PropTypes.array.isRequired,
    routerState: React.PropTypes.object.isRequired,
    //ref: React.PropTypes.string.isRequired
  },

  getSlide: function (indices) {
    let slide = this.props.slides.toList()[indices[0]];
    if(indices.length > 1 )
      return slide.props.children.toList()[indices[1]];
    else
      return slide
  },

  render: function () {
    return this.getSlide(this.props.routerState.indices);
  }

});
