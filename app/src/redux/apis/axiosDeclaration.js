import defaultAxios from "axios";
import * as SecureStore from "expo-secure-store";
// import config from "../../../../config"

// console.log(config.BASE_URL_AXIOS)
// const {BASE_URL_AXIOS} = config;



const axios = defaultAxios.create({
  baseURL: "https://api.phlokk.com",
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




export default axios;
