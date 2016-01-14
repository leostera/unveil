import React from 'react';

import marked from 'marked';

export default React.createClass({

  subslides: [],

  componentWillMount: function () {
    this.subslides = this.getChildren().filter(this.isSlide);
    let content;
    if(this.hasSubSlides()) {
      // @todo: take slide id/name from url
      // @todo: just take the slide's content
      content = this.getSubSlide(0);
    } else {
      content = this.getChildren();
    }
    this.setState({content})
  },

  render: function () {
    return (
      <section>
        {this.state.content}
      </section>
    );
  },

  getChildren: function () {
    let c = this.props.children;
    return Array.isArray(c) ? c : [c];
  },

  getSubSlide: function (i) {
    return this.subslides[i];
  },

  hasSubSlides: function () {
    return this.subslides.length > 0;
  },

  isSlide: (el) => (el.type && el.type.displayName && el.type.displayName === "Slide")

});
