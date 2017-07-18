import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import AFrame from '../components/AFrame'

const title = 'Minimal React Babel'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      uiActive: false
    }
  }

  // FUNCTIONS
  uiActiveToggle() {
    this.setState({ uiActive: !this.state.uiActive });
  }

  rotateTo = (e) => {
    var position = e.target.dataset.pos;
    document.querySelector('#camera').setAttribute('orbit-controls', 'rotateTo', position);
  }

  render() {
    var hamburger = 'hamburger ' + (this.state.uiActive ? 'active' : null);

    return (
      <div>

        <div className={hamburger} onClick={() => this.uiActiveToggle()}
          data-toggle="modal" data-target=".modal-ui">
          <div className='line one'></div>
          <div className='line two'></div>
          <div className='line three'></div>
        </div>

        <div className="container-fluid">

          <div className="row ui">
            <div className="col-md-12 text-center">
              <p className="noselect">{title}</p>
              <button className="btn btn-default" onClick={(e) => this.rotateTo(e)} data-pos="-1 0 0">Left</button>
              <button className="btn btn-default" onClick={(e) => this.rotateTo(e)} data-pos="0 0 1">Front</button>
              <button className="btn btn-default" onClick={(e) => this.rotateTo(e)} data-pos="1 0 0">Right</button>
            </div>
          </div>

          <div className="modal fade modal-ui" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
            <div className="modal-dialog modal-lg" role="document">
              <div className="modal-content text-center">
                <p className="noselect">{this.props.top}</p>
                <p className="noselect">{this.props.middle}</p>
                <p className="noselect">{this.props.bottom}</p>
              </div>
            </div>
          </div>

          <div className="aframe-container">
            <AFrame />
          </div>
        </div>
      </div>
    );
  }
}

// PROP TYPES
App.propTypes = {
  bottom: PropTypes.number.isRequired,
  middle: PropTypes.number.isRequired,
  top: PropTypes.number.isRequired
}

// CONNECT
const mapStateToProps = (state) => {
  return {
    bottom: state.bottom,
    middle: state.middle,
    top: state.top
  }
}

const mapDispatchToProps = () => {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
