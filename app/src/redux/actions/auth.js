// import { getPostsByUser } from "./post";
import * as SecureStore from "expo-secure-store";
import { USER_STATE_CHANGE } from "../constants";

export const userAuthStateListener = () => (dispatch) => {

  // console.log("here............");

  SecureStore.getItemAsync("user").then((user) => {
    // console.log("async user");
    console.log(user);
    if (user) {
      dispatch({
        type: USER_STATE_CHANGE,
        currentUser: JSON.parse(user),
        loaded: true,
      });
    } else {
      dispatch({ type: USER_STATE_CHANGE, currentUser: null, loaded: true });
    }
  });

};




