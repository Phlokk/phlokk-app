import { createStore, combineReducers, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import watcherSaga from '../reducers/saga'
import thunk from 'redux-thunk';
import userReducer from './users';
import { auth } from "./auth";
import { profileImageUpdate } from "./auth";
import { posts } from "./posts";
import { modal } from "./modal";
import { settingsModal } from "./modal";
import { giftingModal } from "./modal";
import { settingsSheetModal } from "./modal";
import { chat } from "./chat";
import {
  setUsername,
  setCreatorType,
  setWebsiteURL,
  setRelationshipType,
  setYoutubeURL,
  setInstagramURL,
} from "../actions/user";


const rootReducer = combineReducers({ 
  userReducer,
  auth,
  profileImageUpdate,
  posts,
  modal,
  settingsModal,
  chat,
  giftingModal,
  settingsSheetModal,
  setUsername,
  setCreatorType,
  setWebsiteURL,
  setRelationshipType,
  setYoutubeURL,
  setInstagramURL
});


const sagaMiddleware = createSagaMiddleware();
const middleware = [thunk, sagaMiddleware ];

sagaMiddleware.run(watcherSaga)
export const Store = createStore(rootReducer, applyMiddleware(...middleware));


