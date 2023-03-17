import axios from "../redux/apis/axiosDeclaration";
import { Alert } from "react-native";



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

// working 
export const updateCreator = async (user, data) => {
  await axios.patch(`/api/users/update/${user._id}`, data);
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

  

export const getFollowers = async (me, id = null) => {
  try {
    if (me) {
      const result = await axios.get(`/api/users/${user_id}`);
      console.log(result.data.followers)
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

// working 
export const getAllUserPostLikes = async (_id) => {
  try {
    const result = await axios.get(`/api/likes/userLikes/${_id}`);
    return result.data;
  } catch (e) {
  }
};

// working 
export const getFollowersCount = async (user_id) => {
  try {
    const result = await axios.get(`/api/users/followerCount/${user_id}`);
    return result.data;
  } catch (e) {
  }
};
