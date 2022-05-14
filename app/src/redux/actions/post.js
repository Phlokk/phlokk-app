import { saveMediaToStorage } from "../../services/saveMedia";
import uuid from "uuid-random";
import { types } from "../constants";
import axios from "axios";
import FormData from "form-data";

export const createPost =
  (description, video, thumbnail, source) => (dispatch) =>
    new Promise((resolve, reject) => {
      console.log("creating post ..... click");
      console.log("source");
      console.log(source);
      let storagePostId = uuid();

      // const headers = {
      //   // Authorization: `Bearer ${token}`,
      //   "Content-Type": "multipart/form-data",
      // };

      // reader.onload = () => {
      //   // add the file to the array
      //   videos.push(reader.result);
      //   console.log("Sending videos......");
      //   sendVideo(videos);
      // };
      // orig, under -------------------

      let allSavePromises = Promise.all([
        // saveMediaToStorage(
        //   video,
        //   `post/${firebase.auth().currentUser.uid}/${storagePostId}/video.mp4`
        // ),

        saveMediaToStorage(
          source, 
          description, 
        ),
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

    // TODO Must get Auth set up before implementing 
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

function sendVideoOLD(files) {
  // formData.append("video", video);
  // formData.append("video", {
  // ...image,
  // video,
  // uri:
  //   Platform.OS === "android"
  //     ? video.uri
  //     : video.uri.replace("file://", ""),
  // name: `image-${i}`,
  // type: 'image/jpeg', // it may be necessary in Android.
  // });

  // call our laravel API
  axios
    .post(
      "https://dev.phlokk.com/test/post",
      {
        videos: videos,
      },
      headers
    )
    .then(function (response) {
      // 2 seconds later...

      console.log("------------ Response ---------");
      // console.log(response);
      console.log(response.data);
      console.log("------------ Response ---------");
    })
    .catch(function (error) {
      console.log("------------ Back from Server ----------");
      console.log("------------ ERROR -------------");
      console.log(error);
    });
}

async function sendVideo(videoUrl) {
  console.log("media..............");
  console.log(videoUrl);

  let formData = new FormData();
  formData.append("testing", videoUrl);
  formData.append("videoFile", {
    name: "name.mp4",
    uri: videoUrl,
    type: "video/mp4",
  });

  let url = "https://dev.phlokk.com/test/post";
  try {
    let response = await fetch(url, {
      method: "post",
      headers: {
        ContentType: "multipart/form-data",
        Accept: "multipart/form-data",
      },
      body: formData,
    });
    console.log(response);
    console.log("JSON - -----------------------");
    // console.log(json);
  } catch (error) {
    console.log("error : " + error);
    // return error;
  }
}
