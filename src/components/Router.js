import { Observable, Subject } from 'rxjs';
import 'rx-history';

import '../lib/Utils';

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
  return __Router.subject;
};
Observable.fromRouter = fromRouter;

let Path = {
  cleanUp: path => (path.trim()),
  isEmpty: path => (path.length > 0),
};

let start = function () {
  let outAction = (action) => {
    return (e) => e.action !== action;
  };

  // @todo: split this into two streams after map(toList)
  //
  //  1. if there's some indices,
  //     map them to paths,
  //     replaceUri
  //
  //  2. if there's some paths,
  //     map them to indices,
  //     build state,
  //     emit
  this.subscription = Observable.fromHistory(this.history)
    .filter(outAction("REPLACE"))
    .pluck("pathname")
    .map(Path.cleanUp)
    .distinctUntilChanged()
    .map(toList)
    .distinctUntilChanged()
    .map(this.toIndices.bind(this))
    .do(this.saveState.bind(this))
    .do(this.emitState.bind(this))
    .map(this.toPaths.bind(this))
    .distinctUntilChanged()
    .subscribe(this.replaceUri.bind(this));
    //.map(this.toDirections)
}

let buildUri = function (path) {
  return '/' + path.join('/');
}

/**
 * @todo: Add tests to see if these are even valid.
 * @param target Where to route to
 */
let jump = function (target) {
  console.log("jumping to", target);
  this.history.push(buildUri(target));
}

let nextState = (state, nav) => {
  return nav.map((a, i) => state[i] + a)
}

let navigate = function (target) {
  this.jump(nextState(this.state, target));
}

let saveState = function (state) {
  this.state = state;
}

/**
 * Adds a bit of documentation to Router
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
 *      { next: true, previous: true },
 *      { next: true, previous: true },
 *      ...
 *    ]
 *  }
 */
let emitState = function (state) {
  this.subject.next({
    current: state //this is just the indices
  });
}

/**
 * in:  "hello/world"
 * out: ["hello", "world"]
 */
let toList = (path) => {
  return path.split("/").compact().map((key) => {
    let n = Number(key);
    return Number.isNaN(n) && key || n;
  });
}

/**
 * Recursively goes through lists, checking if
 * the key passes the filter, and map that
 * with the mapper
 * @param keys [] Array of keys related to the
 *                levels of the list
 * @param list [] (Nested) array of routes
 * @param filter function Filter method used
 *                        for finding the right
 *                        route per level
 * @param mapper function Mapper method returning
 * @returns [] Array of mapped entries for each
 *             level of the routing
 */
let walk = (keys, list, filter, mapper) => {
  if (keys.length < 1 && list) return mapper(list[0]);
  if (keys.length < 1 || !list) return;
  return list.filter(filter(keys[0]))
    .map( (entry) => [
      mapper(entry),
      walk(keys.slice(1), entry.children, filter, mapper)
    ]).flatten().compact();
}

/**
 * in:  ["hello", 0]
 * out: [0, 0]
 */
let toIndices = function (keys) {
  let filter = (key) => {
    return (entry) => (entry.name === key || entry.index === key)

  };
  let mapper = (entry) => entry.index;
  let indices = walk(keys, this.map, filter, mapper);
  return indices.length > 0 && indices || [0];
}

/**
 * Returns paths for index-based routing where possible
 * @param keys [] Array of indices
 * @returns [] Array of paths (or indices, where no name)
 */
let toPaths = function (keys) {
  let filter = (key) => {
    return (entry) => (entry.name === key || entry.index === key)
  };
  let mapper = (entry) => (entry.name || entry.index);
  return walk(keys, this.map, filter, mapper);
}

/**
 * Replaces history with path built with keys
 * @param keys [] Array of path-parts
 */
let replaceUri = function (keys) {
  this.history.replace(buildUri(keys));
}

let __Router = {
  history: false,
  map:     false,
  subject: new Subject(),
  state: {},
  start,
  jump,
  navigate,
  saveState,
  emitState,
  toIndices,
  toPaths,
  replaceUri
};

// Public Router interface
// the actual Router is always hidden
let Router = {

  configure: function (opts) {
    __Router.map = opts.map;
    __Router.history = opts.history;
    return this;
  },

  start: function () {
    __Router.start();
    return this;
  },

  stop: function() {
    __Router.subscription.complete();
  },

  jump: function(target) {
    __Router.jump(target);
    return this;
  },

  navigate: function(target) {
    __Router.navigate(target);
    return this;
  },

  asObservable: function () {
    return __Router.subject;
  },

};

export default Router;
