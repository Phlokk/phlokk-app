import { useNavigation, useIsFocused } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Divider } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { updateCreator } from "../../../../../src/services/user";
import { generalStyles } from "../../../../../src/styles";
import routes from "../../../../navigation/routes"
import colors from "../../../../../config/colors";
import InfoScreenNav from "../../../../components/general/navBar/infoScreenNav";

export default function EditProfileFieldScreen({ route }) {
  const { title, value } = route.params;
  const [textInputValue, setTextInputValue] = useState(value);
  const navigation = useNavigation();

  const onSave = () => {

    updateCreator({username: textInputValue})
    // .then(() => navigation.goBack());
    
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
          placeholder="username"
          placeholderTextColor={"gray"}
          autoCapitalize="none"
          autoCorrect={false}
          textContentType="username"
          maxLength={24}
          value={textInputValue}
          onChangeText={setTextInputValue}
        />
      </View>
      <View style={styles.infoView}>
        <Text style={styles.info}>
          <Text style={styles.infoText}>Info:</Text> Can only contain
          lowercase letters, numbers, underscores and periods. When you change your
          username it will update the link to your profile.
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
});
