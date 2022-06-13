import { Video } from "expo-av";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import { useUser } from "../../../hooks/useUser";
import PostSingleOverlay from "./overlay";



export const PostSingle = forwardRef(({ item }, parentRef) => {

  
  const ref = useRef(null);
  const user = item.user;


  console.log('this is errrr');




  useImperativeHandle(parentRef, () => ({
    play,
    unload,
    stop,
  }));

  useEffect(() => {
    return () => unload();
  }, []);

  const play = async () => {
    if (ref.current == null) {
      return;
    }

    // if video is already playing return
    const status = await ref.current.getStatusAsync();
    if (status?.isPlaying) {
      return;
    }
    try {
      await ref.current.playAsync();
    } catch (e) {
      console.log(e);
    }
  };

  const stop = async () => {
    if (ref.current == null) {
      return;
    }

    // if video is already stopped return
    const status = await ref.current.getStatusAsync();
    if (!status?.isPlaying) {
      return;
    }
    try {
      await ref.current.stopAsync();
    } catch (e) {
      console.log(e);
    }
  };

  const unload = async () => {
    if (ref.current == null) {
      return;
    }

    // if video is already stopped return
    try {
      await ref.current.unloadAsync();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <PostSingleOverlay user={item.user} post={item} />
      <Video
        ref={ref}
        style={styles.container}
        resizeMode={Video.RESIZE_MODE_COVER}
        shouldPlay={false}
        isLooping
        usePoster
        posterSource={{ uri: item.media[1].original_url }}
        posterStyle={{ resizeMode: "cover", height: "100%" }}
        source={{ uri: item.media[0].original_url, type: item.media[0].mime_type }}
       
      />
    </>
  );
});

const styles = StyleSheet.create({
  container: {
      flex: 1,       
  },
 
});

export default PostSingle;
