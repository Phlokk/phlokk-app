import defaultAxios from 'axios';
// import * as SecureStore from "expo-secure-store";

// let user = await SecureStore.getItemAsync("user");
    // user = JSON.parse(user);

// axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;// The token that needs to be passed
const axios = defaultAxios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/',
  headers: {
      'Content-Type': 'application/json'},
});

export default axios;
