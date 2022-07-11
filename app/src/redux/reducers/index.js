import { combineReducers } from "redux";
import { auth } from "./auth";
import { posts } from "./posts";
import { modal } from "./modal";
import { settingsModal } from "./modal";
import { giftingModal } from "./modal";
import { settingsSheetModal } from "./modal";
import { settingsAudioModal } from "./modal";
import creatorReducer from "./creatorReducer";

export default combineReducers({
  auth,
  posts,
  modal,
  settingsModal,
  giftingModal,
  settingsSheetModal,
  settingsAudioModal,
  creatorReducer,
});
