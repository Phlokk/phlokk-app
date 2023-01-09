import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  Keyboard,
  TextInput,
  Alert
} from "react-native";
import React, { useState } from "react";
import axios from "../../redux/apis/axiosDeclaration";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../../../config/colors";
import PostNavBar from "../../components/general/postNav/PostNavBar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../theme/context";
import { useAtom } from "jotai";
import { userAtom } from "../../../../App";
import { generalStyles } from "../../styles";
import CustomAlert from "../../components/Alerts/CustomAlert";

const ReportProblemScreen = ({ navigation }) => {
  const [currentUser] = useAtom(userAtom);
  const { theme } = useTheme();

  const [message, setMessage] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);

  const submitForm = () => {
    if (message.trim() === "") {
      // Alert.alert("Please fill out all of the fields.");
      setIsSubmit(true);
      return false;
    }

    axios
      .post(
        "/api/support/create-ticket",
        {
          category_id: categoryId,
          creator: currentUser.username,
          email: currentUser.email,
        },
        "create"
      )
      .then(function (response) {
        alert(
          "Thank you for submitting your report. We will look into this matter"
        );
        navigation.goBack();
      })
      .catch(function (error) {
        alert("There was an error in sending your report");
      });
  };

  return (
    <SafeAreaView
      style={theme == "light" ? styles.container_light : styles.container_dark}
    >
      <PostNavBar title="Report Issue" />
      <TouchableWithoutFeedback>
        <View
          style={styles.reportView}
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <ScrollView>
            <View style={styles.reportView}>
              <Text
                style={
                  theme == "light"
                    ? styles.selectText_light
                    : styles.selectText_dark
                }
              >
                Tell us your issue
              </Text>
              <TextInput
                style={
                  theme == "light"
                    ? generalStyles.textInputReport_light
                    : generalStyles.textInputReport_dark
                }
                placeholder="Do not include any of your personal information."
                placeholderTextColor={"gray"}
                autoCapitalize={"sentences"}
                autoCorrect={false}
                textContentType="none"
                multiline
                maxLength={850}
                numberOfLines={10}
                value={message}
                onChangeText={setMessage}
              />
            </View>
          </ScrollView>
          <View style={styles.divider_light}></View>
        </View>
      </TouchableWithoutFeedback>
      <View style={styles.submitBtnView}>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => submitForm()}
        >
          <Text style={styles.text}>Submit</Text>
        </TouchableOpacity>
      </View>
      <CustomAlert
            alertTitle={
              <Text>
                <MaterialIcons name="info" size={24} color={colors.green} />
              </Text>
            }
            customAlertMessage={<Text>Please fill out all fields{"\n"}before submitting report</Text>}
            positiveBtn="Ok"
            modalVisible={isSubmit}
            dismissAlert={setIsSubmit}
            animationType="fade"
          />
    </SafeAreaView>
  );
};

export default ReportProblemScreen;

const styles = StyleSheet.create({
  container_dark: {
    flex: 1,
    backgroundColor: colors.black,
  },
  container_light: {
    flex: 1,
    backgroundColor: colors.white,
  },

  text: {
    color: colors.white,
    padding: 5,
    fontSize: 16,
    fontWeight: "bold",
  },
  selectText_light: {
    color: colors.black,
    marginBottom: 10,
    fontSize: 12,
    marginHorizontal: 5,
  },
  selectText_dark: {
    color: colors.secondary,
    marginBottom: 10,
    fontSize: 12,
    marginHorizontal: 5,
  },
  reportText_light: {
    color: colors.black,
    marginBottom: 10,
    fontSize: 10,
    marginHorizontal: 5,
  },
  reportText_dark: {
    color: colors.secondary,
    marginBottom: 10,
    fontSize: 10,
    marginHorizontal: 5,
  },
  submitBtnView: {
    padding: 20,
  },
  reportView: {
    marginTop: 5,
    marginBottom: 40,
    padding: 10,
  },
  submitButton: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    padding: 10,
    borderRadius: 7,
    backgroundColor: colors.red,
  },
  divider_light: {
    top: 20,
    borderBottomWidth: 0.3,
    borderColor: colors.secondary,
    marginTop: 10,
    opacity: 0.2,
    // width: '80%',
  },
});
