import axios from "../redux/apis/axiosDeclaration";
import { Alert } from "react-native";
import * as SecureStore from "expo-secure-store";

export const blockUserById = async (userId, againstId) => {
  let url = "/api/block/" + userId + "/" + againstId;
  return await axios.post(url)
};
export const unblockUserById = async (userId, againstId) => {
  let url = "/api/block/unblock/" + userId + "/" + againstId;
  return await axios.post(url)
};

export const blockedListListener = async () => {
  try {
    const user = JSON.parse(await SecureStore.getItemAsync("user"))

    const result = await axios.get(`/api/block/list/${user._id}`);
    return result.data;
  } catch {}
};

// working
export const updateCreator = async (data) => {
  let user = JSON.parse(await SecureStore.getItemAsync("user"));
  await axios.patch(`/api/users/update/${user._id}`, data);
};

export const getStateOfSwitch = async () => {
  try {
    const result = await axios.get(`/api/creators`);

    return result.data;
  } catch (e) {}
};

export const sendReportData = async (data) => {
  await axios.patch("/api/me/update", data);
};

export const getFollowers = async (page, activeUser = null) => {
  let user = JSON.parse(await SecureStore.getItemAsync("user"));
  try {
    const result = await axios.get(
      `/api/users/${activeUser?._id ?? user._id}?page=${page}`
    );

    return result.data;
  } catch (e) {
    Alert.alert("Followers not found");
    return [];
  }
};

export const getFriends = async (page, activeUser = null) => {
  let user = JSON.parse(await SecureStore.getItemAsync("user"));
  try {
    const result = await axios.get(
      `/api/users/friends/${activeUser._id ?? user._id}?page=${page}`
    );

    return result.data;
  } catch (e) {
    Alert.alert("Friends not found");
    return [];
  }
};

export const queryUsers = async (searchQuery) => {
  return await axios.get(`/api/search/searchUsers?query=${searchQuery}`);
};

export const getCount = async (user_id) => {
  try {
    const result = await axios.get(`/api/users/count/${user_id}`);
    return result.data;
  } catch (e) {}
};

export const queryVideos = async (searchQuery, userId,page=1) =>
  await axios.get(`/api/search/searchVideos/${userId}?query=${searchQuery}&page=${page}`);
