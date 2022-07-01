// import { useNavigation, useIsFocused } from "@react-navigation/native";
// import { Video } from "expo-av";
// import React, {
//     forwardRef,
//     useEffect,
//     useImperativeHandle,
//     useRef,
// } from "react";
// import { Dimensions, StyleSheet, Pressable } from "react-native";
// import useMaterialNavBarHeight from "../../hooks/useMaterialNavBarHeight";
// import { useUser } from "../../hooks/useUser";
// import PostSingleOverlay from "../general/post/overlay";
// import { useRoute } from "@react-navigation/native";
// import { Platform } from "expo-modules-core";

// import colors from "../../../config/colors";

// /**
//  * This component is responsible for displaying a post and playing the
//  * media associated with it.
//  *
//  * The ref is forwarded to this component so that the parent component
//  * can manage the play status of the video.
//  */

// export const PostSingle = forwardRef(({ item }, parentRef) => {
//     const navigation = useNavigation();
//     const ref = useRef(null);

//     const route = useRoute();

//     const user = item.user;

//     useImperativeHandle(parentRef, () => ({
//         play,
//         unload,
//         stop,
//     }));

//     useEffect(() => {
//         return () => {
//             if (Platform.OS === "ios") {
//                 unload();

//             }
//         };
//     }, []);

//     /**
//      * Plays the video in the component if the ref
//      * of the video is not null.
//      *
//      * @returns {void}
//      */

//     const play = React.useCallback(async () => {
//         if (ref.current == null || !ref.current) {
//             return;
//         }

//         // if video is already playing return
//         const status = await ref.current.getStatusAsync();
//         if (status?.isPlaying) {
//             return;
//         }
//         try {
//             await ref?.current?.playAsync();
//         } catch (e) {
//             console.log(e);
//         }
//     }, [ref.current]);
//     /**
//      * Stops the video in the component if the ref
//      * of the video is not null.
//      *
//      * @returns {void}
//      */

//     const stop = React.useCallback(async () => {
//         if (ref.current == null || !ref.current) {
//             return;
//         }

//         // if video is already stopped return
//         const status = await ref.current.getStatusAsync();
//         if (!status?.isPlaying) {
//             return;
//         }
//         try {
//             await ref?.current?.stopAsync();
//         } catch (e) {
//             console.log(e);
//         }
//     }, [ref.current]);

//     useEffect(() => {
//         if (Platform.OS === "android") {
//             play();
//         }
//     }, []);

//     /**
//      * Unloads the video in the component if the ref
//      * of the video is not null.
//      *
//      * This will make sure unnecessary video instances are
//      * not in memory at all times
//      *
//      * @returns {void}
//      */
//     const unload = React.useCallback(async () => {
//         if (ref.current == null) {
//             return;
//         }

//         // if video is already stopped return
//         try {
//             await ref?.current?.unloadAsync();
//         } catch (e) {
//             console.log(e);
//         }
//     }, [ref.current]);

//     /**
//      * This component is responsible for muting a post when blur effect takes place.
//      */
//     const isFocused = useIsFocused();

//     const feedItemHeight =
//         Dimensions.get("window").height -
//         useMaterialNavBarHeight(route.params.profile);

//     const videoWidth = Dimensions.get("window").width;

//     const onPress = React.useCallback(async () => {
//         const status = await ref.current.getStatusAsync();
//         if (!status?.isPlaying) {
//             play();
//         }
//         if (status?.isPlaying) {
//             try {
//                 await ref?.current?.pauseAsync();
//             } catch (e) {
//                 console.log(e);
//             }
//         }
//     }, []);

//     return (
//         <Pressable
//             style={{ height: feedItemHeight, width: videoWidth }}
//             onPress={onPress}
//         >
//             <Video
//                 ref={ref}
//                 style={{
//                     alignSelf: "center",
//                     height: feedItemHeight,
//                     width: videoWidth,
//                 }}
//                 resizeMode={Video.RESIZE_MODE_COVER}
//                 isMuted={!isFocused}
//                 onPlaybackStatusUpdate={(status) => {
//                     if (status?.error) {
//                         alert(status.error);
//                     }
//                 }}
//                 // useTextureView={false}
//                 // playInBackground={false}
//                 // disableFocus={true}


//                 // shouldPlay(true) starts video automatically
//                 shouldPlay={true}
//                 isLooping
//                 usePoster
//                 posterSource={{ uri: item.media[1].original_url }}
//                 posterStyle={{ resizeMode: "cover", height: "100%" }}
//                 source={{ uri: item.media[0].original_url, type: item.media[0].mime_type }}
//             />
//             <PostSingleOverlay user={item.user} post={item} />
//         </Pressable>
//     );
// });

// const styles = StyleSheet.create({
//     container: {
//         alignSelf: "center",
//         width: 320,
//         height: 200,
//     },
//     bottomContainer: {
//         flexDirection: "row",
//         backgroundColor: colors.primary,
//         padding: 30,
//     },
//     bottomText: {
//         color: colors.white,
//         bottom: 15,
//     },
//     text: {
//         color: colors.white,
//         fontSize: 30,
//     },
//     playPauseButton: {
//         flexDirection: "row",
//         justifyContent: "center",
//         alignItems: "center",
//     },
// });

// export default React.memo(PostSingle);
