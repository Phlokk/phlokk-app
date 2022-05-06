import * as SecureStore from "expo-secure-store";
const url = "https://dev.phlokk.com/api/user";

const fetchGetUsers = async () => {
  console.log("FETCH API CALL...");
  let user = SecureStore.getItemAsync("user");
  user = JSON.parse(user);

  return await fetch(url, {
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
