import { saveMediaToStorage } from "../../services/saveMedia";
import { types } from "../constants";



export const createPost =
  (description, source, thumb) => () =>
    new Promise((resolve, reject) => {
      let allSavePromises = Promise.all([
        saveMediaToStorage(description, source, thumb),
      ]);

      allSavePromises
        .then((media) => {
            console.log('redux/actions/post.js:15');
            resolve(media);
        })
        .catch((err) => {
          console.log('redux/actions/post.js:21');
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


