import { combineReducers } from "redux";
import { auth } from "./auth";
import { posts } from "./posts";
import { likes } from "./likes";

export default combineReducers({
  auth,
  posts,
  likes,
});
