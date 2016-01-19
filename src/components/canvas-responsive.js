import React, { Component } from 'react'
import CanvasHiDef from './canvas-hi-def'
import FitChild from './fit-child'

export default class CanvasResponsive extends Component {
  constructor(props, context) {
    super(props, context)
    const self = this
    if (props.interval) {
      this.register = function(callback) {
        self.cancel = setInterval(callback, props.interval)
      }
      this.unregister = function(callback) {
        clearInterval(self.cancel)
      }
    } else {
      this.register = function(callback) {
        self.cancel = callback
        window.addEventListener('resize', callback);
      }
      this.unregister = function(callback) {
        window.removeEventListener('resize', self.cancel);
      }
    }
  }

  render() {
    const {style, onResize} = this.props

    return (
      <FitChild
        style={style}
        register={this.register}
        unregister={this.unregister}
        childProps={{ onResize }}
        Child={CanvasHiDef}
      />
    )
  }
}
