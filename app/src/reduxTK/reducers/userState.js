// import { createSlice } from '@reduxjs/toolkit';

// export const userSlice = createSlice({
//     name: 'user',
//     initialState: {
//         user: [],
//         isLoading: false,
//         error: {},
//     },
//     reducers: {
//         fetchUserData: (state) => {
//             state.isLoading = true;
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

// export default userSlice.reducer;