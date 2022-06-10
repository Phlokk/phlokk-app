import axios from './axiosDeclaration';

export const getAllUsers = async (data) => {
  try {
    let users;
    if (data.payload instanceof Array) {
      users = await axios.post('api/creators-filter', data.payload);
    } else {
      users = await axios.get('api/creators');
    }
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






