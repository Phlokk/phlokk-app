import axios from './axiosDeclaration';

export const getAllUsers = async () => {
  try {
    const users = await axios.get('api/creators');
    return users.data;
  } catch (err) {
    return console.error(err);
  }
};

// let user = await SecureStore.getItemAsync("user");
//   user = JSON.parse(user);
//   console.log(user.token);

//   axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;






