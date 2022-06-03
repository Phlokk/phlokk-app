
import { View, StyleSheet, Text, TouchableOpacity, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../../../config/colors";
import RisingStarsNavBar from "../../components/general/profileNavBar/risingStarNavBar";

export default function ComedyScreen() {

  return (
    <SafeAreaView style={styles.container}>
      <RisingStarsNavBar title="Rising Stars Comedy " />
      <Text style={styles.text}>Find your favorite rising stars of comedy on this channel:</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  text: {
    color: colors.white,
    marginTop: 30,
    margin: 20,
    textAlign: 'center',
  },
  
});