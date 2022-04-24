
import { useQuery } from "react-query";
import axios from "axios";

let commentListenerInstance = null;

export const getFeed = () =>
  new Promise((resolve, reject) => {
    axios
    .post("https://dev.phlokk.com/test/getPost" ,
      {
        testing: 'testing',
      },
    )
    .then(function (response) {
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


export const useFeed = (profile) =>
  useQuery(["feed"], () => getFeed(), {
    enabled: !profile,
    notifyOnChangeProps: "tracked",
    refetchInterval: 5000,
  });

// TODO change to mongoDB call
// export const deletePostById = async (postId) => {
//   await firebase.firestore().collection("post").doc(postId).delete();
// };



// export const getLikeById = (postId, uid) =>
//   new Promise((resolve, reject) => {
//     firebase
//       .firestore()
//       .collection("post")
//       .doc(postId)
//       .collection("likes")
//       .doc(uid)
//       .get()
//       .then((res) => resolve(res.exists));
//   });

// export const updateLike = (postId, uid, currentLikeState) => {
//   if (currentLikeState) {
//     firebase
//       .firestore()
//       .collection("post")
//       .doc(postId)
//       .collection("likes")
//       .doc(uid)
//       .delete();
//   } else {
//     firebase
//       .firestore()
//       .collection("post")
//       .doc(postId)
//       .collection("likes")
//       .doc(uid)
//       .set({});
//   }
// };

// export const addComment = (postId, creator, comment) => {
//   firebase
//     .firestore()
//     .collection("post")
//     .doc(postId)
//     .collection("comments")
//     .add({
//       creator,
//       comment,
//       creation: firebase.firestore.FieldValue.serverTimestamp(),
//     });
// };

// export const commentListener = (postId, setCommentList) => {
//   commentListenerInstance = firebase
//     .firestore()
//     .collection("post")
//     .doc(postId)
//     .collection("comments")
//     .orderBy("creation", "desc")
//     .onSnapshot((snapshot) => {
//       if (snapshot.docChanges().length == 0) {
//         return;
//       }
//       let comments = snapshot.docs.map((value) => {
//         const id = value.id;
//         const data = value.data();
//         return { id, ...data };
//       });
//       setCommentList(comments);
//     });
// };

export const clearCommentListener = () => {
  if (commentListenerInstance != null) {
    commentListenerInstance();
    commentListenerInstance = null;
  }
};

// export const getPostsByUserId = (uid) =>
//   new Promise((resolve, reject) => {
//     firebase
//       .firestore()
//       .collection("post")
//       .where("creator", "==", uid)
//       .orderBy("creation", "desc")
//       .onSnapshot((snapshot) => {
//         let posts = snapshot.docs.map((doc) => {
//           const data = doc.data();
//           const id = doc.id;
//           return { id, ...data };
//         });
//         resolve(posts);
//       });
//   });

export const useUserPosts = (userId, { enabled }) => {
  // const uid = firebase.auth().currentUser.uid;
  const id = userId || uid;
  return useQuery(["userPosts", id], () => getPostsByUserId(id), {
    enabled,
    notifyOnChangeProps: "tracked",
  });
};
