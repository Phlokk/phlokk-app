// import React, { useEffect, useState, useRef } from "react";
// import { fetchGetUsers } from "../redux/sagas/requests/fetchUsers";
// import * as Notifications from "expo-notifications";
// import { apiUrls } from "./../globals";
// import axios from "./../redux/apis/axiosDeclaration";
// import routes from "./../navigation/routes";
// import { atom, useAtom } from "jotai";

// export const userAtom = atom({});

// export const usersAtom = async () => {
//   const [user, setUser] = useAtom(userAtom);

//   const [notification, setNotification] = useState(false);
//   const notificationListener = useRef();
//   const responseListener = useRef();
//   const [setAppIsAvailable] = useState(false);


//   const checkStatus = async () => {
//     const response = await fetch(apiUrls.BASE_URL + "/api/system-status", {
//       method: "GET",
//     }).then((response) => response.json());
//     setAppIsAvailable(response.status === "available");
//     return response.status === "available";
//   };

//   // check if server is available
//   const appIsAvailable = await checkStatus();
//   if (!appIsAvailable) {
//     Alert.alert("System is down for maintenance. Please try again later");
//   } else {
//     const loadUser = async () => {
//       const response = await fetchGetUsers();
//       setUser(response.user);
    
//     };

//     loadUser();
//     // This listener is fired whenever a notification is received while the app is foregrounded
//     notificationListener.current =
//       Notifications.addNotificationReceivedListener((notification) => {
//         setNotification(notification);
//       });
//     // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
//     responseListener.current =
//       Notifications.addNotificationResponseReceivedListener(
//         async (response) => {
//           const receievedNotification = response;

//           const notificationObject = await axios
//             .get(
//               apiUrls.BASE_URL +
//                 "/api/me/notification/" +
//                 response.notification.request.content.data._id
//             )
//             .then(function (response) {
//               return response.data;
//             });

//           switch (notificationObject.type) {
//             case 1:
//               // Device registered for notifications
//               navigationRef.current.navigate(routes.USER_POSTS, {
//                 creator: notificationObject.associated.user,
//                 profile: true,
//                 selectedVideo:
//                   notificationObject.associated.media[0].original_url,
//                 selectedIndex: 0,
//                 preloadedPosts: [notificationObject.associated],
//               });
//               break;
//             case 2:
//               // Reaction to a post
//               navigationRef.current.navigate(routes.USER_POSTS, {
//                 creator: notificationObject.associated.user,
//                 profile: true,
//                 selectedVideo:
//                   notificationObject.associated.media[0].original_url,
//                 selectedIndex: 0,
//                 preloadedPosts: [notificationObject.associated],
//               });
//               break;
//             case 3:
//               // Comment on a post
//               navigationRef.current.navigate(routes.USER_POSTS, {
//                 creator: notificationObject.associated.user,
//                 profile: true,
//                 selectedVideo:
//                   notificationObject.associated.media[0].original_url,
//                 selectedIndex: 0,
//                 preloadedPosts: [notificationObject.associated],
//               });
//               break;
//             case 4:
//               // Post has been deleted
//               break;
//             case 5:
//               const targetUser = notificationObject.associated;
//               navigationRef.current.navigate("profileOther", {
//                 initialUser: targetUser,
//               });
//               break;
//             case 6:
//               navigationRef.current.navigate(routes.USER_POSTS, {
//                 creator: notificationObject.associated.user,
//                 profile: true,
//                 selectedVideo:
//                   notificationObject.associated.media[0].original_url,
//                 selectedIndex: 0,
//                 preloadedPosts: [notificationObject.associated],
//               });
//               break;
//             case 7:
//               navigationRef.current.navigate(routes.USER_POSTS, {
//                 creator: notificationObject.associated.user,
//                 profile: true,
//                 selectedVideo:
//                   notificationObject.associated.media[0].original_url,
//                 selectedIndex: 0,
//                 preloadedPosts: [notificationObject.associated],
//               });
//               break;
//             case 8:
//               navigationRef.current.navigate(routes.USER_POSTS, {
//                 creator: notificationObject.associated.user,
//                 profile: true,
//                 selectedVideo:
//                   notificationObject.associated.media[0].original_url,
//                 selectedIndex: 0,
//                 preloadedPosts: [notificationObject.associated],
//               });
//               break;
//             case 9:
//               navigationRef.current.navigate(routes.USER_POSTS, {
//                 creator: notificationObject.associated.user,
//                 profile: true,
//                 selectedVideo:
//                   notificationObject.associated.media[0].original_url,
//                 selectedIndex: 0,
//                 preloadedPosts: [notificationObject.associated],
//               });
//               break;
//             default:
//             // Something else, navigate to notification list
//           }
//         }
//       );

//     return () => {
//       Notifications.removeNotificationSubscription(
//         notificationListener.current
//       );
//       Notifications.removeNotificationSubscription(responseListener.current);
//     };
//   }
// }

