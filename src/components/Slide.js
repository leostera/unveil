import React from 'react';

import marked from 'marked';

export default React.createClass({

  defaults: (overrides) => (Object.assign({
    className: "slide"
  }, overrides)),

  fromMarkdown: function () {
    return marked(this.props.children).trim();
  },

  shouldUseMarkdown: function () {
    return this.props.markdown && !Array.isArray(this.props.children);
  },

  options: function () {
    let opts = {};
    if(this.shouldUseMarkdown())
      opts.dangerouslySetInnerHTML = {__html: this.fromMarkdown()};
    else
      opts.children = this.props.children;
    return this.defaults(opts);
  },

  render: function () {
    return (<section {...this.options()} />);
  }

});
