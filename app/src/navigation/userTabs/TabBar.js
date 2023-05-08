import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import React, {useContext} from "react";
import { Feather } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import ProfileScreen from "../../screens/profile/ProfileScreen";
import FeedNavigation from "../feed/FeedNavigation";
import ActivityScreen from "../../screens/activity/ActivityScreen";
import colors from "../../../config/colors";
import { useTheme } from "../../theme/context";
import NotificationContext from "../../utils/NotificationContext";
const Tab = createBottomTabNavigator();

const TabBar = ({ state, navigation }) => {
  const { theme, setTheme } = useTheme();
  const selectedTabIndex = navigation?.getState()?.index;
  const { notificationCount, setNotficationCount } = useContext(NotificationContext); 

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
  const getCount = ()=> {
    if(notificationCount > 99) return '99+'
    else   return notificationCount
  }

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
        <EvilIcons name="search" size={33}
          color={theme == "light" ? colors.black : colors.secondary}
          onPress={() => navigation.navigate("Discover")} />


        <EvilIcons name="plus" size={40}
          color={theme == "light" ? colors.black : colors.secondary}
          onPress={() => navigation.navigate("Cam")} /> 
          
        <Feather
          name="message-square"
          size={25}
          color={
            state.index === 1
              ? colors.green
              : theme == "light"
              ? colors.black
              : colors.secondary
          }
          onPress={() => onPress(1)}
        />
        { notificationCount > 0 && 
        <TouchableOpacity style={styles.notificationContainer} onPress={()=>onPress(1)}>
        <Text style={styles.notificationCount}>
          {getCount()}
        </Text>
       </TouchableOpacity> 
      }
        <Feather
          name="user"
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
      <Tab.Screen name="Inbox" component={ActivityScreen} />
      <Tab.Screen
        name="profileOther"
        component={ProfileScreen}
        options={{ lazy: false }}
      />
    </Tab.Navigator>
  );
};
export default UserTabs;

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
  notificationContainer:{
    backgroundColor: colors.green, 
    width: 32,
    height: 19,
    borderRadius: 12,
    alignItems: "center",
    position: 'absolute',
    right: 83,
    top:14,
    flex: 1,
    justifyContent:'center'

  },
  notificationCount:{
    padding: 2,
    color:colors.black,
    fontSize: 9,
    fontWeight: '900'
  }
});
