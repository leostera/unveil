'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _UnveilApp = require('../../UnveilApp');

var _UnveilApp2 = _interopRequireDefault(_UnveilApp);

var _Slide = require('../../Slide');

var _Slide2 = _interopRequireDefault(_Slide);

var _MapBase = require('./MapBase');

var _MapBase2 = _interopRequireDefault(_MapBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fixture = function fixture(options) {
  return _react2.default.createElement(
    _UnveilApp2.default,
    options,
    _react2.default.createElement(
      _Slide2.default,
      { key: '0', name: 'return-of-the-jedi' },
      'Luke'
    ),
    _react2.default.createElement(
      _Slide2.default,
      { key: '1', name: 'pulp-fiction' },
      _react2.default.createElement(
        _Slide2.default,
        { name: 'vincent-vega' },
        'Vincent Vega'
      ),
      _react2.default.createElement(
        _Slide2.default,
        { name: 'jules' },
        'Jules effing Winnfield'
      ),
      _react2.default.createElement(
        _Slide2.default,
        null,
        'Marsellus Wallace'
      )
    ),
    _react2.default.createElement(
      _Slide2.default,
      { key: '2' },
      _react2.default.createElement(
        'h1',
        null,
        'One'
      ),
      _react2.default.createElement(
        'p',
        null,
        ' What happens here? '
      ),
      _react2.default.createElement(
        'code',
        null,
        ' Some codez '
      )
    ),
    _react2.default.createElement(
      _Slide2.default,
      null,
      _react2.default.createElement(
        _Slide2.default,
        null,
        _react2.default.createElement(
          'h1',
          null,
          'Heading'
        )
      ),
      _react2.default.createElement(
        _Slide2.default,
        { name: 'donnie-darko' },
        _react2.default.createElement(
          'h1',
          null,
          'Donnie Darko'
        )
      )
    ),
    _react2.default.createElement(
      _Slide2.default,
      null,
      _react2.default.createElement(
        _Slide2.default,
        null,
        _react2.default.createElement(
          'h1',
          null,
          'Beading'
        )
      ),
      _react2.default.createElement(
        _Slide2.default,
        null,
        _react2.default.createElement(
          'h1',
          null,
          'Superbar'
        )
      )
    ),
    _react2.default.createElement(
      _Slide2.default,
      null,
      _react2.default.createElement(
        _Slide2.default,
        null,
        _react2.default.createElement(
          'h1',
          null,
          'Kneading'
        )
      ),
      _react2.default.createElement(
        _Slide2.default,
        null,
        _react2.default.createElement(
          'h1',
          null,
          'Leonard Nimoy'
        )
      )
    ),
    _react2.default.createElement(
      _Slide2.default,
      null,
      'Han'
    ),
    _react2.default.createElement(
      _Slide2.default,
      null,
      'Leia'
    )
  );
};

exports.default = fixture;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL19fdGVzdHNfXy9maXh0dXJlcy9UcmVlV2l0aG91dE5lc3RlZEZpcnN0U2xpZGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBT0EsSUFBTSxVQUFVLFNBQVYsT0FBVSxDQUFDLE9BQUQsRUFBYTtBQUMzQixTQUNBOztJQUFlLE9BQWY7SUFDRTs7UUFBTyxLQUFJLEdBQUosRUFBUSxNQUFLLG9CQUFMLEVBQWY7O0tBREY7SUFJRTs7UUFBTyxLQUFJLEdBQUosRUFBUSxNQUFLLGNBQUwsRUFBZjtNQUNFOztVQUFPLE1BQUssY0FBTCxFQUFQOztPQURGO01BSUU7O1VBQU8sTUFBSyxPQUFMLEVBQVA7O09BSkY7TUFPRTs7OztPQVBGO0tBSkY7SUFlRTs7UUFBTyxLQUFJLEdBQUosRUFBUDtNQUNFOzs7O09BREY7TUFFRTs7OztPQUZGO01BR0U7Ozs7T0FIRjtLQWZGO0lBb0JFOzs7TUFDRTs7O1FBQU87Ozs7U0FBUDtPQURGO01BRUU7O1VBQU8sTUFBSyxjQUFMLEVBQVA7UUFBMkI7Ozs7U0FBM0I7T0FGRjtLQXBCRjtJQXdCRTs7O01BQ0U7OztRQUFPOzs7O1NBQVA7T0FERjtNQUVFOzs7UUFBTzs7OztTQUFQO09BRkY7S0F4QkY7SUE0QkU7OztNQUNFOzs7UUFBTzs7OztTQUFQO09BREY7TUFFRTs7O1FBQU87Ozs7U0FBUDtPQUZGO0tBNUJGO0lBZ0NFOzs7O0tBaENGO0lBbUNFOzs7O0tBbkNGO0dBREEsQ0FEMkI7Q0FBYjs7a0JBMkNEIiwiZmlsZSI6IlRyZWVXaXRob3V0TmVzdGVkRmlyc3RTbGlkZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCBVbnZlaWxBcHAgZnJvbSAnLi4vLi4vVW52ZWlsQXBwJztcbmltcG9ydCBTbGlkZSBmcm9tICcuLi8uLi9TbGlkZSc7XG5cbmltcG9ydCBCYXNlIGZyb20gJy4vTWFwQmFzZSc7XG5cbmNvbnN0IGZpeHR1cmUgPSAob3B0aW9ucykgPT4ge1xuICByZXR1cm4gKFxuICA8VW52ZWlsQXBwIHsuLi5vcHRpb25zfT5cbiAgICA8U2xpZGUga2V5PVwiMFwiIG5hbWU9XCJyZXR1cm4tb2YtdGhlLWplZGlcIj5cbiAgICAgIEx1a2VcbiAgICA8L1NsaWRlPlxuICAgIDxTbGlkZSBrZXk9XCIxXCIgbmFtZT1cInB1bHAtZmljdGlvblwiPlxuICAgICAgPFNsaWRlIG5hbWU9XCJ2aW5jZW50LXZlZ2FcIj5cbiAgICAgICAgVmluY2VudCBWZWdhXG4gICAgICA8L1NsaWRlPlxuICAgICAgPFNsaWRlIG5hbWU9XCJqdWxlc1wiPlxuICAgICAgICBKdWxlcyBlZmZpbmcgV2lubmZpZWxkXG4gICAgICA8L1NsaWRlPlxuICAgICAgPFNsaWRlPlxuICAgICAgICBNYXJzZWxsdXMgV2FsbGFjZVxuICAgICAgPC9TbGlkZT5cbiAgICA8L1NsaWRlPlxuICAgIDxTbGlkZSBrZXk9XCIyXCI+XG4gICAgICA8aDE+T25lPC9oMT5cbiAgICAgIDxwPiBXaGF0IGhhcHBlbnMgaGVyZT8gPC9wPlxuICAgICAgPGNvZGU+IFNvbWUgY29kZXogPC9jb2RlPlxuICAgIDwvU2xpZGU+XG4gICAgPFNsaWRlPlxuICAgICAgPFNsaWRlPjxoMT5IZWFkaW5nPC9oMT48L1NsaWRlPlxuICAgICAgPFNsaWRlIG5hbWU9XCJkb25uaWUtZGFya29cIj48aDE+RG9ubmllIERhcmtvPC9oMT48L1NsaWRlPlxuICAgIDwvU2xpZGU+XG4gICAgPFNsaWRlPlxuICAgICAgPFNsaWRlPjxoMT5CZWFkaW5nPC9oMT48L1NsaWRlPlxuICAgICAgPFNsaWRlPjxoMT5TdXBlcmJhcjwvaDE+PC9TbGlkZT5cbiAgICA8L1NsaWRlPlxuICAgIDxTbGlkZT5cbiAgICAgIDxTbGlkZT48aDE+S25lYWRpbmc8L2gxPjwvU2xpZGU+XG4gICAgICA8U2xpZGU+PGgxPkxlb25hcmQgTmltb3k8L2gxPjwvU2xpZGU+XG4gICAgPC9TbGlkZT5cbiAgICA8U2xpZGU+XG4gICAgICBIYW5cbiAgICA8L1NsaWRlPlxuICAgIDxTbGlkZT5cbiAgICAgIExlaWFcbiAgICA8L1NsaWRlPlxuICA8L1VudmVpbEFwcD4pXG59O1xuXG5leHBvcnQgZGVmYXVsdCBmaXh0dXJlO1xuIl19