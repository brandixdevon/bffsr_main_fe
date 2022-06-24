import React from 'react';
import { render } from 'react-dom';
//import Login from './components/login/login';
//import App from './components/dashboard/dash';
import * as serviceWorker from './serviceWorker';
import store from './store';
import Root from './App'

global.fetch = require('node-fetch');


render(<Root store={store} />, document.getElementById('root'))


serviceWorker.unregister();
