import { Observable } from 'rxjs'

import React from 'react'

import marked from 'marked'

/*
 * Slide default options
 */
const DEFAULT_PROPS = {
  ref: 'slide',
  transitionName: "slide-fade",
  transitionAppear: true,
  transitionAppearTimeout: 1,
  transitionEnter: true,
  transitionEnterTimeout: 500,
  transitionLeave: true,
  transitionLeaveTimeout: 250,
  className: 'slide-content'
}


/*
 * Utility method to fallback undefined properties
 * to their default values
 */
let defaults = (overrides = {}) => (
  Object.assign({}, DEFAULT_PROPS, overrides)
)


/*
 * Get all keys of an object that match a regex
 */
let defaultKeys = (match) => {
  return Object.keys(defaults()).filter( k => {
    return !!(match.exec(k))
  })
}


/*
 * Get all the properties of an object that match a given regex
 */
let filterKeys = (obj, keyMatch) => {
  return defaultKeys(keyMatch).reduce( (acc, name ) => {
    if(obj[name])
      acc[name] = obj[name]
    return acc
  }, {})
}

export default React.createClass({

  scale: 1,

  propTypes: {
    name: React.PropTypes.string
  },

  getDefaultProps: () => (defaults()),

  statics: {

    isSlide: function (e) {
      return React.isValidElement(e) && e.type.displayName === 'Slide'
    },

    propsByKey: function (slide, key) {
      return filterKeys(slide.props, key)
    },

  },

  fromMarkdown: function () {
    return marked(this.props.children).trim()
  },

  shouldUseMarkdown: function () {
    return this.props.markdown && !Array.isArray(this.props.children)
  },

  componentDidUpdate: function () {
    let scale = this.getScale()

    if(Number.isNaN(scale) || Number.isNaN(this.scale))
      return

    if(this.scale !== scale) {
      this.scale = scale
      this.forceUpdate()
    }
  },

  getScale: function () {
    let verticalScale   = this.refs['slide-container'].offsetHeight / this.refs.slide.offsetHeight
    let horizontalScale = this.refs['slide-container'].offsetWidth  / this.refs.slide.offsetWidth
    let scale = Math.min(verticalScale, horizontalScale)
    return scale > 1 && 1 || scale
  },

  componentDidMount: function () {
    ['load', 'resize'].forEach( function (event) {
      Observable.fromEvent(window, event)
      .subscribe( function () {
        this.scale = this.getScale()
        this.forceUpdate()
      }.bind(this))
    }.bind(this))
  },

  options: function () {
    let opts = {
      id: this.props.name || "",
      style: {
        transform: `translate(-50%, -50%) scale(${this.scale})`
      }
    }

    if(this.shouldUseMarkdown())
      opts.dangerouslySetInnerHTML = {__html: this.fromMarkdown()}
    else
      opts.children = this.props.children

    return defaults(opts)
  },

  render: function () {
    return (<section ref="slide-container" className="slide">
      <section {...this.options()} />
    </section>)
  }

})
