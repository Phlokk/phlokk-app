import { combineReducers } from "redux";
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

const Reducers = combineReducers({
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
  setInstagramURL,
});

export default Reducers;
