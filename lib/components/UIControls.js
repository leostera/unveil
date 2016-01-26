'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _rxjs = require('rxjs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _react2.default.createClass({
  displayName: 'UIControls',

  propTypes: {
    navigate: _react2.default.PropTypes.func.isRequired,
    directions: _react2.default.PropTypes.array.isRequired
  },

  isValidMotion: function isValidMotion(motion) {
    return this.motions.indexOf(motion) !== -1;
  },

  componentWillMount: function componentWillMount() {
    this.motions = (0, _keys2.default)(this.props.motions);
    this.clicks = new _rxjs.Subject(), this.clicks.pluck('target', 'id').filter(this.isValidMotion).subscribe(this.props.navigate);
  },

  componentWillUnmount: function componentWillUnmount() {
    this.clicks.complete();
  },

  next: function next(e) {
    this.clicks.next(e);
    e.preventDefault();
  },

  buttons: function buttons() {
    var toButton = function (m) {
      var options = {
        "key": m.name,
        "href": '', // @todo add right href here
        "ref": 'button-' + m.name,
        "id": m.name,
        "onClick": this.next,
        "className": m.disabled && 'disabled' || 'enabled'
      };
      return _react2.default.createElement('a', options);
    }.bind(this);

    var isEnabled = function (m) {
      var _props$motions$m = this.props.motions[m];
      var level = _props$motions$m.level;
      var direction = _props$motions$m.direction;

      var l = this.props.directions[level];
      var disabled = true;
      if (l !== undefined) {
        disabled = !l[direction];
      }
      return {
        disabled: disabled,
        name: m
      };
    }.bind(this);

    return this.motions.map(isEnabled).map(toButton);
  },

  render: function render() {
    return _react2.default.createElement(
      'div',
      { className: 'ui-controls' },
      this.buttons()
    );
  }

});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL1VJQ29udHJvbHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztrQkFLZSxnQkFBTSxXQUFOLENBQWtCOzs7QUFFL0IsYUFBVztBQUNULGNBQVksZ0JBQU0sU0FBTixDQUFnQixJQUFoQixDQUFxQixVQUFyQjtBQUNaLGdCQUFZLGdCQUFNLFNBQU4sQ0FBZ0IsS0FBaEIsQ0FBc0IsVUFBdEI7R0FGZDs7QUFLQSxpQkFBZSx1QkFBVSxNQUFWLEVBQWtCO0FBQy9CLFdBQU8sS0FBSyxPQUFMLENBQWEsT0FBYixDQUFxQixNQUFyQixNQUFpQyxDQUFDLENBQUQsQ0FEVDtHQUFsQjs7QUFJZixzQkFBb0IsOEJBQVk7QUFDOUIsU0FBSyxPQUFMLEdBQWUsb0JBQVksS0FBSyxLQUFMLENBQVcsT0FBWCxDQUEzQixDQUQ4QjtBQUU5QixTQUFLLE1BQUwsR0FBYyxtQkFBZCxFQUNBLEtBQUssTUFBTCxDQUNHLEtBREgsQ0FDUyxRQURULEVBQ21CLElBRG5CLEVBRUcsTUFGSCxDQUVVLEtBQUssYUFBTCxDQUZWLENBR0csU0FISCxDQUdhLEtBQUssS0FBTCxDQUFXLFFBQVgsQ0FKYixDQUY4QjtHQUFaOztBQVNwQix3QkFBc0IsZ0NBQVk7QUFDaEMsU0FBSyxNQUFMLENBQVksUUFBWixHQURnQztHQUFaOztBQUl0QixRQUFNLGNBQVUsQ0FBVixFQUFhO0FBQ2pCLFNBQUssTUFBTCxDQUFZLElBQVosQ0FBaUIsQ0FBakIsRUFEaUI7QUFFakIsTUFBRSxjQUFGLEdBRmlCO0dBQWI7O0FBS04sV0FBUyxtQkFBWTtBQUNuQixRQUFJLFdBQVcsVUFBVSxDQUFWLEVBQWE7QUFDMUIsVUFBTSxVQUFVO0FBQ2QsZUFBTyxFQUFFLElBQUY7QUFDUCxnQkFBUSxFQUFSO0FBQ0EsMkJBQWlCLEVBQUUsSUFBRjtBQUNqQixjQUFNLEVBQUUsSUFBRjtBQUNOLG1CQUFXLEtBQUssSUFBTDtBQUNYLHFCQUFhLEVBQUUsUUFBRixJQUFjLFVBQWQsSUFBNEIsU0FBNUI7T0FOVCxDQURvQjtBQVMxQixhQUFPLG1DQUFPLE9BQVAsQ0FBUCxDQVQwQjtLQUFiLENBVWIsSUFWYSxDQVVSLElBVlEsQ0FBWCxDQURlOztBQWFuQixRQUFJLFlBQVksVUFBVSxDQUFWLEVBQWE7NkJBQ0YsS0FBSyxLQUFMLENBQVcsT0FBWCxDQUFtQixDQUFuQixFQURFO1VBQ3RCLCtCQURzQjtVQUNmLHVDQURlOztBQUUzQixVQUFJLElBQUksS0FBSyxLQUFMLENBQVcsVUFBWCxDQUFzQixLQUF0QixDQUFKLENBRnVCO0FBRzNCLFVBQUksV0FBVyxJQUFYLENBSHVCO0FBSTNCLFVBQUcsTUFBTSxTQUFOLEVBQWlCO0FBQ2xCLG1CQUFXLENBQUMsRUFBRSxTQUFGLENBQUQsQ0FETztPQUFwQjtBQUdBLGFBQU87QUFDTCwwQkFESztBQUVMLGNBQU0sQ0FBTjtPQUZGLENBUDJCO0tBQWIsQ0FXZCxJQVhjLENBV1QsSUFYUyxDQUFaLENBYmU7O0FBMEJuQixXQUFPLEtBQUssT0FBTCxDQUFhLEdBQWIsQ0FBaUIsU0FBakIsRUFBNEIsR0FBNUIsQ0FBZ0MsUUFBaEMsQ0FBUCxDQTFCbUI7R0FBWjs7QUE2QlQsVUFBUSxrQkFBWTtBQUNsQixXQUFROztRQUFLLFdBQVUsYUFBVixFQUFMO01BQThCLEtBQUssT0FBTCxFQUE5QjtLQUFSLENBRGtCO0dBQVo7O0NBMURLIiwiZmlsZSI6IlVJQ29udHJvbHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5cbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuZXhwb3J0IGRlZmF1bHQgUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXG4gIHByb3BUeXBlczoge1xuICAgIG5hdmlnYXRlOiAgIFJlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgZGlyZWN0aW9uczogUmVhY3QuUHJvcFR5cGVzLmFycmF5LmlzUmVxdWlyZWRcbiAgfSxcblxuICBpc1ZhbGlkTW90aW9uOiBmdW5jdGlvbiAobW90aW9uKSB7XG4gICAgcmV0dXJuIHRoaXMubW90aW9ucy5pbmRleE9mKG1vdGlvbikgIT09IC0xO1xuICB9LFxuXG4gIGNvbXBvbmVudFdpbGxNb3VudDogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMubW90aW9ucyA9IE9iamVjdC5rZXlzKHRoaXMucHJvcHMubW90aW9ucyk7XG4gICAgdGhpcy5jbGlja3MgPSBuZXcgU3ViamVjdCgpLFxuICAgIHRoaXMuY2xpY2tzXG4gICAgICAucGx1Y2soJ3RhcmdldCcsICdpZCcpXG4gICAgICAuZmlsdGVyKHRoaXMuaXNWYWxpZE1vdGlvbilcbiAgICAgIC5zdWJzY3JpYmUodGhpcy5wcm9wcy5uYXZpZ2F0ZSk7XG4gIH0sXG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQ6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmNsaWNrcy5jb21wbGV0ZSgpO1xuICB9LFxuXG4gIG5leHQ6IGZ1bmN0aW9uIChlKSB7XG4gICAgdGhpcy5jbGlja3MubmV4dChlKTtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIH0sXG5cbiAgYnV0dG9uczogZnVuY3Rpb24gKCkge1xuICAgIGxldCB0b0J1dHRvbiA9IGZ1bmN0aW9uIChtKSB7XG4gICAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICBcImtleVwiOiBtLm5hbWUsXG4gICAgICAgIFwiaHJlZlwiOiAnJywgLy8gQHRvZG8gYWRkIHJpZ2h0IGhyZWYgaGVyZVxuICAgICAgICBcInJlZlwiOiBgYnV0dG9uLSR7bS5uYW1lfWAsXG4gICAgICAgIFwiaWRcIjogbS5uYW1lLFxuICAgICAgICBcIm9uQ2xpY2tcIjogdGhpcy5uZXh0LFxuICAgICAgICBcImNsYXNzTmFtZVwiOiBtLmRpc2FibGVkICYmICdkaXNhYmxlZCcgfHwgJ2VuYWJsZWQnXG4gICAgICB9O1xuICAgICAgcmV0dXJuIDxhIHsuLi5vcHRpb25zfT48L2E+O1xuICAgIH0uYmluZCh0aGlzKTtcblxuICAgIGxldCBpc0VuYWJsZWQgPSBmdW5jdGlvbiAobSkge1xuICAgICAgbGV0IHtsZXZlbCwgZGlyZWN0aW9ufSA9IHRoaXMucHJvcHMubW90aW9uc1ttXTtcbiAgICAgIGxldCBsID0gdGhpcy5wcm9wcy5kaXJlY3Rpb25zW2xldmVsXTtcbiAgICAgIGxldCBkaXNhYmxlZCA9IHRydWU7XG4gICAgICBpZihsICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgZGlzYWJsZWQgPSAhbFtkaXJlY3Rpb25dO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgZGlzYWJsZWQsXG4gICAgICAgIG5hbWU6IG1cbiAgICAgIH07XG4gICAgfS5iaW5kKHRoaXMpO1xuXG4gICAgcmV0dXJuIHRoaXMubW90aW9ucy5tYXAoaXNFbmFibGVkKS5tYXAodG9CdXR0b24pO1xuICB9LFxuXG4gIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiAoPGRpdiBjbGFzc05hbWU9XCJ1aS1jb250cm9sc1wiPnt0aGlzLmJ1dHRvbnMoKX08L2Rpdj4pO1xuICB9XG5cbn0pO1xuIl19