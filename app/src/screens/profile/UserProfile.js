import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
  Switch,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../../../config/colors";
import CustomAlert from "../../components/Alerts/CustomAlert";
import VerifiedIcon from "../../components/common/VerifiedIcon";
import BioSheetModalScreen from "../../components/modal/bioSheetModalScreen/BioSheetModalScreen";
// import { useTheme } from "../../theme/ThemeProvider";

function UserProfile({ user, setPopUpImage, isCurrentUser }) {
  const [topFavFive, setTopFavFive] = useState(false);

  const [isBioModalScreenOpen, setIsBioModalScreenOpen] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        // onPress={() => setPopUpImage(true)}
        onPress={() => setIsBioModalScreenOpen(true)}
        disabled={!user?.photo_url}
      >
        <Image
          style={styles.avatar}
          source={
            user?.photo_url
              ? { uri: user?.photo_url }
              : require("../../../assets/userImage.png")
          }
        />
      </TouchableOpacity>

      <View style={styles.usernameView}>
        {user.username !== null ? (
          <Text selectable={true} style={styles.username}>
            @{user.username}
            <View>{user && user.is_verified === 1 && <VerifiedIcon />}</View>
          </Text>
        ) : (
          <Text style={styles.username}>@user</Text>
        )}
      </View>

      <View style={styles.quotesView}>
        {user.quote !== null ? (
          <Text style={styles.quotes}>{user.quote}</Text>
        ) : (
          <></>
        )}
      </View>

      <>
        <TouchableOpacity style={{ marginBottom: 10 }}>
          <CustomAlert
            alertTitle={
              <Text>
                <MaterialIcons name="info" size={24} color={colors.green} />
              </Text>
            }
            customAlertMessage={<Text>Top Favorite 5{"\n"}coming soon!</Text>}
            positiveBtn="Ok"
            modalVisible={topFavFive}
            dismissAlert={setTopFavFive}
            animationType="fade"
          />
          <MaterialCommunityIcons
            name="diamond-stone"
            size={25}
            color={colors.diamondBlue}
            onPress={() => setTopFavFive(true)}
          />
        </TouchableOpacity>
      </>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isBioModalScreenOpen}
      >
        <View style={styles.pressedModal}>
          <Pressable
            style={styles.pressedStyle}
            onPress={() => setIsBioModalScreenOpen(false)}
          />
          <BioSheetModalScreen user={user} isCurrentUser={isCurrentUser} />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
    alignItems: "center",
    backgroundColor: colors.primary,
  },
  avatar: {
    height: 100,
    width: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: colors.secondary,
    shadowColor: colors.secondary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 0.5,
  },
  username: {
    fontSize: 12,
    color: colors.white,
    marginTop: 5,
    marginBottom: 20,
  },
  quotes: {
    color: colors.white,
    marginBottom: 20,
    textAlign: "center",
    fontFamily: "Waterfall-Regular",
    fontSize: 27,
  },
  usernameView: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 5,
  },
  quotesView: {
    flexDirection: "row",
    alignItems: "center",
    textAlign: "center",
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 25,
    paddingLeft: 25,
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
});

export default React.memo(UserProfile);
