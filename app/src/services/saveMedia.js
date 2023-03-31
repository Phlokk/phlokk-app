import FormData from "form-data";
import { Alert } from "react-native";
import * as SecureStore from "expo-secure-store";  
import {apiUrlsNode} from "../globals"; 
export const saveMediaToStorage = (description, source, thumbnail) => {

 
  new Promise(async (resolve, reject) => {
    let formData = new FormData();

    // Video file
    let split = source.split("/");
    let fileName = split[split.length - 1];
    formData.append(
      "video",
      {
        name: fileName,
        type: "video/mp4",
        uri: source,
      },
      fileName
    );

    // Description
    formData.append("description", description, {
      description: description || " ",
    });

    // Thumbnail
    let thumbSplit = thumbnail.split("/");
    let thumbFileName = thumbSplit[thumbSplit.length - 1];
    formData.append(
      "thumbnail",
      {
        name: thumbFileName,
        type: "image/*",
        uri: thumbnail,
      },
      thumbFileName
    );

    const user = await SecureStore.getItemAsync("user");

    if (user) {
      const parsedUser = JSON.parse(user);
      formData.append("user_id", parsedUser._id,{
        user_id: parsedUser._id
      } )
      let url =  apiUrlsNode.BASE_URL2 +  "/api/posts/create";
      const config = { 
        "content-type": "multipart/form-data",
      "auth-token": `${parsedUser.token}`,
      };
      fetch(url, {
        method: 'POST',
        headers: config,
        body:  formData 
      }).then((e)=>{
        alert("Your video has been posted.");
        console.log("response",e );
      }).catch((ex)=>{
        console.log("Error", ex)
      }) 

    } else {
      Alert.alert("No bearer token");
    }
  });

};
