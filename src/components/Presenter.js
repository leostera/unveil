import React from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';

export default React.createClass({

  render: function () {
    return (<div>
      <CSSTransitionGroup {..params}>
        {this.props.currentSlide}
    </CSSTransitionGroup>
    </div>);
  }

});
