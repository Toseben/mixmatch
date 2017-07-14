import React, { Component } from 'react'

import AFRAME from 'aframe'
import { Scene, Entity } from 'aframe-react'

import 'aframe-orbit-controls-component-2'
import 'aframe-animation-component'
import 'aframe-mouse-cursor-component'

AFRAME.registerComponent('event-proxy', {
  schema: {
    listen: {default: ''},
    target: {type: 'selector'},
    emit: {default: ''}
  },

  update: function () {
    var data = this.data;
    this.el.addEventListener(data.listen, function () {
      data.target.emit(data.emit);

      // TRIGGER REACT STATE UPDATE FROM HERE
      var target = data.target.id;
      var direction = data.emit === "spin-left" ? -1 : 1;
      var number = AFrameComponent.state[target] + direction;

      // CLAMP VALUES
      if (number < 0) { number = 3 }
      number = number % 4;

      // SET STATE
      AFrameComponent.setState({ [target]: number });
    });
  }
});

var AFrameComponent;

class AFrame extends Component {

  constructor(props) {
    super(props);
    this.state = {
      bottom: 0,
      middle: 0,
      top: 0
    }
  }

  // BIND COMPONENT TEMPORARY
  componentWillMount() {
    AFrameComponent = this;
  }

  render() {
    return (
      <Scene vr-mode-ui="enabled: false">

        <a-assets>
          <a-mixin id="spin"
            animation__left-spin="property: rotation; dur: 500; to: 0 0 0; startEvents: spin-left"
            animation__right-spin="property: rotation; dur: 500; to: 0 360 0; startEvents: spin-right">
          </a-mixin>
        </a-assets>

        <a-entity id="camera" camera
          position="0 0 3" mouse-cursor
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

          <a-sphere position="-1.25 -1 -3" radius="0.1" color="#7F7"
            event-proxy="listen: click; target: #bottom; emit: spin-left"></a-sphere>
          <a-sphere position="1.25 -1 -3" radius="0.1" color="#7F7"
            event-proxy="listen: click; target: #bottom; emit: spin-right"></a-sphere>

          <a-sphere position="-1.25 0 -3" radius="0.1" color="#7F7"
            event-proxy="listen: click; target: #middle; emit: spin-left"></a-sphere>
          <a-sphere position="1.25 0 -3" radius="0.1" color="#7F7"
            event-proxy="listen: click; target: #middle; emit: spin-right"></a-sphere>

          <a-sphere position="-1.25 1 -3" radius="0.1" color="#7F7"
            event-proxy="listen: click; target: #top; emit: spin-left"></a-sphere>
          <a-sphere position="1.25 1 -3" radius="0.1" color="#7F7"
            event-proxy="listen: click; target: #top; emit: spin-right"></a-sphere>

        </a-entity>

        <Entity id="target">
          <a-box id="bottom" position="0 -1 0" mixin="spin"
            depth="0.9" height="0.9" width="0.9" color="#F77">
          </a-box>
          <a-box id="middle" position="0 0 0" mixin="spin"
            depth="0.9" height="0.9" width="0.9" color="#F77">
          </a-box>
          <a-box id="top" position="0 1 0" mixin="spin"
            depth="0.9" height="0.9" width="0.9" color="#F77">
          </a-box>
        </Entity>

        <a-sky color="#EEE"></a-sky>
      </Scene>
    )
  }
}

export default AFrame
