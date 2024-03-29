import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Divider } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { updateCreator } from "../../../services/user";
import generalStyles from "../../../styles/generalStyles";

import colors from "../../../../config/colors"
import InfoScreenNav from "../../../components/general/navBar/infoScreenNav";
import { userAtom } from "../../../../../App";
import { useAtom } from "jotai";


export default function EditLinkFieldScreen({ route }) {
  const { title, value } = route.params;
  const [textInputValue, setTextInputValue] = useState(value);
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
          placeholder="add link"
          placeholderTextColor={"gray"}
          autoCapitalize="none"
          dataDetectorTypes={"link"}
          autoCorrect={false}
          maxLength={50}
          value={textInputValue}
          onChangeText={setTextInputValue}
          
          keyboardType="url"
        />
      </View>

      <View style={styles.infoView}>
        <Text style={styles.info}>
          <Text style={styles.infoText}>Add your online store link. You must use "http or https" before all links.</Text>{" "}
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
      
  }
  
});
