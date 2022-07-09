// import { Image, Animated, StyleSheet, Pressable } from "react-native";
// import React, { useEffect, useRef, useState } from "react";
// import colors from "../../../config/colors";
// import { Video } from "expo-av";

// import AnimatedVisibilityView from "../../components/animatedVisibilityView";
// import { useEffectNonInitial } from "../../hooks/useEffectNonInitial";
// import PostSingleOverlay from "../../components/general/post/overlay";

// const TempFlatListItem = ({
//   item,
//   height,
//   width,
//   isInView,
//   isInPreloadRange,
//   index,
// }) => {
//   const [showPoster, setShowPoster] = useState(true);

//   const playerRef = useRef();

//   const onPlaybackStatusUpdate = (status) => {
//     // console.log({ status });
//     if (status.isPlaying) {
//       setShowPoster(false);
//     }
//   };

//   useEffect(() => {
//     if (isInView) {
//       playerRef.current.playAsync();
//     }
//   }, [isInView]);

//   useEffect(() => {
//     const doIt = async () => {
//       if (isInPreloadRange && !isInView) {
//         await playerRef.current?.playAsync();
//         await playerRef.current?.pauseAsync();
//       }
//     };
//     doIt();
//   }, [isInView, isInPreloadRange]);

//   const onVideoPress = async () => {
//     const status = await playerRef.current.getStatusAsync();
//     if (status.isPlaying) {
//       await playerRef.current.pauseAsync();
//     } else {
//       await playerRef.current.playAsync();
//     }
//   };

//   return (
//     <Pressable
//       onPress={onVideoPress}
//       style={{ height, width, backgroundColor: "black" }}
//     >
//       {isInPreloadRange && (
//         <Video
//           ref={playerRef}
//           //shouldPlay={isInView}
//           style={{ flex: 1 }}
//           source={{
//             uri: item.media[0].original_url,
//             type: item.media[0].mime_type,
//           }}
//           isLooping
//           resizeMode="cover"
//           useNativeControls="false"
//           onPlaybackStatusUpdate={onPlaybackStatusUpdate}
//         />
//       )}

//       <AnimatedVisibilityView
//         isVisible={showPoster}
//         style={{ position: "absolute" }}
//         fadeOutDuration={200}
//         animationDelay={200}
//       >
//         <Image
//           style={{ position: "absolute", height, width }}
//           source={{ uri: item.media[1].original_url }}
//           //    source={require("../../../assets/phlokk_splash_screen_2022.png")}
//           resizeMode="cover"
//         />
//       </AnimatedVisibilityView>
//       <PostSingleOverlay user={item.user} post={item} />
//     </Pressable>
//   );
// };

// export default TempFlatListItem;

// const styles = StyleSheet.create({
//   container: { justifyContent: "center", alignItems: "center" },

//   text: {
//     color: colors.black,
//     marginTop: 30,
//     padding: 20,
//     textAlign: "center",
//   },
// });
