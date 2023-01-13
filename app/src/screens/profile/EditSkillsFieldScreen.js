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
import { userAtom } from "../../../../App";
import { useAtom } from "jotai";
import { useTheme } from "../../theme/context";
import CustomAlert from "../../components/Alerts/CustomAlert";

export default function EditSkillsFieldScreen({ route }) {
  const { theme } = useTheme();
  const { title, value } = route.params;
  const [textInputValue, setTextInputValue] = useState(value);
  const [isDataNotSaved, setIsDataNotSaved] = useState(false);
  const navigation = useNavigation();
  const [user, setUser] = useAtom(userAtom);

  const onSave = async () => {
    const updateObject = { skills: textInputValue };
    try {
      await updateCreator(updateObject);
      const updatedUser = { ...user, ...updateObject };
      setUser(updatedUser);
      navigation.goBack();
    } catch (error) {
      setIsDataNotSaved(true);
    }
  };

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
              ? generalStyles.textInputBio_light
              : generalStyles.textInputBio_dark, styles.textInputField
          ]}
          placeholder="Tell us about your skills and talents"
          placeholderTextColor={"gray"}
          autoCapitalize="sentences"
          autoCorrect={false}
          textContentType="none"
          maxLength={200}
          multiline
          numberOfLines={5}
          textAlignVertical
          value={textInputValue}
          onChangeText={setTextInputValue}
        />
      </View>
      <View style={styles.infoView}>
        <Text style={theme == "light" ? styles.info_light : styles.info_dark}>
          <Text style={styles.infoTextGreen}>Info:</Text> This is where you can let users know your skills and talents you have. This will help people understand your level of expertise. { textInputValue !== null  &&<Text style={theme == "light" ? styles.textCount_light : styles.textCount_dark}>{`${textInputValue.length}/200`}</Text>}
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
  infoTextGreen: {
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
