import React, { Component } from 'react';
import { NICE, SUPER_NICE } from './colors';
import CanvasHiDef from './components/canvas-hi-def'
import FitChild from './components/fit-child'
import CanvasResponsive from './components/canvas-responsive'

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0 };
    this.interval = setInterval(() => this.tick(), 1000);
  }

  tick() {
    this.setState({
      counter: this.state.counter + this.props.increment
    });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <h1 style={{ color: this.props.color }}>
        Counter ({this.props.increment}): {this.state.counter}
      </h1>
    );
  }
}

const clearCanvas = ({ ctx, width, height }) => {
  console.log('clear canvas')
  ctx.fillRect(0 ,0 ,width , height)
}

export class App extends Component {
  render() {
    const Hello = () => <div>hello</div>
    return (
      <div>
        <Counter increment={1} color={NICE} />
        <Counter increment={5} color={SUPER_NICE} />
        <div onNewContext={clearCanvas}/>
        <CanvasResponsive
          style={{height: 100}}
          onResize={clearCanvas}
          interval={500}
        />
      </div>
    );
  }
}