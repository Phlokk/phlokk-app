import { saveMediaToStorage } from "./saveMedia";
import { useDispatch } from "react-redux";
import { types } from "../redux/constants";

import axios from "../redux/apis/axiosDeclaration";
import { Alert } from "react-native";



export const updateCreator = async (data) => {
  axios
    .patch("/api/creator/update", data)
    .then((response) => {
      Alert.alert(" Data successfully updated!")
    })
    .catch((error) => {
      Alert.alert("Data not saved, please check user data");
    });
};

// export const saveQuote = async ( value ) => {
//   axios
//     .patch("/api/creators/update", {
//       quote: value,
//     })
//     .then((response) => {
//       console.log(response.data);
//     })
//     .catch((error) => {
//       console.log(error.response);
//     });
// };

// export const saveRelationshipField = (field, value) =>
// new Promise((resolve, reject) => {
//   let obj = {};
//   obj[field] = value;
//   firebase
//     .firestore()
//     .collection("user")
//     .doc(firebase.auth().currentUser.uid)
//     .update(obj)
//     .then(() => resolve())
//     .catch(() => reject());
// });

// PHLOKK MARKET FUNC/LINKS BELOW

// export const saveUserAdmission = (field, value) =>
//   new Promise((resolve, reject) => {
//     let obj = {};
//     obj[field] = value;
//     firebase
//       .firestore()
//       .collection("user")
//       .doc(firebase.auth().currentUser.uid)
//       .update(obj)
//       .then(() => resolve())
//       .catch(() => reject());
//   });

// export const saveUserBuyLink = (field, value) =>
//   new Promise((resolve, reject) => {
//     let obj = {};
//     obj[field] = value;
//     firebase
//       .firestore()
//       .collection("user")
//       .doc(firebase.auth().currentUser.uid)
//       .update(obj)
//       .then(() => resolve())
//       .catch(() => reject());
//   });

// export const saveUserDonateLink = (field, value) =>
//   new Promise((resolve, reject) => {
//     let obj = {};
//     obj[field] = value;
//     firebase
//       .firestore()
//       .collection("user")
//       .doc(firebase.auth().currentUser.uid)
//       .update(obj)
//       .then(() => resolve())
//       .catch(() => reject());
//   });

// export const saveUserReviews = (field, value) =>
//   new Promise((resolve, reject) => {
//     let obj = {};
//     obj[field] = value;
//     firebase
//       .firestore()
//       .collection("user")
//       .doc(firebase.auth().currentUser.uid)
//       .update(obj)
//       .then(() => resolve())
//       .catch(() => reject());
//   });

// SETTINGS FUNC/LINKS BELOW

// export const saveUserPhone = (field, value) =>
//   new Promise((resolve, reject) => {
//     let obj = {};
//     obj[field] = value;
//     firebase
//       .firestore()
//       .collection("user")
//       .doc(firebase.auth().currentUser.uid)
//       .update(obj)
//       .then(() => resolve())
//       .catch(() => reject());
//   });

// export const saveUserEmail = (field, value) =>
//   new Promise((resolve, reject) => {
//     let obj = {};
//     obj[field] = value;
//     firebase
//       .firestore()
//       .collection("user")
//       .doc(firebase.auth().currentUser.uid)
//       .update(obj)
//       .then(() => resolve())
//       .catch(() => reject());
//   });

// export const saveUserPassword = (field, value) =>
//   new Promise((resolve, reject) => {
//     let obj = {};
//     obj[field] = value;
//     firebase
//       .firestore()
//       .collection("user")
//       .doc(firebase.auth().currentUser.uid)
//       .update(obj)
//       .then(() => resolve())
//       .catch(() => reject());
//   });

// export const queryUsersByUsername = (username) =>
//   new Promise((resolve, reject) => {
//     if (username === '') {
//       resolve([]);
//     }

//     firebase
//       .firestore()
//       .collection("user")
//       .where("username", ">=", username)

//       .get()
//       .then((snapshot) => {
//         let users = snapshot.docs.map(doc => {
//           const data = doc.data();
//           const id = doc.id;
//           return { id, ...data };
//         })
//         resolve(users);
//       })
//       .catch(() => reject());
//   });

// export const queryUsersByUsername = () => {
//   axios
//     .post("https://dev.phlokk.com/search", {
//       // username: username,
//       // id: id,
//     })
//     .then((response) => {
//       console.log('back from login')

//       console.log(response.data);
//       const user = response.data.user;
//       user.token = response.data.token;

//       setUser(user);
//       SecureStore.setItemAsync('user', JSON.stringify(user));
//       console.log(user)
//       dispatch({ type: types.USER_STATE_CHANGE, currentUser: user, loaded: true });
//     })
//     .catch((error) => {
//       console.log(error.response);
//     });
// };

// export const getUserRealtime = (id, cb) => {
//   return firebase
//     .firestore()
//     .collection("user")
//     .doc(id)
//     .onSnapshot((doc) => {
//       cb(doc.data());
//     });
// };
// export const getUserById = (id) => {
//   return new Promise((resolve, reject) => {
//     firebase
//       .firestore()
//       .collection("user")
//       .doc(id)
//       .get()
//       .then((snapshot) => {
//         resolve(snapshot.exists ? snapshot.data() : null);
//       })
//       .catch(() => reject());
//   });
// };

export const getIsFollowing = (user, otherUserId) =>
  new Promise((resolve, reject) => {});

// export const changeFollowState = ({ otherUserId, isFollowing }) =>
//   new Promise((resolve, reject) => {
//     if (isFollowing) {
//       firebase
//         .firestore()
//         .collection("user")
//         .doc(firebase.auth().currentUser.uid)
//         .collection("following")
//         .doc(otherUserId)
//         .delete()
//         .then(() => resolve())
//         .catch(() => reject());
//     } else {
//       firebase
//         .firestore()
//         .collection("user")
//         .doc(firebase.auth().currentUser.uid)
//         .collection("following")
//         .doc(otherUserId)
//         .set({})
//         .then(() => resolve())
//         .catch(() => reject());
//     }
//   });
