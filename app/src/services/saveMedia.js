import FormData from "form-data";
import * as SecureStore from "expo-secure-store";

export const saveMediaToStorage = (source, description) => {
  new Promise(async (resolve, reject) => {
    console.log("----------------------");
    // console.log("save source", source);
    let formData = new FormData();
    let split = source.split('/');
    let fileName = split[(split.length - 1)];

    formData.append("video", {
      name: fileName,
      type: "video/mp4",
      uri: source,
    }, fileName);
    console.log("Sending.....");
    console.log(formData);
    console.log("------------------");
    const user = await SecureStore.getItemAsync("user");
    
    if (user) {
      const parsedUser = JSON.parse(user);
      let url = "/api/test/post";
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
