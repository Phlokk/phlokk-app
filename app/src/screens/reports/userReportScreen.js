import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import React, { useState, useContext } from "react";
import axios from "../../redux/apis/axiosDeclaration";
import colors from "../../../config/colors";
import PostNavBar from "../../components/general/postNav/PostNavBar";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeContext } from "../../theme/context";
import { useAtom } from "jotai";
import { userAtom } from "../../../../App";

let categoryId = null;

const UserReportScreen = ({ route, userProfile, navigation }) => {
  const [categories, setCategories] = useState([
    {
      id: 2,
      key: "cat2",
      value: false,
      category: "Illegal activities",
      selected: false,
    },
    { id: 3, key: "cat3", value: false, category: "Fraud", selected: false },
    {
      id: 4,
      key: "cat4",
      value: false,
      category: "Graphic content",
      selected: false,
    },
    {
      id: 5,
      key: "cat5",
      value: false,
      category: "Dangerous individuals",
      selected: false,
    },
    {
      id: 6,
      key: "cat6",
      value: false,
      category: "Suicide or self-harm",
      selected: false,
    },
    {
      id: 7,
      key: "cat7",
      value: false,
      category: "Hate speech and Bullying",
      selected: false,
    },
    {
      id: 8,
      key: "cat8",
      value: false,
      category: "Pornographic content",
      selected: false,
    },
    {
      id: 9,
      key: "cat9",
      value: false,
      category: "Harassment",
      selected: false,
    },
    {
      id: 10,
      key: "cat10",
      value: false,
      category: "Minor safety",
      selected: false,
    },
    {
      id: 11,
      key: "cat11",
      value: false,
      category: "Underage",
      selected: false,
    },
  ]);
  const [currentUser, setCurrentUser] = useAtom(userAtom);
  const { theme, setTheme } = useContext(ThemeContext);

  const onRadioBtnClick = (item) => {
    categoryId = item.id;
    setCategories(item);

    let updatedState = categories.map((i) =>
      i.id === item.id ? { ...i, selected: true } : { ...i, selected: false }
    );
    setCategories(updatedState);
  };
  // need user_id of the creator who is in violation to come with report
  const submitForm = () => {
    const { profile } = route.params;
    axios

      .post(
        "/api/support/create-ticket",
        {
          profile,
          category_id: categoryId,
          creator: currentUser.username,
        },
        "create"
      )
      .then(function (response) {
        console.log(response);
        alert(
          "Thank you for reporting this creator. We will look into this matter"
        );
        navigation.goBack();
      })
      .catch(function (error) {
        console.log(error.message);
        alert("There was an error in sending your report");
      });
  };

  return (
    <SafeAreaView
      style={theme == "light" ? styles.container_light : styles.container_dark}
    >
      <PostNavBar title="Report Creator" />
      <ScrollView>
        <TouchableWithoutFeedback>
          <View style={styles.reportView}>
            <View>
              <Text
                style={
                  theme == "light"
                    ? styles.selectText_light
                    : styles.selectText_dark
                }
              >
                Select category
              </Text>
            </View>

            {categories.map((item) => (
              <View style={styles.radioButtonContainer} key={item.id}>
                <TouchableOpacity onPress={() => onRadioBtnClick(item)}>
                  <Text
                    style={
                      theme == "light"
                        ? styles.radioButtonText_light
                        : styles.radioButtonText_dark
                    }
                  >
                    {item.category}
                  </Text>
                </TouchableOpacity>
                <View style={{ flex: 1 }}></View>
                <TouchableOpacity
                  onPress={() => onRadioBtnClick(item)}
                  style={
                    theme == "light"
                      ? styles.radioButton_light
                      : styles.radioButton_dark
                  }
                >
                  {item.selected ? (
                    <View style={styles.radioButtonIcon} />
                  ) : null}
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>

      <View style={styles.submitBtnView}>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => submitForm()}
        >
          <Text style={styles.text}>Submit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default UserReportScreen;

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
    fontSize: 10,
    marginHorizontal: 5,
  },
  selectText_dark: {
    color: colors.secondary,
    marginBottom: 10,
    fontSize: 10,
    marginHorizontal: 5,
  },
  submitBtnView: {
    padding: 20,
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
    borderRadius: 7,
    backgroundColor: colors.red,
  },
  radioButtonContainer: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    opacity: 0.9,
  },
  radioButton_light: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.grey,
    alignItems: "center",
    justifyContent: "center",
  },
  radioButton_dark: {
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
  radioButtonText_light: {
    color: colors.black,
    fontSize: 12,
    marginLeft: 16,
  },
  radioButtonText_dark: {
    color: colors.secondary,
    fontSize: 12,
    marginLeft: 16,
  },
});
