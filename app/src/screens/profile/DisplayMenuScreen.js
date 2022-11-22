import React, { useState, useContext } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import colors from "../../../config/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAtom } from "jotai";
import { userAtom } from "../../../../App";
import { ThemeContext } from "../../theme/context";

const RenderButton = ({ onPress, isSelected, icon }) => {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <TouchableOpacity style={styles.itemContainer} onPress={onPress}>
      {typeof icon === "string" && (
        <MaterialIcons
          style={
            isSelected ? styles.nonTransparentIcons : styles.transparentIcons
          }
          name={icon}
          size={24}
          color={
            isSelected
              ? colors.green
              : theme == "light"
              ? colors.black
              : colors.secondary
          }
        />
      )}
      {typeof icon !== "string" && icon}
      {isSelected && <View style={styles.underline} />}
    </TouchableOpacity>
  );
};

function DisplayMenuScreen({ user, onTabSelected }) {
  const { theme, setTheme } = useContext(ThemeContext);

  const [currentUser] = useAtom(userAtom);
  const [selectedTab, setSelectedTab] = useState("cloud");

  if (user._id !== currentUser._id) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.menuContainer}>
        <RenderButton
          onPress={() => {
            setSelectedTab("cloud");
            onTabSelected("cloud");
          }}
          isSelected={selectedTab === "cloud"}
          icon="cloud-upload"
          onTabSelected={onTabSelected}
        />

        <RenderButton
          onPress={() => {
            setSelectedTab("star");
            onTabSelected("star");
            //setIsVisible(true)
          }}
          isSelected={selectedTab === "star"}
          icon={
            <AntDesign
              style={
                selectedTab === "star"
                  ? styles.nonTransparentIcons
                  : styles.transparentIcons
              }
              name="star"
              size={24}
              color={
                selectedTab === "star"
                  ? colors.green
                  : theme == "light"
                  ? colors.black
                  : colors.secondary
              }
            />
          }
        />

        <RenderButton
          onPress={() => {
            setSelectedTab("bookmark");
            onTabSelected("bookmark");
            //setIsBookmark(true);
          }}
          isSelected={selectedTab === "bookmark"}
          icon="bookmark"
        />

        <RenderButton
          onPress={() => {
            setSelectedTab("private");
            onTabSelected("private");
            //setIsPrivate(true);
          }}
          isSelected={selectedTab === "private"}
          icon={
            <FontAwesome
              style={
                selectedTab === "private"
                  ? styles.nonTransparentIcons
                  : styles.transparentIcons
              }
              name="lock"
              size={24}
              color={
                selectedTab === "private"
                  ? colors.green
                  : theme == "light"
                  ? colors.black
                  : colors.secondary
              }
            />
          }
        />
        <RenderButton
          onPress={() => {
            setSelectedTab("fire");
            onTabSelected("fire");
            //setIsVisible(true)
          }}
          isSelected={selectedTab === "fire"}
          icon={
            <MaterialCommunityIcons
              style={
                selectedTab === "fire"
                  ? styles.nonTransparentIcons
                  : styles.transparentIcons
              }
              name="fire"
              size={24}
              color={
                selectedTab === "fire"
                  ? colors.green
                  : theme == "light"
                  ? colors.black
                  : colors.secondary
              }
            />
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 0,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: colors.white,
  },
  itemContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  menuContainer: {
    paddingBottom: 5,
    flexDirection: "row",
  },
  pressedStyle: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  pressedModal: {
    flex: 1,
    justifyContent: "flex-end",
  },
  transparentIcons: {
    opacity: 0.3,
  },
  nonTransparentIcons: {
    opacity: 1,
  },
  underline: {
    width: 20,
    height: 2,
    backgroundColor: colors.green,
    marginTop: 6,
  },
  star_light: {
    color: colors.lightBlack,
  },
  star_dark: {
    color: colors.secondary,
  },
});

export default React.memo(DisplayMenuScreen);
