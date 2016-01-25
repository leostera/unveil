import React from 'react';

export default React.createClass({

  getSlide: function (indices) {
    let slide = this.props.slides[indices[0]];
    if(indices.length > 1 )
      return slide.props.children[indices[1]];
    else
      return slide
  },

  render: function () {
    return this.getSlide(this.props.routerState.indices);
  }

});
