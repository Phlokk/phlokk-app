import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Divider } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { saveQuote } from "../../../services/user";
import { generalStyles } from "../../../../src/styles";
import * as SecureStore from "expo-secure-store";

import colors from "../../../../config/colors";
import InfoScreenNav from "../../../components/general/navBar/infoScreenNav";

export default function BioFieldScreen({ route }) {
  const { title, value } = route.params;
  const [textInputValue, setTextInputValue] = useState(value);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onSave = () => {
    saveQuote(textInputValue).then(() => navigation.goBack());
  };

  return (
    <SafeAreaView style={styles.container}>
      <InfoScreenNav
        title={title}
        leftButton={{ display: true, name: "save", action: onSave }}
      />
      <Divider />
      <View style={styles.mainContainer}>
        <TextInput
          style={generalStyles.textInput}
          placeholder="bio"
          placeholderTextColor={"gray"}
          autoCapitalize="sentences"
          autoCorrect={false}
          textContentType="none"
          maxLength={200}
          multiline={true}
          numberOfLines={5}
          textAlignVertical
          value={textInputValue}
          onChangeText={setTextInputValue}
        />
      </View>
      <View style={styles.infoView}>
        <Text style={styles.info}>
          <Text style={styles.infoTextGreen}>Info:</Text> Tell us about yourself
          in 200 characters or less. When user clicks on your profile image this
          bio will display.
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
