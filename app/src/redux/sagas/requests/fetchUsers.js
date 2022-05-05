import * as SecureStore from "expo-secure-store";

const url = "https://jsonplaceholder.typicode.com/users";

const fetchGetUsers = () => {
  let user = SecureStore.getItemAsync("user");
  user = JSON.parse(user);
  console.log(user.token);
  return fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${user.token}`,
      ContentType: "application/json",
    },
  })
    .then((response) => response.json())
    .catch((error) => {
      throw error;
    });
};

export default fetchGetUsers;
