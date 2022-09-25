import React, { useEffect, useState } from "react";
import ActivityNavBar from "../../components/general/activityNav/ActivityNavBar";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList, Dimensions,
} from "react-native";
import colors from "../../../config/colors";
import axios from "../../redux/apis/axiosDeclaration";
import {
  clearNotificationListener,
  notificationListener,
} from "../../services/notifications";
const { height, width } = Dimensions.get('window');

const Gradient = () => {
  return (
      <LinearGradient
          colors={[Colors.lightBlack, Colors.darkGrey, Colors.lightBlack]}
          start={{ x: 6.0, y: 0.0 }}
          end={{ x: 0.0, y: 0.0 }}
          style={{
            flex: 1,
            width: 100,
          }}
      />
  );
};

import NotificationItem from "./NotificationItem";
import {Placeholder, PlaceholderContainer} from "react-native-loading-placeholder";
import {LinearGradient} from "expo-linear-gradient";
import Colors from "../../../config/colors";

export default function ActivityScreen({ navigation }) {
  const [notificationList, setNotificationList] = useState("");

  useEffect(async () => {
    await notificationListener(setNotificationList);
    return () => clearNotificationListener();
  }, []);


  const renderItem = ({ item, index }) => {
    // console.log(item);
    return (
      <NotificationItem index={index} item={item} navigation={navigation} />
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

  if (notificationList.length == 0) {
    return (
        <View style={styles.container}>
          <ActivityNavBar title={"Activity feed"}/>
          <PlaceholderContainer
              style={styles.placeholderContainer}
              animatedComponent={<Gradient />}
              duration={1250}
              replace={true}
          >
            <View style={{ width: '100%', marginLeft: 24 }}>
                <Placeholder
                    style={{
                        ...styles.placeholder,
                        width: '94%',
                        height: 80,
                    }}
                />
                <Placeholder
                    style={{
                        ...styles.placeholder,
                        width: '94%',
                        height: 80,
                        marginTop: 24,
                    }}
                />
                <Placeholder
                    style={{
                        ...styles.placeholder,
                        width: '94%',
                        height: 80,
                        marginTop: 24,
                    }}
                />
                <Placeholder
                    style={{
                        ...styles.placeholder,
                        width: '94%',
                        height: 80,
                        marginTop: 24,
                    }}
                />
                <Placeholder
                    style={{
                        ...styles.placeholder,
                        width: '94%',
                        height: 80,
                        marginTop: 24,
                    }}
                />
                <Placeholder
                    style={{
                        ...styles.placeholder,
                        width: '94%',
                        height: 80,
                        marginTop: 24,
                    }}
                />
            </View>
          </PlaceholderContainer>
        </View>
    );
  } else {
    return (
        <View style={styles.container}>
          <ActivityNavBar title={"Activity feed"}/>
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
  placeholderContainer: {
    justifyContent: 'space-around',
    flexDirection: "row",
    width: '100%'
  },
  placeholder: {
    backgroundColor: Colors.lightBlack,
    borderRadius: 5,
  },
});
