import React, { Component } from 'react'

import 'aframe'
import { Scene, Entity } from 'aframe-react'
import 'aframe-orbit-controls-component-2'

class AFrame extends Component {

  render() {
    return (
      <Scene vr-mode-ui="enabled: false">

        <a-entity id="camera" camera
          position="0 0 3"
          orbit-controls="
            target: #target;
            enableDamping: true;
            dampingFactor: 0.125;
            minPolarAngle: 0.5;
            maxPolarAngle: 2.64;
            minDistance: 1.5;
            maxDistance: 3;
            rotateSpeed: 0.15;
            rotateToSpeed: 0.05;
            logPosition: false;
            ">
        </a-entity>

        <Entity id="target">
          <a-box position="0 -1 0" depth="0.9" height="0.9" width="0.9" color="#F77"></a-box>
          <a-box position="0 0 0" depth="0.9" height="0.9" width="0.9" color="#F77"></a-box>
          <a-box position="0 1 0" depth="0.9" height="0.9" width="0.9" color="#F77"></a-box>
        </Entity>
        <a-sky color="#EEE"></a-sky>
      </Scene>
    )
  }
}

export default AFrame
