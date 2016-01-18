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
//
// @todo: Listen to history changes and produce new states
// that components can listen to to update themselves

let fromRouter = (router) => {
  return __Router.emitter;
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
  Observable.fromHistory(this.history)
    .filter(outAction("REPLACE"))
    .pluck("pathname")
    .map(Path.cleanUp)
    .distinctUntilChanged()
    .map(toList)
    .distinctUntilChanged()
    .map(this.toIndices.bind(this))
    .do(this.emitState.bind(this))
    .map(this.toPaths.bind(this))
    .subscribe(this.replaceUri.bind(this));
    //.map(this.toDirections)
}

/*
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
  this.emitter.next({
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

// Recursively go through lists checking
// if the key passes the filter,
// and map that with the mapper
// Return an array of thingies
//
// ["pulp", "vincent"], [..]
// jjj
let walk = (key, list, filter, mapper) => {
  if (key.length < 1 && list) return mapper(list[0]);
  if (key.length < 1 || !list) return;
  return list.filter(filter(key[0]))
    .map( (entry) => [
      mapper(entry),
      walk(key.slice(1), entry.children, filter, mapper)
    ]).flatten().compact();
}

/**
 * in:  ["hello", 0]
 * out: [0, 0]
 */
let toIndices = function (keys) {
  let filter = (key) => {
    return (entry) => (entry.name === key || entry.index === key)
  }
  let mapper = (entry) => entry.index
  let indices = walk(keys, this.map, filter, mapper);
  return indices.length > 0 && indices || [0];
}

let toPaths = function (keys) {
  let filter = (key) => {
    return (entry) => (entry.name === key || entry.index === key)
  }
  let mapper = (entry) => (entry.name || entry.index)
  return walk(keys, this.map, filter, mapper);
}

let replaceUri = function (keys) {
  this.history.replace( "/"+keys.join("/") )
}

let __Router = {
  history: false,
  map:     false,
  emitter: new Subject(),
  start,
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

  asObservable: function () {
    return __Router.emitter;
  },

};

export default Router;
