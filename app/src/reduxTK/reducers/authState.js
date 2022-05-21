// import { createSlice } from '@reduxjs/toolkit';

// export const authSlice = createSlice({
//     name: 'currentUser',
//     initialState: {
//         currentUser: null,
//         isLoading: false,
//         error: {},
//     },
//     reducers: {
//         userStateChange: (state) => {
            
//         },
//         fetchDataSuccess: (state, action) => {
//             state.user = action.payload;
//             state.isLoading = false;
//         },
//         fetchDataFailure: (state) => {
//             state.isLoading = false;
//         }
//     }
// });

// export const { fetchUserData, fetchDataSuccess, fetchDataFailure} = userSlice.actions;

// export default authSlice.reducer;


// export const auth = (state = initialState, action) => {
//   switch (action.type) {
//     case types.USER_STATE_CHANGE:
//       return {
//         ...state,
//         currentUser: action.currentUser,
//         loaded: action.loaded,
//       };
//     default:
//       return state;
//   }
// };
