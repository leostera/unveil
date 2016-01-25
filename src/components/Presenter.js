import React from 'react';

export default React.createClass({

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
