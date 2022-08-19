import { useEffect } from "react";
import ActivityNavBar from "../../components/general/activityNav";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesome5 } from '@expo/vector-icons'; 
import colors from "../../../config/colors";


export default function ActivityScreen({ navigation }) {
  const dispatch = useDispatch();

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
  userContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  activityContainer: {
    flex: 1,
  },
  text: {
    color: colors.white,
    marginTop: 30,
  },
  
});
