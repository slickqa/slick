import React from 'react';
import ReactDOM from 'react-dom';

import './theme-red.scss';
import './theme-blue.scss';
import './theme-light-blue.scss';
import './theme-orange.scss';
import './theme-green.scss';
import './theme-teal.scss';
import "./theme-yellow.scss"

import App from './App';

const element = document.getElementById('content');
ReactDOM.render(<App />, element);

document.body.classList.remove('loading');
