import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Divider } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import NavBarGeneral from "../../../components/general/navBar";
import { saveUserLinkField } from "../../../services/user";
import { generalStyles } from "../../../styles/generalStyles";

import colors from "../../../../config/colors"


export default function EditLinkFieldScreen({ route }) {
  const { title, field, value } = route.params;
  const [textInputValue, setTextInputValue] = useState(value);
  const navigation = useNavigation();
  const onSave = () => {
    saveUserLinkField(field, textInputValue).then(() => navigation.goBack());
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
          placeholder="add link"
          placeholderTextColor={"gray"}
          autoCapitalize="none"
          dataDetectorTypes={"link"}
          autoCorrect={false}
          maxLength={24}
          value={textInputValue}
          onChangeText={setTextInputValue}
          
          keyboardType="url"
        />
      </View>

      <View style={styles.infoView}>
        <Text style={styles.info}>
          <Text style={styles.infoTextRed}>Add your business link. You must use "http or https" before all links. 0/24</Text>{" "}
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
      backgroundColor: 'gray',
  },
  info: {
      color: colors.secondary,
      fontSize: 12,
  },
  infoTextRed: {
      color: colors.white,
  },
  
  title: {
      color: 'gray',
      
  },
  infoView: {
      paddingHorizontal: 20,
      
  }
  
});
