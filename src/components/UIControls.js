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
    this.motions = this.props.navigator.motionNames;
    this.clicks = new Subject();
    this.clicks
      .pluck('target', 'id')
      .filter(this.isValidMotion)
      .subscribe(this.props.navigator.next);
  },

  componentWillUnmount: function () {
    this.clicks.complete();
  },

  next: function (e) {
    this.clicks.next(e);
    e.preventDefault();
  },

  buttons: function () {
    let toButton = function (m) {
      const options = {
        "key": m,
        "href": '', // @todo add right href here
        "ref": `button-${m}`,
        "id": m,
        "onClick": this.next,
        "className": (this.props.navigator.isPossibleMotion(m) && 'enabled' || 'disabled')
      };
      return <a {...options}></a>;
    }.bind(this);

    return this.motions.map(toButton);
  },

  render: function () {
    return (<div className="ui-controls">{this.buttons()}</div>);
  }

});
