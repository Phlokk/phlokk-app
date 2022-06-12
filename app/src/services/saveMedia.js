import FormData from "form-data";
import * as SecureStore from "expo-secure-store";

export const saveMediaToStorage = (description, source, thumbnail) => {
  new Promise(async (resolve, reject) => {
    console.log("----------------------");
    // console.log("save source", source);
    let formData = new FormData();

    // Description
    formData.append("description", description);

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

    console.log("Sending.....");
    console.log(formData);
    console.log("------------------");
    const user = await SecureStore.getItemAsync("user");
    
    if (user) {
      const parsedUser = JSON.parse(user);
      let url = "https://dev-api.phlokk.com/api/post/create";
      fetch(url,
          {
            method: 'POST',
            body: formData,
            headers: {
              Authorization: 'Bearer '+parsedUser.token
            }
          }
      )
    } else {
      console.log('no bearer')
    }
  });
};
