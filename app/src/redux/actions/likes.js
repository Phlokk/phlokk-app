import Axios from "../apis/axiosDeclaration";

export const likeVideo = (postId, type) => {
  return Axios.post(`/api/post/${postId}/${type}`, {});
};

export const likeComment = (postId, commentId, type) => {
  return Axios.post(`/api/post/${postId}/${commentId}/${type}`, {});
};

export const likeCommentReply = (postId, commentId, commentReplyId, type) => {
  return Axios.post(
    `/api/post/${postId}/${commentId}/${commentReplyId}/${type}`,
    {}
  );
};
