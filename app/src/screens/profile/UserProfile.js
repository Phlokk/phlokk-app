import React, { useState, useContext } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../../../config/colors";
import CustomAlert from "../../components/Alerts/CustomAlert";
import VerifiedIcon from "../../components/common/VerifiedIcon";
import BioSheetModalScreen from "../../components/modal/bioSheetModalScreen/BioSheetModalScreen";
import { useTheme } from "../../theme/context";
import RisingStar from "../../components/common/RisingStar";



function UserProfile({ user, isCurrentUser }) {
  const { theme, setTheme } = useTheme();
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
          <Text
            selectable={true}
            style={
              theme == "light" ? styles.username_light : styles.username_dark
            }
          >
            @{user.username}
            <View>{user && user.is_verified === 1 && <VerifiedIcon />}
            </View>
          </Text>
        ) : (
          <Text style={styles.username}>@user</Text>
        )}
        <View style={styles.risingStarView}>
      {user.is_rising === 1 && <RisingStar />}
      </View>
      </View>
      
      

      <View style={styles.quotesView}>
        {user.quote !== null ? (
          <Text
            style={theme == "light" ? styles.quotes_light : styles.quotes_dark}
          >
            {user.quote}
          </Text>
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
            style={
              theme == "light" ? styles.diamond_light : styles.diamond_dark
            }
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
  },
  avatar: {
    height: 100,
    width: 100,
    borderRadius: 50,
    shadowColor: colors.secondary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 0.5,
  },
  username_light: {
    fontSize: 12,
    color: colors.black,
    marginTop: 5,
    marginBottom: 20,
  },
  username_dark: {
    fontSize: 12,
    color: colors.white,
    marginTop: 5,
    marginBottom: 20,
  },
  quotes_light: {
    color: colors.black,
    marginBottom: 20,
    textAlign: "center",
    fontFamily: "Waterfall-Regular",
    fontSize: 27,
  },
  quotes_dark: {
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
  diamond_light: {
    color: colors.secondary,
  },
  diamond_dark: {
    color: colors.diamondBlue,
  },
  starIconView: {
    bottom: 50,
  },
  risingStarView: {
    right: 16,
    top: 4,
    // alignItems: "center",

  },
});

export default React.memo(UserProfile);
