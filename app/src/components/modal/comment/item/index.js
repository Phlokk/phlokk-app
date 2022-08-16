import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import colors from "../../../../../config/colors";
import { useAtom } from "jotai";
import { userAtom } from "../../../../../../App";
import verifiedCheck from "../../../../../assets/verified.png";
import CustomAlert from "../../../Alerts/customAlert";
import { timeSince } from "../../../../services/posts";

const CommentItem = ({ item }) => {
  const navigation = useNavigation();
  const [user, setUser] = useAtom(userAtom);
  const [isUsernameProfile, setIsUsernameProfile] = useState(false);
  const [isStars, setIsStars] = useState(false);
  const [isReplies, setIsReplies] = useState(false);

  return (
    <View style={styles.container}>
      {!user?.photo_url && !user?.photo_url ? (
        <TouchableOpacity
        disabled={user._id == item.user._id}
            onPress={() => {
              navigation.navigate("feedProfile", {
                initialUser: item.user,
              });
            }}
        >
        <Image
          style={styles.avatar}
          source={require("../../../../../assets/userImage.png")}
          cache="only-if-cached"
        />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
        disabled={user._id == item.user._id}
            onPress={() => {
              navigation.navigate("feedProfile", {
                initialUser: item.user,
              });
            }}
            >
        <Image style={styles.avatar} source={{ uri: item.user.photo_url }} />
        </TouchableOpacity>
      )}
      
      

      <View style={styles.containerText}>
        <View style={styles.verifiedRow}>
          <TouchableOpacity
            disabled={user._id == item.user._id}
            onPress={() => {
              navigation.navigate("feedProfile", {
                initialUser: item.user,
              });
            }}
          >
            <Text style={styles.username}>@{item.user.username}</Text>
          </TouchableOpacity>
          {item.user && item.user.is_verified === 1 && (
            <Image style={styles.phlokkVerified} source={verifiedCheck} />
          )}
          <View style={styles.starRow}>
            <CustomAlert
              alertTitle={
                <Text>
                  <MaterialIcons name="info" size={24} color={colors.green} />
                </Text>
              }
              customAlertMessage={<Text>Stars{"\n"}coming in beta 2</Text>}
              positiveBtn="Ok"
              modalVisible={isStars}
              dismissAlert={setIsStars}
              animationType="fade"
            />
            <MaterialCommunityIcons
              onPress={() => setIsStars(true)}
              style={styles.star}
              color="white"
              size={17}
              name={"star" ? "star-outline" : "star"}
            />
          </View>
        </View>
        <Text style={styles.textComment}>{item.message}</Text>
        <View style={styles.replyRow}>
          <Text style={styles.date}>
            {item.created_at ? timeSince(new Date(item.created_at)) : "Now"}
          </Text>
          <CustomAlert
            alertTitle={
              <Text>
                <MaterialIcons name="info" size={24} color={colors.green} />
              </Text>
            }
            customAlertMessage={<Text>Replies{"\n"}coming in beta 2</Text>}
            positiveBtn="Ok"
            modalVisible={isReplies}
            dismissAlert={setIsReplies}
            animationType="fade"
          />
          <TouchableOpacity onPress={() => setIsReplies(true)}>
            <Text style={styles.textReplies}>Reply</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 14,
    bottom: 11,
    flexDirection: "row",
    flex: 1,
  },
  containerText: {
    flex: 1,
    marginHorizontal: 14,
    // backgroundColor: 'red',
  },
  verifiedRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  replyRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  username: {
    flex: 1,
    color: colors.green,
    fontSize: 11,
  },
  textComment: {
    color: colors.secondary,
    paddingRight: 40,
    fontSize: 12,
    marginTop: 2,
    opacity: 0.9,
  },
  textReplies: {
    color: colors.secondary,
    paddingRight: 20,
    fontSize: 10,
    marginHorizontal: 5,
  },
  date: {
    color: colors.secondary,
    fontSize: 9,
  },
  avatar: {
    height: 30,
    width: 30,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "lightgray",
  },
  phlokkVerified: {
    width: 10,
    height: 10,
    marginHorizontal: 3,
  },
  star: {
    // position: "absolute",
    // left: 310,

    bottom: 1,
  },
  starRow: {
    marginLeft: "auto",
  },
  starCount: {
    color: colors.secondary,
    // fontSize: 10,
  },
});

export default CommentItem;
