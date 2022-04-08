import firebase from "firebase";
import { saveMediaToStorage } from "../../services/saveMedia";
require("firebase/firebase-auth");
require("firebase/firestore");
import uuid from "uuid-random";
import { CURRENT_USER_POSTS_UPDATE } from "../constants";
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
          // `post/${firebase.auth().currentUser.uid}/${storagePostId}/video.mp4`
        ),
        // saveMediaToStorage(
        //   thumbnail,
        //   `post/${firebase.auth().currentUser.uid}/${storagePostId}/thumbnail`
        // ),
      ]);

      // return false;

      // this runs after all promises have returned
      allSavePromises
        .then((media) => {
          // console.log("Promises have returned..........");
          // console.log(media);

          // firebase
          //   .firestore()
          //   .collection("post")
          //   .add({
          //     creator: firebase.auth().currentUser.uid,
          //     media,
          //     description,
          //     likesCount: 0,
          //     commentsCount: 0,
          //     videoViews: 0,
          //     creation: firebase.firestore.FieldValue.serverTimestamp(),
          //   })
          //   .then((response) => {
          //     resolve();
          //   })
          //   .catch(() => reject());
        })
        .catch((err) => {
          // save the error
          reject(err);
        });
    });

    // TODO Must get Auth set up before implementing 
export const getPostsByUser =
  (uid = firebase.auth().currentUser.uid) =>
  (dispatch) =>
    new Promise((resolve, reject) => {
      firebase
        .firestore()
        .collection("post")
        .where("creator", "==", uid)
        .orderBy("creation", "desc")
        .onSnapshot((snapshot) => {
          let posts = snapshot.docs.map((doc) => {
            const data = doc.data();
            const id = doc.id;
            return { id, ...data };
          });
          dispatch({
            type: CURRENT_USER_POSTS_UPDATE,
            currentUserPosts: posts,
          });
        });
    });

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
    // .post("https://dev.phlokk.com/test/post", formData, headers)
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
        "Content-Type": "multipart/form-data",
        Accept: "multipart/form-data",
      },
      body: formData,
    });

    console.log(response);
    // let json = await response.json();

    console.log("JSON - -----------------------");
    // console.log(json);
  } catch (error) {
    console.log("error : " + error);
    // return error;
  }

  // let res = await fetch(url, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "multipart/form-data",
  //     Accept: "multipart/form-data",
  //   },
  //   body: formData,
  // });

  // console.log("RES ------------------");
  // console.log(res);

  // .then((response) => {
  //   console.log("the first response -------=============");
  //   console.log(response);

  //   console.log(response.json());
  //   return response.json();
  //   // return response.blob();
  // })
  // .then((blob) => {
  //   console.log("blob");
  //   console.log("the blob ------");
  //   console.log(blob);
  //   console.log("the blob ------");

  //   // return fileRef.put(blob);
  // })
  // .then((task) => {
  //   console.log("task");
  //   return task.ref.getDownloadURL();
  // })
  // .then((downloadUrl) => {
  //   resolve(downloadUrl);
  // })
  // .catch((err) => {
  //   console.log(err);
  //   // reject(err)
  // });
}
