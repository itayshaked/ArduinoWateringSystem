import React from 'react'
import ReactDOM from 'react-dom'
import './index.css';
import Layout from './components/Layout'
import {Provider} from 'react-redux'
import {store} from './redux/store'



ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <Layout />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
