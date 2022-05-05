import { combineReducers } from "redux";
import users from "./users";
import { auth } from "./auth";
import { posts } from "./posts";
import { modal } from "./modal";
import { settingsModal } from "./modal";
import { giftingModal } from "./modal";
import { settingsSheetModal } from "./modal";
import { chat } from "./chat";

const reducers = combineReducers({
  users,
  auth,
  posts,
  modal,
  settingsModal,
  chat,
  giftingModal,
  settingsSheetModal,
});

export default reducers;
