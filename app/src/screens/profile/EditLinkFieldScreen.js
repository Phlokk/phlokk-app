import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Divider } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { updateCreator } from "../../services/user";
import generalStyles from "../../styles/GeneralStyles";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../../../config/colors";
import InfoScreenNav from "../../components/general/navBar/InfoScreenNav";
import { userAtom } from "../../services/appStateAtoms";
import { useAtom } from "jotai";
import { useTheme } from "../../theme/context";
import CustomAlert from "../../components/Alerts/CustomAlert";

export default function EditLinkFieldScreen({ route }) {
  const { theme } = useTheme();

  const { title, value } = route.params;
  const [textInputValue, setTextInputValue] = useState(value);
  const [isDataNotSaved, setIsDataNotSaved] = useState(false);
  const navigation = useNavigation();

  const [user, setUser] = useAtom(userAtom);

  const onSave = async () => {
    const updateObject = { link: textInputValue };
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
              ? generalStyles.textInput_light
              : generalStyles.textInput_dark, styles.textInputField
          ]}
          placeholder="add link"
          placeholderTextColor={"gray"}
          dataDetectorTypes={"link"}
          autoCorrect={false}
          maxLength={50}
          autoCapitalize='none'
          value={textInputValue}
          onChangeText={(text) => {
            if (text.includes(' ')) {
              setTextInputValue(text.trim()); 
             } else {
              setTextInputValue(text);
             }
            }
           }
          keyboardType="url"
        />
      </View>
      <View style={styles.infoView}>
        <Text style={styles.info}>
          <Text style={styles.infoText}>
            Add your online store link. You must use "http or https" before all
            links. Your link will be displayed publicly on the "Home" screen and your bio section. { textInputValue !== null  &&<Text style={theme == "light" ? styles.textCount_light : styles.textCount_dark}>{`${textInputValue.length}/50`}</Text>}
          </Text>{" "}
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
  info: {
    color: colors.secondary,
    fontSize: 12,
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
