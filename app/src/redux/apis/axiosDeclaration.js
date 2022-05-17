import defaultAxios from 'axios';
import * as SecureStore from "expo-secure-store";


token = "227|v6YVOCQ8mRpQJBNKxM7xWE8Wi0Mu7yayZwwFRn3C";

// let token = await SecureStore.getItemAsync("user", JSON.stringify(user));
// user = JSON.parse(user)


const axios = defaultAxios.create({
  baseURL: 'https://dev.phlokk.com/',
  headers: {
       Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer '+token

},
});

export default axios;


// export const getAllUsers = async () => {
//   console.log("handling logout");
//   let user = await SecureStore.getItemAsync("user");
//   user = JSON.parse(user);
  

//   axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
//   axios
//     .get("https://dev.phlokk.com/api/creators", {
//       Accept: 'application/json',
//       ContentType: 'application/json'
//     })
//     .then((response) => {
//       console.log("back from DB", response);
//     })
//     .catch((error) => {
//       console.log(error.response);
//     });
// };