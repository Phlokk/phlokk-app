import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import { Divider } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { updateCreator } from "../../services/user";
import { generalStyles } from "../../styles";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../../../config/colors";
import InfoScreenNav from "../../components/general/navBar/InfoScreenNav";
import { userAtom } from "../../services/appStateAtoms";
import { useAtom } from "jotai";
import { useTheme } from "../../theme/context";
import CustomAlert from "../../components/Alerts/CustomAlert";

export default function EditProfileFieldScreen({ route }) {
  const { theme } = useTheme();

  const { title, value } = route.params;
  const [textInputValue, setTextInputValue] = useState(value);
  const [isDataNotSaved, setIsDataNotSaved] = useState(false);
  const navigation = useNavigation();
  const [user, setUser] = useAtom(userAtom);

  const onSave = async () => {
    const updateObject = { username: textInputValue };
    try {
      await updateCreator( updateObject);
      const updatedUser = { ...user, ...updateObject };
      setUser(updatedUser);
      navigation.goBack();
    } catch (error) {
      console.log(error)
      setIsDataNotSaved(true);
    }
  }
  

  return (
    <SafeAreaView
      style={theme == "light" ? styles.container_light : styles.container_dark}
    >
      <InfoScreenNav
        title={title}
        leftButton={{ display: true, name: "save", action: onSave }}
      />
      <Divider />
      <View style={styles.mainContainer}>
        <TextInput
          style={[
            theme == "light"
              ? generalStyles.textInputUser_light
              : generalStyles.textInputUser_dark, styles.textInputField
          ]}
          placeholder="username"
          placeholderTextColor={"gray"}
          autoCorrect={false}
          textContentType="username"
          maxLength={24}
          value={textInputValue}
          onChangeText={(val) => {
            setTextInputValue(val.toString().toLowerCase().replace(" ", ""));
          }}
        />
      </View>
      <View style={styles.infoView}>
        <Text style={theme == "light" ? styles.info_light : styles.info_dark}>
          <Text style={styles.infoText}>Info:</Text> Can only contain lowercase
          letters, numbers, underscores and periods. When you change your
          username it will update the link to your profile. { textInputValue !== null  &&<Text style={theme == "light" ? styles.textCount_light : styles.textCount_dark}>{`${textInputValue.length}/24`}</Text>}
        </Text>
        <CustomAlert
            alertTitle={
              <Text>
                <MaterialIcons name="info" size={24} color={colors.green} />
              </Text>
            }
            customAlertMessage={<Text>Username is already in use!</Text>}
            positiveBtn="Ok"
            modalVisible={isDataNotSaved}
            dismissAlert={setIsDataNotSaved}
            animationType="fade"
          />
      </View>
    </SafeAreaView>
  );
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
  mainContainer: {
    alignItems: "center",
    flexDirection: 'row',
    padding: 20,
  },
  divider: {
    backgroundColor: colors.secondary,
  },
  info_light: {
    color: colors.black,
    fontSize: 12,
    opacity: 0.9,
  },
  info_dark: {
    color: colors.secondary,
    fontSize: 12,
    opacity: 0.9,
  },
  infoText: {
    color: colors.green,
  },
  title: {
    color: colors.secondary,
  },
  infoView: {
    paddingHorizontal: 20,
  },
  inputIcon: {
    position: "absolute",
    right: 20,
    bottom: 30,
    zIndex: 999,
  },
  textCount_light: {
    fontSize: 10,
    right: 45,
    top: 70,
    color: colors.black,
  },
  textCount_dark: {
    fontSize: 10,
    opacity: 0.6,
    right: 45,
    top: 70,
    color: colors.secondary,
  },
  textInputField: {
    width: "100%",
  }
});
