import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Divider } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import generalStyles from "../../styles/generalStyles";
import { updateCreator } from "../../services/user";

import colors from "../../../config/colors";
import InfoScreenNav from "../../components/general/navBar/infoScreenNav";
import { userAtom } from "../../../../App";
import { useAtom } from "jotai";

export default function EditYoutubeScreen({ route }) {
  const { title, value } = route.params;
  const [textInputValue, setTextInputValue] = useState(value);
  const navigation = useNavigation();
  const [user, setUser] = useAtom(userAtom);

  const onSave = async () => {
    const updateObject = { youtube_link: textInputValue };
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
    <SafeAreaView style={styles.container}>
      <InfoScreenNav
        title={title}
        leftButton={{ display: true, name: "save", action: onSave }}
      />
      <Divider />
      <View style={styles.mainContainer}>
        <TextInput
          style={generalStyles.textInput}
          placeholder="Youtube link"
          placeholderTextColor={"gray"}
          dataDetectorTypes={"link"}
          autoCapitalize="none"
          autoCorrect={false}
          maxLength={255}
          value={textInputValue}
          onChangeText={setTextInputValue}
          clearTextOnFocus={true}
          keyboardType="url"
        />
      </View>

      <View style={styles.infoView}>
        <Text style={styles.info}>
          <Text style={styles.infoTextGreen}>Info:</Text> Set your Youtube link
          here. You must use "http or https" before all links. 0/255
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
});
