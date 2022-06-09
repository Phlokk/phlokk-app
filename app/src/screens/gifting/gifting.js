import { useEffect } from "react";
import ActivityNavBar from "../../components/general/activityNav";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesome5 } from "@expo/vector-icons";

import colors from "../../../config/colors";
import CustomAlert from "../../components/Alerts/customAlert";
import { SafeAreaView } from "react-native-safe-area-context";
import GiftingNavBar from "../../components/general/giftingNav/giftingNavBar";

export default function GiftingScreen() {
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={styles.container}>
        <GiftingNavBar title="Gifting Store"/>
      <View style={styles.giftingTextView}>
        <Text style={styles.text}>Buy Gifts{"\n"}Coming Soon!</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  userContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  activityContainer: {
    flex: 1,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    color: colors.white,
    marginTop: 30,
  },
  giftingTextView: {
    alignItems: "center",
  },
});
