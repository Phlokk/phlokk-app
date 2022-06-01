import { saveMediaToStorage } from "../../services/saveMedia";
import uuid from "uuid-random";
import { types } from "../constants";
import axios from "../apis/axiosDeclaration";
import FormData from "form-data";

export const createPost =
  (description, video, thumbnail, source) => (dispatch) =>
    new Promise((resolve, reject) => {
      console.log("creating post ..... click");
      console.log("source");
      console.log(source);
      // let storagePostId = uuid();

      let allSavePromises = Promise.all([
        // saveMediaToStorage(
        //   video,
        //   `post/${firebase.auth().currentUser.uid}/${storagePostId}/video.mp4`
        // ),

        saveMediaToStorage(source, description),
        // saveMediaToStorage(
        //   thumbnail,
        //   `post/${firebase.auth().currentUser.uid}/${storagePostId}/thumbnail`
        // ),
      ]);

      allSavePromises
        .then((media) => {
          // console.log("Promises have returned..........");
          console.log(media);
        })
        .catch((err) => {
          // save the error
          reject(err);
        });
    });

// export const getPostsByUser =
//   (auth.currentUser) =>
//   (dispatch) =>
//     new Promise((resolve, reject) => {
//
//           dispatch({
//             type: types.CURRENT_USER_POSTS_UPDATE,
//             currentUserPosts: posts,
//           });
//         });
//     });


