import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import routes from "../../../navigation/routes";
import colors from "../../../../config/colors";
import SettingsNavBar from "../../../components/general/settings/SettingsNavBar";
import { useTheme } from "../../../theme/context";
import DownloadVideosSwitch from "./switches/DownloadVideosSwitch";
import ShowCommentsSwitch from "./switches/ShowCommentsSwitch";
import ShowNewsTickerSwitch from "./switches/ShowNewsTickerSwitch";
import ShowDuosSwitch from "./switches/ShowDuosSwitch";

export default function PrivacyScreen() {
  const { theme, setTheme } = useTheme();
  const auth = useSelector((state) => state.auth);
  const navigation = useNavigation();
  const [user, setUser] = useState("");
  const [blocking, setBlocking] = useState(false);
  const [security, setSecurity] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <SettingsNavBar title="Privacy" />
      <View>
        <View style={ theme == "light" ? styles.blockColorContainer_light : styles.blockColorContainer_dark}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(routes.BLOCKED_LIST_SCREEN, {
              title: "Blocked Accounts",
            })
          }
          style={styles.fieldItemContainer}
          autoCapitalize="none"
        >
          <Text style={styles.text}>Blocked Accounts</Text>
          <View style={styles.fieldValueContainer}>
            <Feather
              style={styles.chevron}
              name="chevron-right"
              size={20}
              color={colors.secondary}
            />
          </View>
        </TouchableOpacity>
        </View>
        <Text
          style={
            theme == "light" ? styles.socialText_light : styles.socialText_dark
          }
        >
          Privacy Options
        </Text>
        <View style={ theme == "light" ? styles.blockColorContainer_light : styles.blockColorContainer_dark}>
        <TouchableOpacity
          style={styles.fieldItemContainer}
          autoCapitalize="none"
        >
          <Text style={styles.text}>Turn Off Comments</Text>
          
          <View style={styles.fieldValueContainer}>
            <ShowCommentsSwitch />
          </View>
          
        </TouchableOpacity>
        <Text style={styles.commentSwitchDescription}>Disable comments on your account</Text>
        <TouchableOpacity
          style={styles.fieldItemContainer}
          autoCapitalize="none"
        >
          <Text style={styles.text}>Turn Off Downloads</Text>
          <View style={styles.fieldValueContainer}>
            <DownloadVideosSwitch />
            
          </View>
        </TouchableOpacity>
        <Text style={styles.commentSwitchDescription}>Disable downloads on your account</Text>
        <TouchableOpacity
          style={styles.fieldItemContainer}
          autoCapitalize="none"
        >
          <Text style={styles.text}>Turn Off Duos</Text>
          <View style={styles.fieldValueContainer}>
            <ShowDuosSwitch />
            
          </View>
        </TouchableOpacity>
        <Text style={styles.commentSwitchDescription}>Disable duos on your account</Text>
        <TouchableOpacity
          style={styles.fieldItemContainer}
          autoCapitalize="none"
        >
          <Text style={styles.text}>Turn Off News Ticker</Text>
          <View style={styles.fieldValueContainer}>
            
            <ShowNewsTickerSwitch />
          </View>
        </TouchableOpacity>
        <Text style={styles.commentSwitchDescription}>Disable new ticker on Home screen</Text>
        
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
 
  fieldItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  fieldValueContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  socialText_light: {
    color: colors.black,
    paddingHorizontal:10,
    fontWeight: "bold",
    fontSize: 10,
    marginTop: 20,
    opacity: 0.5,
  },
  socialText_dark: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 10,
    marginTop: 20,
    opacity: 0.5,
  },
  text: {
    paddingHorizontal:5,
    color: colors.white,
    fontSize: 12,
  },
  chevron: {
    opacity: 0.6,
  },
  commentSwitchDescription: {
    paddingHorizontal:5,
    color: colors.secondary,
    fontSize: 10,
    opacity: 0.8,

  },
  blockColorContainer_light: {
    backgroundColor: colors.secondaryLight,
    borderRadius: 2,
    marginTop: 10,
    paddingBottom: 15,
    paddingHorizontal: 5,
    

  },
  blockColorContainer_dark: {
    backgroundColor: colors.settingsBlack,
    borderRadius: 2,
    marginTop: 10,
    paddingBottom: 15,
    paddingHorizontal: 5,
  },
});
