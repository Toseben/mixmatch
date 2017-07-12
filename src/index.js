import React from 'react'
import ReactDOM from 'react-dom'
import App from './containers/App'

require('./scss/style.min.css')

ReactDOM.render(
  <App />,
  document.getElementById('root'),
);

module.hot.accept();
