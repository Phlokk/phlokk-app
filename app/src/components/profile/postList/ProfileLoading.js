import React, { useContext } from "react";
import { Text, View, StyleSheet } from "react-native";
import colors from "../../../../config/colors";
import LottieView from "lottie-react-native";
import { ThemeContext } from "../../../theme/context";

const animation = require("../../../../assets/animations/dots.json");
const ProfileLoading = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    /** Main Container */
    <View
      style={theme == "light" ? styles.container_light : styles.container_dark}
    >
      <View style={styles.lottieView}>
        <LottieView
          autoPlay
          style={{
            width: 200,
            height: 200,
          }}
          source={animation}
        />
        <Text
          style={theme == "light" ? styles.splash_light : styles.splash_dark}
        >
          Loading Profile...
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container_light: {
    flex: 1,
    backgroundColor: colors.white,
  },
  container_dark: {
    flex: 1,
    backgroundColor: colors.black,
  },
  text: {
    marginTop: 30,
    paddingHorizontal: 10,
    alignItems: "center",
  },
  lottieView: {
    marginTop: 100,
    alignItems: "center",
  },
  splash_light: {
    color: colors.lightBlack,
  },
  splash_dark: {
    color: colors.green,
  },
});

export default ProfileLoading;
