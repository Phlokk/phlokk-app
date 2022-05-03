import FormData from "form-data";

export const saveMediaToStorage = (source, description) => {
  new Promise(async (resolve, reject) => {
    console.log("----------------------");
    console.log("save source", source);


    let formData = new FormData();
    formData.append("video", {
      name: source,
      type: "video/mp4",
      uri: source.replace("file://", ""),
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
    console.log("RESULT --------------------");

  });
};


