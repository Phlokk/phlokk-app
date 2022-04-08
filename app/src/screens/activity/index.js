import React from "react";
import ActivityNavBar from "../../components/general/activityNav";
import { View, StyleSheet } from "react-native";
import axios from "axios";

import colors from "../../../config/colors";

export default function ActivityScreen({ navigation }) {
  console.log("Call API...aaaa");

  axios
    .post("https://dev.phlokk.com/test/post", {
      title: "titleValue",
    })
    .then(function (response) {
      // 2 seconds later...
      console.log("------------ Response");
      // console.log(response);
      console.log(response.data);
      console.log("alsdkjfasdlkfj");
    })
    .catch(function (error) {
      console.log("------------ Back from Server ----------");
      console.log("------------ ERROR -------------");
      console.log(error);
    });

  console.log("Continuing on with code......");
  console.log("Doing shit....");

  return (
    <View style={styles.container}>
      <ActivityNavBar title={"Activity feed"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  activityContainer: {
    flex: 1,
  },
  text: {
    color: colors.white,
    marginTop: 30,
  },
});
