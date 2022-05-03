import { saveMediaToStorage } from "./saveMedia";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { useDispatch } from "react-redux";
import { USER_STATE_CHANGE } from "../redux/constants";


// export const saveUserProfileImage = (image) =>
//   new Promise((resolve, reject) => {
//     saveMediaToStorage(
//       image,
//       `profileImage/${auth.currentUser.id}`
//     ).then((res) => {
//       firebase
//         .firestore()
//         .collection("user")
//         .doc(firebase.auth().currentUser.uid)
//         .update({
//           photoURL: res,
//         })
//         .then(() => resolve())
//         .catch(() => reject());
//     });
//   });

// export const saveUserProfileImage = async () => {

//   console.log("upload image");
//   let user = await SecureStore.getItemAsync("user");
//   user = JSON.parse(user);
//   console.log(user.token);

//   axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
//   axios
//     .post("https://dev.phlokk.com/api/update-profile")
//     .then((response) => {
//         console.log(response.data);
//         const user = response.data.user;
//         user.token = response.data.token;

//         setUser(user);
//         SecureStore.setItemAsync('user', JSON.stringify(user));
//         dispatch({ type: USER_STATE_CHANGE, currentUser: user, loaded: true });
      
//     })
//     .catch((error) => {
      
//       console.log(error.response);
//     });
// };


export const saveUserField = (field, value) =>
  new Promise((resolve, reject) => {
    let obj = {};
    obj[field] = value;
    firebase
      .firestore()
      .collection("user")
      .doc(firebase.auth().currentUser.uid)
      .update(obj)
      .then(() => resolve())
      .catch(() => reject());
  });

export const saveYouTubeField = (field, value) =>
  new Promise((resolve, reject) => {
    let obj = {};
    obj[field] = value;
    firebase
      .firestore()
      .collection("user")
      .doc(firebase.auth().currentUser.uid)
      .update(obj)
      .then(() => resolve())
      .catch(() => reject());
  });

export const saveInstagramField = (field, value) =>
  new Promise((resolve, reject) => {
    let obj = {};
    obj[field] = value;
    firebase
      .firestore()
      .collection("user")
      .doc(firebase.auth().currentUser.uid)
      .update(obj)
      .then(() => resolve())
      .catch(() => reject());
  });

export const saveCreatorField = (field, value) =>
  new Promise((resolve, reject) => {
    let obj = {};
    obj[field] = value;
    firebase
      .firestore()
      .collection("user")
      .doc(firebase.auth().currentUser.uid)
      .update(obj)
      .then(() => resolve())
      .catch(() => reject());
  });
  
  export const saveRelationshipField = (field, value) =>
  new Promise((resolve, reject) => {
    let obj = {};
    obj[field] = value;
    firebase
      .firestore()
      .collection("user")
      .doc(firebase.auth().currentUser.uid)
      .update(obj)
      .then(() => resolve())
      .catch(() => reject());
  });

export const saveUserLinkField = (field, value) =>
  new Promise((resolve, reject) => {
    let obj = {};
    obj[field] = value;
    firebase
      .firestore()
      .collection("user")
      .doc(firebase.auth().currentUser.uid)
      .update(obj)
      .then(() => resolve())
      .catch(() => reject());
  });

export const saveUserAdmission = (field, value) =>
  new Promise((resolve, reject) => {
    let obj = {};
    obj[field] = value;
    firebase
      .firestore()
      .collection("user")
      .doc(firebase.auth().currentUser.uid)
      .update(obj)
      .then(() => resolve())
      .catch(() => reject());
  });

export const saveUserBuyLink = (field, value) =>
  new Promise((resolve, reject) => {
    let obj = {};
    obj[field] = value;
    firebase
      .firestore()
      .collection("user")
      .doc(firebase.auth().currentUser.uid)
      .update(obj)
      .then(() => resolve())
      .catch(() => reject());
  });

export const saveUserDonateLink = (field, value) =>
  new Promise((resolve, reject) => {
    let obj = {};
    obj[field] = value;
    firebase
      .firestore()
      .collection("user")
      .doc(firebase.auth().currentUser.uid)
      .update(obj)
      .then(() => resolve())
      .catch(() => reject());
  });

export const saveUserReviews = (field, value) =>
  new Promise((resolve, reject) => {
    let obj = {};
    obj[field] = value;
    firebase
      .firestore()
      .collection("user")
      .doc(firebase.auth().currentUser.uid)
      .update(obj)
      .then(() => resolve())
      .catch(() => reject());
  });

export const saveUserPhone = (field, value) =>
  new Promise((resolve, reject) => {
    let obj = {};
    obj[field] = value;
    firebase
      .firestore()
      .collection("user")
      .doc(firebase.auth().currentUser.uid)
      .update(obj)
      .then(() => resolve())
      .catch(() => reject());
  });

export const saveUserEmail = (field, value) =>
  new Promise((resolve, reject) => {
    let obj = {};
    obj[field] = value;
    firebase
      .firestore()
      .collection("user")
      .doc(firebase.auth().currentUser.uid)
      .update(obj)
      .then(() => resolve())
      .catch(() => reject());
  });

export const saveUserPassword = (field, value) =>
  new Promise((resolve, reject) => {
    let obj = {};
    obj[field] = value;
    firebase
      .firestore()
      .collection("user")
      .doc(firebase.auth().currentUser.uid)
      .update(obj)
      .then(() => resolve())
      .catch(() => reject());
  });

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

export const queryUsersByUsername = () => {
  axios
    .post("https://dev.phlokk.com/search", {
      // username: username,
      // id: id,
    })
    .then((response) => {
      console.log('back from login')
      
      console.log(response.data);
      const user = response.data.user;
      user.token = response.data.token;

      setUser(user);
      SecureStore.setItemAsync('user', JSON.stringify(user));
      console.log(user)
      dispatch({ type: USER_STATE_CHANGE, currentUser: user, loaded: true });
    })
    .catch((error) => {
      console.log(error.response);
    });
};



export const getUserRealtime = (id, cb) => {
  return firebase
    .firestore()
    .collection("user")
    .doc(id)
    .onSnapshot((doc) => {
      cb(doc.data());
    });
};
export const getUserById = (id) => {
  return new Promise((resolve, reject) => {
    firebase
      .firestore()
      .collection("user")
      .doc(id)
      .get()
      .then((snapshot) => {
        resolve(snapshot.exists ? snapshot.data() : null);
      })
      .catch(() => reject());
  });
};

// export const getIsFollowing = (userId, otherUserId) =>
//   new Promise((resolve, reject) => {
//     firebase
//       .firestore()
//       .collection("user")
//       .doc(userId)
//       .collection("following")
//       .doc(otherUserId)
//       .get()
//       .then((doc) => {
//         resolve(doc.exists);
//       })
//       .catch(() => reject());
//   });

export const changeFollowState = ({ otherUserId, isFollowing }) =>
  new Promise((resolve, reject) => {
    if (isFollowing) {
      firebase
        .firestore()
        .collection("user")
        .doc(firebase.auth().currentUser.uid)
        .collection("following")
        .doc(otherUserId)
        .delete()
        .then(() => resolve())
        .catch(() => reject());
    } else {
      firebase
        .firestore()
        .collection("user")
        .doc(firebase.auth().currentUser.uid)
        .collection("following")
        .doc(otherUserId)
        .set({})
        .then(() => resolve())
        .catch(() => reject());
    }
  });
