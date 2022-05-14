import axios from "./axiosDeclaration";

export const getAllUsers = async () => {
  try {
    const users = await axios.get("users");
    return users.data;
  } catch (err) {
    return console.error(err);
  }
};

// export function getAllUsers () {
//     let user = SecureStore.getItemAsync("user");

//     axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
//     axios
//       .get("https://dev.phlokk.com/api/creators")

//       .then((response) => {
//         console.log(response);
//       })
//       .catch((error) => {
//         console.log(error.response);
//       });
//   };
