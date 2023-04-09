import React, { createContext, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ProfileScreen from "../../screens/profile/ProfileScreen";
import VideoFeed from "../../screens/videoFeed/VideoFeed";
import colors from "../../../config/colors";
import SearchScreen from "../../screens/search/SearchScreen";

const { Screen, Navigator } = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

export const CurrentUserProfileItemInViewContext = createContext(null);

const SearchNavigation = () => {
  const [currentUserProfileItemInView, setCurrentUserProfileItemInView] =
    useState(null);

  const stackHeaderStyle = {
    headerStyle: { backgroundColor: "transparent" },
    headerTransparent: true,
    headerBackTitleVisible: false,
    headerTintColor: colors.secondary,
    headerTitle: () => undefined,
    headerLeft: ()=> null,
  };

  return (
    <CurrentUserProfileItemInViewContext.Provider
      value={currentUserProfileItemInView}
    >
      <Stack.Navigator initialRouteName="discoverFeed">
        <Stack.Screen
          name="discoverFeed"
          component={SearchScreen}
          initialParams={{ setCurrentUserProfileItemInView, profile: false }}
          options={stackHeaderStyle}
        />
        <Screen
          name="discoverFeedProfile"
          component={ProfileScreen}
          options={stackHeaderStyle}
        />
      </Stack.Navigator>
    </CurrentUserProfileItemInViewContext.Provider>
  );
};
// headerLeft: ()=> null,
export default SearchNavigation;
