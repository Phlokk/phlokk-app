// // import { types } from '../constants'
// import { createSlice } from "@reduxjs/toolkit";

// export const initialState = {
//   currentUserPosts: null,
//   loading: false,
//   error: false,
// };
// const postsSlice = createSlice({
//   name: "posts",
//   initialState,
//   reducers: {
//     getPosts: (state, action) => {
//       state.currentUserPosts = action.payload;
//       state.loading = true;
//       state.error = false;
//     },
//   },
// });
// export const { getPosts } = postsSlice.actions;
// export default postsSlice.reducer;
