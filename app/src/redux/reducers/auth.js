// const auth = useSelector((state) => state.auth);

// import { createSlice } from "@reduxjs/toolkit";

// export const initialState = {
//   currentUser: null,
//   loaded: false,
// };
// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     auth: (state, action) => {
//       state.currentUser = action.payload;
//       state.loaded = true;
//     },
//   },
// });
// export const { auth } = authSlice.actions;
// export default authSlice.reducer;

import { types } from "../constants";

const initialState = {
  currentUser: null,
  loaded: false,
};

export const auth = (state = initialState, action) => {
  switch (action.type) {
    case types.USER_STATE_CHANGE:
      return {
        ...state,
        currentUser: action.currentUser,
        loaded: action.loaded,
      };
    default:
      return state;
  }
};
