import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import { blockUserById } from "../../services/user";
import {useVideoFeed} from "../../services/posts";

import colors from "../../../config/colors";

export default function BlockAlert({
  alertTitle,
  customAlertMessage,
  positiveBtn,
  negativeBtn,
  modalVisible,
  dismissAlert,
  post,

}) {


  const blockUser = async function (userId) {
    await blockUserById(userId).then((res) => {
      const feed = useVideoFeed();
      setPosts(feed);
    });
  };
  return (
    <Modal
      visible={modalVisible}
      transparent={true}
      animationType={"fade"}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <View style={styles.top}>
            {/* <Image
              source={require("../../../assets/pmd_logo_green.png")}
              resizeMode={"contain"}
              style={styles.alertIconStyle}
            /> */}
            <Text style={styles.alertTitleTextStyle}>{alertTitle}</Text>
          </View>

          <View style={styles.middle}>
            <Text style={styles.alertMessageTextStyle}>
              {customAlertMessage}
            </Text>
          </View>

          <View style={styles.bottom}>
            <TouchableOpacity
              onPress={() => dismissAlert(false)}
              style={styles.alertMessageButtonStyle}
            >
              <Text style={styles.alertMessageButtonTextNegative}>{negativeBtn}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                blockUser(post.user._id);
              }}
              style={styles.alertMessageButtonStyle}
            >
              <Text style={[styles.alertMessageButtonText, styles.textBlock]}>{positiveBtn}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "40%",
    width: "80%",
    backgroundColor: colors.primary,
    borderRadius: 15,
    padding: 4,
    borderWidth: 1,
  },
  mainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#00000088",
  },
  top: {
    flex: 0.2,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  middle: {
    flex: 0.5,
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 2,
    textAlign: "center",
    padding: 4,
    color: colors.white,
    fontSize: 16,
    marginVertical: 2,
  },
  bottom: {
    flex: 0.2,
    width: "100%",
    flexDirection: "row",
    padding: 4,
    justifyContent: "space-evenly",
  },
  alertIconStyle: {
    height: 35,
    width: 35,
  },
  alertTitleTextStyle: {
    flex: 1,
    textAlign: "center",
    color: colors.white,
    fontWeight: "bold",
    padding: 2,
    marginHorizontal: 2,
  },
  alertMessageTextStyle: {
    color: colors.secondary,
    textAlign: "center",
    fontSize: 11,
    paddingHorizontal: 25,
    opacity: 0.9,
  },
  alertMessageButtonStyle: {
    width: "30%",
    paddingHorizontal: 6,
    marginVertical: 15,
    borderRadius: 10,
    borderColor: colors.secondary,
    borderWidth: 1,
    backgroundColor: colors.lightBlack,
    justifyContent: "center",
  },
  alertMessageButtonText: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: "bold",
    color: colors.white,
  },
  alertMessageButtonTextNegative: {
    textAlign: "center",
    fontSize: 14,
    color: colors.white,
  },
  text: {
    color: colors.white,
  },
  textBlock: {
    color: colors.red,
  },
});
