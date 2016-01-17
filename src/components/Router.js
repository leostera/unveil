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
//
let Path = {
  cleanUp: path => (path.trim()),
  isEmpty: path => (path.length > 0),
};

let Router = {

  initialize: function () {
    let outAction = (action) => {
      return (e) => e.action !== action;
    };

    Observable.fromHistory(this.history)
      .filter(outAction("REPLACE"))
      .pluck("pathname")
      .map(Path.cleanUp)
      .distinctUntilChanged()
      .map(this.toKeypair)
      .map(this.toIndices)
      .distinctUntilChanged()
      .do(this.replaceUri)
      .subscribe(this.route);
  },

  /**
   * in:  "hello/world"
   * out: ["hello", "world"]
   */
  toKeypair: (path) => {
    const [a,b] = path.split("/");
    return [a || 0, b || 0].compact();
  },

  /**
   * in:  ["hello", "world"]
   * out: [1, 3]
   */
  toIndices: function (keypair) {
    let list = this.props.children.toList();
    let first = this.pathToIndex(keypair[0], list) || 0;
    let second;
    let slide = this.getSlide(first, list);
    if(slide && this.areSlides(slide.props.children)) {
      second = this.pathToIndex(keypair[1], slide.props.children) || 0;
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

  replaceUri: function (indices) {
    let slide = this.getSlide(indices[0], this.props.children);
    let subSlide = this.getSlide(indices[1], slide.props.children);

    let uri = '/' + [
        this.getSlideName(slide) || indices[0],
        this.getSlideName(subSlide) || indices[1]
      ].compact().join('/');

    this.history.replace(uri);
  },

  updateState: function (current) {
    //this should emit the updateState
  }

};

export default Router;
