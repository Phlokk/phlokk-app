import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { useQuery } from "react-query";
import axios from "../redux/apis/axiosDeclaration";
import querystring from "query-string";

export const POSTS_PER_PAGE = 10;

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
  const paramsObject = { page, perPage: POSTS_PER_PAGE, userId };
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
    .post("/api/post/" + postId + "/add-comment", { comment: comment })
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      Alert.alert("Comment not added!");
    });
};

export const commentListener = async (postId, setCommentList) => {
  await axios
    .get("/api/post/view/" + postId + "/comments")
    .then((result) => {
      setCommentList(result.data.comments);
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


export const getNotifications = () =>
  axios
    .get("/api/me/notifications", {
      id: id,
      type: "like",
      target_id: "",
      title: title,
      message: message
    })
    .then(function (response) {
      return response.data.data;
      // 2 seconds later...
    })
    .catch(function (error) {
      Alert.alert("Could not get notifications!");
    });
