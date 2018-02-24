import React from 'react';
import ReactDOM from 'react-dom';

import './theme-default.scss';
import './theme-blue.scss';
import './theme-dev.scss';

import App from './App';

const element = document.getElementById('content');
ReactDOM.render(<App />, element);

document.body.classList.remove('loading');
