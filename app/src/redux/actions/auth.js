// import { getPostsByUser } from "./post";
import * as SecureStore from "expo-secure-store";
import { types } from "../constants";

export const userAuthStateListener = () => (dispatch) => {

  // console.log("here............");

  SecureStore.getItemAsync("user").then((user) => {
    // console.log("async user");
    console.log(user);
    if (user) {
      dispatch({
        type: types.USER_STATE_CHANGE,
        currentUser: JSON.parse(user),
        loaded: true,
      });
    } else {
      dispatch({ type: types.USER_STATE_CHANGE, currentUser: null, loaded: true });
    }
  });

};




