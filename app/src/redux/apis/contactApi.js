import axios from './axiosDeclaration';

export const getAllUsers = async (data) => {
  try {
    let users;
    if (data.payload instanceof Array && data.payload.length > 0) {
      users = await axios.post('api/me/filter', data.payload);
    } else {
      users = await axios.get('api/me');
    }

    return [users.data.user];
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






