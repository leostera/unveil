import React from 'react';

import marked from 'marked';

export default React.createClass({

  componentWillMount: function () {
    let content = this.props.children;
    if(this.props.markdown && !Array.isArray(this.props.children)) {
      content = marked(this.props.children).trim();
    }
    this.setState({content})
  },

  render: function () {
    let opts = {
      id: this.key,
      className: "slide"
    };

    if(this.props.markdown)
      opts.dangerouslySetInnerHTML = {__html: this.state.content };
    else
      opts.children = this.state.content;

    return (<section {...opts} />);
  }

});
