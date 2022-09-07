import { createStore, applyMiddleware } from "redux";
// import {composeWithDevTools} from 'redux-devtools-extension';
import createSagaMiddleware from "redux-saga";
import thunk from "redux-thunk";
import rootReducer from '../reducers/index'
import rootSaga from "../sagas/rootSaga";



const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware, thunk];

const store = createStore(
  rootReducer, 
  {}, applyMiddleware(...middleware));

sagaMiddleware.run(rootSaga);

export default store;


