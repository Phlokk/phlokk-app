import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Alert,
} from "react-native";
import { blockUserById } from "../../services/user";
import colors from "../../../config/colors";
import * as SecureStore from "expo-secure-store";
export default function BlockAlert({
  customAlertMessage,
  positiveBtn,
  negativeBtn,
  modalVisible,
  dismissAlert,
  userIdToBlock,
  onCompleted,
}) {
  const blockUser = async () => {
    try {
      const user = JSON.parse(await SecureStore.getItemAsync("user"))
      await blockUserById(user?._id, userIdToBlock);
      onCompleted && onCompleted();
    } catch {
      Alert.alert("Error blocking user.");
    }
  };

  return (
    <Modal
      visible={modalVisible}
      transparent={true}
      animationType={"fade"}
      onRequestClose={() => dismissAlert(false)}
    >
      <View style={styles.mainContainer}>
        <View style={styles.container}>
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
              <Text style={styles.alertMessageButtonTextNegative}>
                {negativeBtn}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={blockUser}
              style={styles.alertMessageButtonStyle}
            >
              <Text style={[styles.alertMessageButtonText, styles.textBlock]}>
                {positiveBtn}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#00000098",
  },
  container: {
    height: 190,
    width: "80%",
    backgroundColor: colors.modals,
    borderRadius: 15,
    padding: 10,
    paddingTop: 20,
    borderWidth: 1,
    borderColor: colors.modals,
  },
  middle: {
    flex: 0.9,
    alignItems: "center",
    textAlign: "center",
    color: colors.white,
    paddingBottom: 5,
  },
  bottom: {
    flex: 0.2,
    paddingBottom: 5,
    flexDirection: "row",
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
