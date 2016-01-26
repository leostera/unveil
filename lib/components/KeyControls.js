'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _rxjs = require('rxjs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _react2.default.createClass({
  displayName: 'KeyControls',

  propTypes: {
    navigate: _react2.default.PropTypes.func.isRequired
  },

  mappings: {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  },

  getInitialState: function getInitialState() {
    return { key: 'none' };
  },

  componentDidMount: function componentDidMount() {
    var _this = this;

    _rxjs.Observable.fromEvent(document, 'keyup').pluck('keyCode').map(function (code) {
      return _this.mappings[code];
    }).filter(function (motion) {
      return motion !== undefined;
    }).do(function (key) {
      this.setState({ key: key });
    }.bind(this)).subscribe(this.props.navigate);
  },

  render: function render() {
    return _react2.default.createElement('div', null);
  }

});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL0tleUNvbnRyb2xzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O2tCQUllLGdCQUFNLFdBQU4sQ0FBa0I7OztBQUUvQixhQUFXO0FBQ1QsY0FBVSxnQkFBTSxTQUFOLENBQWdCLElBQWhCLENBQXFCLFVBQXJCO0dBRFo7O0FBSUEsWUFBVTtBQUNSLFFBQUksTUFBSjtBQUNBLFFBQUksSUFBSjtBQUNBLFFBQUksT0FBSjtBQUNBLFFBQUksTUFBSjtHQUpGOztBQU9BLG1CQUFpQjtXQUFPLEVBQUUsS0FBSyxNQUFMO0dBQVQ7O0FBRWpCLHFCQUFtQiw2QkFBWTs7O0FBQzdCLHFCQUFXLFNBQVgsQ0FBcUIsUUFBckIsRUFBK0IsT0FBL0IsRUFDRyxLQURILENBQ1MsU0FEVCxFQUVHLEdBRkgsQ0FFUSxVQUFDLElBQUQ7YUFBVSxNQUFLLFFBQUwsQ0FBYyxJQUFkO0tBQVYsQ0FGUixDQUdHLE1BSEgsQ0FHVyxVQUFDLE1BQUQ7YUFBWSxXQUFXLFNBQVg7S0FBWixDQUhYLENBSUcsRUFKSCxDQUlPLFVBQVUsR0FBVixFQUFlO0FBQ2xCLFdBQUssUUFBTCxDQUFjLEVBQUMsUUFBRCxFQUFkLEVBRGtCO0tBQWYsQ0FFSCxJQUZHLENBRUUsSUFGRixDQUpQLEVBT0csU0FQSCxDQU9hLEtBQUssS0FBTCxDQUFXLFFBQVgsQ0FQYixDQUQ2QjtHQUFaOztBQVduQixVQUFRLGtCQUFZO0FBQ2xCLFdBQVEsMENBQVIsQ0FEa0I7R0FBWjs7Q0ExQksiLCJmaWxlIjoiS2V5Q29udHJvbHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5cbmV4cG9ydCBkZWZhdWx0IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblxuICBwcm9wVHlwZXM6IHtcbiAgICBuYXZpZ2F0ZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZFxuICB9LFxuXG4gIG1hcHBpbmdzOiB7XG4gICAgMzc6ICdsZWZ0JyxcbiAgICAzODogJ3VwJyxcbiAgICAzOTogJ3JpZ2h0JyxcbiAgICA0MDogJ2Rvd24nLFxuICB9LFxuXG4gIGdldEluaXRpYWxTdGF0ZTogKCkgPT4gKHsga2V5OiAnbm9uZScgfSksXG5cbiAgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uICgpIHtcbiAgICBPYnNlcnZhYmxlLmZyb21FdmVudChkb2N1bWVudCwgJ2tleXVwJylcbiAgICAgIC5wbHVjaygna2V5Q29kZScpXG4gICAgICAubWFwKCAoY29kZSkgPT4gdGhpcy5tYXBwaW5nc1tjb2RlXSApXG4gICAgICAuZmlsdGVyKCAobW90aW9uKSA9PiBtb3Rpb24gIT09IHVuZGVmaW5lZCApXG4gICAgICAuZG8oIGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7a2V5fSk7XG4gICAgICB9LmJpbmQodGhpcykpXG4gICAgICAuc3Vic2NyaWJlKHRoaXMucHJvcHMubmF2aWdhdGUpO1xuICB9LFxuXG4gIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiAoPGRpdj48L2Rpdj4pO1xuICB9XG5cbn0pO1xuIl19