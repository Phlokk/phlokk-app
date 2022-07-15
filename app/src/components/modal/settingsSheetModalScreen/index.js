import { View, Text, TouchableOpacity, StyleSheet, Share, ScrollView } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import routes from "../../../navigation/routes";
import colors from "../../../../config/colors";

const SettingsSheetModalScreen = ( props, post ) => {
  // console.log("You are here Settings Sheet Modal Screen----->");
  // console.log(post)


  // console.log(item)

  const navigation = useNavigation();

  // const handleClosePress = () => props.bottomSheetRef.current.close();

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: "Check out what I just posted on Phlokk!",
        // url:
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.settingsText}>Actions</Text>
      <ScrollView>
      <TouchableOpacity
        style={styles.fieldItemContainer}
        autoCapitalize="none"
        onPress={() => {
          // navigation.navigate(routes.SETTING_SHEET)

        }}
      >
        <Text style={styles.text}>
          <Feather
            name="user-minus"
            style={styles.blockIcon}
            size={14}
            color={colors.green}
          />{" "}
          Block
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.fieldItemContainer}
        autoCapitalize="none"
        onPress={() => {
          navigation.navigate(routes.REPORTS, { post });

        }}
      >
        <Text style={styles.text}>
          <AntDesign name="exclamationcircleo" size={12} color={colors.green} />{" "}
          Report
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.fieldItemContainer}
        autoCapitalize="none"
        onPress={() => {
          // navigation.navigate(routes.MARKET)

        }}
      >
        <Text style={styles.text}>
          <Feather name="download-cloud" size={14} color={colors.green} />{" "}
          Download
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.fieldItemContainer}
        autoCapitalize="none"
        onPress={() => {
          // navigation.navigate(routes.MARKET)

        }}
      >
        <Text style={styles.text}>
          <MaterialIcons
            name="bookmark-outline"
            size={14}
            color={colors.green}
          />{" "}
          Add to Favorites
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.fieldItemContainer}
        autoCapitalize="none"
        onPress={() => {
          // navigation.navigate(routes.MARKET)

        }}
      >
        <Text style={styles.text}>
          <MaterialCommunityIcons
            name="account-box-multiple-outline"
            size={14}
            color={colors.green}
          />{" "}
          Duo
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.fieldItemContainer}
        autoCapitalize="none"
        onPress={() => {
          // navigation.navigate(routes.MARKET)

        }}
      >
        <Text style={styles.text}>
          <Feather name="link" size={14} color={colors.green} /> Link
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.fieldItemContainer}
        onPress={() => {
          onShare();

        }}
      >
        <Text style={styles.text}>
          <MaterialCommunityIcons
            name="share-all-outline"
            size={16}
            color={colors.green}
          />{" "}
          Share
        </Text>
      </TouchableOpacity>
      </ScrollView>
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    height: "60%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  text: {
    color: colors.green,
  },
  settingsText: {
    color: colors.green,
    textAlign: "center",
    paddingTop: 10,
  },
  fieldItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 30,
    padding: 5,
    marginLeft: 10,
  },
  fieldValueContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default SettingsSheetModalScreen;
