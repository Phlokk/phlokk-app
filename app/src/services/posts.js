import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { useQuery } from "react-query";
import axios from "../redux/apis/axiosDeclaration";

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

export const getFeedAsync = async () => {
  try {
    const result = await axios.get("/api/posts");
    return result.data.data;
  } catch {
    Alert.alert("Could not get feed!");
  }
};

export const getUserFeedAsync = async (userId) => {
  try {
    const result = await axios.get(`/api/posts?userId=${userId}`, {
      testing: "testing",
    });
    return result.data.data;
  } catch {
    Alert.alert("Could not connect to feed!");
  }
};

export const useVideoFeed = (options) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState();

  const skip = options?.skip;

  useEffect(() => {
    const getFeed = async () => {
      setLoading(true);
      const feed = await getFeedAsync();
      setPosts(feed);
      setLoading(false);
    };

    if (!skip) {
      getFeed();
    }
  }, []);

  const getMoreVideos = (lastVideo) => {
    // TODO, load more videos
    // alert("TODO");
  };

  return { posts, getMoreVideos, loading };
};

export const useUserVideoFeed = (userId, options) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState();

  const skip = options?.skip;

  useEffect(() => {
    if (!userId) {
      return;
    }

    const getFeed = async () => {
      setLoading(true);
      const feed = await getUserFeedAsync(userId);
      setPosts(feed);
      setLoading(false);
    };

    if (!skip) {
      getFeed();
    }
  }, [userId]);

  const getMoreUserPosts = (lastVideoId) => {
    // TODO, load more videos
    alert("TODO");
  };

  return { posts, getMoreUserPosts, loading };
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
  await axios.delete("/api/post/delete/"+postId)
      .then((result) => {
        return result.data;
      })
      .catch((error) => {
        Alert.alert("Could not delete post");
      });
};


export const addComment = async (postId, comment) => {
  await axios.post("/api/post/"+postId+"/add-comment", { comment: comment })
      .then((result) => {
        return result.data;
      })
      .catch((error) => {
        Alert.alert("Comment not added!");
      });
};

export const commentListener = async (postId, setCommentList) => {
  await axios.get("/api/post/view/"+postId+"/comments")
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