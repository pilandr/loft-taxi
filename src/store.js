import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from './reducers';
import { authMiddleware, cardMiddleware } from "./authMiddleware";

export const store = createStore(rootReducer, 
  compose(
    applyMiddleware(authMiddleware),
    applyMiddleware(cardMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : (noop) => noop
  ))