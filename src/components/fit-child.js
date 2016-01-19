import React, { Component } from 'react'

export default class FitChild extends Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      width: 10,
      height: 10
    }

    this.resize = () => {
      const {
        width,
        height
      } = this.outer.getBoundingClientRect()
      this.setState({
        width,
        height
      })
    }

    if (typeof props.register !== 'function') return
    props.register(() => this.resize())
  }

  componentWillUnmount() {
    const { unregister } = this.props
    if (typeof unregister !== 'function') return
    props.unregister(this.resize)
  }

  onFirstRender(el) {
    if (el === null || this.outer) return
    console.log('refd fit', el)
    this.outer = el
    this.resize()
  }

  render() {
    const {
      Child,
      style,
      childProps
    } = this.props

    const { width, height } = this.state 

    return (
      <div style={style} ref={(el) => this.onFirstRender(el)}>
        <Child
          width={this.state.width}
          height={this.state.height}
          {...childProps}
        />
      </div>
    )
  }
}

FitChild.defaultProps = {
  style: {},
  childProps: {}
}

