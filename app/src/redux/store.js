import { configureStore } from "@reduxjs/toolkit";
import { auth } from "./reducers/auth";
import {notificationCount } from "./reducers/auth"
// import postsSlice from "../redux/reducers/posts";

const store = configureStore({
  reducer: {
    auth,
    notificationCount
    // posts: postsSlice,
  },
});

export default store;
