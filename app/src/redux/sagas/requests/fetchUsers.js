import * as SecureStore from "expo-secure-store";

const url = "https://dev.phlokk.com/api/creators";
// const url_one= "https://jsonplaceholder.typicode.com/users"

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
