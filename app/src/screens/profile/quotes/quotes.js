import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Divider } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import NavBarGeneral from "../../../components/general/navBar/";
import { saveQuote } from "../../../services/user";
import { generalStyles } from "../../../../src/styles";
import * as SecureStore from "expo-secure-store";

import colors from "../../../../config/colors";

export default function EditQuotesFieldScreen({ route }) {
  const { title, value } = route.params;
  const [textInputValue, setTextInputValue] = useState(value);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onSave = () => {
    saveQuote(textInputValue).then(() => navigation.goBack());
  };

  return (
    <SafeAreaView style={styles.container}>
      <NavBarGeneral
        title={title}
        leftButton={{ display: true, name: "save", action: onSave }}
      />
      <Divider />
      <View style={styles.mainContainer}>
        <TextInput
          style={generalStyles.textInput}
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
        <Text style={styles.info}>
          <Text style={styles.infoTextGreen}>Info:</Text> Inspire someone today
          with a favorite daily quote or inspire us with your vast wisdom in 40
          characters or less.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  mainContainer: {
    padding: 20,
  },
  divider: {
    backgroundColor: colors.secondary,
  },
  info: {
    color: colors.secondary,
    fontSize: 12,
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
