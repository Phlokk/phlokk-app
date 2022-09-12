import "react-native-gesture-handler";
import React, { useCallback, useEffect, useState, useRef } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import store from "./app/src/redux/reducers/configureStore";
import { Provider } from "react-redux";
import Route from "./app/src/navigation/main";
import { LogBox, StatusBar, Text, View, Button, Platform } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { atom, useAtom } from "jotai";
import { fetchGetUsers } from "./app/src/redux/sagas/requests/fetchUsers";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

// imports for notifications.js
import * as Notifications from "expo-notifications";
import { registerForPushNotificationsAsync } from "./app/src/services/notifications";
import * as SecureStore from "expo-secure-store";

LogBox.ignoreLogs(["Setting a timer"]);
LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);
LogBox.ignoreLogs([
  "Warning: Encountered two children with the same key, `::`. Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted — the behavior is unsupported and could change in a future version.",
]);
LogBox.ignoreLogs([
  "Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle.",
]);
LogBox.ignoreLogs([
  "Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.",
]);

export const userAtom = atom({});

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

  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hideAsync();
    }, 3000);
  }, []);

  useEffect(async () => {
    const loadUser = async () => {
      const response = await fetchGetUsers();
      setUser(response.user);
    };

    loadUser();
    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
        console.log("notification received event");
      });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("user tapped event");
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />

      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Route />
        </QueryClientProvider>
      </Provider>
    </GestureHandlerRootView>
  );
}
