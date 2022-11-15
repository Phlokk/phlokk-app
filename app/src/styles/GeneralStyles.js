import { StyleSheet } from "react-native";
import colors from "../../config/colors";

const generalStyles = StyleSheet.create({
  textInput: {
    backgroundColor: colors.black,
    borderColor: colors.secondary,
    borderBottomWidth: 1,
    borderStyle: "solid",
    paddingVertical: 10,
    padding: 2,
    color: colors.secondary,
  },
  textInputReport: {
    borderColor: colors.secondary,
    borderWidth: 0.5,
    borderRadius: 5,
    borderStyle: "solid",
    paddingVertical: 10,
    padding: 10,
    color: colors.secondary,
    height: 150,
    textAlignVertical: "top",
    marginVertical: 10,
    marginTop: 20,
  },
  textInputTitle: {
    backgroundColor: "#0C0C0C",
    borderColor: colors.secondary,
    borderRadius: 5,
    borderStyle: "solid",
    paddingVertical: 10,
    padding: 5,
    color: colors.secondary,
  },
  textGiftingInput: {
    textAlign: "center",
    backgroundColor: "#0C0C0C",
    paddingHorizontal: 10,
    borderRadius: 5,
    color: "orange",
    width: "100%",
    height: "40%",
    fontSize: 40,
  },
  avatarSmall: {
    height: 32,
    width: 32,
    borderRadius: 16,
  },
});

export default generalStyles;
