import React from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';

import marked from 'marked';

export default React.createClass({

  componentWillMount: function () {
    let content;
    if(Array.isArray(this.props.children)) {
      content = this.props.children;
    } else {
      let markup = marked(this.props.children);
      content = <div dangerouslySetInnerHTML={{__html: markup }} />
    }
    this.setState({content})
  },

  render: function () {
    return (
      <section id={this.key} className="slide">
        {this.state.content}
      </section>
    );
  }

});
