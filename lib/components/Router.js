'use strict';

var _isNan = require('babel-runtime/core-js/number/is-nan');

var _isNan2 = _interopRequireDefault(_isNan);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _rxjs = require('rxjs');

require('rx-history');

require('../lib/Utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createRouter = function createRouter(opts) {
  // Parametered options
  var history = opts.history;
  var map = opts.map;
  var navigator = opts.navigator;

  var defaultOptions = {
    replaceUri: true
  };
  var options = (0, _assign2.default)(defaultOptions, opts);

  // __internal
  var subject = new _rxjs.Subject();
  var observables = {};

  /*
   * State Object
   *
   * Having both the current indices and path, and the last
   * indices and path, make it trivial to listen to state changes
   * both on feature code and on tests, and make sure that
   * we are correctly navigating from our last state to our new state.
   */
  var state = {
    // Current node indices
    indices: [],
    // Current node path if existent
    path: "",
    // Currently attempted path (might differ from final path)
    keys: [],
    // Next available directions from current node
    directions: [],
    // Last node
    last: {} // previous state object
  };

  var fromRouter = function fromRouter(router) {
    return subject;
  };

  _rxjs.Observable.fromRouter = fromRouter;

  var Path = {
    cleanUp: function cleanUp(path) {
      return path.trim();
    },
    isEmpty: function isEmpty(path) {
      return path.length > 0;
    }
  };

  var start = function start() {
    subject = subject || new _rxjs.Subject();

    var outAction = function outAction(action) {
      return function (e) {
        return e.action !== action;
      };
    };

    observables.history = _rxjs.Observable.fromHistory(history)
    //.do((e) => console.log("     history => filter outAction", e))
    .filter(outAction('REPLACE'))
    //.do((e) => console.log("     history => pluck pathname", e))
    .pluck('pathname')
    //.do((e) => console.log("     history => Path.cleanup", e))
    .map(Path.cleanUp)
    //.do((e) => console.log("     history => distinct", e))
    .distinctUntilChanged()
    //.do((e) => console.log("     history => toList", e))
    .map(toList)
    //.do((e) => console.log("     history => distinct", e))
    .distinctUntilChanged()
    //.do((e) => console.log("     state => before toStateObject", e))
    .map(toStateObject)
    //.do((e) => console.log("     state => before withIndices", e))
    .map(withIndices)
    //.do((e) => console.log("     state => before withPath", e))
    .map(withPath)
    //.do((e) => console.log("     state => before withDirections", e))
    .map(withDirections)
    //.do((e) => console.log("     state => before emitState", e))
    .do(emitState)
    //.do((e) => console.log("     replaceUri => before toPaths", e))
    .pluck('keys').map(toPaths).distinctUntilChanged()
    //.do((e) => console.log("     replaceUri => before replaceUri", e))
    .subscribe(replaceUri, function (e) {
      console.log("Router unsubscribed from History successfully");
    });
  };

  /*
   * Stops all subscriptions.
   */
  var stop = function stop() {
    subject.complete();
    (0, _keys2.default)(observables).map(function (key) {
      return observables[key];
    }).compact().forEach(function (f) {
      return f.complete();
    });
  };

  var asObservable = function asObservable() {
    return subject;
  };

  var go = function go(target) {
    var parts = Array.isArray(target) && target || toList(target);

    if (options.replaceUri) parts = toPaths(parts);

    history.push(buildUri(parts));
  };

  var saveState = function saveState(newState) {
    oldState = state;
    state = {
      last: oldState
    };
  };

  var emitState = function emitState(state) {
    subject.next(state);
  };

  /**
   * Returns array representation of path.
   * Casts numeric path-parts to actual integers.
   * in:  "hello/1"
   * out: ["hello", 1]
   *
   * @param {string} path path as string
   * @returns {*[]} Array of path-parts (split by "/")
   */
  var toList = function toList(path) {
    return path.split("/").compact().map(function (key) {
      var n = Number(key);
      return (0, _isNan2.default)(n) && key || n;
    });
  };

  /**
   * Recursively goes through lists, checking if
   * the key passes the filter, and map that
   * with the mapper
   * @param {*[]} keys Array of keys related to the
   *                   levels of the list
   * @param {*[]} list (Nested) array of routes
   * @param {function} filter Filter method used
   *                          for finding the right
   *                          route per level
   * @param {function} mapper Mapper method returning
   * @param {number[]} result Resulting array
   *
   * @returns {*[]} Array of mapped entries for each
   *                level of the routing
   */
  var walk = function walk(keys, list, filter, mapper) {
    var result = arguments.length <= 4 || arguments[4] === undefined ? [] : arguments[4];

    if (keys.length < 1 && list) return walk([0], list, filter, mapper, result);
    if (keys.length < 1 || !list) return result;

    var element = list.filter(filter(keys[0])).pop() || list[0];
    result.push(mapper(element));

    return walk(keys.slice(1), element.children, filter, mapper, result);
  };

  /**
   * Builds uri from path-array by joining with "/" and
   * adding leading "/".
   *
   * @param path *[] Path array
   * @returns {string}
   */
  var buildUri = function buildUri(path) {
    return '/' + path.join('/');
  };

  var toStateObject = function toStateObject(keys) {
    return { keys: keys };
  };

  var withIndices = function withIndices(state) {
    return (0, _assign2.default)(state, {
      indices: toIndices(state.keys)
    });
  };

  var withPath = function withPath(state) {
    return (0, _assign2.default)(state, {
      path: buildUri(toPaths(state.keys))
    });
  };

  var withDirections = function withDirections(state) {
    if (navigator && navigator.getDirections) {
      return (0, _assign2.default)(state, {
        directions: navigator.getDirections(state.indices, map)
      });
    }
    return state;
  };

  /**
   * Returns integer-array representation of path-array.
   *
   * in:  ["hello", 0]
   * out: [1, 0]
   *
   * @param keys *[] Path array
   * @returns number[] Index-based path-array
   */
  var toIndices = function toIndices(keys) {
    var filter = function filter(key) {
      return function (entry) {
        return entry.name === key || entry.index === key;
      };
    };
    var mapper = function mapper(entry) {
      return entry.index;
    };
    var indices = walk(keys, map, filter, mapper);
    return indices.length > 0 && indices || walk([0], map, filter, mapper);
  };

  /**
   * Returns name-based array presentation of path-array
   *
   * @param keys *[] Path array
   * @returns *[] Name-based path-array
   */
  var toPaths = function toPaths(keys) {
    var filter = function filter(key) {
      return function (entry) {
        return entry.name === key || entry.index === key;
      };
    };
    var mapper = function mapper(entry) {
      return entry.name || entry.index;
    };
    return walk(keys, map, filter, mapper);
  };

  /**
   * Replaces history with path built with keys
   * @param keys *[] Path array
   */
  var replaceUri = function replaceUri(keys) {
    if (options.replaceUri && !keys.equals(state.path)) {
      var uri = buildUri(keys);
      history.replace(uri);
    }
  };

  return {
    start: start,
    stop: stop,
    go: go,
    asObservable: asObservable
  };
};

exports.default = createRouter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL1JvdXRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUtBLElBQUksZUFBZSxTQUFmLFlBQWUsQ0FBUyxJQUFULEVBQWU7O01BRTFCLFVBQTRCLEtBQTVCLFFBRjBCO01BRWpCLE1BQW1CLEtBQW5CLElBRmlCO01BRVosWUFBYyxLQUFkLFVBRlk7O0FBSWhDLE1BQUksaUJBQWlCO0FBQ25CLGdCQUFZLElBQVo7R0FERSxDQUo0QjtBQU9oQyxNQUFJLFVBQVUsc0JBQWMsY0FBZCxFQUE4QixJQUE5QixDQUFWOzs7QUFQNEIsTUFXNUIsVUFBVSxtQkFBVixDQVg0QjtBQVloQyxNQUFJLGNBQWMsRUFBZDs7Ozs7Ozs7OztBQVo0QixNQXNCNUIsUUFBUTs7QUFFVixhQUFTLEVBQVQ7O0FBRUEsVUFBTSxFQUFOOztBQUVBLFVBQU0sRUFBTjs7QUFFQSxnQkFBWSxFQUFaOztBQUVBLFVBQU0sRUFBTjtBQVZVLEdBQVIsQ0F0QjRCOztBQW1DaEMsTUFBSSxhQUFhLFNBQWIsVUFBYSxDQUFDLE1BQUQsRUFBWTtBQUMzQixXQUFPLE9BQVAsQ0FEMkI7R0FBWixDQW5DZTs7QUF1Q2hDLG1CQUFXLFVBQVgsR0FBd0IsVUFBeEIsQ0F2Q2dDOztBQXlDaEMsTUFBSSxPQUFPO0FBQ1QsYUFBUzthQUFTLEtBQUssSUFBTDtLQUFUO0FBQ1QsYUFBUzthQUFTLEtBQUssTUFBTCxHQUFjLENBQWQ7S0FBVDtHQUZQLENBekM0Qjs7QUE4Q2hDLE1BQUksUUFBUSxTQUFSLEtBQVEsR0FBTTtBQUNoQixjQUFVLFdBQVcsbUJBQVgsQ0FETTs7QUFHaEIsUUFBSSxZQUFZLFNBQVosU0FBWSxDQUFDLE1BQUQsRUFBWTtBQUMxQixhQUFPLFVBQUMsQ0FBRDtlQUFPLEVBQUUsTUFBRixLQUFhLE1BQWI7T0FBUCxDQURtQjtLQUFaLENBSEE7O0FBT2hCLGdCQUFZLE9BQVosR0FBc0IsaUJBQVcsV0FB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LFVBSEs7QUFJTCw4QkFKSztHQUFQLENBN09nQztDQUFmOztrQkFxUEoiLCJmaWxlIjoiUm91dGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0ICdyeC1oaXN0b3J5JztcblxuaW1wb3J0ICcuLi9saWIvVXRpbHMnO1xuXG5sZXQgY3JlYXRlUm91dGVyID0gZnVuY3Rpb24ob3B0cykge1xuICAvLyBQYXJhbWV0ZXJlZCBvcHRpb25zXG4gIGxldCB7IGhpc3RvcnksIG1hcCwgbmF2aWdhdG9yIH0gPSBvcHRzO1xuXG4gIGxldCBkZWZhdWx0T3B0aW9ucyA9IHtcbiAgICByZXBsYWNlVXJpOiB0cnVlXG4gIH07XG4gIGxldCBvcHRpb25zID0gT2JqZWN0LmFzc2lnbihkZWZhdWx0T3B0aW9ucywgb3B0cyk7XG5cblxuICAvLyBfX2ludGVybmFsXG4gIGxldCBzdWJqZWN0ID0gbmV3IFN1YmplY3QoKTtcbiAgbGV0IG9ic2VydmFibGVzID0ge307XG5cbiAgLypcbiAgICogU3RhdGUgT2JqZWN0XG4gICAqXG4gICAqIEhhdmluZyBib3RoIHRoZSBjdXJyZW50IGluZGljZXMgYW5kIHBhdGgsIGFuZCB0aGUgbGFzdFxuICAgKiBpbmRpY2VzIGFuZCBwYXRoLCBtYWtlIGl0IHRyaXZpYWwgdG8gbGlzdGVuIHRvIHN0YXRlIGNoYW5nZXNcbiAgICogYm90aCBvbiBmZWF0dXJlIGNvZGUgYW5kIG9uIHRlc3RzLCBhbmQgbWFrZSBzdXJlIHRoYXRcbiAgICogd2UgYXJlIGNvcnJlY3RseSBuYXZpZ2F0aW5nIGZyb20gb3VyIGxhc3Qgc3RhdGUgdG8gb3VyIG5ldyBzdGF0ZS5cbiAgICovXG4gIGxldCBzdGF0ZSA9IHtcbiAgICAvLyBDdXJyZW50IG5vZGUgaW5kaWNlc1xuICAgIGluZGljZXM6IFtdLFxuICAgIC8vIEN1cnJlbnQgbm9kZSBwYXRoIGlmIGV4aXN0ZW50XG4gICAgcGF0aDogXCJcIixcbiAgICAvLyBDdXJyZW50bHkgYXR0ZW1wdGVkIHBhdGggKG1pZ2h0IGRpZmZlciBmcm9tIGZpbmFsIHBhdGgpXG4gICAga2V5czogW10sXG4gICAgLy8gTmV4dCBhdmFpbGFibGUgZGlyZWN0aW9ucyBmcm9tIGN1cnJlbnQgbm9kZVxuICAgIGRpcmVjdGlvbnM6IFtdLFxuICAgIC8vIExhc3Qgbm9kZVxuICAgIGxhc3Q6IHt9IC8vIHByZXZpb3VzIHN0YXRlIG9iamVjdFxuICB9O1xuXG4gIGxldCBmcm9tUm91dGVyID0gKHJvdXRlcikgPT4ge1xuICAgIHJldHVybiBzdWJqZWN0O1xuICB9O1xuXG4gIE9ic2VydmFibGUuZnJvbVJvdXRlciA9IGZyb21Sb3V0ZXI7XG5cbiAgbGV0IFBhdGggPSB7XG4gICAgY2xlYW5VcDogcGF0aCA9PiAocGF0aC50cmltKCkpLFxuICAgIGlzRW1wdHk6IHBhdGggPT4gKHBhdGgubGVuZ3RoID4gMClcbiAgfTtcblxuICBsZXQgc3RhcnQgPSAoKSA9PiB7XG4gICAgc3ViamVjdCA9IHN1YmplY3QgfHwgbmV3IFN1YmplY3QoKTtcblxuICAgIGxldCBvdXRBY3Rpb24gPSAoYWN0aW9uKSA9PiB7XG4gICAgICByZXR1cm4gKGUpID0+IGUuYWN0aW9uICE9PSBhY3Rpb247XG4gICAgfTtcblxuICAgIG9ic2VydmFibGVzLmhpc3RvcnkgPSBPYnNlcnZhYmxlLmZyb21IaXN0b3J5KGhpc3RvcnkpXG4gICAgICAvLy5kbygoZSkgPT4gY29uc29sZS5sb2coXCIgICAgIGhpc3RvcnkgPT4gZmlsdGVyIG91dEFjdGlvblwiLCBlKSlcbiAgICAgIC5maWx0ZXIob3V0QWN0aW9uKCdSRVBMQUNFJykpXG4gICAgICAvLy5kbygoZSkgPT4gY29uc29sZS5sb2coXCIgICAgIGhpc3RvcnkgPT4gcGx1Y2sgcGF0aG5hbWVcIiwgZSkpXG4gICAgICAucGx1Y2soJ3BhdGhuYW1lJylcbiAgICAgIC8vLmRvKChlKSA9PiBjb25zb2xlLmxvZyhcIiAgICAgaGlzdG9yeSA9PiBQYXRoLmNsZWFudXBcIiwgZSkpXG4gICAgICAubWFwKFBhdGguY2xlYW5VcClcbiAgICAgIC8vLmRvKChlKSA9PiBjb25zb2xlLmxvZyhcIiAgICAgaGlzdG9yeSA9PiBkaXN0aW5jdFwiLCBlKSlcbiAgICAgIC5kaXN0aW5jdFVudGlsQ2hhbmdlZCgpXG4gICAgICAvLy5kbygoZSkgPT4gY29uc29sZS5sb2coXCIgICAgIGhpc3RvcnkgPT4gdG9MaXN0XCIsIGUpKVxuICAgICAgLm1hcCh0b0xpc3QpXG4gICAgICAvLy5kbygoZSkgPT4gY29uc29sZS5sb2coXCIgICAgIGhpc3RvcnkgPT4gZGlzdGluY3RcIiwgZSkpXG4gICAgICAuZGlzdGluY3RVbnRpbENoYW5nZWQoKVxuICAgICAgLy8uZG8oKGUpID0+IGNvbnNvbGUubG9nKFwiICAgICBzdGF0ZSA9PiBiZWZvcmUgdG9TdGF0ZU9iamVjdFwiLCBlKSlcbiAgICAgIC5tYXAodG9TdGF0ZU9iamVjdClcbiAgICAgIC8vLmRvKChlKSA9PiBjb25zb2xlLmxvZyhcIiAgICAgc3RhdGUgPT4gYmVmb3JlIHdpdGhJbmRpY2VzXCIsIGUpKVxuICAgICAgLm1hcCh3aXRoSW5kaWNlcylcbiAgICAgIC8vLmRvKChlKSA9PiBjb25zb2xlLmxvZyhcIiAgICAgc3RhdGUgPT4gYmVmb3JlIHdpdGhQYXRoXCIsIGUpKVxuICAgICAgLm1hcCh3aXRoUGF0aClcbiAgICAgIC8vLmRvKChlKSA9PiBjb25zb2xlLmxvZyhcIiAgICAgc3RhdGUgPT4gYmVmb3JlIHdpdGhEaXJlY3Rpb25zXCIsIGUpKVxuICAgICAgLm1hcCh3aXRoRGlyZWN0aW9ucylcbiAgICAgIC8vLmRvKChlKSA9PiBjb25zb2xlLmxvZyhcIiAgICAgc3RhdGUgPT4gYmVmb3JlIGVtaXRTdGF0ZVwiLCBlKSlcbiAgICAgIC5kbyhlbWl0U3RhdGUpXG4gICAgICAvLy5kbygoZSkgPT4gY29uc29sZS5sb2coXCIgICAgIHJlcGxhY2VVcmkgPT4gYmVmb3JlIHRvUGF0aHNcIiwgZSkpXG4gICAgICAucGx1Y2soJ2tleXMnKVxuICAgICAgLm1hcCh0b1BhdGhzKVxuICAgICAgLmRpc3RpbmN0VW50aWxDaGFuZ2VkKClcbiAgICAgIC8vLmRvKChlKSA9PiBjb25zb2xlLmxvZyhcIiAgICAgcmVwbGFjZVVyaSA9PiBiZWZvcmUgcmVwbGFjZVVyaVwiLCBlKSlcbiAgICAgIC5zdWJzY3JpYmUocmVwbGFjZVVyaSwgKGUpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJSb3V0ZXIgdW5zdWJzY3JpYmVkIGZyb20gSGlzdG9yeSBzdWNjZXNzZnVsbHlcIik7XG4gICAgICB9KTtcbiAgfTtcblxuICAvKlxuICAgKiBTdG9wcyBhbGwgc3Vic2NyaXB0aW9ucy5cbiAgICovXG4gIGxldCBzdG9wID0gKCkgPT4ge1xuICAgIHN1YmplY3QuY29tcGxldGUoKTtcbiAgICBPYmplY3Qua2V5cyhvYnNlcnZhYmxlcylcbiAgICAgIC5tYXAoIGZ1bmN0aW9uIChrZXkpIHsgcmV0dXJuIG9ic2VydmFibGVzW2tleV07IH0gKVxuICAgICAgLmNvbXBhY3QoKVxuICAgICAgLmZvckVhY2goIChmKSA9PiBmLmNvbXBsZXRlKCkgKTtcbiAgfTtcblxuICBsZXQgYXNPYnNlcnZhYmxlID0gKCkgPT4ge1xuICAgIHJldHVybiBzdWJqZWN0O1xuICB9O1xuXG4gIGxldCBnbyA9ICh0YXJnZXQpID0+IHtcbiAgICBsZXQgcGFydHMgPSBBcnJheS5pc0FycmF5KHRhcmdldCkgJiYgdGFyZ2V0IHx8IHRvTGlzdCh0YXJnZXQpO1xuXG4gICAgaWYgKG9wdGlvbnMucmVwbGFjZVVyaSlcbiAgICAgIHBhcnRzID0gdG9QYXRocyhwYXJ0cyk7XG5cbiAgICBoaXN0b3J5LnB1c2goYnVpbGRVcmkocGFydHMpKTtcbiAgfTtcblxuICBsZXQgc2F2ZVN0YXRlID0gKG5ld1N0YXRlKSA9PiB7XG4gICAgb2xkU3RhdGUgPSBzdGF0ZTtcbiAgICBzdGF0ZSA9IHtcbiAgICAgIGxhc3Q6IG9sZFN0YXRlXG4gICAgfTtcbiAgfTtcblxuICBsZXQgZW1pdFN0YXRlID0gKHN0YXRlKSA9PiB7XG4gICAgc3ViamVjdC5uZXh0KHN0YXRlKTtcbiAgfTtcblxuICAvKipcbiAgICogUmV0dXJucyBhcnJheSByZXByZXNlbnRhdGlvbiBvZiBwYXRoLlxuICAgKiBDYXN0cyBudW1lcmljIHBhdGgtcGFydHMgdG8gYWN0dWFsIGludGVnZXJzLlxuICAgKiBpbjogIFwiaGVsbG8vMVwiXG4gICAqIG91dDogW1wiaGVsbG9cIiwgMV1cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHBhdGggcGF0aCBhcyBzdHJpbmdcbiAgICogQHJldHVybnMgeypbXX0gQXJyYXkgb2YgcGF0aC1wYXJ0cyAoc3BsaXQgYnkgXCIvXCIpXG4gICAqL1xuICBsZXQgdG9MaXN0ID0gKHBhdGgpID0+IHtcbiAgICByZXR1cm4gcGF0aC5zcGxpdChcIi9cIikuY29tcGFjdCgpLm1hcCgoa2V5KSA9PiB7XG4gICAgICBsZXQgbiA9IE51bWJlcihrZXkpO1xuICAgICAgcmV0dXJuIE51bWJlci5pc05hTihuKSAmJiBrZXkgfHwgbjtcbiAgICB9KTtcbiAgfTtcblxuICAvKipcbiAgICogUmVjdXJzaXZlbHkgZ29lcyB0aHJvdWdoIGxpc3RzLCBjaGVja2luZyBpZlxuICAgKiB0aGUga2V5IHBhc3NlcyB0aGUgZmlsdGVyLCBhbmQgbWFwIHRoYXRcbiAgICogd2l0aCB0aGUgbWFwcGVyXG4gICAqIEBwYXJhbSB7KltdfSBrZXlzIEFycmF5IG9mIGtleXMgcmVsYXRlZCB0byB0aGVcbiAgICogICAgICAgICAgICAgICAgICAgbGV2ZWxzIG9mIHRoZSBsaXN0XG4gICAqIEBwYXJhbSB7KltdfSBsaXN0IChOZXN0ZWQpIGFycmF5IG9mIHJvdXRlc1xuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBmaWx0ZXIgRmlsdGVyIG1ldGhvZCB1c2VkXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgZmluZGluZyB0aGUgcmlnaHRcbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgIHJvdXRlIHBlciBsZXZlbFxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBtYXBwZXIgTWFwcGVyIG1ldGhvZCByZXR1cm5pbmdcbiAgICogQHBhcmFtIHtudW1iZXJbXX0gcmVzdWx0IFJlc3VsdGluZyBhcnJheVxuICAgKlxuICAgKiBAcmV0dXJucyB7KltdfSBBcnJheSBvZiBtYXBwZWQgZW50cmllcyBmb3IgZWFjaFxuICAgKiAgICAgICAgICAgICAgICBsZXZlbCBvZiB0aGUgcm91dGluZ1xuICAgKi9cbiAgbGV0IHdhbGsgPSAoa2V5cywgbGlzdCwgZmlsdGVyLCBtYXBwZXIsIHJlc3VsdCA9IFtdKSA9PiB7XG4gICAgaWYgKGtleXMubGVuZ3RoIDwgMSAmJiBsaXN0KSByZXR1cm4gd2FsayhbMF0sIGxpc3QsIGZpbHRlciwgbWFwcGVyLCByZXN1bHQpO1xuICAgIGlmIChrZXlzLmxlbmd0aCA8IDEgfHwgIWxpc3QpIHJldHVybiByZXN1bHQ7XG5cbiAgICBsZXQgZWxlbWVudCA9IGxpc3QuZmlsdGVyKGZpbHRlcihrZXlzWzBdKSkucG9wKCkgfHwgbGlzdFswXTtcbiAgICByZXN1bHQucHVzaChtYXBwZXIoZWxlbWVudCkpO1xuXG4gICAgcmV0dXJuIHdhbGsoa2V5cy5zbGljZSgxKSwgZWxlbWVudC5jaGlsZHJlbiwgZmlsdGVyLCBtYXBwZXIsIHJlc3VsdCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEJ1aWxkcyB1cmkgZnJvbSBwYXRoLWFycmF5IGJ5IGpvaW5pbmcgd2l0aCBcIi9cIiBhbmRcbiAgICogYWRkaW5nIGxlYWRpbmcgXCIvXCIuXG4gICAqXG4gICAqIEBwYXJhbSBwYXRoICpbXSBQYXRoIGFycmF5XG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAqL1xuICBsZXQgYnVpbGRVcmkgPSAocGF0aCkgPT4ge1xuICAgIHJldHVybiBgLyR7cGF0aC5qb2luKCcvJyl9YDtcbiAgfTtcblxuICBsZXQgdG9TdGF0ZU9iamVjdCA9IChrZXlzKSA9PiAoeyBrZXlzIH0pO1xuXG4gIGxldCB3aXRoSW5kaWNlcyA9IChzdGF0ZSkgPT4gT2JqZWN0LmFzc2lnbihzdGF0ZSwge1xuICAgIGluZGljZXM6IHRvSW5kaWNlcyhzdGF0ZS5rZXlzKVxuICB9KTtcblxuICBsZXQgd2l0aFBhdGggPSAoc3RhdGUpID0+IE9iamVjdC5hc3NpZ24oc3RhdGUsIHtcbiAgICBwYXRoOiBidWlsZFVyaSh0b1BhdGhzKHN0YXRlLmtleXMpKVxuICB9KTtcblxuICBsZXQgd2l0aERpcmVjdGlvbnMgPSAoc3RhdGUpID0+IHtcbiAgICBpZihuYXZpZ2F0b3IgJiYgbmF2aWdhdG9yLmdldERpcmVjdGlvbnMpIHtcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHN0YXRlLCB7XG4gICAgICAgIGRpcmVjdGlvbnM6IG5hdmlnYXRvci5nZXREaXJlY3Rpb25zKHN0YXRlLmluZGljZXMsIG1hcClcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gc3RhdGU7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJldHVybnMgaW50ZWdlci1hcnJheSByZXByZXNlbnRhdGlvbiBvZiBwYXRoLWFycmF5LlxuICAgKlxuICAgKiBpbjogIFtcImhlbGxvXCIsIDBdXG4gICAqIG91dDogWzEsIDBdXG4gICAqXG4gICAqIEBwYXJhbSBrZXlzICpbXSBQYXRoIGFycmF5XG4gICAqIEByZXR1cm5zIG51bWJlcltdIEluZGV4LWJhc2VkIHBhdGgtYXJyYXlcbiAgICovXG4gIGxldCB0b0luZGljZXMgPSAoa2V5cykgPT4ge1xuICAgIGxldCBmaWx0ZXIgPSAoa2V5KSA9PiB7XG4gICAgICByZXR1cm4gKGVudHJ5KSA9PiAoZW50cnkubmFtZSA9PT0ga2V5IHx8IGVudHJ5LmluZGV4ID09PSBrZXkpXG5cbiAgICB9O1xuICAgIGxldCBtYXBwZXIgPSAoZW50cnkpID0+IGVudHJ5LmluZGV4O1xuICAgIGxldCBpbmRpY2VzID0gd2FsayhrZXlzLCBtYXAsIGZpbHRlciwgbWFwcGVyKTtcbiAgICByZXR1cm4gaW5kaWNlcy5sZW5ndGggPiAwICYmIGluZGljZXMgfHwgd2FsayhbMF0sIG1hcCwgZmlsdGVyLCBtYXBwZXIpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIG5hbWUtYmFzZWQgYXJyYXkgcHJlc2VudGF0aW9uIG9mIHBhdGgtYXJyYXlcbiAgICpcbiAgICogQHBhcmFtIGtleXMgKltdIFBhdGggYXJyYXlcbiAgICogQHJldHVybnMgKltdIE5hbWUtYmFzZWQgcGF0aC1hcnJheVxuICAgKi9cbiAgbGV0IHRvUGF0aHMgPSBmdW5jdGlvbiAoa2V5cykge1xuICAgIGxldCBmaWx0ZXIgPSAoa2V5KSA9PiB7XG4gICAgICByZXR1cm4gKGVudHJ5KSA9PiAoZW50cnkubmFtZSA9PT0ga2V5IHx8IGVudHJ5LmluZGV4ID09PSBrZXkpXG4gICAgfTtcbiAgICBsZXQgbWFwcGVyID0gKGVudHJ5KSA9PiAoZW50cnkubmFtZSB8fCBlbnRyeS5pbmRleCk7XG4gICAgcmV0dXJuIHdhbGsoa2V5cywgbWFwLCBmaWx0ZXIsIG1hcHBlcik7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJlcGxhY2VzIGhpc3Rvcnkgd2l0aCBwYXRoIGJ1aWx0IHdpdGgga2V5c1xuICAgKiBAcGFyYW0ga2V5cyAqW10gUGF0aCBhcnJheVxuICAgKi9cbiAgbGV0IHJlcGxhY2VVcmkgPSBmdW5jdGlvbiAoa2V5cykge1xuICAgIGlmKG9wdGlvbnMucmVwbGFjZVVyaSAmJiAha2V5cy5lcXVhbHMoc3RhdGUucGF0aCkpIHtcbiAgICAgIGxldCB1cmkgPSBidWlsZFVyaShrZXlzKTtcbiAgICAgIGhpc3RvcnkucmVwbGFjZSh1cmkpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4ge1xuICAgIHN0YXJ0LFxuICAgIHN0b3AsXG4gICAgZ28sXG4gICAgYXNPYnNlcnZhYmxlXG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZVJvdXRlcjtcbiJdfQ==