import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const title = 'Minimal React Babel';
require('./scss/style.min.css');

class App extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <p className="text-center">{title}</p>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root'),
);

module.hot.accept();
