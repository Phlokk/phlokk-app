import defaultAxios from "axios";
import * as SecureStore from "expo-secure-store";

import { supportUrls } from "../../globals";

const urlAxios = defaultAxios.create({
  baseURL: supportUrls.BASE_URL,
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
      config.headers["Authorization"] = `Bearer ${parsedUser.token}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default urlAxios;
