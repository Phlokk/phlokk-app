import axios from "../redux/apis/axiosDeclaration";


export const getAllSounds = async () => {

  try {
    const result = await axios.get(`/api/sounds`);
    console.log(result.data)
    return result.data;
    
  } catch(e){
    console.log(e)
  }
};