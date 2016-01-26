'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactAddonsTestUtils = require('react-addons-test-utils');

var _reactAddonsTestUtils2 = _interopRequireDefault(_reactAddonsTestUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.dontMock('../UIControls');
jest.dontMock('marked');

var UIControls = require('../UIControls').default;

describe('UIControls', function () {
  var controller = undefined,
      node = undefined,
      navigate = undefined,
      directions = undefined,
      motions = undefined;

  directions = [{ next: [0], previous: [0] }, { next: [0], previous: [0] }, { next: [0], previous: [0] }, { next: [0], previous: [0] }];
  motions = {
    left: { level: 0, direction: 'previous' },
    up: { level: 1, direction: 'previous' },
    right: { level: 0, direction: 'next' },
    down: { level: 1, direction: 'next' }
  };

  beforeEach(function () {
    navigate = jest.genMockFunction();
    controller = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(UIControls, {
      navigate: navigate,
      directions: directions,
      motions: motions }));

    node = _reactDom2.default.findDOMNode(controller);
  });

  var find = function find(name) {
    return _reactDom2.default.findDOMNode(controller.refs['button-' + name]);
  };

  (0, _keys2.default)(motions).forEach(function (motion) {
    it('calls navigate(' + motion + ') when pressing ' + motion, function () {
      node = find(motion);
      _reactAddonsTestUtils2.default.Simulate.click(node);
      expect(navigate).toBeCalledWith(motion);
    });
  });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL19fdGVzdHNfXy9VSUNvbnRyb2xzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsS0FBSyxRQUFMLENBQWMsZUFBZDtBQUNBLEtBQUssUUFBTCxDQUFjLFFBQWQ7O0FBTUEsSUFBTSxhQUFhLFFBQVEsZUFBUixFQUF5QixPQUF6Qjs7QUFFbkIsU0FBUyxZQUFULEVBQXVCLFlBQU07QUFDM0IsTUFBSSxzQkFBSjtNQUFnQixnQkFBaEI7TUFBc0Isb0JBQXRCO01BQWdDLHNCQUFoQztNQUE0QyxtQkFBNUMsQ0FEMkI7O0FBRzNCLGVBQWEsQ0FDWCxFQUFDLE1BQU0sQ0FBQyxDQUFELENBQU4sRUFBVyxVQUFVLENBQUMsQ0FBRCxDQUFWLEVBREQsRUFFWCxFQUFDLE1BQU0sQ0FBQyxDQUFELENBQU4sRUFBVyxVQUFVLENBQUMsQ0FBRCxDQUFWLEVBRkQsRUFHWCxFQUFDLE1BQU0sQ0FBQyxDQUFELENBQU4sRUFBVyxVQUFVLENBQUMsQ0FBRCxDQUFWLEVBSEQsRUFJWCxFQUFDLE1BQU0sQ0FBQyxDQUFELENBQU4sRUFBVyxVQUFVLENBQUMsQ0FBRCxDQUFWLEVBSkQsQ0FBYixDQUgyQjtBQVMzQixZQUFhO0FBQ1gsVUFBTyxFQUFFLE9BQU8sQ0FBUCxFQUFVLFdBQVcsVUFBWCxFQUFuQjtBQUNBLFFBQU8sRUFBRSxPQUFPLENBQVAsRUFBVSxXQUFXLFVBQVgsRUFBbkI7QUFDQSxXQUFPLEVBQUUsT0FBTyxDQUFQLEVBQVUsV0FBVyxNQUFYLEVBQW5CO0FBQ0EsVUFBTyxFQUFFLE9BQU8sQ0FBUCxFQUFVLFdBQVcsTUFBWCxFQUFuQjtHQUpGLENBVDJCOztBQWdCM0IsYUFBWSxZQUFNO0FBQ2hCLGVBQWEsS0FBSyxlQUFMLEVBQWIsQ0FEZ0I7QUFFaEIsaUJBQWEsK0JBQVUsa0JBQVYsQ0FDWCw4QkFBQyxVQUFEO0FBQ0UsZ0JBQVUsUUFBVjtBQUNBLGtCQUFZLFVBQVo7QUFDQSxlQUFTLE9BQVQsRUFIRixDQURXLENBQWIsQ0FGZ0I7O0FBU2hCLFdBQU8sbUJBQVMsV0FBVCxDQUFxQixVQUFyQixDQUFQLENBVGdCO0dBQU4sQ0FBWixDQWhCMkI7O0FBNEIzQixNQUFJLE9BQU8sU0FBUCxJQUFPLENBQUMsSUFBRDtXQUNULG1CQUFTLFdBQVQsQ0FBcUIsV0FBVyxJQUFYLGFBQTBCLElBQTFCLENBQXJCO0dBRFMsQ0E1QmdCOztBQStCM0Isc0JBQVksT0FBWixFQUFxQixPQUFyQixDQUE4QixVQUFDLE1BQUQsRUFBWTtBQUN4QywyQkFBcUIsOEJBQXlCLE1BQTlDLEVBQXdELFlBQU07QUFDNUQsYUFBTyxLQUFLLE1BQUwsQ0FBUCxDQUQ0RDtBQUU1RCxxQ0FBVSxRQUFWLENBQW1CLEtBQW5CLENBQXlCLElBQXpCLEVBRjREO0FBRzVELGFBQU8sUUFBUCxFQUFpQixjQUFqQixDQUFnQyxNQUFoQyxFQUg0RDtLQUFOLENBQXhELENBRHdDO0dBQVosQ0FBOUIsQ0EvQjJCO0NBQU4sQ0FBdkIiLCJmaWxlIjoiVUlDb250cm9scy5qcyIsInNvdXJjZXNDb250ZW50IjpbImplc3QuZG9udE1vY2soJy4uL1VJQ29udHJvbHMnKTtcbmplc3QuZG9udE1vY2soJ21hcmtlZCcpO1xuXG5pbXBvcnQgUmVhY3QgICAgIGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdERPTSAgZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCBUZXN0VXRpbHMgZnJvbSAncmVhY3QtYWRkb25zLXRlc3QtdXRpbHMnO1xuXG5jb25zdCBVSUNvbnRyb2xzID0gcmVxdWlyZSgnLi4vVUlDb250cm9scycpLmRlZmF1bHQ7XG5cbmRlc2NyaWJlKCdVSUNvbnRyb2xzJywgKCkgPT4ge1xuICBsZXQgY29udHJvbGxlciwgbm9kZSwgbmF2aWdhdGUsIGRpcmVjdGlvbnMsIG1vdGlvbnNcblxuICBkaXJlY3Rpb25zID0gW1xuICAgIHtuZXh0OiBbMF0sIHByZXZpb3VzOiBbMF19LFxuICAgIHtuZXh0OiBbMF0sIHByZXZpb3VzOiBbMF19LFxuICAgIHtuZXh0OiBbMF0sIHByZXZpb3VzOiBbMF19LFxuICAgIHtuZXh0OiBbMF0sIHByZXZpb3VzOiBbMF19XG4gIF07XG4gIG1vdGlvbnMgICAgPSB7XG4gICAgbGVmdDogIHsgbGV2ZWw6IDAsIGRpcmVjdGlvbjogJ3ByZXZpb3VzJyB9LFxuICAgIHVwOiAgICB7IGxldmVsOiAxLCBkaXJlY3Rpb246ICdwcmV2aW91cycgfSxcbiAgICByaWdodDogeyBsZXZlbDogMCwgZGlyZWN0aW9uOiAnbmV4dCcgfSxcbiAgICBkb3duOiAgeyBsZXZlbDogMSwgZGlyZWN0aW9uOiAnbmV4dCcgfSxcbiAgfTtcblxuICBiZWZvcmVFYWNoKCAoKSA9PiB7XG4gICAgbmF2aWdhdGUgICA9IGplc3QuZ2VuTW9ja0Z1bmN0aW9uKCk7XG4gICAgY29udHJvbGxlciA9IFRlc3RVdGlscy5yZW5kZXJJbnRvRG9jdW1lbnQoIChcbiAgICAgIDxVSUNvbnRyb2xzXG4gICAgICAgIG5hdmlnYXRlPXtuYXZpZ2F0ZX1cbiAgICAgICAgZGlyZWN0aW9ucz17ZGlyZWN0aW9uc31cbiAgICAgICAgbW90aW9ucz17bW90aW9uc30+XG4gICAgICA8L1VJQ29udHJvbHM+KSk7XG5cbiAgICBub2RlID0gUmVhY3RET00uZmluZERPTU5vZGUoY29udHJvbGxlcik7XG4gIH0pO1xuXG4gIGxldCBmaW5kID0gKG5hbWUpID0+XG4gICAgUmVhY3RET00uZmluZERPTU5vZGUoY29udHJvbGxlci5yZWZzW2BidXR0b24tJHtuYW1lfWBdKTtcblxuICBPYmplY3Qua2V5cyhtb3Rpb25zKS5mb3JFYWNoKCAobW90aW9uKSA9PiB7XG4gICAgaXQoYGNhbGxzIG5hdmlnYXRlKCR7bW90aW9ufSkgd2hlbiBwcmVzc2luZyAke21vdGlvbn1gLCAoKSA9PiB7XG4gICAgICBub2RlID0gZmluZChtb3Rpb24pXG4gICAgICBUZXN0VXRpbHMuU2ltdWxhdGUuY2xpY2sobm9kZSk7XG4gICAgICBleHBlY3QobmF2aWdhdGUpLnRvQmVDYWxsZWRXaXRoKG1vdGlvbik7XG4gICAgfSk7XG4gIH0pO1xuXG5cbn0pO1xuIl19