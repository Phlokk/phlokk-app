
import { View, StyleSheet, Text, TouchableOpacity, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../../../config/colors";
import RisingStarsNavBar from "../../components/general/profileNavBar/RisingStarsNavBar";

export default function FitnessScreen() {

  return (
    <SafeAreaView style={styles.container}>
      <RisingStarsNavBar title="Rising Stars of Fitness " />
      <Text style={styles.text}>Find your favorite rising star Fitness on this channel:</Text>
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