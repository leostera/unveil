import { Observable, Subject } from 'rxjs';
import 'rx-history';

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
  return router.asObservable();
};
Observable.fromRouter = fromRouter;

let Path = {
  cleanUp: path => (path.trim()),
  isEmpty: path => (path.length > 0),
};

let __Router = {
  started: false,
  history: false,
  map:     false,
  emitter: new Subject(),

  start: function () {
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
    //
    let history = Observable.fromHistory(this.history);
      .filter(outAction("REPLACE"))
      .pluck("pathname")
      .map(Path.cleanUp)
      .distinctUntilChanged()
      .map(this.toList)
      .map(this.toIndices)
      .map(this.toDirections)
      .do(this.emitState)
      .distinctUntilChanged()
      .do(this.replaceUri);

    this.started = true;
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
  emitState: function (state) {
    this.emitter.onNext(state);
  }

  /**
   * in:  "hello/world"
   * out: ["hello", "world"]
   */
  toList: (path) => (path.split("/")),

  /**
   * in:  ["hello", "world"]
   * out: [1, 3]
   */
  toIndices: function (keys) {
    let first = this.pathToIndex(keys[0], this.map) || 0;
    let second;
    let entry = this.findEntry(first, this.map);
    if(entry && entry.children) {
      second = this.pathToIndex(keys[1], entry.children) || 0;
    }
    return [first, second].compact();
  },

  /*
   * Looks up a slide in a list of slides either by
   * index or by named key
   */
  pathToIndex: (key, list) => {
    let n = Number(key);
    if(Number.isInteger(n)) {
       return n < list.length && n || false;
    }

    let byKey = (el, index) => {
      if(el.props.name === key) return index;
    }

    return list.map(byKey).compact().pop();
  },

  findIndex: function (index) {
    return this.map[index];
  },

  indexToName: function (index) {
    return this.findIndex(index).name;
  },

  buildUri: function (indices) {
    indices.map(this.indexToName)
  },

  replaceUri: function (indices) {
    this.history.replace(this.buildUri(indices));
  },
};

// Public Router interface
// the actual Router is always hidden
let Router = {

  configure:  function (opts) {
    opts.map || (__Router.map == opts.map);
    return this;
  },

  start: function () {
    if(!__Router.started)
      throw new Error("Router already started");
    if(!__Router.history)
      throw new Error("Router needs a History");
    if(!__Router.map)
      throw new Error("Router needs a Routes Map");

    __Router.start();
    return this;
  },

  asObservable: function () {
    return __Router.emitter.asObservable();
  },

};

export default Router;
