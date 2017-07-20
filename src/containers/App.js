import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setStyle } from '../redux/actions'

import AFrame from '../components/AFrame'

const title = 'Create Your Politician'
const ui = 'The Dream Team'

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

  componentDidMount() {
    var component = this;
    jQuery("#modal-ui").on("hidden.bs.modal", function () {
      component.setState({ uiActive: false });
    });
  }

  render() {
    var hamburger = 'hamburger ' + (this.state.uiActive ? 'active' : null);
    var character = ['Vladimir Putin', 'Donald Trump', 'Kim Jong-un'];
    var image = [
      ['./img/putin_1.jpg', './img/putin_2.jpg'],
      ['./img/trump_1.jpg', './img/trump_2.jpg'],
      ['./img/kim_1.jpg', './img/kim_2.jpg']
    ];

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
              <p className="noselect app-title">{title}</p>
            </div>
          </div>

          <div className="row ui buttons">
            <div className="col-md-12 text-center">
              <button className="btn btn-default" onClick={(e) => this.rotateTo(e)} data-pos="-1 0 0">Left</button>
              <button className="btn btn-default" onClick={(e) => this.rotateTo(e)} data-pos="0 0 1">Front</button>
              <button className="btn btn-default" onClick={(e) => this.rotateTo(e)} data-pos="1 0 0">Right</button>
            </div>
          </div>

          <div id="modal-ui" className="modal fade modal-ui" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
            <div className="modal-dialog modal-lg" role="document">
              <div className="modal-content text-center container">
                <div className="row title">
                  <p className="ui-title">{ui}</p>
                </div>

                {/* TOP */}
                <div className="row char-ui top">
                  <div className="col-xs-12 name-col">
                    <p className="char-name">{character[this.props.top]} — The Brains</p>
                  </div>
                  <div className="col-xs-6 char-visual text-right">
                    <img src={image[this.props.top][this.props.topStyle]} className="img-rounded char-img"/>
                  </div>
                  <div className="col-xs-6 char-visual text-left swatch-col">
                    <p className="swatch-title text-center">Pick a style:</p>
                    <img src="./img/color.png" onClick={() => this.props.updateStyle('topStyle', 0)}
                    className={this.props.topStyle === 0 ? "img-rounded swatch selected" : "img-rounded swatch"}/>
                    <img src="./img/color.png" onClick={() => this.props.updateStyle('topStyle', 1)}
                    className={this.props.topStyle === 1 ? "img-rounded swatch selected" : "img-rounded swatch"}/>
                  </div>
                </div>

                {/* MIDDLE */}
                <div className="row char-ui">
                  <div className="col-xs-12 name-col">
                    <p className="char-name">{character[this.props.middle]} — The Muscle</p>
                  </div>
                  <div className="col-xs-6 char-visual text-right">
                    <img src={image[this.props.middle][this.props.middleStyle]} className="img-rounded char-img"/>
                  </div>
                  <div className="col-xs-6 char-visual text-left swatch-col">
                    <p className="swatch-title text-center">Pick a style:</p>
                    <img src="./img/color.png" onClick={() => this.props.updateStyle('middleStyle', 0)}
                    className={this.props.middleStyle === 0 ? "img-rounded swatch selected" : "img-rounded swatch"}/>
                    <img src="./img/color.png" onClick={() => this.props.updateStyle('middleStyle', 1)}
                    className={this.props.middleStyle === 1 ? "img-rounded swatch selected" : "img-rounded swatch"}/>
                  </div>
                </div>

                {/* BOTTOM */}
                <div className="row char-ui">
                  <div className="col-xs-12 name-col">
                    <p className="char-name">{character[this.props.bottom]} — The Wild Card</p>
                  </div>
                  <div className="col-xs-6 char-visual text-right">
                    <img src={image[this.props.bottom][this.props.bottomStyle]} className="img-rounded char-img"/>
                  </div>
                  <div className="col-xs-6 char-visual text-left swatch-col">
                    <p className="swatch-title text-center">Pick a style:</p>
                    <img src="./img/color.png" onClick={() => this.props.updateStyle('bottomStyle', 0)}
                    className={this.props.bottomStyle === 0 ? "img-rounded swatch selected" : "img-rounded swatch"}/>
                    <img src="./img/color.png" onClick={() => this.props.updateStyle('bottomStyle', 1)}
                    className={this.props.bottomStyle === 1 ? "img-rounded swatch selected" : "img-rounded swatch"}/>
                  </div>
                </div>

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
  updateStyle: PropTypes.func.isRequired,
  bottom: PropTypes.number.isRequired,
  middle: PropTypes.number.isRequired,
  top: PropTypes.number.isRequired,
  bottomStyle: PropTypes.number.isRequired,
  middleStyle: PropTypes.number.isRequired,
  topStyle: PropTypes.number.isRequired
}

// CONNECT
const mapStateToProps = (state) => {
  return {
    bottom: state.bottom,
    middle: state.middle,
    top: state.top,
    bottomStyle: state.bottomStyle,
    middleStyle: state.middleStyle,
    topStyle: state.topStyle
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateStyle: (row, id) => dispatch(setStyle(row, id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
