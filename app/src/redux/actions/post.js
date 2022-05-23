import { saveMediaToStorage } from "../../services/saveMedia";
import uuid from "uuid-random";
import { types } from "../constants";
import axios from "../../redux/apis/axiosDeclaration";
import FormData from "form-data";

export const createPost =
  (description, video, thumbnail, source) => (dispatch) =>
    new Promise((resolve, reject) => {
      console.log("creating post ..... click");
      console.log("source");
      console.log(source);
      let storagePostId = uuid();

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
          // console.log(media);
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

// async function sendVideo(videoUrl) {
//   console.log("media..............");
//   console.log(videoUrl);

//   let formData = new FormData();
//   formData.append("testing", videoUrl);
//   formData.append("videoFile", {
//     name: "name.mp4",
//     uri: videoUrl,
//     type: "video/mp4",
//   });

//   let url = "/test/post";
//   try {
//     let response = await fetch(url, {
//       method: "post",
//       headers: {
//         ContentType: "multipart/form-data",
//         Accept: "multipart/form-data",
//       },
//       body: formData,
//     });
//     console.log(response);
//     console.log("JSON - -----------------------");
//     // console.log(json);
//   } catch (error) {
//     console.log("error : " + error);
//     // return error;
//   }
// }
