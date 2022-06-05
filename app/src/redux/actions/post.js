import { saveMediaToStorage } from "../../services/saveMedia";
import { types } from "../constants";



export const createPost =
  (description, thumbnail, source) => () =>
    new Promise((resolve, reject) => {
      console.log("creating post ..... click");
      console.log(source);
      let allSavePromises = Promise.all([
        saveMediaToStorage(source, description),
        // saveMediaToStorage(
        //   thumbnail,
        //   `post/${firebase.auth().currentUser.uid}/${storagePostId}/thumbnail`
        // ),
      ]);

      allSavePromises
        .then((media) => {
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


