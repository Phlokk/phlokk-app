import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import axios from "../../redux/apis/axiosDeclaration";

import colors from "../../../config/colors";
import PostNavBar from "../../components/general/postNav";
import { SafeAreaView } from "react-native-safe-area-context";
import { generalStyles } from "../../styles";
import { REPORT_TICKET } from "@env";

let categoryId = null;

const ReportScreen = ({ route, navigation }) => {
  const [categories, setCategories] = useState([
    {
      id: 1,
      key: "cat2",
      value: false,
      category: "Illegal activities",
      selected: false,
    },
    { id: 2, key: "cat3", value: false, category: "Fraud", selected: false },
    {
      id: 3,
      key: "cat4",
      value: false,
      category: "Graphic content",
      selected: false,
    },
    {
      id: 4,
      key: "cat5",
      value: false,
      category: "Dangerous individuals",
      selected: false,
    },
    {
      id: 5,
      key: "cat6",
      value: false,
      category: "Suicide or self-harm",
      selected: false,
    },
    {
      id: 6,
      key: "cat7",
      value: false,
      category: "Hate speech and Bullying",
      selected: false,
    },
    {
      id: 7,
      key: "cat8",
      value: false,
      category: "Pornographic content",
      selected: false,
    },
    {
      id: 8,
      key: "cat9",
      value: false,
      category: "Harassment",
      selected: false,
    },
    {
      id: 9,
      key: "cat10",
      value: false,
      category: "Minor safety",
      selected: false,
    },
    {
      id: 10,
      key: "cat11",
      value: false,
      category: "Underage",
      selected: false,
    },
    { id: 11, key: "cat12", value: false, category: "other", selected: false },
  ]);
  const [titleValue, setTitleValue] = useState("");
  const [messageValue, setMessageValue] = useState("");

  const onRadioBtnClick = (item) => {
    categoryId = item.id;
    setCategories(item);

    let updatedState = categories.map((i) =>
      i.id === item.id ? { ...i, selected: true } : { ...i, selected: false }
    );
    setCategories(updatedState);
  };

  const submitForm = function () {
    let post = route.params.post;

    if (titleValue.trim() === "" || messageValue.trim() === "") {
      Alert.alert("Please fill out all of the fields.");
      return false;
    }
    // change url of post API call, right now set on https://phlokk.com/test/ticket
    axios
      .post('/api/support/create-ticket', {
        title: titleValue,
        message: messageValue,
        post: post._id,
        category_id: categoryId,
        // customer_id: currentUser.uid
      })
      .then(function (response) {
        Alert.alert(
          "Notice",
          "Thank you for submitting your report. We will look into this matter."
        );
        navigation.goBack();
      })
      .catch(function (error) {});
  };

  return (
    <SafeAreaView style={styles.container}>
      <PostNavBar title="Report" />
      <ScrollView>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <View style={styles.reportView}>
            <TextInput
              style={generalStyles.textInputTitle}
              placeholder="Subject:"
              placeholderTextColor={colors.secondary}
              autoCapitalize="none"
              autoCorrect={false}
              textContentType="none"
              maxLength={50}
              value={titleValue}
              onChangeText={setTitleValue}
            />
            <TextInput
              style={generalStyles.textInputReport}
              placeholder="Reason for report..."
              placeholderTextColor={colors.secondary}
              autoCapitalize="none"
              autoCorrect={false}
              textContentType="none"
              multiline
              maxLength={850}
              numberOfLines={10}
              value={messageValue}
              onChangeText={setMessageValue}
            />
            <View>
              <Text style={styles.selectText}>Select category</Text>
            </View>

            {categories.map((item) => (
              <View style={styles.radioButtonContainer} key={item.id}>
                <TouchableOpacity onPress={() => onRadioBtnClick(item)}>
                  <Text style={styles.radioButtonText}>{item.category}</Text>
                </TouchableOpacity>
                <View style={{ flex: 1 }}></View>
                <TouchableOpacity
                  onPress={() => onRadioBtnClick(item)}
                  style={styles.radioButton}
                >
                  {item.selected ? (
                    <View style={styles.radioButtonIcon} />
                  ) : null}
                </TouchableOpacity>
              </View>
            ))}

            <View style={styles.submitBtnView}>
              <TouchableOpacity
                style={styles.submitButton}
                onPress={() => submitForm()}
              >
                <Text style={styles.text}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ReportScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },

  text: {
    color: colors.white,
    padding: 5,
    fontSize: 16,
  },
  selectText: {
    color: colors.secondary,
    marginBottom: 10,
    fontSize: 10,
    marginHorizontal: 5,
  },
  submitBtnView: {
    marginTop: 20,
  },
  reportView: {
    marginTop: 30,
    padding: 10,
  },
  submitButton: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    padding: 10,
    backgroundColor: colors.red,
  },
  radioButtonContainer: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    opacity: 0.9,
  },
  radioButton: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.secondary,
    alignItems: "center",
    justifyContent: "center",
  },
  radioButtonIcon: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: colors.red,
  },
  radioButtonText: {
    color: colors.secondary,
    fontSize: 14,
  },
});
