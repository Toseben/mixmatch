import React, { Component } from 'react'
import AFrame from '../components/AFrame'

const title = 'Minimal React Babel'

class App extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row ui">
          <div className="col-md-12">
            <p className="text-center">{title}</p>
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
