import React, { Component } from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import AppReducer from './reducers';
import AppContainer from './containers';

const composedEnhancers = compose;

const store = createStore(
  AppReducer, composedEnhancers(applyMiddleware(thunk))
);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}
