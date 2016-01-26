'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _rxjs = require('rxjs');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Slide = require('./Slide');

var _Slide2 = _interopRequireDefault(_Slide);

var _Presenter = require('./Presenter');

var _Presenter2 = _interopRequireDefault(_Presenter);

var _KeyControls = require('./KeyControls');

var _KeyControls2 = _interopRequireDefault(_KeyControls);

var _UIControls = require('./UIControls');

var _UIControls2 = _interopRequireDefault(_UIControls);

var _Navigator = require('./Navigator');

var _Navigator2 = _interopRequireDefault(_Navigator);

var _Router = require('./Router');

var _Router2 = _interopRequireDefault(_Router);

var _History = require('../helpers/History');

var _History2 = _interopRequireDefault(_History);

require('../lib/Utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _react2.default.createClass({
  displayName: 'UnveilApp',

  /*
   * Recursively build a route map from all the slides.
   */
  buildMap: function buildMap(nodes) {
    var _this = this;

    return nodes.map(function (slide, index) {
      if (_Slide2.default.isSlide(slide)) {
        var entry = {
          index: index,
          name: slide.props.name || false
        };

        if (_this.areSlides(slide.props.children)) entry.children = _this.buildMap(slide.props.children.toList());

        return entry;
      }
    }).compact();
  },

  componentWillMount: function componentWillMount() {
    this.controls = this.props.controls || [_UIControls2.default, _KeyControls2.default];
    this.history = this.props.history || _History2.default;
    this.slides = this.props.children;
    this.map = this.buildMap(this.slides);

    this.navigator = (0, _Navigator2.default)();

    this.routerState = { directions: [] };
    this.router = (0, _Router2.default)({
      map: this.map,
      history: this.history,
      navigator: this.navigator
    });

    this.router.asObservable().subscribe(this.updateState);

    this.navigator.asObservable().filter(this.isValidMotion).map(this.toLevelAndDirection).map(this.toState).filter(this.isValidState).subscribe(this.router.go);

    this.router.start();
  },

  motions: {
    left: { level: 0, direction: 'previous' },
    up: { level: 1, direction: 'previous' },
    right: { level: 0, direction: 'next' },
    down: { level: 1, direction: 'next' }
  },
  isValidMotion: function isValidMotion(motion) {
    return (0, _keys2.default)(this.motions).indexOf(motion.toLowerCase()) !== -1;
  },
  isValidState: function isValidState(state) {
    return Array.isArray(state);
  },
  toLevelAndDirection: function toLevelAndDirection(motion) {
    return this.motions[motion];
  },
  toState: function toState(motion) {
    var level = this.routerState.directions[motion.level];
    return level && level[motion.direction];
  },

  getInitialState: function getInitialState() {
    var _this2 = this;

    var getFirstChildIfSlides = function getFirstChildIfSlides(slide) {
      if (!_this2.areSlides(slide.props.children)) {
        return slide;
      } else {
        getFirstChildIfSlides(slide.props.children[0]);
      }
    };

    return {
      currentSlide: getFirstChildIfSlides(this.props.children[0])
    };
  },

  updateState: function updateState(s) {
    this.routerState = s;
    this.setState({ currentSlide: this.getSlide(s.indices) });
  },

  getSlide: function getSlide(indices) {
    var slide = this.slides[indices[0]];
    if (indices.length > 1) return slide.props.children.toList()[indices[1]];else return slide;
  },

  areSlides: function areSlides(children) {
    return children.toList().map(_Slide2.default.isSlide).reduce(function (a, b) {
      return a && b;
    }, true);
  },

  navigate: function navigate(motion) {
    this.navigator.asObservable().next(motion);
  },

  controlsElements: function controlsElements() {
    var _this3 = this;

    var controls = this.controls.map(function (control) {
      var props = {
        key: control.displayName,
        navigate: _this3.navigate,
        motions: _this3.motions,
        directions: _this3.routerState.directions
      };
      return _react2.default.createElement(control, props);
    });

    return _react2.default.createElement('controls', null, controls);
  },

  render: function render() {
    return _react2.default.createElement(
      'div',
      null,
      this.controlsElements(),
      _react2.default.createElement(
        'current',
        { ref: 'current-slide' },
        this.state.currentSlide
      )
    );
  }

});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL1VudmVpbEFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7a0JBZ0JlLGdCQUFNLFdBQU4sQ0FBa0I7Ozs7OztBQUsvQixZQUFVLGtCQUFVLEtBQVYsRUFBaUI7OztBQUN6QixXQUFPLE1BQU0sR0FBTixDQUFXLFVBQUMsS0FBRCxFQUFRLEtBQVIsRUFBa0I7QUFDbEMsVUFBRyxnQkFBTSxPQUFOLENBQWMsS0FBZCxDQUFILEVBQXlCO0FBQ3ZCLFlBQUksUUFBUTtBQUNWLHNCQURVO0FBRVYsZ0JBQU0sTUFBTSxLQUFOLENBQVksSUFBWixJQUFvQixLQUFwQjtTQUZKLENBRG1COztBQU12QixZQUFHLE1BQUssU0FBTCxDQUFlLE1BQU0sS0FBTixDQUFZLFFBQVosQ0FBbEIsRUFDRSxNQUFNLFFBQU4sR0FBaUIsTUFBSyxRQUFMLENBQWMsTUFBTSxLQUFOLENBQVksUUFBWixDQUFxQixNQUFyQixFQUFkLENBQWpCLENBREY7O0FBR0EsZUFBTyxLQUFQLENBVHVCO09BQXpCO0tBRGdCLENBQVgsQ0FZSixPQVpJLEVBQVAsQ0FEeUI7R0FBakI7O0FBZ0JWLHNCQUFvQiw4QkFBWTtBQUM5QixTQUFLLFFBQUwsR0FBZ0IsS0FBSyxLQUFMLENBQVcsUUFBWCxJQUF1Qiw2Q0FBdkIsQ0FEYztBQUU5QixTQUFLLE9BQUwsR0FBZ0IsS0FBSyxLQUFMLENBQVcsT0FBWCxxQkFBaEIsQ0FGOEI7QUFHOUIsU0FBSyxNQUFMLEdBQWdCLEtBQUssS0FBTCxDQUFXLFFBQVgsQ0FIYztBQUk5QixTQUFLLEdBQUwsR0FBZ0IsS0FBSyxRQUFMLENBQWMsS0FBSyxNQUFMLENBQTlCLENBSjhCOztBQU05QixTQUFLLFNBQUwsR0FBaUIsMEJBQWpCLENBTjhCOztBQVE5QixTQUFLLFdBQUwsR0FBbUIsRUFBRSxZQUFZLEVBQVosRUFBckIsQ0FSOEI7QUFT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LENBQUQsRUFBRyxDQUFIO2FBQVUsS0FBRyxDQUFIO0tBQVYsRUFBaUIsSUFGckIsQ0FBUCxDQUQ2QjtHQUFwQjs7QUFNWCxZQUFVLGtCQUFTLE1BQVQsRUFBaUI7QUFDekIsU0FBSyxTQUFMLENBQWUsWUFBZixHQUE4QixJQUE5QixDQUFtQyxNQUFuQyxFQUR5QjtHQUFqQjs7QUFJVixvQkFBa0IsNEJBQVk7OztBQUM1QixRQUFJLFdBQVcsS0FBSyxRQUFMLENBQWMsR0FBZCxDQUFtQixVQUFDLE9BQUQsRUFBYTtBQUM3QyxVQUFNLFFBQVE7QUFDWixhQUFLLFFBQVEsV0FBUjtBQUNMLGtCQUFVLE9BQUssUUFBTDtBQUNWLGlCQUFVLE9BQUssT0FBTDtBQUNWLG9CQUFZLE9BQUssV0FBTCxDQUFpQixVQUFqQjtPQUpSLENBRHVDO0FBTzdDLGFBQU8sZ0JBQU0sYUFBTixDQUFvQixPQUFwQixFQUE2QixLQUE3QixDQUFQLENBUDZDO0tBQWIsQ0FBOUIsQ0FEd0I7O0FBVzVCLFdBQU8sZ0JBQU0sYUFBTixDQUFvQixVQUFwQixFQUFnQyxJQUFoQyxFQUFzQyxRQUF0QyxDQUFQLENBWDRCO0dBQVo7O0FBY2xCLFVBQVEsa0JBQVk7QUFDbEIsV0FBUTs7O01BQ0wsS0FBSyxnQkFBTCxFQURLO01BRU47O1VBQVMsS0FBSSxlQUFKLEVBQVQ7UUFBOEIsS0FBSyxLQUFMLENBQVcsWUFBWDtPQUZ4QjtLQUFSLENBRGtCO0dBQVo7O0NBeEhLIiwiZmlsZSI6IlVudmVpbEFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IFNsaWRlICAgICBmcm9tICcuL1NsaWRlJztcbmltcG9ydCBQcmVzZW50ZXIgZnJvbSAnLi9QcmVzZW50ZXInO1xuXG5pbXBvcnQgS2V5Q29udHJvbHMgZnJvbSAnLi9LZXlDb250cm9scyc7XG5pbXBvcnQgVUlDb250cm9scyAgZnJvbSAnLi9VSUNvbnRyb2xzJztcblxuaW1wb3J0IGNyZWF0ZU5hdmlnYXRvciBmcm9tICcuL05hdmlnYXRvcic7XG5pbXBvcnQgY3JlYXRlUm91dGVyICAgIGZyb20gJy4vUm91dGVyJztcbmltcG9ydCBoaXN0b3J5ICAgICAgICAgZnJvbSAnLi4vaGVscGVycy9IaXN0b3J5JztcblxuaW1wb3J0ICcuLi9saWIvVXRpbHMnO1xuXG5leHBvcnQgZGVmYXVsdCBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cbiAgLypcbiAgICogUmVjdXJzaXZlbHkgYnVpbGQgYSByb3V0ZSBtYXAgZnJvbSBhbGwgdGhlIHNsaWRlcy5cbiAgICovXG4gIGJ1aWxkTWFwOiBmdW5jdGlvbiAobm9kZXMpIHtcbiAgICByZXR1cm4gbm9kZXMubWFwKCAoc2xpZGUsIGluZGV4KSA9PiB7XG4gICAgICBpZihTbGlkZS5pc1NsaWRlKHNsaWRlKSkge1xuICAgICAgICBsZXQgZW50cnkgPSB7XG4gICAgICAgICAgaW5kZXgsXG4gICAgICAgICAgbmFtZTogc2xpZGUucHJvcHMubmFtZSB8fCBmYWxzZVxuICAgICAgICB9O1xuXG4gICAgICAgIGlmKHRoaXMuYXJlU2xpZGVzKHNsaWRlLnByb3BzLmNoaWxkcmVuKSlcbiAgICAgICAgICBlbnRyeS5jaGlsZHJlbiA9IHRoaXMuYnVpbGRNYXAoc2xpZGUucHJvcHMuY2hpbGRyZW4udG9MaXN0KCkpO1xuXG4gICAgICAgIHJldHVybiBlbnRyeTtcbiAgICAgIH1cbiAgICB9KS5jb21wYWN0KCk7XG4gIH0sXG5cbiAgY29tcG9uZW50V2lsbE1vdW50OiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5jb250cm9scyA9IHRoaXMucHJvcHMuY29udHJvbHMgfHwgW1VJQ29udHJvbHMsIEtleUNvbnRyb2xzXTtcbiAgICB0aGlzLmhpc3RvcnkgID0gdGhpcy5wcm9wcy5oaXN0b3J5IHx8IGhpc3Rvcnk7XG4gICAgdGhpcy5zbGlkZXMgICA9IHRoaXMucHJvcHMuY2hpbGRyZW47XG4gICAgdGhpcy5tYXAgICAgICA9IHRoaXMuYnVpbGRNYXAodGhpcy5zbGlkZXMpO1xuXG4gICAgdGhpcy5uYXZpZ2F0b3IgPSBjcmVhdGVOYXZpZ2F0b3IoKTtcblxuICAgIHRoaXMucm91dGVyU3RhdGUgPSB7IGRpcmVjdGlvbnM6IFtdIH07XG4gICAgdGhpcy5yb3V0ZXIgPSBjcmVhdGVSb3V0ZXIoe1xuICAgICAgbWFwOiB0aGlzLm1hcCxcbiAgICAgIGhpc3Rvcnk6IHRoaXMuaGlzdG9yeSxcbiAgICAgIG5hdmlnYXRvcjogdGhpcy5uYXZpZ2F0b3JcbiAgICB9KTtcblxuICAgIHRoaXMucm91dGVyLmFzT2JzZXJ2YWJsZSgpXG4gICAgICAuc3Vic2NyaWJlKHRoaXMudXBkYXRlU3RhdGUpO1xuXG4gICAgdGhpcy5uYXZpZ2F0b3IuYXNPYnNlcnZhYmxlKClcbiAgICAgIC5maWx0ZXIodGhpcy5pc1ZhbGlkTW90aW9uKVxuICAgICAgLm1hcCh0aGlzLnRvTGV2ZWxBbmREaXJlY3Rpb24pXG4gICAgICAubWFwKHRoaXMudG9TdGF0ZSlcbiAgICAgIC5maWx0ZXIodGhpcy5pc1ZhbGlkU3RhdGUpXG4gICAgICAuc3Vic2NyaWJlKHRoaXMucm91dGVyLmdvKTtcblxuICAgIHRoaXMucm91dGVyLnN0YXJ0KCk7XG4gIH0sXG5cbiAgbW90aW9uczoge1xuICAgIGxlZnQ6ICB7IGxldmVsOiAwLCBkaXJlY3Rpb246ICdwcmV2aW91cycgfSxcbiAgICB1cDogICAgeyBsZXZlbDogMSwgZGlyZWN0aW9uOiAncHJldmlvdXMnIH0sXG4gICAgcmlnaHQ6IHsgbGV2ZWw6IDAsIGRpcmVjdGlvbjogJ25leHQnIH0sXG4gICAgZG93bjogIHsgbGV2ZWw6IDEsIGRpcmVjdGlvbjogJ25leHQnIH0sXG4gIH0sXG4gIGlzVmFsaWRNb3Rpb246IGZ1bmN0aW9uIChtb3Rpb24pIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXModGhpcy5tb3Rpb25zKS5pbmRleE9mKG1vdGlvbi50b0xvd2VyQ2FzZSgpKSAhPT0gLTE7XG4gIH0sXG4gIGlzVmFsaWRTdGF0ZTogZnVuY3Rpb24gKHN0YXRlKSB7XG4gICAgcmV0dXJuIEFycmF5LmlzQXJyYXkoc3RhdGUpO1xuICB9LFxuICB0b0xldmVsQW5kRGlyZWN0aW9uOiBmdW5jdGlvbiAobW90aW9uKSB7XG4gICAgcmV0dXJuIHRoaXMubW90aW9uc1ttb3Rpb25dO1xuICB9LFxuICB0b1N0YXRlOiBmdW5jdGlvbiAobW90aW9uKSB7XG4gICAgbGV0IGxldmVsID0gdGhpcy5yb3V0ZXJTdGF0ZS5kaXJlY3Rpb25zW21vdGlvbi5sZXZlbF1cbiAgICByZXR1cm4gbGV2ZWwgJiYgbGV2ZWxbbW90aW9uLmRpcmVjdGlvbl07XG4gIH0sXG5cbiAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcbiAgICBsZXQgZ2V0Rmlyc3RDaGlsZElmU2xpZGVzID0gKHNsaWRlKSA9PiB7XG4gICAgICBpZiAoIXRoaXMuYXJlU2xpZGVzKHNsaWRlLnByb3BzLmNoaWxkcmVuKSkge1xuICAgICAgICByZXR1cm4gc2xpZGU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBnZXRGaXJzdENoaWxkSWZTbGlkZXMoc2xpZGUucHJvcHMuY2hpbGRyZW5bMF0pO1xuICAgICAgfVxuICAgIH07XG5cbiAgICByZXR1cm4ge1xuICAgICAgY3VycmVudFNsaWRlOiBnZXRGaXJzdENoaWxkSWZTbGlkZXModGhpcy5wcm9wcy5jaGlsZHJlblswXSlcbiAgICB9O1xuICB9LFxuXG4gIHVwZGF0ZVN0YXRlOiBmdW5jdGlvbiAocykge1xuICAgIHRoaXMucm91dGVyU3RhdGUgPSBzO1xuICAgIHRoaXMuc2V0U3RhdGUoeyBjdXJyZW50U2xpZGU6IHRoaXMuZ2V0U2xpZGUocy5pbmRpY2VzKSB9KTtcbiAgfSxcblxuICBnZXRTbGlkZTogZnVuY3Rpb24gKGluZGljZXMpIHtcbiAgICBsZXQgc2xpZGUgPSB0aGlzLnNsaWRlc1tpbmRpY2VzWzBdXTtcbiAgICBpZihpbmRpY2VzLmxlbmd0aCA+IDEgKVxuICAgICAgcmV0dXJuIHNsaWRlLnByb3BzLmNoaWxkcmVuLnRvTGlzdCgpW2luZGljZXNbMV1dO1xuICAgIGVsc2VcbiAgICAgIHJldHVybiBzbGlkZVxuICB9LFxuXG4gIGFyZVNsaWRlczogZnVuY3Rpb24gKGNoaWxkcmVuKSB7XG4gICAgcmV0dXJuIGNoaWxkcmVuLnRvTGlzdCgpXG4gICAgICAubWFwKFNsaWRlLmlzU2xpZGUpXG4gICAgICAucmVkdWNlKCAoYSxiKSA9PiAoYSYmYiksIHRydWUgKTtcbiAgfSxcblxuICBuYXZpZ2F0ZTogZnVuY3Rpb24obW90aW9uKSB7XG4gICAgdGhpcy5uYXZpZ2F0b3IuYXNPYnNlcnZhYmxlKCkubmV4dChtb3Rpb24pO1xuICB9LFxuXG4gIGNvbnRyb2xzRWxlbWVudHM6IGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgY29udHJvbHMgPSB0aGlzLmNvbnRyb2xzLm1hcCggKGNvbnRyb2wpID0+IHtcbiAgICAgIGNvbnN0IHByb3BzID0ge1xuICAgICAgICBrZXk6IGNvbnRyb2wuZGlzcGxheU5hbWUsXG4gICAgICAgIG5hdmlnYXRlOiB0aGlzLm5hdmlnYXRlLFxuICAgICAgICBtb3Rpb25zOiAgdGhpcy5tb3Rpb25zLFxuICAgICAgICBkaXJlY3Rpb25zOiB0aGlzLnJvdXRlclN0YXRlLmRpcmVjdGlvbnNcbiAgICAgIH07XG4gICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChjb250cm9sLCBwcm9wcyk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudCgnY29udHJvbHMnLCBudWxsLCBjb250cm9scyk7XG4gIH0sXG5cbiAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuICg8ZGl2PlxuICAgICAge3RoaXMuY29udHJvbHNFbGVtZW50cygpfVxuICAgICAgPGN1cnJlbnQgcmVmPVwiY3VycmVudC1zbGlkZVwiPnt0aGlzLnN0YXRlLmN1cnJlbnRTbGlkZX08L2N1cnJlbnQ+XG4gICAgPC9kaXY+KTtcbiAgfVxuXG59KTtcbiJdfQ==