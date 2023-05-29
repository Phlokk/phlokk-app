import React, { useContext } from "react";
import { Text, View, StyleSheet } from "react-native";
import colors from "../../../../config/colors";
import LottieView from "lottie-react-native";
import { useTheme } from "../../../theme/context";

const animation = require("../../../../assets/animations/two_dots.json");
const ProfileLoading = () => {
  const { theme, setTheme } = useTheme();
  return (
    /** Main Container */
    <View
      style={theme == "light" ? styles.container_light : styles.container_dark}
    >
      <View style={styles.lottieView}>
        <LottieView
          autoPlay
          style={{
            width: 25,
            height: 25,
          }}
          source={animation}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container_light: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
  },
  container_dark: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.black,
    zIndex:9999
  },
  lottieView: {
    marginTop: 400,
    alignItems: "center",
  },
  
});

export default ProfileLoading;
