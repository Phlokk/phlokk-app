import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import React, { useState } from "react";
import colors from "../../../config/colors";

export default function CustomAlert ({
  alertTitle, 
  customAlertMessage, 
  positiveBtn, 
  modalVisible, 
  dismissAlert}) {


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
              source={require("../../../assets/small.png")}
              resizeMode={"contain"}
              style={styles.alertIconStyle}
            />
            <Text style={styles.alertTitleTextStyle}>{alertTitle}</Text>
          </View>

          <View style={styles.middle}>
            <Text style={styles.alertMessageTextStyle}>{customAlertMessage}</Text>
          </View>

          <View style={styles.bottom}>
            <TouchableOpacity
              onPress={() => dismissAlert(false)}
              style={styles.alertMessageButtonStyle}
            >
              <Text style={styles.alertMessageButtonText}>{positiveBtn}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    height: "25%",
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: colors.black,
    borderRadius: 15,
    padding: 4,
    borderWidth: 1,
    borderColor: colors.green,
  },
  mainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#00000088",
  },
  top: {
    flex: 0.5,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 2,
    paddingVertical: 4,
  },
  middle: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 2,
    paddingVertical: 4,
    textAlign: "center",
    textAlignVertical: "center",
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
    justifyContent: 'center',
    textAlign: "auto",
    fontSize: 16,
    padding: 2,
    paddingHorizontal: 25,
    paddingVertical: 2,
    
  },
  alertMessageButtonStyle: {
    width: "30%",
    paddingHorizontal: 6,
    marginVertical: 4,
    borderRadius: 10,
    backgroundColor: colors.green,
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


