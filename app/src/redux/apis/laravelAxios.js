import defaultAxios from "axios";
import * as SecureStore from "expo-secure-store";

import {apiUrls} from "../../globals";

const axios = defaultAxios.create({
  baseURL: apiUrls.BASE_URL,
  timeout: 30000,
  responseType: "json",
  headers: { "content-type": "application/json", Accept: "application/json" },
});

  axios.interceptors.request.use(
    async (config) => {
      const user = await SecureStore.getItemAsync("user");
      if (user) {
        const parsedUser = JSON.parse(user);
        config.headers["Authorization"] = `Bearer ${parsedUser.token}`;
      }
      return config;
    },
    (error) => {
     
    }
  );


export default axios;
