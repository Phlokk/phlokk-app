import defaultAxios from "axios";
import * as SecureStore from "expo-secure-store";

import {apiUrlsNode} from "../../globals";

const axios = defaultAxios.create({
  baseURL: apiUrlsNode.BASE_URL2,
  timeout: 30000,
  responseType: "json",
  headers: { "content-type": "application/json", Accept: "application/json" },
});

// // inject id token
axios.interceptors.request.use(
  async (config) => {
    const user = await SecureStore.getItemAsync("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      config.headers["auth-token"] = `${parsedUser.token}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);


export default axios;
