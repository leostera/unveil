'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _rxjs = require('rxjs');

var createNavigator = function createNavigator() {
  var subject = new _rxjs.Subject();

  /**
   * Returns possible directions from state on each level.
   * If we are at state [1, 0] depending on the map, the
   * result might look something like this:
   * [
   *    {
   *      next: [2],
   *      previous: [0]
   *    },
   *    {
   *      next: [1, 1],
   *      previous: false
   *    }
   * ]
   *
   * @param {number[]} state State for which to return the directions
   * @param {*[]} elements Elements to go through
   * @param {number} level Depth of recursion. Defaults to 0
   * @return {[directions]} List of direcitons object
   */
  var getDirections = function getDirections(state, elements) {
    var level = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];

    if (level === state.length) return [];

    var index = state[level];
    var stateLevel = state.slice(0, level);
    var result = [getDirectionObject(elements, index, stateLevel)];

    return result.concat(getDirections(state, elements[index].children, level + 1));
  };

  /**
   * Builds the direction object for one level.
   *
   * @param {*[]} elements Elements to look into
   * @param {number} index index of state at this level
   * @param {number[]} stateLevel state until level
   *
   * @returns {{next, previous}} object with indices of
   * next and previous indices. See @getIndex
   */
  var getDirectionObject = function getDirectionObject(elements, index, stateLevel) {
    return {
      next: getIndex(elements, index + 1, stateLevel),
      previous: getIndex(elements, index - 1, stateLevel)
    };
  };

  /**
   * Returns the new state based on index or false, if
   * the state does not exist
   *
   * @param {*[]} elements
   * @param {number} index
   * @param {number[]} stateLevel state
   * @returns {boolean|number[]} state list or false
   */
  var getIndex = function getIndex(elements, index, stateLevel) {
    return elements[index] !== undefined && stateLevel.concat([index]) || false;
  };

  var asObservable = function asObservable() {
    return subject;
  };

  return {
    getDirections: getDirections,
    asObservable: asObservable
  };
};

exports.default = createNavigator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL05hdmlnYXRvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUVBLElBQUksa0JBQWtCLFNBQWxCLGVBQWtCLEdBQU07QUFDMUIsTUFBSSxVQUFVLG1CQUFWOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRHNCLE1BdUJ0QixnQkFBZ0IsU0FBaEIsYUFBZ0IsQ0FBQyxLQUFELEVBQVEsUUFBUixFQUFnQztRQUFkLDhEQUFRLGlCQUFNOztBQUNsRCxRQUFJLFVBQVcsTUFBTSxNQUFOLEVBQWMsT0FBTyxFQUFQLENBQTdCOztBQUVBLFFBQUksUUFBUSxNQUFNLEtBQU4sQ0FBUixDQUg4QztBQUlsRCxRQUFJLGFBQWEsTUFBTSxLQUFOLENBQVksQ0FBWixFQUFlLEtBQWYsQ0FBYixDQUo4QztBQUtsRCxRQUFJLFNBQVMsQ0FBQyxtQkFBbUIsUUFBbkIsRUFBNkIsS0FBN0IsRUFBb0MsVUFBcEMsQ0FBRCxDQUFULENBTDhDOztBQU9sRCxXQUFPLE9BQU8sTUFBUCxDQUFjLGNBQWMsS0FBZCxFQUFxQixTQUFTLEtBQVQsRUFBZ0IsUUFBaEIsRUFBMEIsUUFBUSxDQUFSLENBQTdELENBQVAsQ0FQa0Q7R0FBaEM7Ozs7Ozs7Ozs7OztBQXZCTSxNQTJDdEIscUJBQXFCLFNBQXJCLGtCQUFxQixDQUFDLFFBQUQsRUFBVyxLQUFYLEVBQWtCLFVBQWxCLEVBQWlDO0FBQ3hELFdBQU87QUFDTCxZQUFNLFNBQVMsUUFBVCxFQUFtQixRQUFRLENBQVIsRUFBVyxVQUE5QixDQUFOO0FBQ0EsZ0JBQVUsU0FBUyxRQUFULEVBQW1CLFFBQVEsQ0FBUixFQUFXLFVBQTlCLENBQVY7S0FGRixDQUR3RDtHQUFqQzs7Ozs7Ozs7Ozs7QUEzQ0MsTUEyRHRCLFdBQVcsU0FBWCxRQUFXLENBQUMsUUFBRCxFQUFXLEtBQVgsRUFBa0IsVUFBbEIsRUFBaUM7QUFDOUMsV0FBTyxTQUFTLEtBQVQsTUFBb0IsU0FBcEIsSUFBaUMsV0FBVyxNQUFYLENBQWtCLENBQUMsS0FBRCxDQUFsQixDQUFqQyxJQUErRCxLQUEvRCxDQUR1QztHQUFqQyxDQTNEVzs7QUErRDFCLE1BQUksZUFBZSxTQUFmLFlBQWUsR0FBTTtBQUN2QixXQUFPLE9BQVAsQ0FEdUI7R0FBTixDQS9ETzs7QUFtRTFCLFNBQU87QUFDTCxnQ0FESztBQUVMLDhCQUZLO0dBQVAsQ0FuRTBCO0NBQU47O2tCQXlFUCIsImZpbGUiOiJOYXZpZ2F0b3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbmxldCBjcmVhdGVOYXZpZ2F0b3IgPSAoKSA9PiB7XG4gIGxldCBzdWJqZWN0ID0gbmV3IFN1YmplY3QoKTtcblxuICAvKipcbiAgICogUmV0dXJucyBwb3NzaWJsZSBkaXJlY3Rpb25zIGZyb20gc3RhdGUgb24gZWFjaCBsZXZlbC5cbiAgICogSWYgd2UgYXJlIGF0IHN0YXRlIFsxLCAwXSBkZXBlbmRpbmcgb24gdGhlIG1hcCwgdGhlXG4gICAqIHJlc3VsdCBtaWdodCBsb29rIHNvbWV0aGluZyBsaWtlIHRoaXM6XG4gICAqIFtcbiAgICogICAge1xuICAgKiAgICAgIG5leHQ6IFsyXSxcbiAgICogICAgICBwcmV2aW91czogWzBdXG4gICAqICAgIH0sXG4gICAqICAgIHtcbiAgICogICAgICBuZXh0OiBbMSwgMV0sXG4gICAqICAgICAgcHJldmlvdXM6IGZhbHNlXG4gICAqICAgIH1cbiAgICogXVxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcltdfSBzdGF0ZSBTdGF0ZSBmb3Igd2hpY2ggdG8gcmV0dXJuIHRoZSBkaXJlY3Rpb25zXG4gICAqIEBwYXJhbSB7KltdfSBlbGVtZW50cyBFbGVtZW50cyB0byBnbyB0aHJvdWdoXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBsZXZlbCBEZXB0aCBvZiByZWN1cnNpb24uIERlZmF1bHRzIHRvIDBcbiAgICogQHJldHVybiB7W2RpcmVjdGlvbnNdfSBMaXN0IG9mIGRpcmVjaXRvbnMgb2JqZWN0XG4gICAqL1xuICBsZXQgZ2V0RGlyZWN0aW9ucyA9IChzdGF0ZSwgZWxlbWVudHMsIGxldmVsID0gMCkgPT4ge1xuICAgIGlmIChsZXZlbCAgPT09IHN0YXRlLmxlbmd0aCkgcmV0dXJuIFtdO1xuXG4gICAgbGV0IGluZGV4ID0gc3RhdGVbbGV2ZWxdO1xuICAgIGxldCBzdGF0ZUxldmVsID0gc3RhdGUuc2xpY2UoMCwgbGV2ZWwpO1xuICAgIGxldCByZXN1bHQgPSBbZ2V0RGlyZWN0aW9uT2JqZWN0KGVsZW1lbnRzLCBpbmRleCwgc3RhdGVMZXZlbCldO1xuXG4gICAgcmV0dXJuIHJlc3VsdC5jb25jYXQoZ2V0RGlyZWN0aW9ucyhzdGF0ZSwgZWxlbWVudHNbaW5kZXhdLmNoaWxkcmVuLCBsZXZlbCArIDEpKTtcbiAgfTtcblxuICAvKipcbiAgICogQnVpbGRzIHRoZSBkaXJlY3Rpb24gb2JqZWN0IGZvciBvbmUgbGV2ZWwuXG4gICAqXG4gICAqIEBwYXJhbSB7KltdfSBlbGVtZW50cyBFbGVtZW50cyB0byBsb29rIGludG9cbiAgICogQHBhcmFtIHtudW1iZXJ9IGluZGV4IGluZGV4IG9mIHN0YXRlIGF0IHRoaXMgbGV2ZWxcbiAgICogQHBhcmFtIHtudW1iZXJbXX0gc3RhdGVMZXZlbCBzdGF0ZSB1bnRpbCBsZXZlbFxuICAgKlxuICAgKiBAcmV0dXJucyB7e25leHQsIHByZXZpb3VzfX0gb2JqZWN0IHdpdGggaW5kaWNlcyBvZlxuICAgKiBuZXh0IGFuZCBwcmV2aW91cyBpbmRpY2VzLiBTZWUgQGdldEluZGV4XG4gICAqL1xuICBsZXQgZ2V0RGlyZWN0aW9uT2JqZWN0ID0gKGVsZW1lbnRzLCBpbmRleCwgc3RhdGVMZXZlbCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuZXh0OiBnZXRJbmRleChlbGVtZW50cywgaW5kZXggKyAxLCBzdGF0ZUxldmVsKSxcbiAgICAgIHByZXZpb3VzOiBnZXRJbmRleChlbGVtZW50cywgaW5kZXggLSAxLCBzdGF0ZUxldmVsKVxuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgbmV3IHN0YXRlIGJhc2VkIG9uIGluZGV4IG9yIGZhbHNlLCBpZlxuICAgKiB0aGUgc3RhdGUgZG9lcyBub3QgZXhpc3RcbiAgICpcbiAgICogQHBhcmFtIHsqW119IGVsZW1lbnRzXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleFxuICAgKiBAcGFyYW0ge251bWJlcltdfSBzdGF0ZUxldmVsIHN0YXRlXG4gICAqIEByZXR1cm5zIHtib29sZWFufG51bWJlcltdfSBzdGF0ZSBsaXN0IG9yIGZhbHNlXG4gICAqL1xuICBsZXQgZ2V0SW5kZXggPSAoZWxlbWVudHMsIGluZGV4LCBzdGF0ZUxldmVsKSA9PiB7XG4gICAgcmV0dXJuIGVsZW1lbnRzW2luZGV4XSAhPT0gdW5kZWZpbmVkICYmIHN0YXRlTGV2ZWwuY29uY2F0KFtpbmRleF0pIHx8IGZhbHNlO1xuICB9O1xuXG4gIGxldCBhc09ic2VydmFibGUgPSAoKSA9PiB7XG4gICAgcmV0dXJuIHN1YmplY3Q7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGdldERpcmVjdGlvbnMsXG4gICAgYXNPYnNlcnZhYmxlLFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlTmF2aWdhdG9yO1xuIl19