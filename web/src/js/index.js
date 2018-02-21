import React from 'react';
import ReactDOM from 'react-dom';

import '../scss/default-theme.scss';
import '../scss/blue-theme.scss';
import '../scss/dev-theme.scss';

import App from './App';

const element = document.getElementById('content');
ReactDOM.render(<App />, element);

document.body.classList.remove('loading');
