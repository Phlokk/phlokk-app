import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import routes from '../../../navigation/routes'
import colors from '../../../../config/colors'
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../../theme/context';

import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";


export default function AboutScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation();
  return (
    <View>
      <Text
          style={
            theme == "light" ? styles.socialText_light : styles.socialText_dark
          }
        >
          ABOUT
        </Text>
        <View style={ theme == "light" ? styles.blockColorContainer_light : styles.blockColorContainer_dark}>
        <TouchableOpacity
          style={styles.fieldItemContainer}
          autoCapitalize="none"
          onPress={() =>
            navigation.navigate(routes.GUIDELINES, {
              title: "Community Guidelines",
            })
          }
        >
          <Text style={theme == "light" ? styles.text_light : styles.text_dark}>
            <AntDesign
              name="exclamationcircleo"
              size={14}
              style={theme == "light" ? styles.icon_light : styles.icon_dark}
            />{" "}
            Community Guidelines
          </Text>
          <View style={styles.fieldValueContainer}>
            <Feather
              style={
                theme == "light" ? styles.chevron_light : styles.chevron_dark
              }
              name="chevron-right"
              size={20}
              color={colors.secondary}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.fieldItemContainer}
          autoCapitalize="none"
          onPress={() =>
            navigation.navigate(routes.TERMS, { title: "Terms oF Service" })
          }
        >
          <Text style={theme == "light" ? styles.text_light : styles.text_dark}>
            <Feather
              name="file-text"
              size={14}
              style={theme == "light" ? styles.icon_light : styles.icon_dark}
            />{" "}
            Terms of Service
          </Text>
          <View style={styles.fieldValueContainer}>
            <Feather
              style={
                theme == "light" ? styles.chevron_light : styles.chevron_dark
              }
              name="chevron-right"
              size={20}
              color={colors.secondary}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.fieldItemContainer}
          autoCapitalize="none"
          onPress={() =>
            navigation.navigate(routes.PRIVACY, { title: "Privacy Policy" })
          }
        >
          <Text style={theme == "light" ? styles.text_light : styles.text_dark}>
            <Feather
              name="file"
              size={14}
              style={theme == "light" ? styles.icon_light : styles.icon_dark}
            />{" "}
            Privacy Policy
          </Text>
          <View style={styles.fieldValueContainer}>
            <Feather
              style={
                theme == "light" ? styles.chevron_light : styles.chevron_dark
              }
              name="chevron-right"
              size={20}
              color={colors.secondary}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.fieldItemContainer}
          autoCapitalize="none"
          onPress={() =>
            navigation.navigate(routes.COPYRIGHT, {
              title: "Copyright Policy",
              field: "link",
            })
          }
        >
          <Text style={theme == "light" ? styles.text_light : styles.text_dark}>
            <FontAwesome5
              name="copyright"
              size={14}
              style={theme == "light" ? styles.icon_light : styles.icon_dark}
            />{" "}
            Copyright Policy
          </Text>
          <View style={styles.fieldValueContainer}>
            <Feather
              style={
                theme == "light" ? styles.chevron_light : styles.chevron_dark
              }
              name="chevron-right"
              size={20}
              color={colors.secondary}
            />
          </View>
        </TouchableOpacity>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container_light: {
    flex: 1,
    backgroundColor: colors.white,
  },
  container_dark: {
    flex: 1,
    backgroundColor: colors.black,
  },
  fieldsContainer: {
    marginTop: 20,
    flex: 1,
  },
  fieldItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 25,
  },
  fieldValueContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  text_light: {
    paddingHorizontal:5,
    color: colors.black,
    fontSize: 12,
  },
  text_dark: {
    paddingHorizontal:5,
    color: colors.white,
    fontSize: 12,
  },
  versionText_light: {
    color: colors.black,
    textAlign: "center",
    fontSize: 10,
    marginTop: 50,
  },
  versionText_dark: {
    color: colors.secondary,
    textAlign: "center",
    fontSize: 10,
    marginTop: 50,
  },
  authText: {
    color: colors.white,
  },
  socialText_light: {
    color: colors.black,
    paddingHorizontal:10,
    fontWeight: "bold",
    fontSize: 8,
    marginTop: 20,
    opacity: 0.5,
  },
  socialText_dark: {
    color: colors.white,
    paddingHorizontal:10,
    fontWeight: "bold",
    fontSize: 8,
    marginTop: 20,
    opacity: 0.5,
  },
  chevron_light: {
    color: colors.black,
  },
  chevron_dark: {
    opacity: 0.6,
  },
  icon_light: {
    color: colors.black,
  },
  icon_dark: {
    color: colors.greyShade,
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
})