import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from './reducers';
import createSagaMiddleware from "@redux-saga/core";
import { rootSaga } from "./sagas/rootSaga"


const sagaMiddleware = createSagaMiddleware();


export const store = createStore(rootReducer, 
  compose(
    applyMiddleware(sagaMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : (noop) => noop
  ))

  sagaMiddleware.run(rootSaga);