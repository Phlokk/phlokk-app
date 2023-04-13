import axios from "../apis/axiosDeclaration";
import * as SecureStore from "expo-secure-store";

export const likeVideo =async (postId, type) => {
  let user = JSON.parse(await SecureStore.getItemAsync("user"));
  return axios.post(`/api/likes/likePost/${postId}/${type}`, {
    user_id: user._id
  });
};

export const likeComment = async (postId, commentId, type, userId, postUserId) => {
  return axios.post(`/api/commentsReactions/likeComment/${postId}/${commentId}/${type}/${userId}/${postUserId}`, {});
};

export const likeCommentReply = (postId, commentId, type, userId, commentUserId) => {
  return axios.post(
    `/api/commentsReactions/likeReply/${postId}/${commentId}/${type}/${userId}/${commentUserId}`,
    {
     
    }
  );
};
export const likeCommentReplyToReply = (postId, commentId, type, userId, commentUserId) => {
  return axios.post(
    `/api/commentsReactions/likeReplyToReply/${postId}/${commentId}/${type}/${userId}/${commentUserId}`,
    {
     
    }
  );
};
