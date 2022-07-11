import axios from "../redux/apis/axiosDeclaration";


export const getUserById = async (data) => {
  let url = "/api/creator/" + data;
  axios
    .get(url)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const updateCreator = async (data) => {
  console.log("data to send");
  console.log(data);

  await axios.patch("/api/me/update", data);
};

export const getIsFollowing = (user, otherUserId) =>
  new Promise((resolve, reject) => {});


  
