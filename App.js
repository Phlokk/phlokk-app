import "react-native-gesture-handler";
import React, { useEffect, useState, useRef } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import store from "./app/src/redux/reducers/configureStore";
import { Provider } from "react-redux";
import Route from "./app/src/navigation/main/Route";
import {Alert, LogBox, StatusBar, Text} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { atom, useAtom } from "jotai";
import { fetchGetUsers } from "./app/src/redux/sagas/requests/fetchUsers";
import * as SplashScreen from "expo-splash-screen";
// imports for notifications.js
import * as Notifications from "expo-notifications";
import { navigationRef } from "./app/src/navigation/rootNavigation.js/index";
import {apiUrls} from "./app/src/globals";


SplashScreen.preventAutoHideAsync();

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

const checkSystemStatus = async function() {
    fetch(apiUrls.BASE_URL + '/api/system-status')
        .then((response) => {
            console.log(response);
        })
}

export default function App() {
    const [user, setUser] = useAtom(userAtom);

    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    const [appIsAvailable, setAppIsAvailable] = useState(false);

    useEffect(() => {
        const hideSplash = async () => {
            await wait(2000);
            await SplashScreen.hideAsync();
        };

        // if (appIsAvailable) {
            hideSplash();
        // }
    }, [appIsAvailable]);

    useEffect(async () => {
        const checkStatus = async () => {
            const response = await fetch(apiUrls.BASE_URL + '/api/system-status', {
                method: "GET"
            })
                .then((response) => response.json());
            setAppIsAvailable(response.status === "available");
            return (response.status === "available");
        }

        const appIsAvailable = await checkStatus();
        if (!appIsAvailable) {
            Alert.alert("System is down for maintenance. Please try again later");
        } else {

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
                Notifications.addNotificationResponseReceivedListener(response => {
                    switch (response.notification.request.content.data.type) {
                        case 1:
                            // Device registered for notifications
                            console.log('==============');
                            console.log('device registered');
                            break;
                        case 2:
                            // Reaction to a post
                            console.log('==============');
                            console.log('post reaction');
                            break;
                        case 3:
                            // Comment on a post
                            console.log('==============');
                            console.log('post comment');
                            break;
                        case 4:
                            // Post has been deleted
                            console.log('==============');
                            console.log('post deleted');
                            break;
                        case 5:
                            console.log('==============');
                            console.log('new follow');
                            const targetUser = response.notification.request.content.data.associated;
                            navigationRef.current.navigate("profileOther", {initialUser: targetUser});
                            break;
                        default:
                        // Something else, navigate to notification list
                    }
                });

            return () => {
                Notifications.removeNotificationSubscription(
                    notificationListener.current
                );
                Notifications.removeNotificationSubscription(responseListener.current);
            };
        }
    }, [setAppIsAvailable]);

    if (appIsAvailable) {
        return (
            <GestureHandlerRootView style={{flex: 1}}>
                <StatusBar barStyle="light-content"/>

                <Provider store={store}>
                    <QueryClientProvider client={queryClient}>
                        <Route/>
                    </QueryClientProvider>
                </Provider>
            </GestureHandlerRootView>
        );
    } else {
        return (
            <>
                <Text>App currently down for maintenance. Please try again later.</Text>
            </>
        )
    }
}

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};
