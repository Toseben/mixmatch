import React, { Component } from 'react'

import AFRAME from 'aframe'
import { Scene, Entity } from 'aframe-react'

import 'aframe-orbit-controls-component-2'
import 'aframe-animation-component'
import 'aframe-mouse-cursor-component'

AFRAME.registerComponent('geo-selector', {
  schema: {
    listen: {default: ''},
    target: {default: ''},
    emit: {default: ''}
  },

  update: function () {
    var data = this.data;
    this.el.addEventListener(data.listen, function () {

      // TRIGGER REACT STATE UPDATE FROM HERE
      var direction = data.emit === "arrow-left" ? -1 : 1;
      var number = AFrameComponent.state[data.target] + direction;

      // CLAMP VALUES
      if (number < 0) { number = 2 }
      number = number % 3;

      // SET STATE
      AFrameComponent.setState({ [data.target]: number });
    });
  }
});

AFRAME.registerComponent('selected', {
  schema: {
    enabled: {default: ''},
  },

  update: function() {
    var enabled = this.data.enabled;

    // CHECK INIT
    if (enabled) {
      this.el.emit('scale-up')
      this.el.emit('spin-right')
    } else {
      this.el.emit('scale-down')
      this.el.emit('spin-left')
    }

  }
});

AFRAME.registerComponent('follow-camera', {

  init: function() {
    this.camera = document.getElementById('camera');
  },

  tick: function() {
    var camRot = this.camera.getAttribute('rotation');
    this.el.setAttribute('rotation', {y: camRot.y});
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

        {/* ASSETS */}
        <a-assets>
          <a-mixin id="spin"
            animation__left-spin="property: rotation; dur: 500; to: 0 0 0; startEvents: spin-left"
            animation__right-spin="property: rotation; dur: 500; to: 0 360 0; startEvents: spin-right">
          </a-mixin>
          <a-mixin id="scale"
            animation__scale-up="property: scale; dur: 500; to: 1 1 1; startEvents: scale-up"
            animation__scale-down="property: scale; dur: 500; to: 0.01 0.01 0.01; startEvents: scale-down">
          </a-mixin>
          <a-mixin id="geometry"
            geometry="primitive: box; depth: 0.9; height: 0.9; width: 0.9">
          </a-mixin>
        </a-assets>

        {/* CURRENTLY CLASS NOT CLASSNAME */}
        <Entity id="target" position="0 0 -3"></Entity>
        <Entity id="rows" position="0 0 -3">
          {/* BOTTOM */}
          <Entity id="bottom-row">
            <Entity id="bottom-0" className="bottom" position={{x: 0, y: -1, z: 0}}
              material={{color: '#F77'}} mixin="geometry spin scale"
              selected={{enabled: this.state.bottom === 0}}>
            </Entity>
            <Entity id="bottom-1" className="bottom" position={{x: 0, y: -1, z: 0}}
              material={{color: '#7F7'}} mixin="geometry spin scale"
              selected={{enabled: this.state.bottom === 1}}>
            </Entity>
            <Entity id="bottom-2" className="bottom" position={{x: 0, y: -1, z: 0}}
              material={{color: '#77F'}} mixin="geometry spin scale"
              selected={{enabled: this.state.bottom === 2}}>
            </Entity>
          </Entity>

          {/* MIDDLE */}
          <Entity id="middle-row">
            <Entity id="middle-0" className="middle" position={{x: 0, y: 0, z: 0}}
              material={{color: '#F77'}} mixin="geometry spin scale"
              selected={{enabled: this.state.middle === 0}}>
            </Entity>
            <Entity id="middle-1" className="middle" position={{x: 0, y: 0, z: 0}}
              material={{color: '#7F7'}} mixin="geometry spin scale"
              selected={{enabled: this.state.middle === 1}}>
            </Entity>
            <Entity id="middle-2" className="middle" position={{x: 0, y: 0, z: 0}}
              material={{color: '#77F'}} mixin="geometry spin scale"
              selected={{enabled: this.state.middle === 2}}>
            </Entity>
          </Entity>

          {/* TOP */}
          <Entity id="top-row">
            <Entity id="top-0" className="top" position={{x: 0, y: 1, z: 0}}
              material={{color: '#F77'}} mixin="geometry spin scale"
              selected={{enabled: this.state.top === 0}}>
            </Entity>
            <Entity id="top-1" className="top" position={{x: 0, y: 1, z: 0}}
              material={{color: '#7F7'}} mixin="geometry spin scale"
              selected={{enabled: this.state.top === 1}}>
            </Entity>
            <Entity id="top-2" className="top" position={{x: 0, y: 1, z: 0}}
              material={{color: '#77F'}} mixin="geometry spin scale"
              selected={{enabled: this.state.top === 2}}>
            </Entity>
          </Entity>

        </Entity>

        <Entity id="camera" camera mouse-cursor
          orbit-controls="
            target: #target;
            enableDamping: true;
            enablePan: false;
            enableZoom: false;
            dampingFactor: 0.125;
            minPolarAngle: 0.5;
            maxPolarAngle: 2.64;
            rotateSpeed: 0.15;
            rotateToSpeed: 0.05;
            logPosition: false;
            ">
            <a-entity light="type: ambient; color: #BBB"></a-entity>
            <a-entity light="type: directional; color: #FFF; intensity: 0.6" position="-0.5 1 1"></a-entity>
        </Entity>

        <Entity position="0 0 -3" follow-camera>

          {/* BOTTOM */}
          <Entity geometry={{primitive: 'sphere', radius: 0.1}}
            position="-1.25 -1 0" material={{color: '#444'}}
            geo-selector="listen: click; target: bottom; emit: arrow-left">
          </Entity>
          <Entity geometry={{primitive: 'sphere', radius: 0.1}}
            position="1.25 -1 0" material={{color: '#444'}}
            geo-selector="listen: click; target: bottom; emit: arrow-right">
          </Entity>

          {/* MIDDLE */}
          <Entity geometry={{primitive: 'sphere', radius: 0.1}}
            position="-1.25 0 0" material={{color: '#444'}}
            geo-selector="listen: click; target: middle; emit: arrow-left">
          </Entity>
          <Entity geometry={{primitive: 'sphere', radius: 0.1}}
            position="1.25 0 0" material={{color: '#444'}}
            geo-selector="listen: click; target: middle; emit: arrow-right">
          </Entity>

          {/* TOP */}
          <Entity geometry={{primitive: 'sphere', radius: 0.1}}
            position="-1.25 1 0" material={{color: '#444'}}
            geo-selector="listen: click; target: top; emit: arrow-left">
          </Entity>
          <Entity geometry={{primitive: 'sphere', radius: 0.1}}
            position="1.25 1 0" material={{color: '#444'}}
            geo-selector="listen: click; target: top; emit: arrow-right">
          </Entity>
        </Entity>


        <a-sky color="#EEE"></a-sky>
      </Scene>
    )
  }
}

export default AFrame
