import { View, Text, StyleSheet, Image, Modal } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Octicons } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons'; 
import * as Linking from "expo-linking";
import colors from "../../../config/colors";


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
        <View style={styles.mainContainer}>
        <View style={styles.goBackView}>
                <Feather
                  onPress={() => dismissAlert(false)}
                  style={styles.alertMessageButtonText}
                  name="x"
                  size={25}
                />
              </View>
          <View style={styles.container}>
          
            <View style={styles.top}>
              <Image
                source={{ uri: user.photo_url }}
                resizeMode={"contain"}
                style={styles.alertIconStyle}
              />
            </View>

            <View style={styles.middle}>
              {/* <View style={styles.goBackView}>
                <Feather
                  onPress={() => dismissAlert(false)}
                  style={styles.alertMessageButtonText}
                  name="x-square"
                  size={25}
                />
              </View> */}
              <Text style={styles.alertMessageTextStyle}>
                <Text style={styles.alertTitleTextStyle}>{alertTitle}</Text>
                {"\n"}
                {"\n"}
                {user.bio}
              </Text>
              <View style={styles.linkRow}>
                <View style={styles.linkText}>
                  <SimpleLineIcons
                    onPress={
                      user && user.youtube_link
                        ? () => Linking.openURL(user.youtube_link)
                        : null
                    }
                    name="social-youtube"
                    size={28}
                    color={
                      user && user.youtube_link
                        ? colors.green
                        : colors.white
                    }
                  />
                </View>
                <View style={styles.linkText}>
                  <Octicons
                    onPress={
                      user && user.link
                        ? () => Linking.openURL(user.link)
                        : null
                    }
                    name="link-external"
                    size={27}
                    color={user && user.link ? colors.green : colors.white}
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
                        ? colors.green
                        : colors.white
                    }
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightBlack,
    height: "100%",
    width: "100%",
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
    borderColor: colors.diamondBlue,
  },
  alertIconStyle: {
    borderRadius: 100,
    borderWidth: 2,
    borderColor: colors.secondary,
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
    color: colors.secondary,
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
    color: colors.green,
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
    top: 20,
    marginTop: 20,
  },
  box: {
    width: "100%",
    height: "100%",
  },
});