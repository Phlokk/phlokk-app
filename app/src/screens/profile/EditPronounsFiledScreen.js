import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import { Divider } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { updateCreator } from "../../services/user";
import { generalStyles } from "../../styles";
import colors from "../../../config/colors";
import InfoScreenNav from "../../components/general/navBar/InfoScreenNav";
import { MaterialIcons } from "@expo/vector-icons";
import { userAtom } from "../../services/appStateAtoms";
import { useAtom } from "jotai";
import { useTheme } from "../../theme/context";
import CustomAlert from "../../components/Alerts/CustomAlert";

export default function EditPronounsFieldScreen({ route }) {
  const { theme } = useTheme();

  const { title, value } = route.params;
  const [textInputValue, setTextInputValue] = useState(value);
  const [isDataNotSaved, setIsDataNotSaved] = useState(false);
  const navigation = useNavigation();

  const [user, setUser] = useAtom(userAtom);

  const onSave = async () => {
    const updateObject = { pronouns: textInputValue };
    try {
      await updateCreator(updateObject);
      const updatedUser = { ...user, ...updateObject };
      setUser(updatedUser);
      navigation.goBack();
    } catch (error) {
      setIsDataNotSaved();
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
              ? generalStyles.textInput_light
              : generalStyles.textInput_dark, styles.textInputField
          ]}
          placeholder="Pronouns"
          placeholderTextColor={"gray"}
          autoCorrect={false}
          textContentType="none"
          maxLength={40}
          value={textInputValue}
          onChangeText={(val) => {
            setTextInputValue(val.toString().toLowerCase().replaceAll(" ", ""));
          }}
        />
      </View>
      <View style={styles.infoView}>
        <Text style={theme == "light" ? styles.info_light : styles.info_dark}>
          <Text style={styles.infoTextGreen}>Info:</Text> Add your pronouns { textInputValue !== null  &&<Text style={theme == "light" ? styles.textCount_light : styles.textCount_dark}>{`${textInputValue.length}/40`}</Text>}
        </Text>
        <CustomAlert
            alertTitle={
              <Text>
                <MaterialIcons name="info" size={24} color={colors.green} />
              </Text>
            }
            customAlertMessage={<Text>Data not saved, please check user data</Text>}
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
