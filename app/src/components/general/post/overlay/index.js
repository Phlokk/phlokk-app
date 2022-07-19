import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
  Modal,
  Pressable
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { getLikeById, updateLike } from "../../../../services/posts";
import { useDispatch, useSelector } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CustomAlert from "../../../Alerts/customAlert";
import SettingsSheetModalScreen from "../../../../components/modal/settingsSheetModalScreen";
import GiftingModalScreen from "../../../modal/giftingModalScreen"
import CommentModal from "../../../modal/comment/index"
import colors from "../../../../../config/colors";

export default function PostSingleOverlay({ post, user }) {

  const [isLightItUp, setLightItUp] = useState(false);
  const [ckt, setCkt] = useState(false);
  const [settingsModalScreen, setModalScreen] = useState(false)
  const [isCommentModalOpen, setCommentModalOpen] = useState(false)

  // const [currentLikeState, setCurrentLikeState] = useState({
  //   state: false,
  //   counter: post.likesCount,
  // });

  // useEffect(() => {
  //   getLikeById(post.id, user.id).then((res) => {
  //     setCurrentLikeState({
  //       ...currentLikeState,
  //       state: res,
  //     });
  //   });
  // }, []);

  // const handleUpdateLike = useMemo(
  //   () =>
  //     throttle(500, true, (currentLikeStateInst) => {
  //       setCurrentLikeState({
  //         state: !currentLikeStateInst.state,
  //         counter:
  //           currentLikeStateInst.counter +
  //           (currentLikeStateInst.state ? -1 : 1),
  //       });
  //       updateLike(post.id, user.id, currentLikeStateInst.state);
  //     }),
  //   []
  // );


  return (
    <View style={{ position: "absolute", right: 0, bottom: 200 }}>
      <View style={styles.iconContainer}>
        <TouchableOpacity>
          <MaterialCommunityIcons
            color={colors.white}
            size={40}
            name={"star-outline"}
          />
        </TouchableOpacity>
        <Text style={styles.statsLabel}>0</Text>
      </View>

      <View style={styles.iconContainer}>
        <TouchableOpacity
          style={styles.iconContainer}
          
        >
          <Ionicons
            name="md-chatbubble-ellipses-outline"
            size={35}
            color={colors.white}
            onPress={() => setCommentModalOpen(true, post)}
          />
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={true}
          visible={isCommentModalOpen}
        >
          <View style={{ flex: 1, justifyContent: "flex-end" }}>
            <Pressable
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
              }}
              onPress={() => setCommentModalOpen(false)}
            />
            <CommentModal post={post}/>
          </View>
        </Modal>
        <Text style={styles.statsLabel}>{post.comments.count}</Text>
      </View>

      <View style={styles.iconContainer}>
        <TouchableOpacity
          style={styles.iconContainer}
        >
          <MaterialCommunityIcons
            onPress={() => setLightItUp(true)}
            name="fire"
            size={40}
            color={colors.white}
          />
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={true}
          visible={isLightItUp}
        >
          <View style={{ flex: 1, justifyContent: "flex-end" }}>
            <Pressable
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
              }}
              onPress={() => setLightItUp(false)}
            />
            <GiftingModalScreen user={user} />
          </View>
          </Modal>
        <Text style={styles.statsLabel}>0</Text>
      </View>

      <View style={styles.iconContainer}>
        <CustomAlert
          alertTitle={
            <Text>
              <MaterialIcons name="info" size={24} color={colors.green} />
            </Text>
          }
          customAlertMessage={
            <Text>CKT Feed{"\n"}coming in Beta version 3</Text>
          }
          positiveBtn="Ok"
          modalVisible={ckt}
          dismissAlert={setCkt}
          animationType="fade"
        />
        <TouchableOpacity style={styles.globeIcon} onPress={() => setCkt(true)}>
          <Octicons name="globe" size={30} color={colors.white} />
          <Text style={styles.statsLabel}>CKT</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.iconContainer}>
        <TouchableOpacity
          style={styles.reportIcon}
          // onPress={() => dispatch(openSettingsSheetModal(true, post))}
        >
          <Ionicons
            name="ellipsis-horizontal-sharp"
            size={28}
            color={colors.white}
            onPress={() => setModalScreen(true)}
          />
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={true}
          visible={settingsModalScreen}
        >
          <View style={{ flex: 1, justifyContent: "flex-end" }}>
            <Pressable
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
              }}
              onPress={() => setModalScreen(false)}
            />
            <SettingsSheetModalScreen user={user} />
          </View>
          </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width,
    position: "absolute",
    bottom: 0,
  },
  topText: {
    flexDirection: "row",
    color: colors.white,
    margin: 10,
    bottom: 270,
  },
  searchRow: {
    justifyContent: "flex-end",
  },
  uiContainer: {
    height: "100%",
  },
  globeIcon: {
    marginTop: 20,
  },
  reportIcon: {
    marginTop: 10,
    alignItems: "center",
  },
  date: {
    color: colors.secondary,
    fontSize: 8,
  },
  bottomContainer: {
    padding: 10,
    paddingBottom: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  username: {
    color: colors.white,
    fontSize: 13,
    fontWeight: "500",
    marginBottom: 10,
  },
  description: {
    color: colors.white,
    fontSize: 13,
    fontWeight: "300",
    marginBottom: 10,
  },
  songRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  songName: {
    color: colors.white,
    fontSize: 12,
    marginLeft: 5,
  },
  avatar: {
    // zIndex: -9999,
    height: 50,
    width: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: colors.white,
    marginBottom: 10,
  },
  avatarContainer: {
    width: "20%",
  },
  songImage: {
    height: 32,
    width: 32,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: colors.secondary,
    marginBottom: 10,
    marginLeft: 10,
  },
  verifiedContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  phlokkVerified: {
    width: 12,
    height: 12,

    marginHorizontal: 3,
  },

  reportButtonText: {
    color: colors.white,

    padding: 10,
    flexDirection: "row",
  },
  // Side Container

  sideContainer: {
    zIndex: 999,
    top: 50,
    flex: 1,
    alignSelf: "flex-end",
    marginRight: 5,
    marginBottom: Platform.OS === "ios" ? 1 : -100,
  },
  iconContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  statsLabel: {
    color: colors.white,
    fontSize: 10,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 5,
  },
  topBarText: {
    color: colors.white,
    marginHorizontal: 10,
    paddingTop: 45,
  },
  topContainer: {
    flex: 1,
    flexDirection: "row",
    bottom: 250,
  },
  usernameView: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 5,
  },
});
