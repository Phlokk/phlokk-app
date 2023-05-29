import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import colors from "../../../../config/colors";
import { useTheme } from "../../../theme/context";
import Switch from "./Switch";
import { useAtom } from "jotai";
import { userAtom } from "../../../services/appStateAtoms";
import axios from "../../../redux/apis/axiosDeclaration";
import LottieView from "lottie-react-native";
import Slider from "@react-native-community/slider";
import routes from "../../../navigation/routes";
const SettingsContent = ({parties, setParties, loading, setLoading, closeModal}) => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const [user] = useAtom(userAtom);
  const [partyTitle, setPartyTitle] = useState("");
  const [partyDescription , setPartyDescription] = useState("")
  const [publicChat, setPublicChat] = useState(true);
  const [chat, setChat] = useState(false);
  const [link, setLink] = useState(false); 
  const [progress, setProgress] = useState(0)
  
  const handleCreateParty = async() => { 
    if(!partyTitle) return;
    setLoading(true);
   const response =  await axios.post("/api/rooms/create",{
      title:partyTitle,
      description: partyDescription,
      userId: user._id || user.id
    })
    setParties(party=> [...party,  response.data?.[0]])
    navigation.navigate(routes.ROOM, { party: response.data?.[0] })
    closeModal()
    setLoading(false)
   
  } 
if(loading) return(
  <View style={styles.overlay}>
  <View
    style={{flex:1}}
  >
    <View style={styles.lottieView}>
      <LottieView
        autoPlay
        style={{
          alignItems: "center",
          width: 25,
          height: 25,
        }} 
        source={require("../../../../assets/animations/two_dots.json")}
      />
      <Slider
        style={[styles.timelineSlider]}
        minimumValue={0}
        maximumValue={100}
        value={ progress }
        onSlidingComplete={() => setProgress(0)}
        minimumTrackTintColor={colors.green}
        thumbTintColor="transparent"
      />
      <Text
        style={theme == "light" ? styles.splash_light : styles.splash_dark}
      >
        Creating Your Party
      </Text>
    </View>
  </View>
</View>
)
  return (
    <View
      style={theme == "light" ? styles.container_light : styles.container_dark}
    >
      <SafeAreaView
        style={
          theme == "light"
            ? styles.safe_area_container_light
            : styles.safe_area_container_dark
        }
      >
        <View
          style={
            theme == "light"
              ? styles.blockColorContainer_light
              : styles.blockColorContainer_dark
          }
        >
          <Text style={theme == "light"
              ? styles.partyHeaderTitle_light
              : styles.partyHeaderTitle_dark}>Create your party!</Text>
          <View style={styles.mainContainer}>
            
            
            <TextInput
              style={[styles.textInputField]}
              placeholder="Party Title "
              placeholderTextColor={colors.green}
              autoCorrect={false}
              maxLength={50}
              value={partyTitle}
              onChangeText={(val) => setPartyTitle(val)}
            />
          </View>
          <View style={styles.mainContainer}>
            
            <TextInput
              style={[styles.textInputField]}
              placeholder="Party Description (optional)"
              placeholderTextColor={colors.green}
              autoCorrect={false}
              maxLength={255}
              value={partyDescription}
              onChangeText={(val) => setPartyDescription(val)}
            />
          </View>

          <TouchableOpacity
            style={styles.fieldItemContainer}
            autoCapitalize="none"
          >
            <Text
              style={theme == "light" ? styles.text_light : styles.text_dark}
            >
              Turn On Public Party
            </Text>

            <View style={styles.fieldValueContainer}>
              <Switch value={publicChat} onChange={setPublicChat} />
            </View>
          </TouchableOpacity>
          <Text
            style={
              theme == "light"
                ? styles.commentSwitchDescription_light
                : styles.commentSwitchDescription_dark
            }
          >
            Enable to allow all users to find and join your party
          </Text>
          <TouchableOpacity
            style={styles.fieldItemContainer}
            autoCapitalize="none"
          >
            <Text
              style={theme == "light" ? styles.text_light : styles.text_dark}
            >
              Turn On Party Chat
            </Text>
            <View style={styles.fieldValueContainer}>
              <Switch value={chat} onChange={setChat} />
            </View>
          </TouchableOpacity>
          <Text
            style={
              theme == "light"
                ? styles.commentSwitchDescription_light
                : styles.commentSwitchDescription_dark
            }
          >
            Enable to allow all users to chat in party
          </Text>
          <TouchableOpacity
            style={styles.fieldItemContainer}
            autoCapitalize="none"
          >
            <Text
              style={theme == "light" ? styles.text_light : styles.text_dark}
            >
              Turn On Party Link
            </Text>
            <View style={styles.fieldValueContainer}>
              <Switch value={link} onChange={setLink} />
            </View>
          </TouchableOpacity>
          <Text
            style={
              theme == "light"
                ? styles.commentSwitchDescription_light
                : styles.commentSwitchDescription_dark
            }
          >
            Enable to show all users shopping link
          </Text>
        </View>
          <TouchableOpacity
            style={styles.buttonContainer}
            autoCapitalize="none"
            onPress={handleCreateParty}
          >
            <Text
              style={theme == "light" ? styles.party_text_light : styles.party_text_dark}
            >
             <Text style={styles.emojii}>&#x1F389;</Text>{" "}start a party
            </Text>
            
          </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  safe_area_container_light: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  safe_area_container_dark: {
    flex: 1,
    backgroundColor: colors.black,
    borderWidth: 1.5,
    borderColor: colors.settingsBlack,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  container_light: {
    flex: 1,  
  },
  container_dark: {
    flex: 1, 
  },
  mainContainer: {
    alignItems: "center",
    flexDirection: "row",
    padding: 20,
  },
  
  textInputField: {
    width: "100%",
    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: 30,
    paddingVertical: 15,
    padding: 10,
    color: colors.green,
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
    paddingHorizontal: 10,
    fontWeight: "bold",
    fontSize: 10,
    marginTop: 20,
    opacity: 0.5,
  },
  socialText_dark: {
    color: colors.white,
    paddingHorizontal: 10,
    fontWeight: "bold",
    fontSize: 10,
    marginTop: 20,
    opacity: 0.5,
  },
  text_light: {
    paddingHorizontal: 5,
    color: colors.black,
    fontSize: 12,
  },
  text_dark: {
    paddingHorizontal: 5,
    color: colors.white,
    fontSize: 12,
  },
  party_text_light: {
    paddingHorizontal: 5,
    color: colors.black,
    fontSize: 12,
  },
  party_text_dark: {
    paddingHorizontal: 5,
    color: colors.white,
    fontSize: 13,
  },
  commentSwitchDescription_light: {
    paddingHorizontal: 5,
    color: colors.black,
    fontSize: 10,
    opacity: 0.8,
  },
  commentSwitchDescription_dark: {
    paddingHorizontal: 5,
    color: colors.secondary,
    fontSize: 10,
    opacity: 0.8,
  },
  chevron_light: {
    color: colors.black,
  },
  chevron_dark: {
    opacity: 0.6,
  },
  commentSwitchDescription: {
    paddingHorizontal: 5,
    color: colors.secondary,
    fontSize: 10,
    opacity: 0.8,
  },
  blockColorContainer_light: {
    borderRadius: 2,
    marginTop: 10,
    paddingBottom: 15,
    paddingHorizontal: 5,
  },
  blockColorContainer_dark: {
    borderRadius: 2,
    marginTop: 10,
    paddingBottom: 15,
    paddingHorizontal: 5,
  },
  buttonContainer:{
    position:"absolute",
    bottom: 60,
    width:"100%",
    backgroundColor:colors.green,
    alignItems:"center", 
    paddingVertical: 25,
   },
   emojii: {
    fontSize: 15,
   },
   overlay: {
    backgroundColor: colors.black, 
    height: '100%', 
    width: '100%', 
    position: 'absolute', 
    top: 0, 
    bottom: 0, 
    left: 0, 
    right: 0, 
    zIndex: 999999
  },
  lottieView: {
    flex: 1, 
    justifyContent: "center",
    alignItems: "center",
  },
  timelineSlider: {
    width: '90%'
  },
  splash_light: {
    marginTop: 30,
    color: colors.lightBlack,
  },
  splash_dark: {
    marginTop: 30,
    color: colors.green,
  },
  partyHeaderTitle_light: {
    fontSize: 16,
    marginTop: 20,
    textAlign: "center",
    color: colors.black,

  },
  partyHeaderTitle_dark: {
    fontSize: 16,
    marginTop: 20,
    textAlign: "center",
    color: colors.white,

  },
});

export default SettingsContent;
