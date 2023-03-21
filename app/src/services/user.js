import axios from "../redux/apis/axiosDeclaration";
import { Alert } from "react-native";
import * as SecureStore from "expo-secure-store";



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


export const getFollowers = async (page) => {
  let user = JSON.parse(await SecureStore.getItemAsync("user"));
  try {
    //console.log('get Followers', user._id)
      const result = await axios.get(`/api/users/${user._id}?page=${page}`);
      //console.log("followers => ",result.data)
      return result.data;
  } catch (e) {
    console.log(e.message,"")
    Alert.alert("Followers not found");
    return [];
  }
};

export const getFriends = async (page) => {
  let user = JSON.parse(await SecureStore.getItemAsync("user"));
  try {
    //console.log('get Followers', user._id)
      const result = await axios.get(`/api/users/friends/${user._id}?page=${page}`);
      //console.log("followers => ",result.data)
      return result.data;
  } catch (e) {
    console.log(e.message,"")
    Alert.alert("Friends not found");
    return [];
  }
};

export const queryUsers = async (searchQuery) => {
  return await axios.post("/api/creators/search", {
    query: searchQuery,
  });
};



export const getCount = async (user_id) => {
  try {
    const result = await axios.get(`/api/users/count/${user_id}`);
    return result.data;
  } catch (e) {
  }
};
