import { View, Text, TextInput, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import { Divider } from "react-native-paper";
import { saveUserEmail } from "../../services/user";
import { useNavigation } from "@react-navigation/native";
import { generalStyles } from "../../styles/GeneralStyles";
import NavBarGeneral from "../../components/general/navBar/NavBarGeneral";

import colors from "../../../config/colors"

export default function EditEmailScreen({ route }) {
  const { title, field, value } = route.params;
  const [textInputValue, setTextInputValue] = useState(value);
  const navigation = useNavigation();
  const onSave = () => {
    saveUserEmail(field, textInputValue).then(() => navigation.goBack());
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
          placeholder="Email"
          placeholderTextColor={"gray"}
          autoCapitalize="none"
          keyboardType="email-address"
          autoCorrect={false}
          maxLength={24}
          value={textInputValue}
          onChangeText={setTextInputValue}
        />
      </View>

      <View style={styles.infoView}>
        <Text style={styles.info}>
          <Text style={styles.infoTextGreen}>update email address</Text>{" "}
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
  infoTextGreen: {
      color: 'green',
  },
  
  title: {
      color: 'gray',
      
  },
  infoView: {
      paddingHorizontal: 20,
      
  },
  
});
