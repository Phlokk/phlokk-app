import * as SecureStore from "expo-secure-store";
const url = "https://dev.phlokk.com/api/user";


// const url = "https://jsonplaceholder.typicode.com/users";

const fetchGetUsers = async () => {
  console.log("FETCH API CALL...");
  let user = JSON.parse(await SecureStore.getItemAsync("user"));
  // console.log(user);
  console.log(user.token);
  console.log("FETCH TOKEN...");
  return await fetch(url, {
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


export default fetchGetUsers;
