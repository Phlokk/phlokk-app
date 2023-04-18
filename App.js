import "react-native-gesture-handler";
import "react-native-reanimated";
import React, { useEffect, useState, useRef } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import store from "./app/src/redux/reducers/configureStore";
import { Provider } from "react-redux";
import Route from "./app/src/navigation/main/Route";
import BannedRoute from "./app/src/navigation/main/BannedRoute";
import { Alert, LogBox, StatusBar, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useAtom } from "jotai";
import { fetchGetUser } from "./app/src/redux/sagas/requests/fetchUser";
import * as SplashScreen from "expo-splash-screen";
// imports for notifications.js
import * as Notifications from "expo-notifications";
import { navigationRef } from "./app/src/navigation/rootNavigation.js/index";
import { apiUrls } from "./app/src/globals";
import axios from "./app/src/redux/apis/axiosDeclaration";
import routes from "./app/src/navigation/routes";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "./app/src/theme/context";
import colors from "./app/config/colors";
import { userAtom } from "./app/src/services/appStateAtoms";
import Constants from "expo-constants";
import * as SecureStore from "expo-secure-store";
import jwtDecode from 'jwt-decode';


SplashScreen.preventAutoHideAsync();

LogBox.ignoreLogs(["Setting a timer"]);
LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);
LogBox.ignoreLogs([
  "Warning: Encountered two children with the same key, `::`. Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted — the behavior is unsupported and could change in a future version.",
]);
LogBox.ignoreLogs([
  "Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.",
]);

LogBox.ignoreLogs([/Invalid view returned from registry, expecting EXVideo/]);

// export const userAtom = atom({});

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchInterval: false, staleTime: Infinity } },
});

// notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [user, setUser] = useAtom(userAtom);
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  const [appIsAvailable, setAppIsAvailable] = useState(true);

  useFonts({
    "Waterfall-Regular": require("./app/assets/fonts/Waterfall-Regular.ttf"),
    "DarkerGrotesque-Medium": require("./app/assets/fonts/DarkerGrotesque-Medium.ttf"),
  });

  async function registerForPushNotificationsAsync() {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    if (status !== 'granted') {
      alert('You need to grant permission to receive push notifications');
      return;
    }
  
    const token = await Notifications.getExpoPushTokenAsync();
    console.log(token);
  }

  useEffect(() => {
    const hideSplash = async () => {
      await wait(2000);
      await SplashScreen.hideAsync();
    };

    // if (appIsAvailable) {
    hideSplash();
    // }
  }, [appIsAvailable]);

  const version = Constants.manifest.version;
  const buildVersion =
    Constants.manifest.ios.buildNumber ||
    Constants.manifest.android.versionCode;
  const checkStatus = async () => {
    const response = await axios.get(
      `/api/auth/system-status/${version}/${buildVersion}`
    );
    setAppIsAvailable(response?.data === "available");
    return response.data === "available";
  };
  useEffect(async () => {
    // check if server is available-- needs to be implemented in NODE JS
    const appAvailable = await checkStatus();
    if (!appAvailable) {
      Alert.alert("System is down for maintenance. Please try again later");
    } else {
      const loadUser = async () => {
        const response = await fetchGetUser(user._id);
        setUser(response);
      };

      loadUser();
      // This listener is fired whenever a notification is received while the app is foregrounded
      notificationListener.current =
        Notifications.addNotificationReceivedListener((notification) => {
          setNotification(notification);
        });
      // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
      responseListener.current =
        Notifications.addNotificationResponseReceivedListener(
          async (response) => {
            const receievedNotification = response;

            const notificationObject = await axios
              .get(
                apiUrls.BASE_URL +
                  "/api/me/notification/" +
                  response.notification.request.content.data._id
              )
              .then(function (response) {
                return response.data;
              });

            switch (notificationObject.type) {
              case 1:
                // Device registered for notifications
                navigationRef.current.navigate(routes.USER_POSTS, {
                  creator: notificationObject.associated.user,
                  profile: true,
                  selectedVideo:
                    notificationObject.associated.media[0].original_url,
                  selectedIndex: 0,
                  preloadedPosts: [notificationObject.associated],
                });
                break;
              case 2:
                // Reaction to a post
                navigationRef.current.navigate(routes.USER_POSTS, {
                  creator: notificationObject.associated.user,
                  profile: true,
                  selectedVideo:
                    notificationObject.associated.media[0].original_url,
                  selectedIndex: 0,
                  preloadedPosts: [notificationObject.associated],
                });
                break;
              case 3:
                // Comment on a post
                navigationRef.current.navigate(routes.USER_POSTS, {
                  creator: notificationObject.associated.user,
                  profile: true,
                  selectedVideo:
                    notificationObject.associated.media[0].original_url,
                  selectedIndex: 0,
                  preloadedPosts: [notificationObject.associated],
                });
                break;
              case 4:
                // Post has been deleted
                break;
              case 5:
                const targetUser = notificationObject.associated;
                navigationRef.current.navigate("profileOther", {
                  initialUser: targetUser,
                });
                break;
              case 6:
                navigationRef.current.navigate(routes.USER_POSTS, {
                  creator: notificationObject.associated.user,
                  profile: true,
                  selectedVideo:
                    notificationObject.associated.media[0].original_url,
                  selectedIndex: 0,
                  preloadedPosts: [notificationObject.associated],
                });
                break;
              case 7:
                navigationRef.current.navigate(routes.USER_POSTS, {
                  creator: notificationObject.associated.user,
                  profile: true,
                  selectedVideo:
                    notificationObject.associated.media[0].original_url,
                  selectedIndex: 0,
                  preloadedPosts: [notificationObject.associated],
                });
                break;
              case 8:
                navigationRef.current.navigate(routes.USER_POSTS, {
                  creator: notificationObject.associated.user,
                  profile: true,
                  selectedVideo:
                    notificationObject.associated.media[0].original_url,
                  selectedIndex: 0,
                  preloadedPosts: [notificationObject.associated],
                });
                break;
              case 9:
                navigationRef.current.navigate(routes.USER_POSTS, {
                  creator: notificationObject.associated.user,
                  profile: true,
                  selectedVideo:
                    notificationObject.associated.media[0].original_url,
                  selectedIndex: 0,
                  preloadedPosts: [notificationObject.associated],
                });
                break;
              default:
              // Something else, navigate to notification list
            }
          }
        );

      return () => {
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
        Notifications.removeNotificationSubscription(responseListener.current);
      };
    }
  }, [appIsAvailable]);
  useEffect(() => {
    const interval = setInterval(async() => {
     await checkTokenExpiry()
    },  3*1000);

    return () => clearInterval(interval);
  }, []);
  useEffect(async()=> {
    Notifications.addNotificationReceivedListener((notification) => {
      console.log("New notification", notification )
    });
   await checkTokenExpiry()
  }, []);
  const checkTokenExpiry =async () => {
    const user = JSON.parse(await SecureStore.getItemAsync("user")) 
    if(user){
      const decodedToken = jwtDecode(user.token); 
      if(hasTimestampExpired(decodedToken.exp)){
       await updateRefreshToken()
      }
    } 
  }
  const hasTimestampExpired = (timestamp) => { 
  const currentTime = Math.floor(Date.now() / 1000); // current Unix timestamp
  const timeDifference = timestamp - currentTime;
  return timeDifference <= 0;
  }

  const updateRefreshToken = async ()=>{
   try{
    // await SecureStore.deleteItemAsync('user');
    const response = await axios.get("/api/auth/refresh-token");
    const newUser = response.data.user[0];
    newUser.token = response.data.token; 
    setUser(newUser)
    SecureStore.setItemAsync("user", JSON.stringify(newUser));
   }catch(e){
    console.log("Error", e)
   }
  }

  if (user?.banned_at) {
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" />

        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <NavigationContainer ref={navigationRef}>
              <ThemeProvider>
                <BannedRoute />
              </ThemeProvider>
            </NavigationContainer>
          </QueryClientProvider>
        </Provider>
      </GestureHandlerRootView>
    );
  }

  if (appIsAvailable) {
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" />

        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <NavigationContainer ref={navigationRef}>
              <ThemeProvider>
                <Route />
              </ThemeProvider>
            </NavigationContainer>
          </QueryClientProvider>
        </Provider>
      </GestureHandlerRootView>
    );
  } else {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.primary,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ color: colors.white, padding: 40 }}>
          App currently down for maintenance. Please try again later.
        </Text>
      </View>
    );
  }
}

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};
