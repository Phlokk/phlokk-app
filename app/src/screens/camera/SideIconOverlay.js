import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import colors from "../../../config/colors";
import CustomAlert from "../../components/Alerts/CustomAlert";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import routes from "../../navigation/routes";
import axios from "../../redux/apis/axiosDeclaration";
import * as SecureStore from "expo-secure-store";
import RecentComments from "./RecentComments";
function SideIconOverlay({ duo, isRecording, pickFromGallery, uploadImgUri, setSelectedComment }) {
  const navigation = useNavigation();
  const [isLive, setIsLive] = useState(false);
  const [speed, setSpeed] = useState(false);
  const [replies, setReplies] = useState(false);
  const [recentComments, setRecentComments] = useState([]);
  const getMostRecentComments = async () => {
    try {
      const user = JSON.parse(await SecureStore.getItemAsync("user"));
      const response = await axios.get(`/api/comments/most-recent/${user._id}`);
      setRecentComments(response.data);
      setReplies(true);
    } catch {}
  };

  return (
    <View style={duo ? styles.duoIconRow : styles.iconRow}>
      <View
        style={duo ? styles.duoSideBarButtonView : styles.sideBarButtonView}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={duo ? styles.duoSideBarBackButton : styles.sideBarBackButton}
        >
          <MaterialIcons name="arrow-left" size={28} color={colors.red} />
        </TouchableOpacity>
        {!duo && (
          <>
            <TouchableOpacity
              style={styles.sideBarButton}
              onPress={() => setSpeed(true)}
            >
              <Octicons name="dashboard" size={18} color={colors.white} />
              <Text style={styles.iconText}>Speed</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.sideBarButton}
              onPress={getMostRecentComments}
            >
              <MaterialIcons
                name="chat-bubble-outline"
                size={18}
                color={colors.white}
              />
              <Text style={styles.iconText}>Reply</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.sideBarButton}
              onPress={() => navigation.navigate(routes.SOUNDS)}
            >
              <Ionicons
              name="musical-notes-sharp"
              size={19}
              color={colors.white}
            />
              <Text style={styles.iconText}>MP3</Text>
            </TouchableOpacity>
          </>
        )}

        <TouchableOpacity
          style={duo ? styles.duoSideBarButton : styles.sideBarButton}
          onPress={duo ? () => pickFromGallery() : () => setIsLive(true)}
        >
          {duo ? (
            <Image
              style={styles.galleryButtonImage}
              source={{ uri: uploadImgUri }}
            />
          ) : (
            <Feather name="video" size={18} color={colors.white} />
          )}
          <Text style={duo ? styles.duoIconText : styles.iconText}>
            {duo ? "Upload" : "LIVE"}
          </Text>
        </TouchableOpacity>
        <CustomAlert
          alertTitle={
            <Text>
              <MaterialIcons name="info" size={24} color={colors.green} />
            </Text>
          }
          customAlertMessage={<Text>Speed{"\n"}coming soon!</Text>}
          positiveBtn="Ok"
          modalVisible={speed}
          dismissAlert={setSpeed}
          animationType="fade"
        />
        {/* <CustomAlert
          alertTitle={
            <Text>
              <MaterialIcons name="info" size={24} color={colors.green} />
            </Text>
          }
          customAlertMessage={<Text>Reply{"\n"}coming soon!</Text>}
          positiveBtn="Ok"
          modalVisible={replies}
          dismissAlert={setReplies}
          animationType="fade"
        /> */}
        <CustomAlert
          alertTitle={
            <Text>
              <MaterialIcons name="info" size={24} color={colors.green} />
            </Text>
          }
          customAlertMessage={<Text>LIVE{"\n"}coming soon!</Text>}
          positiveBtn="Ok"
          modalVisible={isLive}
          dismissAlert={setIsLive}
          animationType="fade"
        />
      </View>
      <RecentComments
        visible={replies}
        setIsVisible={() => setReplies(false)}
        comments={recentComments}
        setSelectedComment={setSelectedComment}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  duoIconRow: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    position: "absolute",
    top: 95,
    width: 300,
  },
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    position: "absolute",
    top: 95,
  },
  iconText: {
    textAlign: "center",
    width: 30,
    color: colors.white,
    fontSize: 7,
  },
  duoIconText: {
    textAlign: "center",
    width: 50,
    color: colors.white,
    fontSize: 7,
  },
  sideBarButton: {
    padding: 1,
    margin: 15,
    shadowColor: "#ffffff",
    shadowOpacity: 0.2,
    paddingHorizontal: 5,
    justifyContent: "space-between",
    alignItems: "center",
  },
  duoSideBarButton: {
    margin: 5,
    shadowColor: "#ffffff",
    shadowOpacity: 0.2,
    justifyContent: "space-between",
    alignItems: "center",
    width: 50,
  },
  sideBarBackButton: {
    margin: 15,
    borderWidth: 0.7,
    borderColor: colors.secondary,
    borderRadius: 50,
    paddingHorizontal: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
  duoSideBarBackButton: {
    borderWidth: 0.7,
    borderColor: colors.secondary,
    borderRadius: 50,
    paddingHorizontal: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
  backBtn: {
    justifyContent: "center",
  },
  sideBarButtonView: {
    top: 30,
    flexDirection: "row",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    borderRadius: 50,
  },
  duoSideBarButtonView: {
    top: 30,
    padding: 10,
    flexDirection: "row",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    borderRadius: 50,
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
  },
  galleryButtonImage: {
    width: 30,
    height: 30,
  },
});

export default SideIconOverlay;
