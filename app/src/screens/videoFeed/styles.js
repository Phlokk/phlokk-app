import { Dimensions, StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    height: Dimensions.get("window").height - 115,
  },
  text: {
    color: "white",
    marginTop: 30,
    padding: 20,
  },
});

export default styles;
