import axios from "../redux/apis/axiosDeclaration";


export const getAllNewsTickerData = async () => {
  try {
    const result = await axios.get(`/api/features/news_ticker`);
    return result.data;
  } catch (e) {

  }
};
