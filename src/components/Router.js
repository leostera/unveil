import { Observable, Subject } from 'rxjs';
import 'rx-history';

import '../lib/Utils';

let createRouter = function(opts) {
  // Parametered options
  let { history, map, navigator } = opts;

  let defaultOptions = {
    replaceUri: true
  };
  let options = Object.assign(defaultOptions, opts);


  // __internal
  let subject = new Subject();
  let observables = {};

  /*
   * State Object
   *
   * Having both the current indices and path, and the last
   * indices and path, make it trivial to listen to state changes
   * both on feature code and on tests, and make sure that
   * we are correctly navigating from our last state to our new state.
   */
  let state = {
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

  let fromRouter = (router) => {
    return subject;
  };

  Observable.fromRouter = fromRouter;

  let Path = {
    cleanUp: path => (path.trim()),
    isEmpty: path => (path.length > 0)
  };

  let start = () => {
    subject = subject || new Subject();

    let outAction = (action) => {
      return (e) => e.action !== action;
    };

    observables.history = Observable.fromHistory(history)
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
      .pluck('keys')
      .map(toPaths)
      .distinctUntilChanged()
      //.do((e) => console.log("     replaceUri => before replaceUri", e))
      .subscribe(replaceUri, (e) => {
        console.log("Router unsubscribed from History successfully");
      });
  };

  /*
   * Stops all subscriptions.
   */
  let stop = () => {
    subject.complete();
    Object.keys(observables)
      .map( function (key) { return observables[key]; } )
      .compact()
      .forEach( (f) => f.complete() );
  };

  let asObservable = () => {
    return subject;
  };

  let go = (target) => {
    let parts = Array.isArray(target) && target || toList(target);

    if (options.replaceUri)
      parts = toPaths(parts);

    history.push(buildUri(parts));
  };

  let saveState = (newState) => {
    oldState = state;
    state = {
      last: oldState
    };
  };

  let emitState = (state) => {
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
  let toList = (path) => {
    return path.split("/").compact().map((key) => {
      let n = Number(key);
      return Number.isNaN(n) && key || n;
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
  let walk = (keys, list, filter, mapper, result = []) => {
    if (keys.length < 1 && list) return walk([0], list, filter, mapper, result);
    if (keys.length < 1 || !list) return result;

    let element = list.filter(filter(keys[0])).pop() || list[0];
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
  let buildUri = (path) => {
    return `/${path.join('/')}`;
  };

  let toStateObject = (keys) => ({ keys });

  let withIndices = (state) => Object.assign(state, {
    indices: toIndices(state.keys)
  });

  let withPath = (state) => Object.assign(state, {
    path: buildUri(toPaths(state.keys))
  });

  let withDirections = (state) => {
    if(navigator && navigator.getDirections) {
      return Object.assign(state, {
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
  let toIndices = (keys) => {
    let filter = (key) => {
      return (entry) => (entry.name === key || entry.index === key)

    };
    let mapper = (entry) => entry.index;
    let indices = walk(keys, map, filter, mapper);
    return indices.length > 0 && indices || walk([0], map, filter, mapper);
  };

  /**
   * Returns name-based array presentation of path-array
   *
   * @param keys *[] Path array
   * @returns *[] Name-based path-array
   */
  let toPaths = function (keys) {
    let filter = (key) => {
      return (entry) => (entry.name === key || entry.index === key)
    };
    let mapper = (entry) => (entry.name || entry.index);
    return walk(keys, map, filter, mapper);
  };

  /**
   * Replaces history with path built with keys
   * @param keys *[] Path array
   */
  let replaceUri = function (keys) {
    if(options.replaceUri && !keys.equals(state.path)) {
      let uri = buildUri(keys);
      history.replace(uri);
    }
  };

  return {
    start,
    stop,
    go,
    asObservable
  }
};

export default createRouter;
