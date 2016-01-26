"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _react2.default.createClass({
  displayName: "GithubRibbon",

  render: function render() {
    var id = this.props.id || "";
    var href = "https://github.com/" + this.props.path;
    var title = this.props.title || this.props.path + " on Github";
    return _react2.default.createElement(
      "div",
      null,
      _react2.default.createElement(
        "a",
        {
          id: id,
          href: href,
          title: title,
          target: "blank" },
        _react2.default.createElement("img", {
          style: { position: "absolute", top: 0, right: 0, border: 0 },
          src: "https://camo.githubusercontent.com/38ef81f8aca64bb9a64448d0d70f1308ef5341ab/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f6461726b626c75655f3132313632312e706e67",
          alt: "Fork me on GitHub",
          "data-canonical-src": "https://s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png" })
      )
    );
  }

});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL0dpdGh1YlJpYmJvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7a0JBRWUsZ0JBQU0sV0FBTixDQUFrQjs7O0FBRS9CLFVBQVEsa0JBQVk7QUFDbEIsUUFBSSxLQUFLLEtBQUssS0FBTCxDQUFXLEVBQVgsSUFBaUIsRUFBakIsQ0FEUztBQUVsQixRQUFJLE9BQU8sd0JBQXNCLEtBQUssS0FBTCxDQUFXLElBQVgsQ0FGZjtBQUdsQixRQUFJLFFBQVEsS0FBSyxLQUFMLENBQVcsS0FBWCxJQUFvQixLQUFLLEtBQUwsQ0FBVyxJQUFYLEdBQWdCLFlBQWhCLENBSGQ7QUFJbEIsV0FDRTs7O01BQ0U7OztBQUNFLGNBQUksRUFBSjtBQUNBLGdCQUFNLElBQU47QUFDQSxpQkFBTyxLQUFQO0FBQ0Esa0JBQU8sT0FBUCxFQUpGO1FBS0U7QUFDRSxpQkFBUSxFQUFDLFVBQVUsVUFBVixFQUFzQixLQUFLLENBQUwsRUFBUSxPQUFPLENBQVAsRUFBVSxRQUFRLENBQVIsRUFBakQ7QUFDQSxlQUFJLDhOQUFKO0FBQ0EsZUFBSSxtQkFBSjtBQUNBLGdDQUFtQiwwRUFBbkIsRUFKRixDQUxGO09BREY7S0FERixDQUprQjtHQUFaOztDQUZLIiwiZmlsZSI6IkdpdGh1YlJpYmJvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmV4cG9ydCBkZWZhdWx0IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblxuICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgaWQgPSB0aGlzLnByb3BzLmlkIHx8IFwiXCI7XG4gICAgbGV0IGhyZWYgPSBcImh0dHBzOi8vZ2l0aHViLmNvbS9cIit0aGlzLnByb3BzLnBhdGg7XG4gICAgbGV0IHRpdGxlID0gdGhpcy5wcm9wcy50aXRsZSB8fCB0aGlzLnByb3BzLnBhdGgrXCIgb24gR2l0aHViXCI7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxhXG4gICAgICAgICAgaWQ9e2lkfVxuICAgICAgICAgIGhyZWY9e2hyZWZ9XG4gICAgICAgICAgdGl0bGU9e3RpdGxlfVxuICAgICAgICAgIHRhcmdldD1cImJsYW5rXCI+XG4gICAgICAgICAgPGltZ1xuICAgICAgICAgICAgc3R5bGU9eyB7cG9zaXRpb246IFwiYWJzb2x1dGVcIiwgdG9wOiAwLCByaWdodDogMCwgYm9yZGVyOiAwfSB9XG4gICAgICAgICAgICBzcmM9XCJodHRwczovL2NhbW8uZ2l0aHVidXNlcmNvbnRlbnQuY29tLzM4ZWY4MWY4YWNhNjRiYjlhNjQ0NDhkMGQ3MGYxMzA4ZWY1MzQxYWIvNjg3NDc0NzA3MzNhMmYyZjczMzMyZTYxNmQ2MTdhNmY2ZTYxNzc3MzJlNjM2ZjZkMmY2NzY5NzQ2ODc1NjIyZjcyNjk2MjYyNmY2ZTczMmY2NjZmNzI2YjZkNjU1ZjcyNjk2NzY4NzQ1ZjY0NjE3MjZiNjI2Yzc1NjU1ZjMxMzIzMTM2MzIzMTJlNzA2ZTY3XCJcbiAgICAgICAgICAgIGFsdD1cIkZvcmsgbWUgb24gR2l0SHViXCJcbiAgICAgICAgICAgIGRhdGEtY2Fub25pY2FsLXNyYz1cImh0dHBzOi8vczMuYW1hem9uYXdzLmNvbS9naXRodWIvcmliYm9ucy9mb3JrbWVfcmlnaHRfZGFya2JsdWVfMTIxNjIxLnBuZ1wiIC8+XG4gICAgICAgIDwvYT5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH0sXG5cbn0pO1xuXG4iXX0=