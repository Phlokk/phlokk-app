import { useNavigation } from "@react-navigation/native";
import React, { useState, useContext } from "react";
import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import { Divider } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { updateCreator } from "../../services/user";
import { generalStyles } from "../../styles";
import colors from "../../../config/colors";
import InfoScreenNav from "../../components/general/navBar/InfoScreenNav";
import { userAtom } from "../../../../App";
import { useAtom } from "jotai";
import { ThemeContext } from "../../theme/context";

export default function EditQuotesFieldScreen({ route }) {
  const { theme, setTheme } = useContext(ThemeContext);

  const { title, value } = route.params;
  const [textInputValue, setTextInputValue] = useState(value);
  const navigation = useNavigation();

  const [user, setUser] = useAtom(userAtom);

  const onSave = async () => {
    const updateObject = { quote: textInputValue };
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
          style={
            theme == "light"
              ? generalStyles.textInput_light
              : generalStyles.textInput_dark
          }
          placeholder="quote"
          placeholderTextColor={"gray"}
          autoCapitalize="none"
          autoCorrect={false}
          textContentType="none"
          maxLength={40}
          value={textInputValue}
          onChangeText={setTextInputValue}
        />
      </View>
      <View style={styles.infoView}>
        <Text style={theme == "light" ? styles.info_light : styles.info_dark}>
          <Text style={styles.infoTextGreen}>Info:</Text> Inspire someone today
          with a favorite daily quote or inspire us with your vast wisdom in 40
          characters or less.
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
});
