import React from 'react';

import { Observable } from 'rxjs';

export default React.createClass({

  propTypes: {
    navigate: React.PropTypes.func.isRequired
  },

  mappings: {
    37: 'left',
    38: 'up',
    39: 'right',
    30: 'down',
  },

  componentDidMount: function () {
    Observable.fromEvent(document, 'keyup')
      .pluck('keyCode')
      .map( (code) => mappings[code] )
      .filter( (motion) => motion !== undefined )
      .do( function (motion) {
        this.setState({ key: motion });
        console.log(motion);
      });
      .subscribe(this.props.navigate);
  },

  render: function () {
    return (<div>KeyController: {this.state.key}</div>);
  }

});
