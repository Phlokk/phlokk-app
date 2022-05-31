import { saveMediaToStorage } from "./saveMedia";
import { useDispatch } from "react-redux";
import { types } from "../redux/constants";
import axios from '../redux/apis/axiosDeclaration'



    // value = what user types in field
export const saveUsername = async ( value, id ) => {

  console.log("Saving username");
  axios
    .put("/api/creators/update/ +userId", {
      username: value,
      userId: id,
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error.response);
    });
};

export const saveQuote = async ( value, id ) => {

  console.log("Saving Quote");
  axios
    .put("/api/creators/update/ +userId", {
      quote: value,
      userId: id,
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error.response);
    });
};

export const saveYoutubeLink = async ( value, id ) => {

  console.log("Saving Quote");
  axios
    .put("/api/creators/update/ +userId", {
      youtubeLink: value,
      userId: id,
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error.response);
    });
};

export const saveInstagramLink = async ( value, id ) => {

  console.log("Saving IG link");
  axios
    .put("/api/creators/update/ +userId", {
      instagramLink: value,
      userId: id,
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error.response);
    });
};

export const saveCreatorType = async ( categoryId, item ) => {

  console.log("Saving Creator type");
  axios
    .put("/api/creators/update/ +userId", {
      creator_type: categoryId,
      userId: id,
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error.response);
    });
};

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

export const saveUserLink = async ( value, id ) => {

  console.log("Saving website link");
  axios
    .put("/api/creators/update/ +userId", {
      link: value,
      userId: id,
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error.response);
    });
};

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

// export const getIsFollowing = (currentUser, otherUserId) =>
//   new Promise((resolve, reject) => {

//   });

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
