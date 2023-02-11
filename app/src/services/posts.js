
import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { useQuery } from "react-query";
import axios from "../redux/apis/axiosDeclaration";
import querystring from "query-string";
import { MaterialIcons } from "@expo/vector-icons";
import CustomAlert from "../components/Alerts/CustomAlert";


export const POSTS_PER_PAGE = 20;
export const POSTS_PER_USER_PAGE = 20; // Changed to 20 since profiles display thumbnails, and may need more on initial load


// export const getFeed = () =>
//   axios
//     .get("/api/posts", {
//       testing: "testing",
//     })
//     .then(function (response) {
      
//       return response.data.data;
//       // 2 seconds later...
//     })
//     .catch(function (error) {
//       setIsFeedVisible(true);
//     });

export const getPost = async (postId) => {
  try {
    return axios.get(`/api/post/view/${postId}`);
  } catch (e) {
    setIsPosts(true);
  }
};

// feed for all Users 
export const getFeedAsync = async (page) => {
  const paramsObject = { page, perPage: POSTS_PER_PAGE };
  const params = querystring.stringify(paramsObject);

  try {
    const result = await axios.get(`/api/posts?${params}`);
    
    return result.data;
  } catch {
    setIsFeedVisible(true);
  }
};

// get currentUser feed API
export const getUserFeedAsync = async (userId, page) => {
  const paramsObject = { page, perPage: POSTS_PER_USER_PAGE, userId };
  const params = querystring.stringify(paramsObject);

  try {
    const result = await axios.get(`/api/posts/userPosts?${params}`, {
      testing: "testing",
    });
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
      setIsDeletedVideo(true);
    });
};

export const addComment = async (postId, comment) => {

  await axios
    .post(`/api/post/${postId}/add-comment`, { comment: comment })
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      setIsComment(true);
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
      setIsCommentReply(true);
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
      setIsCommentsVisible(true)
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
  )
}


