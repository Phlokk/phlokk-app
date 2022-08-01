import { View, Text, StyleSheet, Image, Modal } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Linking from "expo-linking";
import colors from "../../../config/colors";
import LinearGradient from "react-native-linear-gradient";
import { useAtom } from "jotai";
import { userAtom } from "../../../../App";

export default function CustomImageModal({
  alertTitle,
  modalVisible,
  dismissAlert,
  user,
}) {
  return (
    <Modal
      visible={modalVisible}
      transparent={true}
      animationType={"fade"}
      onRequestClose={() => setModalVisible(false)}
    >
      <LinearGradient
        colors={["#00cec9", "#ffffff"]}
        // start={{ x: 0.0, y: 0.25 }}
        // end={{ x: 0.5, y: 1.0 }}
        // locations={[0, 0.5, 0.6]}
        style={styles.box}
      >
        <View style={styles.mainContainer}>
          <View style={styles.container}>
            <View style={styles.top}>
              <Image
                source={{ uri: user.photo_url }}
                resizeMode={"contain"}
                style={styles.alertIconStyle}
              />
            </View>

            <View style={styles.middle}>
              <View style={styles.goBackView}>
                <Feather
                  onPress={() => dismissAlert(false)}
                  style={styles.alertMessageButtonText}
                  name="x-square"
                  size={25}
                />
              </View>
              <Text style={styles.alertMessageTextStyle}>
                <Text style={styles.alertTitleTextStyle}>{alertTitle}</Text>
                {"\n"}
                {"\n"}
                {user.bio}
              </Text>
              <View style={styles.seperator}></View>
              <View style={styles.linkRow}>
                <View style={styles.linkText}>
                  <Feather
                    onPress={
                      user && user.youtube_link
                        ? () => Linking.openURL(user.youtube_link)
                        : null
                    }
                    name="youtube"
                    size={28}
                    color={
                      user && user.youtube_link
                        ? colors.diamondBlue
                        : colors.gray
                    }
                  />
                </View>
                <View style={styles.linkText}>
                  <MaterialCommunityIcons
                    onPress={
                      user && user.link
                        ? () => Linking.openURL(user.link)
                        : null
                    }
                    name="link-box-variant"
                    size={29}
                    color={user && user.link ? colors.diamondBlue : colors.gray}
                  />
                </View>
                <View style={styles.linkText}>
                  <Feather
                    onPress={
                      user && user.instagram_link
                        ? () => Linking.openURL(user.instagram_link)
                        : null
                    }
                    name="instagram"
                    size={23}
                    color={
                      user && user.instagram_link
                        ? colors.diamondBlue
                        : colors.gray
                    }
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </LinearGradient>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    borderRadius: 15,
    padding: 4,
  },
  top: {
    alignItems: "center",
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  middle: {
    alignItems: "center",
    paddingHorizontal: 2,
    textAlign: "center",
    padding: 20,
    margin: 10,
    color: colors.white,
    fontSize: 16,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.diamondBlue,
    backgroundColor: colors.lightBlack,
  },
  alertIconStyle: {
    borderRadius: 100,
    borderWidth: 4,
    borderColor: colors.green,
    marginTop: 50,
    height: 175,
    width: 175,
  },
  alertTitleTextStyle: {
    flex: 1,
    justifyContent: "center",
    textAlign: "center",
    color: colors.green,
    fontSize: 18,
    fontWeight: "bold",
    padding: 2,
    marginHorizontal: 2,
  },
  alertMessageTextStyle: {
    color: colors.diamondBlue,
    textAlign: "center",
    fontSize: 16,
    paddingHorizontal: 45,
  },
  alertMessageButtonStyle: {
    width: "30%",
    height: "20%",
    paddingHorizontal: 6,
    marginVertical: 20,
    justifyContent: "center",
  },
  alertMessageButtonText: {
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold",
    color: colors.diamondBlue,
  },
  text: {
    color: colors.white,
  },
  link: {
    alignItems: "center",
    marginVertical: 5,
  },
  linkRow: {
    flexDirection: "row",
  },
  linkText: {
    color: colors.secondary,
    marginTop: 20,
    padding: 5,
    paddingRight: 10,
    justifyContent: "center",
  },
  seperator: {
    height: 1,
    width: "100%",
    opacity: 0.3,
    backgroundColor: colors.secondary,
    alignSelf: "center",
    justifyContent: "center",
    top: 10
  },
  goBackView: {
    zIndex: 99,
    position: "absolute",
    left: 15,
    top: 15,
  },
  box: {
    width: "100%",
    height: "100%",
  },
});