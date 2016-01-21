import { Observable, Subject } from 'rxjs';
import 'rx-history';

import '../lib/Utils';

let createRouter = function(opts) {
  // Parametered options
  let { history, map, navigate } = opts;

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
    attemptedPath: "",

    // Last node
    last: {
      // Last node's indices
      indices: [],
      // Last node's path
      path: []
    }
  };

  // We pass in a Routes Map
  // This performs routing on N-dimensions
  //
  //   /slide/subslide
  //   /slide/subslide/trislide/fragments
  //   /users/1/photos/3
  //
  // @todo: Expose navigate function that takes directions
  // and calls an internal Subject producing a "navigate"
  // event that we act upon by checking if the direction
  // is available, looking up the route in the map
  // and performing a history change
  let fromRouter = (router) => {
    return subject;
  };

  Observable.fromRouter = fromRouter;

  let Path = {
    cleanUp: path => (path.trim()),
    isEmpty: path => (path.length > 0)
  };

  let start = () => {
    let outAction = (action) => {
      return (e) => e.action !== action;
    };

    observables.history = Observable.fromHistory(history)
      .filter(outAction('REPLACE'))
      .pluck('pathname')
      .map(Path.cleanUp)
      .distinctUntilChanged()
      .map(toList)
      .do((e) => console.log("before distinct", e))
      .distinctUntilChanged();

    observables.state = observables.history
      .map(toState)
      .do(saveState)
      .subscribe(emitState);

    observables.replaceUri = observables.history
      .do((e) => console.log("before toPaths", e))
      .map(toPaths)
      .do((e) => console.log("before distinct", e))
      .distinctUntilChanged()
      .do((e) => console.log("before replace", e))
      .subscribe(replaceUri);
  };

  /*
   * Stops all subscriptions.
   */
  let stop = () => {
    Object.keys(observables)
      .map( (key) => observables[key].complete )
      .compact()
      .forEach( (f) => f() );
  };

  let asObservable = () => {
    return subject;
  };

  /**
   * @todo: Add tests to see if these are even valid.
   * @param {number[]} target Where to route to
   */
  let jump = (target) => {
    console.log("jumping to", target);
    history.push(buildUri(target));
  };

  /**
   * Returns next state by adding state + nav
   * @param state Current state
   * @param {number[]} nav
   * @returns {number[]} New state
   */
  let nextState = (state, nav) => {
    console.log("next step", state, nav);
    return nav.map((a, i) => state[i] + a)
  };

  /**
   * Navigates by directions
   * @param directions array of directions
   */
  let __navigate = (directions) => {
    navigate(directions, state, jump);
  };

  let toState = (keys) => {
    const indices = toIndices(keys);
    return {
      indices,
      path: buildUri(indices),
      attemptedPath: keys
    }
  };

  let saveState = (newState) => {
    console.log("state", newState);
    oldState = state;
    state = {
      ...newState,
      last: oldState
    };
  };

  /**
   * navigate.0.next => right
   * navigate.1.next => down
   * navigate.2.next => in
   * navigate.3.next => nextFragment
   *
   * navigate.jump(0,2,3)
   * navigate.0.first
   * navigate.0.last
   *
   * State:
   *  {
   *    current: [n, m, ...], // indices
   *    directions: [
   *      { next: [0, 1], previous: 3 },
   *      { next: 0, previous: 2 },
   *      ...
   *    ]
   *  }
   */
  let emitState = (state) => {
    // Extend state with directions
    subject.next({
      ...state,
      directions: nextStates(newState, map)
    });
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
   * @param mapper function Mapper method returning
   * @returns {*[]} Array of mapped entries for each
   *                level of the routing
   */
  let walk = (keys, list, filter, mapper) => {
    if (keys.length < 1 && list) return walk([0], list, filter, mapper);
    if (keys.length < 1 || !list) return;

    return list
      .filter(filter(keys[0]))
      .map( (entry) => [
        mapper(entry),
        walk(keys.slice(1), entry.children, filter, mapper)
      ]).flatten().compact();
  };

  /**
   * Builds uri from path-array by joining with "/" and
   * adding leading "/".
   *
   * @param path *[] Path array
   * @returns {string}
   */
  let buildUri = (path) => {
    return '/' + path.join('/');
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
    console.log("replace", keys, currentPath);
    if(!keys.equals(currentPath))
      history.replace(buildUri(keys));
  };

  return {
    start,
    stop,
    jump,
    navigate,
    asObservable
  }
};

export default createRouter;
