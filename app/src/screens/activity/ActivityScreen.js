import React, { useEffect, useState } from "react";
import ActivityNavBar from "../../components/general/activityNav/ActivityNavBar";
import { View, StyleSheet, Text, FlatList } from "react-native";
import uuid from 'uuid-random';
import colors from "../../../config/colors";
import {
  clearNotificationListener,
  getNotifications,
  notificationListener,
} from "../../services/notifications";
import NotificationItem from "./NotificationItem";
import LottieView from "lottie-react-native";
import Colors from "../../../config/colors";
import { useIsFocused } from "@react-navigation/native";
import { useTheme } from "../../theme/context";

export default function ActivityScreen({ navigation }) {
  const { theme } = useTheme();

  const [notificationList, setNotificationList] = useState([]);
  const [isLoading, setIsLoading] = useState();
  const isFocused = useIsFocused();
  const [pageNumber, setPageNumber] = useState(1)

  const getNotifs = async (page) => {
    setIsLoading(true);
    const notifications = await getNotifications(page);
    setPageNumber(notifications.pagination.currentPage)
    setNotificationList((e)=> [...e, ...notifications.data]);
    setIsLoading(false);
  };
  useEffect(() => {
    if (isFocused) {
      getNotifs(1);
    }
  }, [isFocused]);

  const renderItem = ({ item }) => {
    return (
      <NotificationItem item={item} navigation={navigation} />
    );
  };

  const Separator = () => {
    return (
      <View
        style={{
          height: 50,
          width: 1,
          padding: 5,
        }}
      />
    );
  };

  if (isLoading) {
    return (
      <View
        style={
          theme == "light" ? styles.container_light : styles.container_dark
        }
      >
        <View style={styles.lottieView}>
          <LottieView
            autoPlay
            style={{
              alignItems: "center",
              width: 200,
              height: 200,
            }}
            // Find more Lottie files at https://lottiefiles.com/featured
            source={require("../../../assets/animations/splashAnimation.json")}
          />
          <Text
            style={theme == "light" ? styles.splash_light : styles.splash_dark}
          >
            Loading Notifications...
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View
      style={theme == "light" ? styles.container_light : styles.container_dark}
    >
      <ActivityNavBar title={"Activity feed"} />
      {notificationList.length === 0 && (
        <View style={styles.alertView}>
          <Text
            style={
              theme == "light" ? styles.alertText_light : styles.alertText_dark
            }
          >
            You have no notifications!
          </Text>
        </View>
      )}
      <FlatList
        data={notificationList}
        ItemSeparatorComponent={Separator}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item._id} 
        onEndReached={(e)=>{ 
          getNotifs(parseInt( pageNumber ) + 1 ); 
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container_dark: {
    flex: 1,
    backgroundColor: colors.black,
    height: 400,
  },
  container_light: {
    flex: 1,
    backgroundColor: colors.white,
    height: 400,
  },
  userContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  activityContainer: {
    flex: 1,
  },
  text: {
    color: colors.white,
    marginTop: 30,
  },
  alertText_light: {
    color: colors.black,
    padding: 20,
    fontSize: 16,
  },
  alertText_dark: {
    color: colors.white,
    padding: 20,
    fontSize: 16,
  },
  alertView: {
    flex: 1, 
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderContainer: {
    justifyContent: "space-around",
    flexDirection: "row",
    width: "100%",
  },
  placeholder: {
    opacity: 0.2,
    backgroundColor: Colors.lightBlack,
    marginTop: 24,
    borderRadius: 5,
    width: "94%",
    height: 80,
  },
  lottieView: {
    flex: 1, 
    justifyContent: "center",
    alignItems: "center",
  },
  splash_light: {
    color: colors.lightBlack,
  },
  splash_dark: {
    color: colors.green,
  },
});
