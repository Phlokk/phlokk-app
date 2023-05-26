import React, { useCallback } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Modal,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { useTheme } from "../../../theme/context";
import colors from "../../../../config/colors";
import RisingStar from "../../common/RisingStar";
import VerifiedIcon from "../../common/VerifiedIcon";
import { Feather } from "@expo/vector-icons";
export default function ViewFriends({
  friendsList,
  open,
  onClose,
  searchValue,
  onInputChange = ()=>{},
  loading = false, 
  handleStartChatting
  
}) {
  const { theme, setTheme } = useTheme();

  const renderItem = useCallback(({ item, index }) => { 
    return (
      <View style={styles.item}>
        <View>
          <TouchableOpacity>
            <Image
              style={styles.image}
              source={
                item?.user?.photo_thumb_url
                  ? { uri: item?.user?.photo_thumb_url }
                  : require("../../../../assets/userImage.png")
              }
            />
          </TouchableOpacity>
        </View>
        <View style={styles.friendInfoRow}>
          <TouchableOpacity>
            <Text style={styles.itemInfo}>
              {item?.user?.username}
              {item.user.is_verified && (
                <View style={styles.logoRow}>
                  <VerifiedIcon />
                </View>
              )}
              {item.user.is_rising === 1 && <RisingStar />}
            </Text>
            <Text style={styles.creatorTypeText}>
              {" "}
              {item.user.creator_type}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={()=> handleStartChatting(item.user)}
            style={styles.friendView}
          >
            <Text style={ styles.friendBtn}>
              Send Message
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  });

  return (
    <Modal animationType="slide" transparent={true} visible={open}>
      <View style={styles.pressedModal}>
        <Pressable style={styles.pressedStyle} onPress={onClose} />
        <View style={styles.modal_content}>
          <View style={styles.container}>
            <TextInput
              autoCapitalize="none"
              value={searchValue}
              autoCorrect={false}
              onChangeText={onInputChange}
              style={
                theme == "light"
                  ? styles.textInput_light
                  : styles.textInput_dark
              }
              placeholder={"Search"}
              placeholderTextColor={colors.secondary}
              underlineColorAndroid="transparent"
            />
            {searchValue !== "" ? (
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => onInputChange("")}
              >
                <Feather name="x" size={22} color={colors.secondary} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => onInputChange("")}
              >
                <Feather name="search" size={22} color={colors.secondary} />
              </TouchableOpacity>
            )}

            {loading && (
              <ActivityIndicator
                size="large"
                color={colors.secondary}
                style={styles.loading}
              />
            )}
          </View>
          <FlatList
           style={styles.flatList}
            data={friendsList}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            initialNumToRender={20}
            onEndReachedThreshold={0.5}
            onEndReached={() => {}}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
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
  modal_content: {
    height: "80%",
    backgroundColor: colors.black,
    borderWidth: 1.5,
    borderColor: colors.settingsBlack,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  item: {
    flexDirection: "row",
    color: colors.secondary,
    paddingHorizontal: 15,
    alignItems: "center",
    marginTop: 15,
  },
  friendView: {
    position: "absolute",
    right: 0,
    left: 240,
    top: 0,
    bottom: 0,
  },
  friendInfoRow: {
    flex: 1,
  },
  friendRow: {
    position: "absolute",
    right: 8,
    bottom: 70,
  },
  image: {
    borderRadius: 50,
    height: 35,
    width: 35,
  },
  logo: {
    left: 2,
    height: 12,
    width: 12,
  },
  itemInfo: {
    color: colors.green,
    fontWeight: "bold",
    top: 5,
    fontSize: 11,
    paddingLeft: 7,
  },
  itemCreator: {
    color: colors.green,
    fontWeight: "bold",
    top: 10,
    fontSize: 8,
    paddingLeft: 5,
  },
  creatorTypeText: {
    color: colors.secondary,
    top: 7,
    fontSize: 8,
    paddingLeft: 5,
  },
  logoRow: {
    bottom: 12,
    paddingLeft: 8,
  },
  memberBtn: {
    fontSize: 10,
    color: colors.green,
    textAlign: "center",
    padding: 4,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: colors.gray,
    backgroundColor: colors.grey,
  },
  friendBtn: {
    fontSize: 10,
    color: colors.green,
    textAlign: "center",
    padding: 4,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: colors.green,
    backgroundColor: colors.black,
  },
  risingStarRow: {
    bottom: -12,
    paddingLeft: 5,
  },
  container: {
    flexDirection: "row",
    padding: 10,
    marginTop:35,
  },
  textInput_light: {
    color: colors.secondary,
    borderColor: colors.secondary,
    borderRadius: 50,
    borderWidth: 0.3,
    flexDirection: "row",
    width: "90%",
    padding: 10,
    marginHorizontal: 15,
    marginVertical: 10,
  },
  textInput_dark: {
    color: colors.green,
    borderColor: colors.secondary,
    borderRadius: 50,
    borderWidth: 0.3,
    flexDirection: "row",
    width: "90%",
    padding: 10,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  closeButton: {
    top: Platform.OS === "android" ? 33 : 28,
    right: 45,
    position: "absolute",
  },
  loading: {
    position: "absolute",
    top: 250,
    bottom: 0,
    right: 0,
    left: 0,
  },
  flatList:{
    maxHeight: "80%"
  }
});
