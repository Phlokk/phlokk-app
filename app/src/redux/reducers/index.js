import { combineReducers } from "redux";
import { auth } from "./auth";
import { posts } from "./posts";
import creatorReducer from "./creatorReducer";

export default combineReducers({
  auth,
  posts,
  creatorReducer,
});
