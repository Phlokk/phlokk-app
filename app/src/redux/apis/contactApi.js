import axios from './axiosDeclaration';

export const getAllUsers = async () => {
  try {
    const users = await axios.get('api/creators');
    return users.data;
  } catch (err) {
    return console.error(err);
  }
};






