import FormData from "form-data";
import * as SecureStore from "expo-secure-store";

export const saveMediaToStorage = (description, source, thumbnail) => {
  new Promise(async (resolve, reject) => {
    let formData = new FormData();

    // Video file
    let split = source.split('/');
    let fileName = split[(split.length - 1)];
    formData.append("video", {
      name: fileName,
      type: "video/mp4",
      uri: source,
    }, fileName);

    // Thumbnail
    let thumbSplit = thumbnail.split('/');
    let thumbFileName = thumbSplit[(thumbSplit.length - 1)];
    formData.append("thumbnail", {
      name: thumbFileName,
      type: "image/*",
      uri: thumbnail,
    }, thumbFileName);

    const user = await SecureStore.getItemAsync("user");
    
    if (user) {
      const parsedUser = JSON.parse(user);
      let url = "https://dev-api.phlokk.com/api/post/create";
      await fetch(url,
          {
            method: 'POST',
            body: formData,
            headers: {
              Authorization: 'Bearer '+parsedUser.token
            }
          }
      ).then((resp) => {
        alert('Post successfully created');
        console.log('services/saveMedia.js:41');
        resolve(resp);
      }).catch((err) => {
        console.log('services/saveMedia.js:44');
        reject(err);
      });
    } else {
      console.log('no bearer')
    }
  });
};
