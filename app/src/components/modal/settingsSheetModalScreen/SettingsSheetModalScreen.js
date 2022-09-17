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
      <ScrollView style={styles.topBar} horizontal={true}>
      <BlockAlert
        customAlertMessage={<Text>Block User:{"\n"}{"\n"}Creator will not be able to send you messages, see your posts, or find your profile in search. They will not be notified that you blocked their account. You can unblock their profile at anytime in settings under privacy and reports.</Text>}
        negativeBtn={"Cancel"}
        positiveBtn={"Block"}
        modalVisible={isBlocked}
        dismissAlert={setIsBlocked}
        animationType="fade"
        post={post}
      />
      <TouchableOpacity 
        style={styles.fieldItemContainer}
        autoCapitalize="none"
        onPress={() => setIsBlocked(true)}
      >
        <View style={styles.bubble}>
        <Feather
            name="user"
            style={styles.blockIcon}
            size={24}
            color={colors.secondary}
          />
          
          </View>
          <Text style={styles.text}>Block</Text>
      </TouchableOpacity >

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
        <View style={styles.bubble}>
          <MaterialIcons
            name="bookmark-outline"
            size={24}
            color={colors.secondary}
          />
          </View>
          <Text style={styles.text}>FAV</Text>
      </TouchableOpacity >
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
        <View style={styles.bubble}>
          <MaterialCommunityIcons
            name="account-box-multiple-outline"
            size={24}
            color={colors.secondary}
          />
          </View>
          <Text style={styles.text}>Duo</Text>
      </TouchableOpacity >
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
        <View style={styles.bubble}>
          <Feather 
          name="link" 
          size={24} 
          color={colors.secondary} /> 
          </View>
          <Text style={styles.text}>Link</Text>
      </TouchableOpacity >
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
          <View style={styles.bubble}>
          <Feather 
          name="download-cloud" 
          size={24} 
          color={colors.secondary} />
          </View>
          <Text style={styles.text}>DL</Text>
      </TouchableOpacity >
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
