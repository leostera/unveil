'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactAddonsTestUtils = require('react-addons-test-utils');

var _reactAddonsTestUtils2 = _interopRequireDefault(_reactAddonsTestUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.dontMock('../Presenter');
jest.dontMock('../Slide');

var Slide = require('../Slide').default;
var Presenter = require('../Presenter').default;

var fixture = function fixture(slide) {
  return _react2.default.createElement(Presenter, { currentSlide: slide });
};

var renderFixture = function renderFixture(slide) {
  return _reactAddonsTestUtils2.default.renderIntoDocument(fixture(slide));
};

describe('Presenter', function () {
  var elements = undefined,
      node = undefined;

  beforeEach(function () {});

  afterEach(function () {});

  it('renders html slide', function () {
    elements = renderFixture(_react2.default.createElement(
      Slide,
      null,
      _react2.default.createElement(
        'h1',
        null,
        'Hello'
      )
    ));
    node = _reactDom2.default.findDOMNode(elements);

    var children = node.children;
    expect(children.length).toEqual(1);
    expect(children[0].textContent).toEqual('Hello');
  });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL19fdGVzdHNfXy9QcmVzZW50ZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLEtBQUssUUFBTCxDQUFjLGNBQWQ7QUFDQSxLQUFLLFFBQUwsQ0FBYyxVQUFkOztBQU1BLElBQU0sUUFBWSxRQUFRLFVBQVIsRUFBb0IsT0FBcEI7QUFDbEIsSUFBTSxZQUFZLFFBQVEsY0FBUixFQUF3QixPQUF4Qjs7QUFFbEIsSUFBSSxVQUFVLFNBQVYsT0FBVSxDQUFDLEtBQUQ7U0FBYSw4QkFBQyxTQUFELElBQVcsY0FBYyxLQUFkLEVBQVg7Q0FBYjs7QUFFZCxJQUFJLGdCQUFnQixTQUFoQixhQUFnQixDQUFDLEtBQUQ7U0FBVywrQkFBVSxrQkFBVixDQUE4QixRQUFRLEtBQVIsQ0FBOUI7Q0FBWDs7QUFFcEIsU0FBUyxXQUFULEVBQXNCLFlBQU07QUFDMUIsTUFBSSxvQkFBSjtNQUFjLGdCQUFkLENBRDBCOztBQUcxQixhQUFZLFlBQU0sRUFBTixDQUFaLENBSDBCOztBQU0xQixZQUFXLFlBQU0sRUFBTixDQUFYLENBTjBCOztBQVMxQixLQUFHLG9CQUFILEVBQXlCLFlBQU07QUFDN0IsZUFBVyxjQUFjO0FBQUMsV0FBRDs7TUFBTzs7OztPQUFQO0tBQWQsQ0FBWCxDQUQ2QjtBQUU3QixXQUFPLG1CQUFTLFdBQVQsQ0FBcUIsUUFBckIsQ0FBUCxDQUY2Qjs7QUFJN0IsUUFBSSxXQUFXLEtBQUssUUFBTCxDQUpjO0FBSzdCLFdBQU8sU0FBUyxNQUFULENBQVAsQ0FBd0IsT0FBeEIsQ0FBZ0MsQ0FBaEMsRUFMNkI7QUFNN0IsV0FBTyxTQUFTLENBQVQsRUFBWSxXQUFaLENBQVAsQ0FBZ0MsT0FBaEMsQ0FBd0MsT0FBeEMsRUFONkI7R0FBTixDQUF6QixDQVQwQjtDQUFOLENBQXRCIiwiZmlsZSI6IlByZXNlbnRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImplc3QuZG9udE1vY2soJy4uL1ByZXNlbnRlcicpO1xuamVzdC5kb250TW9jaygnLi4vU2xpZGUnKTtcblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IFRlc3RVdGlscyBmcm9tICdyZWFjdC1hZGRvbnMtdGVzdC11dGlscyc7XG5cbmNvbnN0IFNsaWRlICAgICA9IHJlcXVpcmUoJy4uL1NsaWRlJykuZGVmYXVsdDtcbmNvbnN0IFByZXNlbnRlciA9IHJlcXVpcmUoJy4uL1ByZXNlbnRlcicpLmRlZmF1bHQ7XG5cbmxldCBmaXh0dXJlID0gKHNsaWRlKSA9PiAoIDxQcmVzZW50ZXIgY3VycmVudFNsaWRlPXtzbGlkZX0gLz4pO1xuXG5sZXQgcmVuZGVyRml4dHVyZSA9IChzbGlkZSkgPT4gVGVzdFV0aWxzLnJlbmRlckludG9Eb2N1bWVudCggZml4dHVyZShzbGlkZSkgKTtcblxuZGVzY3JpYmUoJ1ByZXNlbnRlcicsICgpID0+IHtcbiAgbGV0IGVsZW1lbnRzLCBub2RlO1xuXG4gIGJlZm9yZUVhY2goICgpID0+IHtcbiAgfSk7XG5cbiAgYWZ0ZXJFYWNoKCAoKSA9PiB7XG4gIH0pO1xuXG4gIGl0KCdyZW5kZXJzIGh0bWwgc2xpZGUnLCAoKSA9PiB7XG4gICAgZWxlbWVudHMgPSByZW5kZXJGaXh0dXJlKDxTbGlkZT48aDE+SGVsbG88L2gxPjwvU2xpZGU+KTtcbiAgICBub2RlID0gUmVhY3RET00uZmluZERPTU5vZGUoZWxlbWVudHMpO1xuXG4gICAgbGV0IGNoaWxkcmVuID0gbm9kZS5jaGlsZHJlbjtcbiAgICBleHBlY3QoY2hpbGRyZW4ubGVuZ3RoKS50b0VxdWFsKDEpO1xuICAgIGV4cGVjdChjaGlsZHJlblswXS50ZXh0Q29udGVudCkudG9FcXVhbCgnSGVsbG8nKTtcbiAgfSk7XG5cbn0pO1xuIl19