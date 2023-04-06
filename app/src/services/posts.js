import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { useQuery } from "react-query";
import axios from "../redux/apis/axiosDeclaration";
import querystring from "query-string";
import { MaterialIcons } from "@expo/vector-icons";
import CustomAlert from "../components/Alerts/CustomAlert";
import * as SecureStore from "expo-secure-store";

export const POSTS_PER_PAGE = 20;
export const POSTS_PER_USER_PAGE = 20; // Changed to 20 since profiles display thumbnails, and may need more on initial load

export const getPost = async (postId) => {
  try {
    return axios.get(`/api/posts/${postId}`);
  } catch (e) {
    setIsPosts(true);
  }
};

// feed for all Users
export const getFeedAsync = async (page) => {
  let user = JSON.parse(await SecureStore.getItemAsync("user"));
  const paramsObject = { page, limit: POSTS_PER_PAGE, userId: user._id };
  const params = querystring.stringify(paramsObject);
  try {
    const result = await axios.get(`/api/posts/?${params}`);
    

    return result.data;
  } catch {
    setIsFeedVisible(true);
  }
};

// get currentUser feed API
export const getUserFeedAsync = async (userId = null, page = 1) => {
  let user = JSON.parse(await SecureStore.getItemAsync("user"));

  const paramsObject = { page, limit: POSTS_PER_USER_PAGE };
  const params = querystring.stringify(paramsObject);

  try {
    const result = await axios.get(
      `/api/posts/usersPosts/${userId ?? user._id}?page=${1}`
    );
    return result.data;
  } catch {
    setIsFeedConnected(true);
  }
};

export const useVideoFeed = (options) => {
  const [posts, setPosts] = useState([]);
  const [nextPageNumber, setNextPageNumber] = useState();
  const [loading, setLoading] = useState();

  const skip = options?.skip;

  useEffect(() => {
    if (!skip) {
      getFeed();
    }
  }, []);

  const getFeed = async () => {
    setLoading(true);
    const feed = await getFeedAsync();
    setPosts(feed.data);
    setNextPageNumber(feed?.next_page_number);
    setLoading(false);
  };

  const getMoreVideos = async () => {
    if (!nextPageNumber) {
      return;
    }

    setLoading(true);
    const feed = await getFeedAsync(nextPageNumber);
    setPosts((prev) => [...prev, ...feed.data]);
    setNextPageNumber(feed.next_page_number);
    setLoading(false);
  };

  const refresh = async () => {
    await getFeed();
  };

  return { posts, getMoreVideos, loading, refresh };
};

export const useUserVideoFeed = (userId, options) => {
  const [posts, setPosts] = useState([]);
  const [nextPageNumber, setNextPageNumber] = useState();
  const [loading, setLoading] = useState();

  const skip = options?.skip;

  useEffect(() => {
    if (!userId) {
      return;
    }

    if (!skip) {
      getFeed();
    }
  }, [userId]);

  const getFeed = async () => {
    setLoading(true);
    const feed = await getUserFeedAsync(userId);
    setPosts(feed.data);
    setNextPageNumber(feed.next_page_number);
    setLoading(false);
  };

  const getMoreUserPosts = async () => {
    if (!nextPageNumber) {
      return;
    }

    setLoading(true);
    const feed = await getUserFeedAsync(userId, nextPageNumber);
    setPosts((prev) => [...prev, ...feed.data]);
    setNextPageNumber(feed.next_page_number);
    setLoading(false);
  };
  //Copy what we did for useVideoFeed

  const refresh = async () => {
    await getFeed();
  };

  return { posts, getMoreUserPosts, loading, refresh };
};

export const useFeed = (profile) =>
  useQuery(["feed"], () => getFeed(), {
    enabled: !profile,
    notifyOnChangeProps: "tracked",
    refetchInterval: 5000,
  });

export const useUserPosts = (userId, { enabled }) =>
  useQuery(["feed"], () => getFeed(), {
    enabled: !userId,
    notifyOnChangeProps: "tracked",
    refetchInterval: 5000,
  });

export const deletePostById = async (postId) => {
  await axios
    .delete(`/api/posts/delete/${postId}`)
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      console.log("Error:",error)
    });
};

export const addComment = async (comment) => {
  try {
    const { post } = comment;
    const response = await axios.post(`/api/comments/addComment/${post._id}`, {
      comment: comment,
    });

    return response.data;
  } catch (e) {
    setIsComment(true);
  }
};

export const addCommentReply = async (repliedToComment, comment) => {
  try {
    const { post } = comment;
   return await axios.post(`/api/comments/addReply/${post._id}`, {
      repliedToComment,
      comment,
    });
  } catch (e) {
    setIsCommentReply(true);
  }
};
export const addReplyToReply = async (repliedToComment, comment, parentComment) => {
  try {
    const { post } = comment;
     return await axios.post(`/api/comments/replyToReply/${post._id}`, {
      repliedToComment,
      comment,
      parentComment
    });
  } catch (e) {
    setIsCommentReply(true);
  }
};

export const deleteComment = async (postId, commentId) => {
  await axios.delete(`/api/comments/delete/${postId}/${commentId}`);
};

export const deleteCommentReply = async (postId, commentId) => {
  await axios.delete(`/api/comments/deleteReply/${postId}/${commentId}`);
};
export const deleteReplyOfReply = async (postId, commentId) => {
  await axios.delete(`/api/comments/deleteReplyOfReply/${postId}/${commentId}`);
};

export const commentListener = async (
  postId,
  setCommentList,
  setCommentCount
) => {
  let user = JSON.parse(await SecureStore.getItemAsync("user"));
  await axios
    .get(`/api/comments/show/${postId}/${user._id}`)
    .then((result) => {
      setCommentList(result.data);
      let commentCount = 0;
      for (const comment of result.data) {
        commentCount += 1;
        if (comment.comment_replies) {
          for (const reply of comment.comment_replies){ 
            if (reply.comment_replies) {
                commentCount += reply?.comment_replies?.length;
            }
          }
          commentCount += comment?.comment_replies?.length;
        }
      }

      setCommentCount(commentCount);
      return result.data;
    })
    .catch((error) => {
      setIsCommentsVisible(true);
    });
};

export const clearCommentListener = () => {
  if (commentListenerInstance != null) {
    commentListenerInstance();
    commentListenerInstance = null;
  }
};

export const timeSince = function (date) {
  let parsedDate;
  if (typeof date !== "object") {
    parsedDate = new Date(date.replace(" ", "T"));
  };
  const seconds = Math.floor((new Date() - parsedDate) / 1000);

  let intervalType;

  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1) {
    intervalType = "year";
  } else {
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
      intervalType = "month";
    } else {
      interval = Math.floor(seconds / 86400);
      if (interval >= 1) {
        intervalType = "day";
      } else {
        interval = Math.floor(seconds / 3600);
        if (interval >= 1) {
          intervalType = "hour";
        } else {
          interval = Math.floor(seconds / 60);
          if (interval >= 1) {
            intervalType = "minute";
          } else {
            interval = seconds;
            intervalType = "second";
          }
        }
      }
    }
  }

  if (interval > 1 || interval === 0) {
    intervalType += "s";
  }

  return interval + " " + intervalType;
};

const posts = () => {
  // State for Custom Alerts
  const [isPosts, setIsPosts] = useState(false);
  const [isComment, setIsComment] = useState(false);
  const [isCommentReply, setIsCommentReply] = useState(false);
  const [isDeletedVideo, setIsDeletedVideo] = useState(false);
  const [isFeedVisible, setIsFeedVisible] = useState(false);
  const [isFeedConnected, setIsFeedConnected] = useState(false);
  const [isCommentsVisible, setIsCommentsVisible] = useState(false);

  return (
    <View>
      <Text>posts</Text>
      <CustomAlert
        alertTitle={
          <Text>
            <MaterialIcons name="info" size={24} color={colors.green} />
          </Text>
        }
        customAlertMessage={<Text>Comment not added!</Text>}
        positiveBtn="Ok"
        modalVisible={isComment}
        dismissAlert={setIsComment}
        animationType="fade"
      />
      <CustomAlert
        alertTitle={
          <Text>
            <MaterialIcons name="info" size={24} color={colors.green} />
          </Text>
        }
        customAlertMessage={<Text>Comment Reply not added!</Text>}
        positiveBtn="Ok"
        modalVisible={isCommentReply}
        dismissAlert={setIsCommentReply}
        animationType="fade"
      />
      <CustomAlert
        alertTitle={
          <Text>
            <MaterialIcons name="info" size={24} color={colors.green} />
          </Text>
        }
        customAlertMessage={<Text>Video could not be deleted!</Text>}
        positiveBtn="Ok"
        modalVisible={isDeletedVideo}
        dismissAlert={setIsDeletedVideo}
        animationType="fade"
      />
      <CustomAlert
        alertTitle={
          <Text>
            <MaterialIcons name="info" size={24} color={colors.green} />
          </Text>
        }
        customAlertMessage={<Text>Could not get feed!</Text>}
        positiveBtn="Ok"
        modalVisible={isFeedVisible}
        dismissAlert={setIsFeedVisible}
        animationType="fade"
      />
      <CustomAlert
        alertTitle={
          <Text>
            <MaterialIcons name="info" size={24} color={colors.green} />
          </Text>
        }
        customAlertMessage={<Text>Could not connect to feed!</Text>}
        positiveBtn="Ok"
        modalVisible={isFeedConnected}
        dismissAlert={setIsFeedConnected}
        animationType="fade"
      />
      <CustomAlert
        alertTitle={
          <Text>
            <MaterialIcons name="info" size={24} color={colors.green} />
          </Text>
        }
        customAlertMessage={<Text>Comments not found!</Text>}
        positiveBtn="Ok"
        modalVisible={isCommentsVisible}
        dismissAlert={setIsCommentsVisible}
        animationType="fade"
      />
      <CustomAlert
        alertTitle={
          <Text>
            <MaterialIcons name="info" size={24} color={colors.green} />
          </Text>
        }
        customAlertMessage={<Text>Could not get Posts!</Text>}
        positiveBtn="Ok"
        modalVisible={isPosts}
        dismissAlert={setIsPosts}
        animationType="fade"
      />
    </View>
  );
};
