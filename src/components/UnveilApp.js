import { Observable } from 'rxjs';
import fromHistory from '../lib/Rx.History';
Observable.fromHistory = fromHistory;

import React from 'react';
import createHistory from 'history/lib/createHashHistory';

let history = createHistory();

export default React.createClass({

  componentWillMount: function () {
    Observable.fromHistory(history)
      .pluck("pathname")
      .subscribe(this.setPath);
  },

  setPath: function (path) {
    this.setState({path});
  },

  render: function () {
    return (
      <div>
        Hello {this.state.path}
      </div>
    );
  }

});
