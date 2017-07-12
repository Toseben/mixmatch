import React, { Component } from 'react'

import 'aframe'
import { Scene, Entity } from 'aframe-react'

class AFrame extends Component {

  render() {
    return (
      <Scene vr-mode-ui="enabled: false">
        <Entity camera look-controls></Entity>
        <a-sphere position="0 0 -2" radius="1.0" color="#F77"></a-sphere>
        <a-sky color="#EEE"></a-sky>
      </Scene>
    )
  }
}

export default AFrame
