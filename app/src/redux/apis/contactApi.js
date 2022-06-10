import axios from './axiosDeclaration';

export const getAllUsers = async (data) => {
  try {
    const users = await axios.get('api/creators');
    return users.data;
  } catch (err) {
    return console.error(err);
  }
};


export const getAllMarketCreators = async () => {
  try {
    const creators = await axios.get('api/market/creators');
    return creators.data;
  } catch (err) {
    return console.error(err);
  }
};






