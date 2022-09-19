import * as SecureStore from "expo-secure-store";

import {apiUrls} from "../../../globals";

const url = apiUrls.BASE_URL + "/api/me";

const fetchGetUser = async (userId) => {
  let user = JSON.parse(await SecureStore.getItemAsync("user"));

  return fetch(apiUrls.BASE_URL + "/api/creator/" + userId, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  })
    .then((response) => response.json())
    .catch((error) => {
      throw error;
    });
};

const fetchGetUsers = async () => {
  let user = JSON.parse(await SecureStore.getItemAsync("user"));

  return fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  })
    .then((response) => response.json())
    .catch((error) => {
      throw error;
    });
};

export { fetchGetUser, fetchGetUsers };
