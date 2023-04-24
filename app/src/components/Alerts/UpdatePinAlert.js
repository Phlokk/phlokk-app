import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import colors from "../../../config/colors";
import routes from "../../navigation/routes";
import { useNavigation } from "@react-navigation/native";

export default function UpdatePinAlert({
  alertTitle,
  customAlertMessage,
  positiveBtn,
  negativeBtn,
  modalVisible,
  setModalVisible,
  dismissAlert,
  onPositivePressed,
}) 


{
  const navigation = useNavigation();

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
            <Image
              source={require("../../../assets/pmd_logo_green.png")}
              resizeMode={"contain"}
              style={styles.alertIconStyle}
            />
            <Text style={styles.alertTitleTextStyle}>{alertTitle}</Text>
          </View>

          <View style={styles.middle}>
            <Text style={styles.alertMessageTextStyle}>
              {customAlertMessage}
            </Text>
          </View>

          <View style={styles.bottom}>
            {negativeBtn && (
              <TouchableOpacity
                onPress={() => dismissAlert(false)}
                style={styles.alertMessageButtonStyle}
              >
                <Text style={styles.alertMessageButtonText}>{negativeBtn}</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={() => {
                onPositivePressed && onPositivePressed();
                navigation.navigate(routes.UPDATE_PIN);
                dismissAlert(false)
              }}
              style={styles.alertMessageButtonStyle}
            >
              <Text style={styles.alertMessageButtonText}>{positiveBtn}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "20%",
    width: "80%",
    backgroundColor: colors.black,
    borderRadius: 15,
    padding: 4,
    borderWidth: 1,
    borderColor: colors.secondary,
  },
  mainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#00000088",
  },
  top: {
    flex: 0.5,
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
    flex: 0.5,
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
    paddingRight: 40,
    textAlign: "center",
    color: colors.white,
    fontSize: 18,
    fontWeight: "bold",
    padding: 2,
    marginHorizontal: 2,
  },
  alertMessageTextStyle: {
    color: colors.white,
    textAlign: "center",
    fontSize: 12,
    paddingHorizontal: 25,
  },
  alertMessageButtonStyle: {
    width: "30%",
    paddingHorizontal: 6,
    marginVertical: 8,
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
  text: {
    color: colors.white,
  },
});