import React, { Component } from 'react'
import AFrame from '../components/AFrame'

const title = 'Minimal React Babel'

class App extends Component {

  // FUNCTIONS
  rotateTo = (e) => {
    var position = e.target.dataset.pos;
    document.querySelector('#camera').setAttribute('orbit-controls', 'rotateTo', position);

    // Button doesn't work occasionally
    console.log(position)
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row ui">
          <div className="col-md-12 text-center">
            <p>{title}</p>
            <button className="btn btn-default" onClick={(e) => this.rotateTo(e)} data-pos="-1 0 0">Left</button>
            <button className="btn btn-default" onClick={(e) => this.rotateTo(e)} data-pos="0 0 1">Front</button>
            <button className="btn btn-default" onClick={(e) => this.rotateTo(e)} data-pos="1 0 0">Right</button>
          </div>
        </div>
        <div className="aframe-container">
          <AFrame />
        </div>
      </div>
    );
  }
}

export default App;
