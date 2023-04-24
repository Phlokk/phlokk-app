
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawer from "../../components/CustomDrawer";
import colors from "../../../config/colors";
import UserTabs from "../../navigation/userTabs/TabBar";
import ProfileScreen from "../../screens/profile/ProfileScreen";
import EditProfileScreen from "../../screens/profile/EditProfileScreen";
import SettingsScreen from "../../screens/settings/SettingsScreen";
import ManageAccountScreen from "../../screens/manageAccount/ManageAccountScreen";
import CommunityGuidelinesScreen from "../../screens/policies/CommunityGuidelinesScreen";
import { useTheme } from "../../theme/context";
import Market from "../../screens/market/Market";
import ChatScreen from "../../screens/livechat/ChatScreen";


export default function Root() {
  const { theme } = useTheme();
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerLabelStyle: { marginLeft: -20, fontSize: 12 },
        drawerActiveBackgroundColor:
          theme == "light" ? colors.white : colors.black,
        drawerActiveTintColor:
          theme == "light" ? colors.lightBlack : colors.white,
        drawerInactiveTintColor:
          theme == "light" ? colors.lightBlack : colors.green,
      }}
    >
      <Drawer.Screen
        name=" Home"
        component={UserTabs}
        options={{
          drawerIcon: ({ color }) => (
            <AntDesign name="home" size={21} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name=" Profile"
        component={ProfileScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Feather name="user" size={20} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name=" Edit Profile"
        component={EditProfileScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Feather name="edit-2" size={19} color={color} />
          ),
        }}
      />
      {/* <Drawer.Screen
          name=" Mad Chatter"
          component={ChatScreen}
          options={{
            drawerIcon: ({ color }) => (
              <MaterialCommunityIcons name="account-voice" size={20} color={color} />
            ),
          }}
        /> */}
      {/* <Drawer.Screen
          name="Gifts"
          component={GiftingScreen}
          options={{
            drawerIcon: ({ color }) => (
              <MaterialCommunityIcons name="gift" size={20} color={color} />
            ),
          }}
        /> */}
      <Drawer.Screen
        name=" Settings"
        component={SettingsScreen}
        options={{
          drawerIcon: ({ color }) => (
            <MaterialIcons name="settings" size={21} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Account"
        component={ManageAccountScreen}
        options={{
          drawerIcon: ({ color }) => (
            <MaterialIcons
              name="admin-panel-settings"
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Phlokk Market"
        component={Market}
        options={{
          drawerIcon: ({ color }) => (
            <Entypo name="shop" size={24} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name=" Community Guidelines"
        component={CommunityGuidelinesScreen}
        options={{
          drawerIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="police-badge-outline"
              size={21}
              color={color}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
