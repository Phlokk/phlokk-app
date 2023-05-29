import React, { useEffect, useState, useRef } from "react";
import { TouchableOpacity, Text, Image, StyleSheet, View } from "react-native";
import {
  Menu,
  MenuTrigger,
  MenuOptions,
  MenuOption,
} from "react-native-popup-menu";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { generalStyles } from "../../../../styles";
import colors from "../../../../../config/colors";
import { timeSince } from "../../../../services/posts";

const ChatSingleItem = ({ item, user, setReplyToMessage, sender }) => {
  const isCurrentUser = item?.user_id === user?._id;

  const Message = () => {
    return (
      <View
        style={isCurrentUser ? styles.containerCurrent : styles.containerOther}
      >
        {!isCurrentUser && (
          <Image
            style={{ ...styles.avatar, ...generalStyles.avatarSmall }}
            source={{ uri: sender?.photo_url }}
          />
        )}
        <View
          style={
            isCurrentUser
              ? styles.containerTextCurrent
              : styles.containerTextOther
          }
        >
          <Text style={isCurrentUser ? styles.otherText : styles.text}>
            {item?.message}
          </Text>
        </View>
        <Text style={isCurrentUser ? styles.time : styles.timeOther}>
          {timeSince(item?.created_at)} ago
        </Text>
      </View>
    );
  };
  const PopupMessage = () => {
    return (
      <View
        style={isCurrentUser ? styles.containerCurrent : styles.containerOther}
      >
        <View
          style={
            isCurrentUser
              ? styles.popupMessageContainer
              : styles.popupMessageContainerOther
          }
        >
          <Text style={isCurrentUser ? styles.otherText : styles.text}>
            {item?.message}
          </Text>
        </View>
        <Text style={isCurrentUser ? styles.popupTime : styles.popupTimeOther}>
          {timeSince(item?.created_at)} ago
        </Text>
      </View>
    );
  };

  return (
    <Menu onSelect={(value) => console.log(value)}>
      <MenuTrigger triggerOnLongPress>
        <Message />
      </MenuTrigger>
      <MenuOptions optionsContainerStyle={{ backgroundColor: "transparent" }}>
        <View style={ isCurrentUser ? styles.menuContainerCurrent : styles.menuContainer}>
          <View style={styles.menuMessage}>
            <PopupMessage />
          </View>
          <View style={isCurrentUser ? styles.menuOther : styles.menu}>
            <View style={styles.iconRowView}>
              <MenuOption onSelect={() => alert(`Star`)}>
                <Text style={{ color: colors.white }}>Star</Text>
              </MenuOption>
              <AntDesign style={styles.iconView} size={15} name="staro" />
            </View>
            <View style={styles.iconRowView}>
              <MenuOption onSelect={() => setReplyToMessage(item)}>
                <Text style={{ color: colors.white }}>Reply</Text>
              </MenuOption>
              <Entypo name="reply" size={18} style={styles.iconView} />
            </View>
            <View style={styles.iconRowView}>
              <MenuOption onSelect={() => alert(`Forward`)}>
                <Text style={{ color: colors.white }}>Forward</Text>
              </MenuOption>
              <Entypo name="forward" size={18} style={styles.iconView} />
            </View>
            <View style={styles.iconRowView}>
              <MenuOption onSelect={() => alert(`Copy`)}>
                <Text style={{ color: colors.white }}>Copy</Text>
              </MenuOption>
              <Feather name="copy" size={17} style={styles.iconView} />
            </View>
            <View style={styles.iconRowView}>
              <MenuOption onSelect={() => alert(`Delete`)}>
                <Text style={{ color: "red" }}>Delete</Text>
              </MenuOption>
              <Ionicons
                name="trash-outline"
                size={18}
                style={styles.trashView}
              />
            </View>
          </View>
        </View>
      </MenuOptions>
    </Menu>
  );
};

const styles = StyleSheet.create({
  containerOther: {
    padding: 10,
    flexDirection: "row",
    flex: 1,
    position: "relative",
  },
  avatar: {
    bottom: 30,
    position: "absolute",
  },
  containerTextOther: {
    marginHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: colors.purpleTabs,
    borderBottomRightRadius: 12,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    maxWidth: "65%",
    marginBottom: 20,
    marginLeft: 30,
  },
  containerCurrent: {
    padding: 10,
    flexDirection: "row-reverse",
    flex: 1,
    position: "relative",
  },
  containerTextCurrent: {
    color: colors.black,
    marginHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 10,
    marginStart: 50,
    backgroundColor: colors.green,
    borderBottomLeftRadius: 12,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    maxWidth: "65%",
    marginBottom: 10,
    marginLeft: 30,
  },
  text: {
    color: colors.white,
  },
  otherText: {
    color: colors.black,
  },
  username: {
    color: "gray",
    fontSize: 13,
  },
  textComment: {
    color: colors.white,
    paddingRight: 20,
  },
  timeOther: {
    position: "absolute",
    color: colors.white,
    bottom: 10,
    left: 40,
    color: colors.secondary,
    fontSize: 10,
  },
  time: {
    position: "absolute",
    color: colors.white,
    left: 23,
    bottom: 0,
    color: colors.secondary,
    fontSize: 10,
  },
  menuContainer: {
    flexDirection: "column",
    backgroundColor: "transparent", 
  },
  menuContainerCurrent:{
    position: "absolute",
    left:200,
    bottom: 0,
  },
  menuMessage: {
    backgroundColor: colors.settingsBlack,
    marginBottom: 10,
    borderRadius: 10,
  },
  menu: {
    width: 200,
    minHeight: 50,
    paddingLeft:5,
    backgroundColor: colors.settingsBlack,
    borderRadius: 10,
  },
  menuOther: {
    width: 200,
    minHeight: 50,
    paddingLeft:5,
    backgroundColor: colors.settingsBlack,
    borderRadius: 10,
  },
  popupMessageContainerOther: {
    marginHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: colors.purpleTabs,
    borderBottomRightRadius: 12,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    maxWidth: "90%",
    marginBottom: 20,
    marginLeft: 0,
  },
  popupMessageContainer: {
    marginHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: colors.green,
    borderBottomLeftRadius: 12,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 10, 
    maxWidth: "90%",
    marginBottom: 20, 
   
  },
  popupTimeOther: {
    position: "absolute",
    color: colors.white,
    bottom: 10,
    right: 10,
    color: colors.secondary,
    fontSize: 10,
  },
  popupTime: {
    position: "absolute",
    color: colors.white,
    bottom: 10,
    left: 10,
    color: colors.secondary,
    fontSize: 10,
  },
  iconView: {
    flex: 1,
    color: colors.white,
    alignItems: "center",
    position: "absolute",
    right: 0,
    marginRight: 10,
  },
  trashView: {
    flex: 1,
    alignItems: "center",
    position: "absolute",
    right: 0,
    marginRight: 10,
    color: colors.red,
  },
  iconRowView: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",

  },
});

export default ChatSingleItem;
