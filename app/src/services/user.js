import axios from "../redux/apis/axiosDeclaration";
import { Alert } from "react-native";

export const getUserById = async (data) => {
  let url = "/api/creator/" + data;
  axios
    .get(url)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {});
};

export const blockUserById = async (userId) => {
  let url = "/api/creator/" + userId + "/block";
  axios
    .post(url)
    .then((res) => {
      return res;
    })
    .catch((e) => {
      alert("EXCEPTION");
    });
};

export const blockedListListener = async () => {
  try {
    const result = await axios.get(`/api/me/block-list/`);
    return result.data;
  } catch (e) {

  }
};

export const updateCreator = async (data) => {
  await axios.patch("/api/me/update", data);
};

export const getStateOfSwitch = async () => {
  try {
    const result = await axios.get(`/api/creators`);
    
    return result.data;
  } catch (e) {
  }
};

export const sendReportData = async (data) => {
  await axios.patch("/api/me/update", data);
};

export const getIsFollowing = (user, otherUserId) =>
  new Promise((resolve, reject) => {});

  

export const getFollowers = async (me, id = null) => {
  try {
    if (me) {
      const result = await axios.get("/api/me/follower-list");
      return result.data.followers;
    } else {
      const result = await axios.get("/api/creator/" + id + "/followers");
      return result.data.followers;
    }
  } catch (e) {
    Alert.alert("Followers not found");
    return [];
  }
};

export const queryUsers = async (searchQuery) => {
  return await axios.post("/api/creators/search", {
    query: searchQuery,
  });
};

export const getAllUserPostLikes = async (_id) => {
  try {
    const result = await axios.get(`/api/posts/postsLikes/${_id}`);
    return result.data;
  } catch (e) {
    console.log(e)
  }
};
