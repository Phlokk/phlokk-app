import { useEffect, useState } from "react";
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
      console.log(
        "------------ Back from server Error  GET FEED FUNC 1 ----------"
      );
      console.log(error);
    });

export const getFeedAsync = async () => {
  try {
    const result = await axios.get("/api/posts");
    return result.data.data;
  } catch {
    console.log(
      "------------ Back from server Error  GET FEED FUNC 2 ----------"
    );
    console.log(error);
  }
};

export const getUserFeedAsync = async (userId) => {
  try {
    const result = await axios.get(`/api/posts?userId=${userId}`, {
      testing: "testing",
    });
    return result.data.data;
  } catch {
    console.log(
      "------------ Back from server Error  GET FEED FUNC 3 ----------"
    );
    console.log(error);
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
  await axios.delete("/api/post/delete/+postId", postId)
      .then((result) => {
        return result.data;
      })
      .catch((error) => {
        console.log(error);
      });
};

// export const getLikeById = (postId, uid) =>
//   new Promise((resolve, reject) => {
//     firebase
//       .firestore()
//       .collection("post")
//       .doc(postId)
//       .collection("likes")
//       .doc(uid)
//       .get()
//       .then((res) => resolve(res.exists));
//   });

// export const updateLike = (postId, uid, currentLikeState) => {
//   if (currentLikeState) {
//     firebase
//       .firestore()
//       .collection("post")
//       .doc(postId)
//       .collection("likes")
//       .doc(uid)
//       .delete();
//   } else {
//     firebase
//       .firestore()
//       .collection("post")
//       .doc(postId)
//       .collection("likes")
//       .doc(uid)
//       .set({});
//   }
// };

export const addComment = async (postId, creator, comment) => {
  // console.log('target : ' + '/api/post/'+postId+'/add-comment');
  await axios.post("/api/post/"+postId+"/add-comment", { comment: comment })
      .then((result) => {
        return result.data;
      })
      .catch((error) => {
        console.log(error);
      });
};

export const commentListener = async (postId, setCommentList) => {
  console.log('get comments : ' + '/api/post/view/'+postId+'/comments');
  await axios.get("/api/post/view/"+postId+"/comments")
      .then((result) => {
        // let comments = result.data.comments.map((comment) => {
        //   const id = comment.id;
        //   const data = comment.message;
        //   return { id, ...data };
        // });
        setCommentList(result.data.comments);
        return result.data;
      })
      .catch((error) => {
        console.log(error);
      });
};

export const clearCommentListener = () => {
  if (commentListenerInstance != null) {
    commentListenerInstance();
    commentListenerInstance = null;
  }
};
