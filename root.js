import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";
import App from "./App";
import store from "./app/src/redux/reducers/configureStore";
import NotificationContext from "./app/src/utils/NotificationContext";
import * as SecureStore from "expo-secure-store";
import axios from "./app/src/redux/apis/axiosDeclaration";
import { ToastProvider } from "react-native-toast-notifications";
import colors from "./app/config/colors";
import { Text ,View }  from "react-native"
const Root = () => {
  const [notificationCount, setNotficationCount] = useState(0);
  useEffect(async () => {
    await getUserUnreadNotifications();
  }, []);
  const getUserUnreadNotifications = async () => {
    const user = JSON.parse(await SecureStore.getItemAsync("user"));
    const response = await axios.get(
      `api/notifications/unread/${user.id ?? user._id}`
    );
    setNotficationCount(response.data.length);
  };
  const value = { notificationCount, setNotficationCount };
  return (
    <Provider store={store}>
      <NotificationContext.Provider value={value}>
        <ToastProvider
          placement="top"
          duration={2000}
          animationType="slide-in"
          successColor={colors.green}
          textStyle={{color: colors.black}}
          offsetTop={50}
          swipeEnabled={true}
        >
          <App />
        </ToastProvider>
      </NotificationContext.Provider>
    </Provider>
  );
};
export default Root;
