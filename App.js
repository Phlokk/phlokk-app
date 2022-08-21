import "react-native-gesture-handler";
import React, {useCallback, useEffect, useRef, useState} from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import store from "./app/src/redux/reducers/configureStore";
import { Provider } from "react-redux";
import Route from "./app/src/navigation/main";
import {Button, LogBox, Platform, StatusBar, View} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { atom, useAtom } from "jotai";
import { fetchGetUsers } from "./app/src/redux/sagas/requests/fetchUsers";


import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import {Text} from "react-native-svg";

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

async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    const experienceId = '@batslion/PhlokkApp';
    token = (await Notifications.getExpoPushTokenAsync({experienceId})).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      sound: true,
      lightColor: '#FF231F7C',
      lockscreenVisibility: Notifications.AndroidNotificationVisibility.PUBLIC,
      bypassDnd: true,
      showBadge: true,
    });
  }

  return token;
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    priority: Notifications.AndroidNotificationPriority.MAX
  }),
});

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      autoDismiss: false,
      badge: 50,
      vibrate: true,
      sticky: true,
      priority: 'high',
      title: "You've got mail! 📬",
      body: 'Here is the notification body',
      data: { data: 'goes here' },
    },
    trigger: null,
  });
}


export default function App() {
  const [user, setUser] = useAtom(userAtom);


  // notification stuff
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(async notification => {
      setNotification(notification);
      console.log(notification.request.content);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      alert('notification?');
    });

    const loadUser = async () => {
      const response = await fetchGetUsers();
      setUser(response.user);
    };

    loadUser();

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />

      <Provider store={store}>
          <Text>Data: {JSON.stringify(notification)}</Text>
        <Button onPress={schedulePushNotification} title={'Show Me a Notification'}></Button>
      </Provider>
    </GestureHandlerRootView>
  );
}
