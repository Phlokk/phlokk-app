import firebase from "firebase";
import { getPostsByUser } from "./post";
require("firebase/firebase-auth");

import axios from "axios";
import { LOGIN, REGISTER, LOGOUT } from "@env";

import { USER_STATE_CHANGE } from "../constants";
export const userAuthStateListener = () => (dispatch) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      dispatch(getCurrentUserData());
      dispatch(getPostsByUser(firebase.auth().currentUser.uid));
    } else {
      dispatch({ type: USER_STATE_CHANGE, currentUser: null, loaded: true });
    }
  });
};

export const getCurrentUserData = () => (dispatch) => {
  firebase
    .firestore()
    .collection("user")
    .doc(firebase.auth().currentUser.uid)
    .onSnapshot((res) => {
      if (res.exists) {
        return dispatch({
          type: USER_STATE_CHANGE,
          currentUser: res.data(),
          loaded: true,
        });
      }
    });
};

export const register = (email, password) => (dispatch) =>
  new Promise((resolve, reject) => {
    console.log(REGISTER, email, password)
    axios
      .post(`${REGISTER}`, {
        'email': email,
        'password': password,
      })
      .then(function (response) {
        navigation.navigate("feed");
        // 2 seconds later...

        console.log("------------ Response XXX ---------");
        // console.log(response);
        console.log(response.data);
        console.log("------------ Response XXX ---------");
      })
      .catch(function (error) {
        console.log("------------ Back from Server ----------");
        console.log("------------ ERROR -------------");
        console.log(error);
      });
  });
  

export const login = (email, password) => (dispatch) =>
  new Promise((resolve, reject) => {
    axios
      .post(`${LOGIN}`, {
        'email': email,
        'password': password,
      })
      .then(function (response) {
        navigation.navigate("feed");
        // 2 seconds later...

        console.log("------------ Response XXX ---------");
        // console.log(response);
        console.log(response.data);
        console.log("------------ Response XXX ---------");
      })
      .catch(function (error) {
        console.log("------------ Back from Server ----------");
        console.log("------------ ERROR -------------");
        console.log(error);
      });
  });

export const logout = (email, password) => (dispatch) =>
  new Promise((resolve, reject) => {
    axios
      .post(`${LOGOUT}`)
      .then(function (response) {
        navigation.navigate("auth");
        // 2 seconds later...

        console.log("------------ Response XXX ---------");
        // console.log(response);
        console.log(response.data);
        console.log("------------ Response XXX ---------");
      })
      .catch(function (error) {
        console.log("------------ Back from Server ----------");
        console.log("------------ ERROR -------------");
        console.log(error);
      });
  });

//
//export const resetPassword = (email, password) => dispatch => new Promise((resolve, reject) => {
//    firebase.auth().sendPasswordResetEmail(email, password)
//        .then(() => {
//            resolve()
//        })
//        .catch((error) => {
//            reject(error)
//        })
//})
