import {useEffect, useState} from "react";
import ActivityNavBar from "../../components/general/activityNav";
import { View, StyleSheet, Text, TouchableOpacity, FlatList } from "react-native";
import colors from "../../../config/colors";
import NotificationScreen from "./notifications";
import axios from "../../redux/apis/axiosDeclaration";
import {clearNotificationListener, notificationListener} from "../../services/notifications";


export default function ActivityScreen({ navigation }) {

  const [notificationList, setNotificationList] = useState("");


  useEffect(async () => {
    await notificationListener(setNotificationList);
    return () => clearNotificationListener();
  }, []);

  const renderItem = ({ item, index }) => {
    return <NotificationScreen index={index} item={item} />;
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

  return (
    <View style={styles.container}>
      <ActivityNavBar title={"Activity feed"} />
      <NotificationScreen />
      <FlatList
        data={notificationList}
        ItemSeparatorComponent={Separator}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
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
  
});
