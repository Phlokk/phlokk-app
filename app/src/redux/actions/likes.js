import axios from "../apis/axiosDeclaration";

export const likeVideo = (postId, type) => {
  return axios.post(`/api/post/${postId}/${type}`, {});
};

export const likeComment = async (postId, commentId, type, userId) => {
  console.log('like comment = >', postId, commentId, type, userId);
  return axios.post(`/api/commentsReactions/likeComment/${postId}/${commentId}/${type}/${userId}`, {});
};

export const likeCommentReply = (postId, commentId, commentReplyId, type) => {
  return axios.post(
    `/api/post/${postId}/${commentId}/${commentReplyId}/${type}`,
    {}
  );
};
