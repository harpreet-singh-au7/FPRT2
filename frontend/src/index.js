import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from "react-router-dom";
import { StateProvider } from "./Redux/StateProvider";
import { Provider } from 'react-redux';
import store from './app/store';
import reducer, { initialState } from "./Redux/reducer";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store} initialState={initialState} reducer={reducer}>
      <Router>
    <App />
    </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
