import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { Feather } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ProfileScreen from "../../screens/profile/ProfileScreen";
import FeedNavigation from "../feed/FeedNavigation";
import ActivityScreen from "../../screens/activity/ActivityScreen";
import { useNavigation, useRoute } from "@react-navigation/native";

import colors from "../../../config/colors";
import SearchNavigation from "../feed/SearchDiscover";
import { useTheme } from "../../theme/context";

const Tab = createBottomTabNavigator();

const TabBar = ({ state, navigation }) => {
  const { theme, setTheme } = useTheme();
  const selectedTabIndex = navigation?.getState()?.index;

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
    <View
      style={theme == "light" ? styles.container_light : styles.container_dark}
    >
      <View style={styles.iconContainer}>
        <AntDesign
          name="home"
          size={25}
          color={
            state.index === 0
              ? colors.green
              : theme == "light"
              ? colors.black
              : colors.secondary
          }
          onPress={() => onPress(0)}
        />
        <EvilIcons
          name="search"
          size={33}
          color={
            state.index === 1
              ? colors.green
              : theme == "light"
              ? colors.black
              : colors.secondary
          }
          onPress={() => onPress(1)}
        />
        <MaterialCommunityIcons
          name="fingerprint"
          size={40}
          color={theme == "light" ? colors.black : colors.secondary}
          onPress={() => navigation.navigate("Cam")}
        />
        <Feather
          name="message-square"
          size={25}
          color={
            state.index === 2
              ? colors.green
              : theme == "light"
              ? colors.black
              : colors.secondary
          }
          onPress={() => onPress(2)}
        />
        <Feather
          name="user"
          size={25}
          color={
            state.index === 3
              ? colors.green
              : theme == "light"
              ? colors.black
              : colors.secondary
          }
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
  containerBlack: {
    backgroundColor: colors.black,
  },
  container_light: {
    backgroundColor: colors.white,
  },
  container_dark: {
    backgroundColor: colors.black,
  },
  iconContainer: {
    flexDirection: "row",
    padding: 20,
    bottom: 10,
    justifyContent: "space-between",
  },
});

export default UserTabs;
