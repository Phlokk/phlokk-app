import Axios from "../apis/axiosDeclaration";

export const likeVideo = (postId, type) => {
  return Axios.post(`/api/post/${postId}/${type}`, {});
};
