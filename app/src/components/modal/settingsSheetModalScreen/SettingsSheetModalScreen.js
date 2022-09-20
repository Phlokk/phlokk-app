import { View, Text, StyleSheet, Share, ScrollView, TouchableOpacity } from "react-native";
import React, {useState} from "react";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import routes from "../../../navigation/routes";
import CustomAlert from "../../Alerts/CustomAlert";
import BlockAlert from "../../Alerts/BlockAlert";
import colors from "../../../../config/colors";

const SettingsSheetModalScreen = ( post ) => {
    const navigation = useNavigation();
    const [posts, setPosts] = useState([]);

    const [isDownload, setIsDownload] = useState(false);
    const [isFavorites, setIsFavorites] = useState(false);
    const [isDuo, setIsDuo] = useState(false);
    const [isLink, setIsLink] = useState(false);
    const [isShare, setIsShare] = useState(false);


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
      <ScrollView style={styles.topBar} horizontal={true}>
      <TouchableOpacity 
        style={styles.fieldItemContainer}
        onPress={() => {
          navigation.navigate(routes.REPORTS, { post });
        }}
      >
        <View style={styles.bubble}>
          <MaterialIcons
          name="report-problem" 
          size={25} 
          color={colors.secondary} /> 
          </View>
          <Text style={styles.text}>Report</Text>
      </TouchableOpacity >

      <TouchableOpacity 
        style={styles.fieldItemContainer}
        autoCapitalize="none"
        onPress={() => setIsFavorites(true)}
      >
        <View style={styles.bubble}>
          <MaterialIcons
            name="bookmark-outline"
            size={24}
            color={colors.secondary}
          />
          </View>
          <Text style={styles.text}>FAV</Text>
      </TouchableOpacity >

      <TouchableOpacity 
        style={styles.fieldItemContainer}
        autoCapitalize="none"
        onPress={() => setIsDuo(true)}
      >
        <View style={styles.bubble}>
          <MaterialCommunityIcons
            name="account-box-multiple-outline"
            size={24}
            color={colors.secondary}
          />
          </View>
          <Text style={styles.text}>Duo</Text>
      </TouchableOpacity >
      
      <TouchableOpacity 
        style={styles.fieldItemContainer}
        autoCapitalize="none"
        onPress={() => setIsLink(true)}
      >
        <View style={styles.bubble}>
          <Feather 
          name="link" 
          size={24} 
          color={colors.secondary} /> 
          </View>
          <Text style={styles.text}>Link</Text>
      </TouchableOpacity >
      
      <TouchableOpacity 
        style={styles.fieldItemContainer}
        autoCapitalize="none"
        onPress={() => setIsDownload(true)}
      >
          <View style={styles.bubble}>
          <Feather 
          name="download-cloud" 
          size={24} 
          color={colors.secondary} />
          </View>
          <Text style={styles.text}>DL</Text>
      </TouchableOpacity >

      <TouchableOpacity 
        style={styles.fieldItemContainer}
        onPress={() => setIsShare(true)}
        // onPress={() => {
        //   onShare();
        // }}
      >
          <View style={styles.bubble}>
          <MaterialCommunityIcons
            name="share-all-outline"
            size={26}
            color={colors.secondary}
          />
          </View>
          <Text style={styles.text}>Share</Text>
      </TouchableOpacity >
      </ScrollView>

      <CustomAlert
        alertTitle={<Text><MaterialIcons name="info" size={24} color={colors.green} /></Text>}
        customAlertMessage={<Text>Add to Favorites{"\n"}coming in beta 3</Text>}
        positiveBtn="Ok"
        modalVisible={isFavorites}
        dismissAlert={setIsFavorites}
        animationType="fade"
      />

      <CustomAlert
        alertTitle={<Text><MaterialIcons name="info" size={24} color={colors.green} /></Text>}
        customAlertMessage={<Text>Duo{"\n"}coming in beta 3</Text>}
        positiveBtn="Ok"
        modalVisible={isDuo}
        dismissAlert={setIsDuo}
        animationType="fade"
      />
      <CustomAlert
        alertTitle={<Text><MaterialIcons name="info" size={24} color={colors.green} /></Text>}
        customAlertMessage={<Text>Links{"\n"}coming in beta 3</Text>}
        positiveBtn="Ok"
        modalVisible={isLink}
        dismissAlert={setIsLink}
        animationType="fade"
      />
      <CustomAlert
        alertTitle={<Text><MaterialIcons name="info" size={24} color={colors.green} /></Text>}
        customAlertMessage={<Text>Downloads{"\n"}coming in beta 3</Text>}
        positiveBtn="Ok"
        modalVisible={isDownload}
        dismissAlert={setIsDownload}
        animationType="fade"
      />
      <CustomAlert
        alertTitle={<Text><MaterialIcons name="info" size={24} color={colors.green} /></Text>}
        customAlertMessage={<Text>Share{"\n"}coming in beta 3</Text>}
        positiveBtn="Ok"
        modalVisible={isShare}
        dismissAlert={setIsShare}
        animationType="fade"
      />
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    height: "12%",
  },
  text: {
    color: colors.secondary,
    bottom: 20,
    fontSize: 10,
    position: "absolute",
    top: 45, 
    bottom: 0,

  },
  settingsText: {
    color: colors.secondary,
    textAlign: "center",
    paddingTop: 30,
  },
  fieldItemContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5,
    marginLeft: 10,
  },
  fieldValueContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  bubble: {
    backgroundColor: 'transparent',
    alignItems: "center",
    justifyContent: "center",
    height: 45,
    width: 45,
  },
  topBar: {
    marginTop: 10,
  }
  
  
});

export default SettingsSheetModalScreen;
