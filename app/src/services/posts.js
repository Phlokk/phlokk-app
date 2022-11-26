import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { useQuery } from "react-query";
import axios from "../redux/apis/axiosDeclaration";
import querystring from "query-string";
// import config from '../../../config'

// const {BASE_URL_AXIOS} = config;

export const POSTS_PER_PAGE = 10;
export const POSTS_PER_USER_PAGE = 20; // Changed to 20 since profiles display thumbnails, and may need more on initial load

export const getFeed = () =>
  axios
    .get("/api/posts", {
      testing: "testing",
    })
    .then(function (response) {
      return response.data.data;
      // 2 seconds later...
    })
    .catch(function (error) {
      Alert.alert("Could not get feed!");
    });

export const getPost = async (postId) => {
  try {
    return axios.get(`/api/post/view/${postId}`);
  } catch (e) {
    console.log(e);
  }
};

export const getFeedAsync = async (page) => {
  const paramsObject = { page, perPage: POSTS_PER_PAGE };
  const params = querystring.stringify(paramsObject);

  try {
    const result = await axios.get(`/api/posts?${params}`);
    return result.data;
  } catch {
    Alert.alert("Could not get feed!");
  }
};

export const getUserFeedAsync = async (userId, page) => {
  const paramsObject = { page, perPage: POSTS_PER_USER_PAGE, userId };
  const params = querystring.stringify(paramsObject);

  try {
    const result = await axios.get(`/api/posts?${params}`, {
      testing: "testing",
    });
    return result.data;
  } catch {
    Alert.alert("Could not connect to feed!");
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
    setNextPageNumber(feed.next_page_number);
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
    .delete("/api/post/delete/" + postId)
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      Alert.alert("Could not delete post");
    });
};

export const addComment = async (postId, comment) => {
  await axios
    .post(`/api/post/${postId}/add-comment`, { comment: comment })
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      Alert.alert("Comment not added!");
    });
};

export const addCommentReply = async (postId, commentId, comment) => {
  await axios
    .post(`/api/post/${postId}/${commentId}/add-comment-reply`, {
      comment: comment,
    })
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      console.log(error);
      Alert.alert("Comment Reply not added!");
    });
};

export const deleteComment = async (postId, commentId) => {
  await axios.delete(`/api/post/${postId}/${commentId}/delete-comment`);
};

export const deleteCommentReply = async (postId, commentId, replyId) => {
  await axios.delete(
    `/api/post/${postId}/${commentId}/${replyId}/delete-comment`
  );
};

export const commentListener = async (
  postId,
  setCommentList,
  setCommentCount
) => {
  await axios
    .get("/api/post/view/" + postId + "/comments")
    .then((result) => {
      setCommentList(result.data.comments);
      setCommentCount(result.data.comment_count);
      return result.data;
    })
    .catch((error) => {
      Alert.alert("Comments not found");
    });
};

export const clearCommentListener = () => {
  if (commentListenerInstance != null) {
    commentListenerInstance();
    commentListenerInstance = null;
  }
};

export const timeSince = function (date) {
  var seconds = Math.floor((new Date() - date) / 1000);
  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes";
  }
  return Math.floor(seconds) + " seconds";
};
