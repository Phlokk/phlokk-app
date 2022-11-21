import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useDispatch } from "react-redux";
import * as SecureStore from "expo-secure-store";
import axios from "../redux/apis/axiosDeclaration";
import { types } from "../redux/constants";
import { MaterialIcons } from "@expo/vector-icons";
import { useAtom } from "jotai";
import { userAtom } from "../../../App";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import VerifiedIcon from "../components/common/VerifiedIcon";
import CustomAlert from "../components/Alerts/CustomAlert";
import colors from "../../config/colors";
import { ThemeContext } from "../theme/context";

const CustomDrawer = (props) => {
  const [user, setUser] = useState("");
  const [currentUser, setCurrentUser] = useAtom(userAtom);
  const [setAccounts, isSetAccounts] = useState(false);

  const { theme, setTheme } = useContext(ThemeContext);

  const handleThemeChange = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    console.log("theme changed");
  }, [theme]);

  const dispatch = useDispatch();

  const handleLogout = async () => {
    axios
      .post("/api/logout")
      .then((response) => {
        setUser(null);
        SecureStore.deleteItemAsync("user");
        dispatch({
          type: types.USER_STATE_CHANGE,
          currentUser: null,
          loaded: true,
        });
      })
      .catch((error) => {
        setUser(null);
        SecureStore.deleteItemAsync("user");
        dispatch({
          type: types.USER_STATE_CHANGE,
          currentUser: null,
          loaded: true,
        });
      });
  };

  return (
    <View
      style={theme == "light" ? styles.container_light : styles.container_dark}
    >
      <DrawerContentScrollView
        contentContainerStyle={
          theme == "light" ? styles.container_light : styles.container_dark
        }
        {...props}
      >
        <View style={styles.imageView}>
          <Image
            source={
              currentUser?.photo_url
                ? { uri: currentUser?.photo_url }
                : require("../../assets/userImage.png")
            }
            style={styles.avatar}
          />
          <TouchableOpacity style={styles.newAccount}>
            <CustomAlert
              alertTitle={
                <Text>
                  <MaterialIcons name="info" size={24} color={colors.green} />
                </Text>
              }
              customAlertMessage={
                <Text>Add Multiple Accounts{"\n"}coming soon!</Text>
              }
              positiveBtn="Ok"
              modalVisible={setAccounts}
              dismissAlert={isSetAccounts}
              animationType="fade"
            />
            <Ionicons
              name="ellipsis-horizontal-circle"
              size={24}
              color={colors.secondary}
              onPress={() => isSetAccounts(true)}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.usernameView}>
          {currentUser.username !== null ? (
            <Text
              style={
                theme == "light" ? styles.usernameLight : styles.usernameDark
              }
            >
              @{currentUser.username}
              <View style={styles.verifiedIcon}>
                {currentUser && currentUser.is_verified === 1 && (
                  <View style={styles.verifiedIcon}>
                    <VerifiedIcon />
                  </View>
                )}
              </View>
            </Text>
          ) : (
            <Text style={styles.username}>@user</Text>
          )}
        </View>
        <View style={styles.balanceView}>
          <Text style={theme == "light" ? styles.bankLight : styles.bankDark}>
            Bank:
          </Text>
          <TouchableOpacity style={styles.balanceView}>
            <Text style={styles.balance}> $0.00</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.balanceView}>
          <Text style={theme == "light" ? styles.bankLight : styles.bankDark}>
            Fire:
          </Text>
          <TouchableOpacity style={styles.balanceView}>
            <Text style={styles.coinsText}> 0</Text>
          </TouchableOpacity>
        </View>

        <View
          style={
            theme == "light" ? styles.drawerItemDark : styles.drawerItemLight
          }
        >
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={styles.bottomView}>
        <View style={styles.divider}></View>
        <TouchableOpacity
          style={{ paddingVertical: 15 }}
          onPress={handleThemeChange}
        >
          <View style={styles.iconBtmView}>
            <Text>
              <MaterialCommunityIcons
                name="theme-light-dark"
                size={15}
                style={theme == "light" ? styles.icon_light : styles.icon_dark}
              />{" "}
            </Text>
            <Text
              style={theme == "light" ? styles.text_light : styles.text_dark}
            >
              Theme
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleLogout}
          style={{ paddingVertical: 15 }}
        >
          <View style={styles.iconBtmView}>
            <Text>
              <MaterialIcons
                name="logout"
                size={15}
                style={theme == "light" ? styles.icon_light : styles.icon_dark}
              />{" "}
            </Text>
            <Text
              style={theme == "light" ? styles.text_light : styles.text_dark}
            >
              {" "}
              Logout
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container_dark: {
    flex: 1,
    backgroundColor: colors.black,
  },
  container_light: {
    flex: 1,
    backgroundColor: colors.white,
  },
  icon_light: {
    color: colors.black,
  },
  icon_dark: {
    color: colors.white,
  },

  avatar: {
    height: 50,
    width: 50,
    borderRadius: 50,
    margin: 20,
    paddingLeft: 20,
  },
  bankLight: {
    color: colors.black,
    paddingLeft: 20,
    marginBottom: 10,
    fontSize: 12,
  },
  bankDark: {
    color: colors.secondary,
    paddingLeft: 20,
    marginBottom: 10,
    fontSize: 12,
  },
  text_light: {
    color: colors.black,
  },
  text_dark: {
    color: colors.white,
  },
  drawerItemLight: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: colors.black,
  },
  drawerItemDark: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: colors.white,
  },
  bottomView: {
    padding: 20,
    marginBottom: 20,
  },
  balanceView: {
    flexDirection: "row",
  },
  iconBtmView: {
    flexDirection: "row",
    alignItems: "center",
  },
  bottomText: {
    color: colors.secondary,
  },
  usernameLight: {
    fontSize: 14,
    color: colors.black,
    paddingLeft: 20,
    marginBottom: 20,
  },
  usernameDark: {
    fontSize: 14,
    color: colors.white,
    paddingLeft: 20,
    marginBottom: 20,
  },
  usernameView: {
    flexDirection: "row",
  },
  verifiedIcon: {
    left: 20,
  },
  imageView: {
    flexDirection: "row",
  },
  newAccount: {
    left: 150,
  },
  divider: {
    borderBottomWidth: 0.3,
    borderColor: colors.white,
    marginBottom: 30,
    opacity: 0.2,
  },
  balance: {
    color: colors.green,
    fontSize: 12,
  },
  coinsText: {
    fontSize: 12,
    color: colors.secondary,
  },
});
export default CustomDrawer;
