
import { View, StyleSheet, Text, TouchableOpacity, FlatList } from "react-native";
import colors from "../../../config/colors";

export default function CookingScreen() {

  return (
    <View style={styles.container}>
      <Text>Cooking Screen</Text>
    </View>
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
  },
  
});