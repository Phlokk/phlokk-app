import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, StyleSheet } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ProfileScreen from "../../screens/profile/ProfileScreen";
import FeedNavigation from "../feed/FeedNavigation";
import ActivityScreen from "../../screens/activity/ActivityScreen";

import colors from "../../../config/colors";
import SearchNavigation from "../feed/SearchDiscover";

const Tab = createBottomTabNavigator();

const TabBar = ({ state, navigation }) => {
  const onPress = (index) => {
    const route = state.routes[index];

    const isFocused = state.index === index;
    const event = navigation.emit({
      type: "tabPress",
      target: route.key,
      canPreventDefault: true,
    });
    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(route.name);
    }
  };
  // useChats();
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <AntDesign
          name="home"
          size={25}
          color={state.index === 0 ? colors.green : colors.diamondBlue}
          onPress={() => onPress(0)}
        />
        <EvilIcons
          name="search"
          size={33}
          color={state.index === 1 ? colors.green : colors.diamondBlue}
          onPress={() => onPress(1)}
        />
        <MaterialCommunityIcons
          name="fingerprint"
          size={40}
          color={colors.diamondBlue}
          onPress={() => navigation.navigate("Cam")}
        />
        <Feather
          name="message-square"
          size={25}
          color={state.index === 2 ? colors.green : colors.diamondBlue}
          onPress={() => onPress(2)}
        />
        <Feather
          name="user"
          size={25}
          color={state.index === 3 ? colors.green : colors.diamondBlue}
          onPress={() => onPress(3)}
        />
      </View>
    </View>
  );
};

const UserTabs = () => {
  // Load the current user

  return (
    <Tab.Navigator
      initialRoute="feed"
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <TabBar {...props} />}
    >
      <Tab.Screen name="feed" component={FeedNavigation} />
      <Tab.Screen name="Discover" component={SearchNavigation} />
      <Tab.Screen name="Inbox" component={ActivityScreen} />
      <Tab.Screen
        name="profileOther"
        component={ProfileScreen}
        options={{ lazy: false }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
  },
  iconContainer: {
    flexDirection: "row",
    padding: 20,
    bottom: 10,
    justifyContent: "space-between",
  },
});

export default UserTabs;
