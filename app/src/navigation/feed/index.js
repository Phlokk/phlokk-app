import React, { createContext, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ProfileScreen from "../../screens/profile";
import VideoFeed from "../../screens/videoFeed";

const { Screen, Navigator } = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

export const CurrentUserProfileItemInViewContext = createContext(null);

const FeedNavigation = () => {
  const [currentUserProfileItemInView, setCurrentUserProfileItemInView] =
    useState(null);

  const stackHeaderStyle = {
    headerStyle: { backgroundColor: "transparent" },
    headerTransparent: true,
    headerBackTitleVisible: false,
    headerTitle: () => undefined,
  };

  return (
    <CurrentUserProfileItemInViewContext.Provider
      value={currentUserProfileItemInView}
    >
      <Stack.Navigator initialRouteName="feedList">
        <Stack.Screen
        
          name="feedList"
          component={VideoFeed}
          initialParams={{ setCurrentUserProfileItemInView, profile: false }}
          options={stackHeaderStyle}
        />
        <Screen
          name="feedProfile"
          component={ProfileScreen}
          options={stackHeaderStyle}
        />
      </Stack.Navigator>
    </CurrentUserProfileItemInViewContext.Provider>
  );
};


export default FeedNavigation;
