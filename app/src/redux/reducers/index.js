import { combineReducers } from "redux";
import { auth } from "./auth";
import { posts } from "./posts";
import { modal } from "./modal";
import { chat } from "./chat";
import { settingsModal } from "./modal";
import { giftingModal } from "./modal";
import { settingsSheetModal } from "./modal";
import { settingsAudioModal } from "./modal";

import userReducer from "../reducers/userReducer";
import creatorReducer from "./creatorReducer";

export default combineReducers({
  auth,
  posts,
  modal,
  chat,
  settingsModal,
  giftingModal,
  settingsSheetModal,
  settingsAudioModal,
  userReducer,
  creatorReducer,
});
