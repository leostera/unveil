'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactAddonsTestUtils = require('react-addons-test-utils');

var _reactAddonsTestUtils2 = _interopRequireDefault(_reactAddonsTestUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.dontMock('../Slide');
jest.dontMock('marked');

var Slide = require('../Slide').default;

describe('Slide', function () {

  it('renders it\'s content', function () {
    var slide = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(
      Slide,
      null,
      'Hello'
    ));
    var slideNode = _reactDom2.default.findDOMNode(slide);
    expect(slideNode.textContent).toEqual('Hello');
  });

  it('renders markdown content', function () {
    var slide = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(
      Slide,
      { markdown: true },
      '# Hello'
    ));
    var slideNode = _reactDom2.default.findDOMNode(slide);
    expect(slideNode.textContent).toEqual('Hello');
  });

  it('renders html content', function () {
    var slide = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(
      Slide,
      null,
      _react2.default.createElement(
        'h1',
        null,
        'Hello'
      )
    ));
    var slideNode = _reactDom2.default.findDOMNode(slide);
    expect(slideNode.textContent).toEqual('Hello');
  });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL19fdGVzdHNfXy9TbGlkZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsS0FBSyxRQUFMLENBQWMsVUFBZDtBQUNBLEtBQUssUUFBTCxDQUFjLFFBQWQ7O0FBTUEsSUFBTSxRQUFRLFFBQVEsVUFBUixFQUFvQixPQUFwQjs7QUFFZCxTQUFTLE9BQVQsRUFBa0IsWUFBTTs7QUFFdEIsS0FBRyx1QkFBSCxFQUE0QixZQUFNO0FBQ2hDLFFBQUksUUFBUSwrQkFBVSxrQkFBVixDQUErQjtBQUFDLFdBQUQ7OztLQUEvQixDQUFSLENBRDRCO0FBRWhDLFFBQUksWUFBWSxtQkFBUyxXQUFULENBQXFCLEtBQXJCLENBQVosQ0FGNEI7QUFHaEMsV0FBTyxVQUFVLFdBQVYsQ0FBUCxDQUE4QixPQUE5QixDQUFzQyxPQUF0QyxFQUhnQztHQUFOLENBQTVCLENBRnNCOztBQVF0QixLQUFHLDBCQUFILEVBQStCLFlBQU07QUFDbkMsUUFBSSxRQUFRLCtCQUFVLGtCQUFWLENBQStCO0FBQUMsV0FBRDtRQUFPLFVBQVUsSUFBVixFQUFQOztLQUEvQixDQUFSLENBRCtCO0FBRW5DLFFBQUksWUFBWSxtQkFBUyxXQUFULENBQXFCLEtBQXJCLENBQVosQ0FGK0I7QUFHbkMsV0FBTyxVQUFVLFdBQVYsQ0FBUCxDQUE4QixPQUE5QixDQUFzQyxPQUF0QyxFQUhtQztHQUFOLENBQS9CLENBUnNCOztBQWN0QixLQUFHLHNCQUFILEVBQTJCLFlBQU07QUFDL0IsUUFBSSxRQUFRLCtCQUFVLGtCQUFWLENBQStCO0FBQUMsV0FBRDs7TUFBTzs7OztPQUFQO0tBQS9CLENBQVIsQ0FEMkI7QUFFL0IsUUFBSSxZQUFZLG1CQUFTLFdBQVQsQ0FBcUIsS0FBckIsQ0FBWixDQUYyQjtBQUcvQixXQUFPLFVBQVUsV0FBVixDQUFQLENBQThCLE9BQTlCLENBQXNDLE9BQXRDLEVBSCtCO0dBQU4sQ0FBM0IsQ0Fkc0I7Q0FBTixDQUFsQiIsImZpbGUiOiJTbGlkZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImplc3QuZG9udE1vY2soJy4uL1NsaWRlJyk7XG5qZXN0LmRvbnRNb2NrKCdtYXJrZWQnKTtcblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IFRlc3RVdGlscyBmcm9tICdyZWFjdC1hZGRvbnMtdGVzdC11dGlscyc7XG5cbmNvbnN0IFNsaWRlID0gcmVxdWlyZSgnLi4vU2xpZGUnKS5kZWZhdWx0O1xuXG5kZXNjcmliZSgnU2xpZGUnLCAoKSA9PiB7XG5cbiAgaXQoJ3JlbmRlcnMgaXRcXCdzIGNvbnRlbnQnLCAoKSA9PiB7XG4gICAgbGV0IHNsaWRlID0gVGVzdFV0aWxzLnJlbmRlckludG9Eb2N1bWVudCggKDxTbGlkZT5IZWxsbzwvU2xpZGU+KSApO1xuICAgIGxldCBzbGlkZU5vZGUgPSBSZWFjdERPTS5maW5kRE9NTm9kZShzbGlkZSk7XG4gICAgZXhwZWN0KHNsaWRlTm9kZS50ZXh0Q29udGVudCkudG9FcXVhbCgnSGVsbG8nKTtcbiAgfSk7XG5cbiAgaXQoJ3JlbmRlcnMgbWFya2Rvd24gY29udGVudCcsICgpID0+IHtcbiAgICBsZXQgc2xpZGUgPSBUZXN0VXRpbHMucmVuZGVySW50b0RvY3VtZW50KCAoPFNsaWRlIG1hcmtkb3duPXt0cnVlfT4jIEhlbGxvPC9TbGlkZT4pICk7XG4gICAgbGV0IHNsaWRlTm9kZSA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKHNsaWRlKTtcbiAgICBleHBlY3Qoc2xpZGVOb2RlLnRleHRDb250ZW50KS50b0VxdWFsKCdIZWxsbycpO1xuICB9KTtcblxuICBpdCgncmVuZGVycyBodG1sIGNvbnRlbnQnLCAoKSA9PiB7XG4gICAgbGV0IHNsaWRlID0gVGVzdFV0aWxzLnJlbmRlckludG9Eb2N1bWVudCggKDxTbGlkZT48aDE+SGVsbG88L2gxPjwvU2xpZGU+KSApO1xuICAgIGxldCBzbGlkZU5vZGUgPSBSZWFjdERPTS5maW5kRE9NTm9kZShzbGlkZSk7XG4gICAgZXhwZWN0KHNsaWRlTm9kZS50ZXh0Q29udGVudCkudG9FcXVhbCgnSGVsbG8nKTtcbiAgfSk7XG5cbn0pO1xuIl19