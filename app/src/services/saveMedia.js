//import FormData from "form-data";
import * as FileSystem from 'expo-file-system';
import { Alert } from "react-native";
import * as SecureStore from "expo-secure-store";
import { apiUrlsNode } from "../globals";
import axios from "../redux/apis/axiosDeclaration";
import * as mime from 'react-native-mime-types';

export const saveMediaToStorage = (description, source, thumbnail) => {

  new Promise(async (resolve, reject) => {


    //let formData = new FormData();
    let obj = {};

    // Video file
    await FileSystem.readAsStringAsync(source, { encoding: FileSystem.EncodingType.Base64 })
  .then(async (fileData) => {
    FileSystem.getInfoAsync(source, { mimeType: true })
  .then((fileInfo) => {
    obj.video = {fileData: fileData, mimetype: mime.lookup(source), ext: mime.extension(mime.lookup(source)), size: fileInfo.size};
  });
  })
  .catch((error) => {
    console.error('Error reading file: ', error);
  });
    let split = source.split("/");
    let fileName = split[split.length - 1];
    

    // Description
    // if (description) {
    //   formData.append("description", description, {
    //     description: description || " ",
    //   });
    // }
    obj.description = description;


    // Thumbnail
    let thumbSplit = thumbnail.split("/");
    let thumbFileName = thumbSplit[thumbSplit.length - 1];
    
    await FileSystem.readAsStringAsync(thumbnail, { encoding: FileSystem.EncodingType.Base64 })
  .then(async (fileData) => {
    FileSystem.getInfoAsync(thumbnail, { mimeType: true })
  .then((fileInfo) => {
    obj.thumbnail = {fileData: fileData, mimetype: mime.lookup(thumbnail), ext: mime.extension(mime.lookup(thumbnail)), size: fileInfo.size};
  })
  })
  .catch((error) => {
    console.error('Error reading file: ', error);
  });

    const user = await SecureStore.getItemAsync("user");

    if (user) {
      const parsedUser = JSON.parse(user);
      obj.user_id = parsedUser._id;
      let url = apiUrlsNode.BASE_URL2 + "/api/posts/create";
    
      axios
      .post(url, obj)
        .then((resp) => {
          alert("Your video has been posted.");
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    } else {
      Alert.alert("No bearer token");
    }
  });
};
