import React from 'react';

import { Observable } from 'rxjs';

export default React.createClass({

  propTypes: {
    navigator: React.PropTypes.object.isRequired
  },

  mappings: {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  },

  getInitialState: () => ({ key: 'none' }),

  componentDidMount: function () {
    Observable.fromEvent(document, 'keyup')
      .pluck('keyCode')
      .map( (code) => this.mappings[code] )
      .filter( (motion) => motion !== undefined )
      .do( function (key) {
        this.setState({key});
      }.bind(this))
      .subscribe(this.props.navigator.move);
  },

  render: function () {
    return (<div></div>);
  }

});
