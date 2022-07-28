import { View, Text, TouchableOpacity, StyleSheet, Share, ScrollView } from "react-native";
import React, {useState} from "react";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import routes from "../../../navigation/routes";
import CustomAlert from "../../Alerts/customAlert";
import BlockAlert from "../../Alerts/blockAlert";
import colors from "../../../../config/colors";

const SettingsSheetModalScreen = ( post ) => {
    const navigation = useNavigation();
    const [posts, setPosts] = useState([]);

    const [isDownload, setIsDownload] = useState(false);
    const [isFavorites, setIsFavorites] = useState(false);
    const [isDuo, setIsDuo] = useState(false);
    const [isLink, setIsLink] = useState(false);
    const [isShare, setIsShare] = useState(false);
    const [isBlocked, setIsBlocked] = useState(false);

    

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
      <BlockAlert
        customAlertMessage={<Text>Block User:{"\n"}{"\n"}Creator will not be able to send you messages, see your posts, or find your profile in search. They will not be notified that you blocked their account. You can unblock their profile at anytime in settings under privacy and reports.</Text>}
        negativeBtn={"Cancel"}
        positiveBtn={"Block"}
        modalVisible={isBlocked}
        dismissAlert={setIsBlocked}
        animationType="fade"
      />
      <TouchableOpacity
        style={styles.fieldItemContainer}
        autoCapitalize="none"
        onPress={() => setIsBlocked(true)}
      >
        <Text style={styles.text}>
          <Feather
            name="user-minus"
            style={styles.blockIcon}
            size={14}
            color={colors.red}
          />{" "}
          Block
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.fieldItemContainer}
        onPress={() => {
          navigation.navigate(routes.REPORTS, { post });


        }}
      >
        <Text style={styles.text}>
          <AntDesign name="exclamationcircleo" size={12} color={colors.yellow} /> Report</Text>
      </TouchableOpacity>
      <CustomAlert
        alertTitle={<Text><MaterialIcons name="info" size={24} color={colors.green} /></Text>}
        customAlertMessage={<Text>Downloads{"\n"}coming in beta 3</Text>}
        positiveBtn="Ok"
        modalVisible={isDownload}
        dismissAlert={setIsDownload}
        animationType="fade"
      />
      <TouchableOpacity
        style={styles.fieldItemContainer}
        autoCapitalize="none"
        onPress={() => setIsDownload(true)}
      >
        <Text style={styles.text}>
          <Feather name="download-cloud" size={14} color={colors.green} />{" "}
          Download
        </Text>
      </TouchableOpacity>
      <CustomAlert
        alertTitle={<Text><MaterialIcons name="info" size={24} color={colors.green} /></Text>}
        customAlertMessage={<Text>Add to Favorites{"\n"}coming in beta 3</Text>}
        positiveBtn="Ok"
        modalVisible={isFavorites}
        dismissAlert={setIsFavorites}
        animationType="fade"
      />
      <TouchableOpacity
        style={styles.fieldItemContainer}
        autoCapitalize="none"
        onPress={() => setIsFavorites(true)}
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
      <CustomAlert
        alertTitle={<Text><MaterialIcons name="info" size={24} color={colors.green} /></Text>}
        customAlertMessage={<Text>Duo{"\n"}coming in beta 3</Text>}
        positiveBtn="Ok"
        modalVisible={isDuo}
        dismissAlert={setIsDuo}
        animationType="fade"
      />
      <TouchableOpacity
        style={styles.fieldItemContainer}
        autoCapitalize="none"
        onPress={() => setIsDuo(true)}
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
      <CustomAlert
        alertTitle={<Text><MaterialIcons name="info" size={24} color={colors.green} /></Text>}
        customAlertMessage={<Text>Links{"\n"}coming in beta 3</Text>}
        positiveBtn="Ok"
        modalVisible={isLink}
        dismissAlert={setIsLink}
        animationType="fade"
      />
      <TouchableOpacity
        style={styles.fieldItemContainer}
        autoCapitalize="none"
        onPress={() => setIsLink(true)}
      >
        <Text style={styles.text}>
          <Feather name="link" size={14} color={colors.green} /> Link
        </Text>
      </TouchableOpacity>
      <CustomAlert
        alertTitle={<Text><MaterialIcons name="info" size={24} color={colors.green} /></Text>}
        customAlertMessage={<Text>Share{"\n"}coming in beta 3</Text>}
        positiveBtn="Ok"
        modalVisible={isShare}
        dismissAlert={setIsShare}
        animationType="fade"
      />
      <TouchableOpacity
        style={styles.fieldItemContainer}
        onPress={() => setIsShare(true)}

        // onPress={() => {
        //   onShare();

        // }}
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
    color: colors.secondary,
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
