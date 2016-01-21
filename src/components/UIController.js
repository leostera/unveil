import React from 'react';
import ReactDOM from 'react-dom';

import { Observable } from 'rxjs';

export default React.createClass({

  propTypes: {
    navigate:   React.PropTypes.func.isRequired,
    directions: React.PropTypes.array.isRequired
  },

  node: function () {
    return ReactDOM.findDOMNode(this);
  },

  motions: ['left', 'up', 'down', 'right'],

  componentDidMount: function () {
    let motions = this.motions;
    Observable.fromEvent(this.node(), 'mouseup')
      .pluck('target', 'id')
      .filter( (id) => motions.indexOf(id) !== -1 )
      .subscribe(this.props.navigate);
  },

  render: function () {
    let toButton = (m) => <button key={m} id={m}> {m} </button>
    let buttons  = this.motions.map(toButton);
    return (<div>{buttons}</div>);
  }

});
