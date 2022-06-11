import * as SecureStore from "expo-secure-store";

const url = "https://dev-api.phlokk.com/api/me";


const fetchGetUsers = async () => {
  let user = JSON.parse(await SecureStore.getItemAsync("user"));

  return fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${user.token}`,
    }
  })
    .then((response) => response.json())
    .catch((error) => {
      throw error;
    });
};




export {fetchGetUsers};
