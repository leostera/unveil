'use strict';

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _rxjs = require('rxjs');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _marked = require('marked');

var _marked2 = _interopRequireDefault(_marked);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _react2.default.createClass({
  displayName: 'Slide',

  scale: 1,

  propTypes: {
    name: _react2.default.PropTypes.string
  },

  statics: {
    isSlide: function isSlide(e) {
      return _react2.default.isValidElement(e) && e.type.displayName === 'Slide';
    }
  },

  defaults: function defaults(overrides) {
    return (0, _assign2.default)({
      className: 'slide-content'
    }, overrides);
  },

  fromMarkdown: function fromMarkdown() {
    return (0, _marked2.default)(this.props.children).trim();
  },

  shouldUseMarkdown: function shouldUseMarkdown() {
    return this.props.markdown && !Array.isArray(this.props.children);
  },

  componentDidUpdate: function componentDidUpdate() {
    var scale = this.getScale();
    if (this.scale !== scale) {
      this.scale = scale;
      this.forceUpdate();
    }
  },

  getScale: function getScale() {
    var verticalScale = this.refs['slide-container'].offsetHeight / this.refs.slide.offsetHeight;
    var horizontalScale = this.refs['slide-container'].offsetWidth / this.refs.slide.offsetWidth;
    var scale = Math.min(verticalScale, horizontalScale);
    return scale > 1 && 1 || scale;
  },

  componentDidMount: function componentDidMount() {
    ['load', 'resize'].forEach(function (event) {
      _rxjs.Observable.fromEvent(window, event).subscribe(function () {
        this.scale = this.getScale();
        this.forceUpdate();
      }.bind(this));
    }.bind(this));
  },

  options: function options() {
    var opts = {
      ref: 'slide',
      id: this.props.name || "",
      style: {
        transform: 'translate(-50%, -50%) scale(' + this.scale + ')'
      }
    };
    if (this.shouldUseMarkdown()) opts.dangerouslySetInnerHTML = { __html: this.fromMarkdown() };else opts.children = this.props.children;
    return this.defaults(opts);
  },

  render: function render() {
    return _react2.default.createElement(
      'section',
      { ref: 'slide-container', className: 'slide' },
      _react2.default.createElement('section', this.options())
    );
  }

});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL1NsaWRlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7a0JBTWUsZ0JBQU0sV0FBTixDQUFrQjs7O0FBRS9CLFNBQU8sQ0FBUDs7QUFFQSxhQUFXO0FBQ1QsVUFBTSxnQkFBTSxTQUFOLENBQWdCLE1BQWhCO0dBRFI7O0FBSUEsV0FBUztBQUNQLGFBQVMsaUJBQVUsQ0FBVixFQUFhO0FBQ3BCLGFBQU8sZ0JBQU0sY0FBTixDQUFxQixDQUFyQixLQUEyQixFQUFFLElBQUYsQ0FBTyxXQUFQLEtBQXVCLE9BQXZCLENBRGQ7S0FBYjtHQURYOztBQU1BLFlBQVUsa0JBQUMsU0FBRDtXQUFnQixzQkFBYztBQUN0QyxpQkFBVyxlQUFYO0tBRHdCLEVBRXZCLFNBRnVCO0dBQWhCOztBQUlWLGdCQUFjLHdCQUFZO0FBQ3hCLFdBQU8sc0JBQU8sS0FBSyxLQUFMLENBQVcsUUFBWCxDQUFQLENBQTRCLElBQTVCLEVBQVAsQ0FEd0I7R0FBWjs7QUFJZCxxQkFBbUIsNkJBQVk7QUFDN0IsV0FBTyxLQUFLLEtBQUwsQ0FBVyxRQUFYLElBQXVCLENBQUMsTUFBTSxPQUFOLENBQWMsS0FBSyxLQUFMLENBQVcsUUFBWCxDQUFmLENBREQ7R0FBWjs7QUFJbkIsc0JBQW9CLDhCQUFZO0FBQzlCLFFBQUksUUFBUSxLQUFLLFFBQUwsRUFBUixDQUQwQjtBQUU5QixRQUFHLEtBQUssS0FBTCxLQUFlLEtBQWYsRUFBc0I7QUFDdkIsV0FBSyxLQUFMLEdBQWEsS0FBYixDQUR1QjtBQUV2QixXQUFLLFdBQUwsR0FGdUI7S0FBekI7R0FGa0I7O0FBUXBCLFlBQVUsb0JBQVk7QUFDcEIsUUFBSSxnQkFBa0IsS0FBSyxJQUFMLENBQVUsaUJBQVYsRUFBNkIsWUFBN0IsR0FBNEMsS0FBSyxJQUFMLENBQVUsS0FBVixDQUFnQixZQUFoQixDQUQ5QztBQUVwQixRQUFJLGtCQUFrQixLQUFLLElBQUwsQ0FBVSxpQkFBVixFQUE2QixXQUE3QixHQUE0QyxLQUFLLElBQUwsQ0FBVSxLQUFWLENBQWdCLFdBQWhCLENBRjlDO0FBR3BCLFFBQUksUUFBUSxLQUFLLEdBQUwsQ0FBUyxhQUFULEVBQXdCLGVBQXhCLENBQVIsQ0FIZ0I7QUFJcEIsV0FBTyxRQUFRLENBQVIsSUFBYSxDQUFiLElBQWtCLEtBQWxCLENBSmE7R0FBWjs7QUFPVixxQkFBbUIsNkJBQVk7QUFDN0IsS0FBQyxNQUFELEVBQVMsUUFBVCxFQUFtQixPQUFuQixDQUE0QixVQUFVLEtBQVYsRUFBaUI7QUFDM0MsdUJBQVcsU0FBWCxDQUFxQixNQUFyQixFQUE2QixLQUE3QixFQUNDLFNBREQsQ0FDWSxZQUFZO0FBQ3RCLGFBQUssS0FBTCxHQUFhLEtBQUssUUFBTCxFQUFiLENBRHNCO0FBRXRCLGFBQUssV0FBTCxHQUZzQjtPQUFaLENBR1YsSUFIVSxDQUdMLElBSEssQ0FEWixFQUQyQztLQUFqQixDQU0xQixJQU4wQixDQU1yQixJQU5xQixDQUE1QixFQUQ2QjtHQUFaOztBQVVuQixXQUFTLG1CQUFZO0FBQ25CLFFBQUksT0FBTztBQUNULFdBQUssT0FBTDtBQUNBLFVBQUksS0FBSyxLQUFMLENBQVcsSUFBWCxJQUFtQixFQUFuQjtBQUNKLGFBQU87QUFDTCxvREFBMEMsS0FBSyxLQUFMLE1BQTFDO09BREY7S0FIRSxDQURlO0FBUW5CLFFBQUcsS0FBSyxpQkFBTCxFQUFILEVBQ0UsS0FBSyx1QkFBTCxHQUErQixFQUFDLFFBQVEsS0FBSyxZQUFMLEVBQVIsRUFBaEMsQ0FERixLQUdFLEtBQUssUUFBTCxHQUFnQixLQUFLLEtBQUwsQ0FBVyxRQUFYLENBSGxCO0FBSUEsV0FBTyxLQUFLLFFBQUwsQ0FBYyxJQUFkLENBQVAsQ0FabUI7R0FBWjs7QUFlVCxVQUFRLGtCQUFZO0FBQ2xCLFdBQVE7O1FBQVMsS0FBSSxpQkFBSixFQUFzQixXQUFVLE9BQVYsRUFBL0I7TUFDTix5Q0FBYSxLQUFLLE9BQUwsRUFBYixDQURNO0tBQVIsQ0FEa0I7R0FBWjs7Q0FsRUsiLCJmaWxlIjoiU2xpZGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCBtYXJrZWQgZnJvbSAnbWFya2VkJztcblxuZXhwb3J0IGRlZmF1bHQgUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXG4gIHNjYWxlOiAxLFxuXG4gIHByb3BUeXBlczoge1xuICAgIG5hbWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmdcbiAgfSxcblxuICBzdGF0aWNzOiB7XG4gICAgaXNTbGlkZTogZnVuY3Rpb24gKGUpIHtcbiAgICAgIHJldHVybiBSZWFjdC5pc1ZhbGlkRWxlbWVudChlKSAmJiBlLnR5cGUuZGlzcGxheU5hbWUgPT09ICdTbGlkZSc7XG4gICAgfVxuICB9LFxuXG4gIGRlZmF1bHRzOiAob3ZlcnJpZGVzKSA9PiAoT2JqZWN0LmFzc2lnbih7XG4gICAgY2xhc3NOYW1lOiAnc2xpZGUtY29udGVudCdcbiAgfSwgb3ZlcnJpZGVzKSksXG5cbiAgZnJvbU1hcmtkb3duOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIG1hcmtlZCh0aGlzLnByb3BzLmNoaWxkcmVuKS50cmltKCk7XG4gIH0sXG5cbiAgc2hvdWxkVXNlTWFya2Rvd246IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5wcm9wcy5tYXJrZG93biAmJiAhQXJyYXkuaXNBcnJheSh0aGlzLnByb3BzLmNoaWxkcmVuKTtcbiAgfSxcblxuICBjb21wb25lbnREaWRVcGRhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgc2NhbGUgPSB0aGlzLmdldFNjYWxlKCk7XG4gICAgaWYodGhpcy5zY2FsZSAhPT0gc2NhbGUpIHtcbiAgICAgIHRoaXMuc2NhbGUgPSBzY2FsZTtcbiAgICAgIHRoaXMuZm9yY2VVcGRhdGUoKTtcbiAgICB9XG4gIH0sXG5cbiAgZ2V0U2NhbGU6IGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgdmVydGljYWxTY2FsZSAgID0gdGhpcy5yZWZzWydzbGlkZS1jb250YWluZXInXS5vZmZzZXRIZWlnaHQgLyB0aGlzLnJlZnMuc2xpZGUub2Zmc2V0SGVpZ2h0O1xuICAgIGxldCBob3Jpem9udGFsU2NhbGUgPSB0aGlzLnJlZnNbJ3NsaWRlLWNvbnRhaW5lciddLm9mZnNldFdpZHRoICAvIHRoaXMucmVmcy5zbGlkZS5vZmZzZXRXaWR0aDtcbiAgICBsZXQgc2NhbGUgPSBNYXRoLm1pbih2ZXJ0aWNhbFNjYWxlLCBob3Jpem9udGFsU2NhbGUpO1xuICAgIHJldHVybiBzY2FsZSA+IDEgJiYgMSB8fCBzY2FsZTtcbiAgfSxcblxuICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24gKCkge1xuICAgIFsnbG9hZCcsICdyZXNpemUnXS5mb3JFYWNoKCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIE9ic2VydmFibGUuZnJvbUV2ZW50KHdpbmRvdywgZXZlbnQpXG4gICAgICAuc3Vic2NyaWJlKCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuc2NhbGUgPSB0aGlzLmdldFNjYWxlKCk7XG4gICAgICAgIHRoaXMuZm9yY2VVcGRhdGUoKTtcbiAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgfS5iaW5kKHRoaXMpKTtcbiAgfSxcblxuICBvcHRpb25zOiBmdW5jdGlvbiAoKSB7XG4gICAgbGV0IG9wdHMgPSB7XG4gICAgICByZWY6ICdzbGlkZScsXG4gICAgICBpZDogdGhpcy5wcm9wcy5uYW1lIHx8IFwiXCIsXG4gICAgICBzdHlsZToge1xuICAgICAgICB0cmFuc2Zvcm06IGB0cmFuc2xhdGUoLTUwJSwgLTUwJSkgc2NhbGUoJHt0aGlzLnNjYWxlfSlgXG4gICAgICB9XG4gICAgfTtcbiAgICBpZih0aGlzLnNob3VsZFVzZU1hcmtkb3duKCkpXG4gICAgICBvcHRzLmRhbmdlcm91c2x5U2V0SW5uZXJIVE1MID0ge19faHRtbDogdGhpcy5mcm9tTWFya2Rvd24oKX07XG4gICAgZWxzZVxuICAgICAgb3B0cy5jaGlsZHJlbiA9IHRoaXMucHJvcHMuY2hpbGRyZW47XG4gICAgcmV0dXJuIHRoaXMuZGVmYXVsdHMob3B0cyk7XG4gIH0sXG5cbiAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuICg8c2VjdGlvbiByZWY9XCJzbGlkZS1jb250YWluZXJcIiBjbGFzc05hbWU9XCJzbGlkZVwiPlxuICAgICAgPHNlY3Rpb24gey4uLnRoaXMub3B0aW9ucygpfSAvPlxuICAgIDwvc2VjdGlvbj4pO1xuICB9XG5cbn0pO1xuIl19