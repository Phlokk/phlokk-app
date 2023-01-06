import { useNavigation } from "@react-navigation/native";
import React, { useState, useContext } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Divider } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import generalStyles from "../../styles/GeneralStyles";
import { updateCreator } from "../../services/user";

import colors from "../../../config/colors";
import InfoScreenNav from "../../components/general/navBar/InfoScreenNav";
import { userAtom } from "../../../../App";
import { useAtom } from "jotai";
import { useTheme } from "../../theme/context";

export default function EditInstagramScreen({ route }) {
  const { theme, setTheme } = useTheme();
  const { title, value } = route.params;
  const [textInputValue, setTextInputValue] = useState(value);
  const navigation = useNavigation();

  const [user, setUser] = useAtom(userAtom);

  const onSave = async () => {
    const updateObject = { instagram_link: textInputValue };
    try {
      await updateCreator(updateObject);
      const updatedUser = { ...user, ...updateObject };
      setUser(updatedUser);
      navigation.goBack();
    } catch (error) {
      Alert.alert("Data not saved, please check user data");
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
          placeholder="Instagram link"
          placeholderTextColor={"gray"}
          dataDetectorTypes={"link"}
          autoCapitalize="none"
          autoCorrect={false}
          multiline
          maxLength={90}
          value={textInputValue}
          onChangeText={setTextInputValue}
          keyboardType="url"
        />
      </View>

      <View style={styles.infoView}>
        <Text style={theme == "light" ? styles.info_light : styles.info_dark}>
          <Text style={styles.infoTextGreen}>Info:</Text> Set your Instagram
          link here. You must use "http or https" before all links. { textInputValue !== null  &&<Text style={theme == "light" ? styles.textCount_light : styles.textCount_dark}>{`${textInputValue.length}/90`}</Text>}
        </Text>
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
