
import axios from "axios";
import FormData from "form-data";
import { Platform } from "react-native";

export const saveMediaToStorage = (source, description) => {
  new Promise(async (resolve, reject) => {
    console.log("----------------------");
    console.log("----------------------");
    console.log("----------------------");
    console.log("save source", source);


    let formData = new FormData();
    formData.append("video", {
      name: source,
      type: "video/mp4",
      uri: source.replace("file://", ""),
      // uri: Platform.OS === "ios" ? source.replace("file://", "") : source,
    });
    formData.append("description", description);
    console.log("Sending.....");
    console.log(formData);
    console.log("------------------");

    let url = "https://dev.phlokk.com/test/post";
    let res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    }).catch((err) => {
      console.log(err);
    });

    console.log("RESULT --------------------");
    console.log(res);
    let test = await res.json();
    console.log(test);

    // console.log(res.data);
    console.log("RESULT --------------------");

    // original code to try below.........
    //     const data = new FormData();
    // data.append('file', {
    //   name: file.name,
    //   type: file.type,
    //   uri: Platform.OS === 'ios' ?
    //        file.uri.replace('file://', '')
    //        : file.uri,
    // });

    // orig below..........................

    // const fileRef = firebase.storage().ref().child(path);

    // fetch(source)
    //   .then((response) => {
    //     console.log(response);
    //     return response.blob();
    //   })
    //   .then((blob) => {
    //     console.log(blob);
    //     console.log("blob");

    //     // return fileRef.put(blob);
    //   })
    //   .then((task) => {
    //     // console.log(task)
    //     // console.log("task");
    //     // return task.ref.getDownloadURL();
    //   })
    //   .then((downloadUrl) => {
    //     // console.log(downloadURL)
    //     // resolve(downloadUrl);
    //   })
    //   .catch((err) => reject(err));
  });
};
