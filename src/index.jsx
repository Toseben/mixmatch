import React from 'react';
import ReactDOM from 'react-dom';

const title = 'Minimal React Babel';

ReactDOM.render(
  <div>{title}</div>,
  document.getElementById('root'),
);

module.hot.accept();
