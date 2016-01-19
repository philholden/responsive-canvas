import React, { Component } from 'react'

export default class CanvasHiDef extends Component {

  componentDidUpdate(prevProps) {
    const { width, height } = this.props
    if (
      width !== prevProps.width ||
      height !== prevProps.height
    ) {
      this.redraw(this.el)
    }
  }

  redraw(el) {
    const { onResize } = this.props
    if (!onResize || el === null) return
    this.props.onResize({
      canvas: el,
      ctx: el.getContext('2d'),
      width: el.width,
      height: el.height
    })
  }

  onResize(el) {
    if (el === null || this.el) return
    this.el = el
    this.redraw(el)
  }

  render() {
    const {
      devicePixelRatio,
      width,
      height,
      onResize
    } = this.props

    return (
      <canvas
        width={width * devicePixelRatio}
        height={height * devicePixelRatio}
        style={{
          display: 'block',
          width,
          height
        }}
        ref={(el) => this.onResize(el)}
      />
    )
  }
}

CanvasHiDef.defaultProps = {
  devicePixelRatio: window.devicePixelRatio || 1,
  width: 400,
  height: 400
}

