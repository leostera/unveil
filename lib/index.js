'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _History = require('./helpers/History');

var _History2 = _interopRequireDefault(_History);

var _KeyControls = require('./components/KeyControls');

var _KeyControls2 = _interopRequireDefault(_KeyControls);

var _Presenter = require('./components/Presenter');

var _Presenter2 = _interopRequireDefault(_Presenter);

var _Slide = require('./components/Slide');

var _Slide2 = _interopRequireDefault(_Slide);

var _UIControls = require('./components/UIControls');

var _UIControls2 = _interopRequireDefault(_UIControls);

var _UnveilApp = require('./components/UnveilApp');

var _UnveilApp2 = _interopRequireDefault(_UnveilApp);

var _Navigator = require('./components/Navigator');

var _Navigator2 = _interopRequireDefault(_Navigator);

var _Router = require('./components/Router');

var _Router2 = _interopRequireDefault(_Router);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Unveil = {
  History: _History2.default,
  KeyControls: _KeyControls2.default,
  Presenter: _Presenter2.default,
  Slide: _Slide2.default,
  UIControls: _UIControls2.default,
  UnveilApp: _UnveilApp2.default,
  createNavigator: _Navigator2.default,
  createRouter: _Router2.default
};

exports.default = Unveil;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBU0EsSUFBTSxTQUFTO0FBQ2IsNEJBRGE7QUFFYixvQ0FGYTtBQUdiLGdDQUhhO0FBSWIsd0JBSmE7QUFLYixrQ0FMYTtBQU1iLGdDQU5hO0FBT2Isc0NBUGE7QUFRYixnQ0FSYTtDQUFUOztrQkFXUyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBIaXN0b3J5ICAgICAgICAgZnJvbSAnLi9oZWxwZXJzL0hpc3RvcnknO1xuaW1wb3J0IEtleUNvbnRyb2xzICAgICBmcm9tICcuL2NvbXBvbmVudHMvS2V5Q29udHJvbHMnO1xuaW1wb3J0IFByZXNlbnRlciAgICAgICBmcm9tICcuL2NvbXBvbmVudHMvUHJlc2VudGVyJztcbmltcG9ydCBTbGlkZSAgICAgICAgICAgZnJvbSAnLi9jb21wb25lbnRzL1NsaWRlJztcbmltcG9ydCBVSUNvbnRyb2xzICAgICAgZnJvbSAnLi9jb21wb25lbnRzL1VJQ29udHJvbHMnO1xuaW1wb3J0IFVudmVpbEFwcCAgICAgICBmcm9tICcuL2NvbXBvbmVudHMvVW52ZWlsQXBwJztcbmltcG9ydCBjcmVhdGVOYXZpZ2F0b3IgZnJvbSAnLi9jb21wb25lbnRzL05hdmlnYXRvcic7XG5pbXBvcnQgY3JlYXRlUm91dGVyICAgIGZyb20gJy4vY29tcG9uZW50cy9Sb3V0ZXInO1xuXG5jb25zdCBVbnZlaWwgPSB7XG4gIEhpc3RvcnksXG4gIEtleUNvbnRyb2xzLFxuICBQcmVzZW50ZXIsXG4gIFNsaWRlLFxuICBVSUNvbnRyb2xzLFxuICBVbnZlaWxBcHAsXG4gIGNyZWF0ZU5hdmlnYXRvcixcbiAgY3JlYXRlUm91dGVyLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgVW52ZWlsO1xuIl19