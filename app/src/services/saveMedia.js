import FormData from "form-data";
import axios, { axiosVideo } from "../redux/apis/axiosDeclaration";

export const saveMediaToStorage = (source, description) => {
  new Promise(async (resolve, reject) => {
    console.log("----------------------");
    console.log("save source", source);

    let formData = new FormData();
    formData.append("file", source, {
      name: source,
      type: "video/mp4",
      uri: source.replace("file://", ""),
    });
    formData.append("description", description);
    console.log("Sending.....");
    console.log(formData);
    console.log("------------------");

    let url = "/api/test/post";
    axiosVideo
      .post(url, formData)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error.response);
      });
  });
};
