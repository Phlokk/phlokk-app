import * as SecureStore from "expo-secure-store";
import axios from "../../apis/axiosDeclaration";


const fetchGetUserData = async (userId) => {

  const response = await axios.get(`/api/creators/${userId}`)
  const body = response.data;
  console.log(body, "body of data")
  
  return body;
};

const fetchGetUser = async () => {
let user = JSON.parse(await SecureStore.getItemAsync("user"));

console.log(user, 'from function')
 const response = await axios.get(`/api/creators/${user._id}`)
 
 const userData = response.data;
 return userData;

};


export { fetchGetUser, fetchGetUserData };
