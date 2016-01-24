import React from 'react';
import ReactDOM from 'react-dom';

import { Subject } from 'rxjs';

export default React.createClass({

  propTypes: {
    navigator: React.PropTypes.object.isRequired
  },

  isValidMotion: function (motion) {
    return this.directions.indexOf(motion) !== -1;
  },

  componentWillMount: function () {
    this.directions = this.props.navigator.getDirectionNames();
    this.clicks = new Subject();
    this.clicks
      .pluck('target', 'id')
      .filter(this.isValidMotion)
      .subscribe(this.props.navigator.move);
  },

  componentWillUnmount: function () {
    this.clicks.complete();
  },

  next: function (e) {
    this.clicks.next(e);
    e.preventDefault();
  },

  buttons: function () {
    let toButton = function (d) {
      const options = {
        "key": m.name,
        "href": '', // @todo add right href here
        "ref": `button-${m.name}`,
        "id": m.name,
        "onClick": this.next,
        "className": m.disabled && 'disabled' || 'enabled'
      };
      return <a {...options}></a>;
    }.bind(this);

    return this.directions.map(toButton);
  },

  render: function () {
    return (<div className="ui-controls">{this.buttons()}</div>);
  }

});
