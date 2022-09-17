import { View, Text, TextInput, StyleSheet } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Divider } from "react-native-paper";
import NavBarGeneral from "../../../components/general/navBar";
import generalStyles from "../../../styles/GeneralStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import { saveUserDonateLink } from "../../../services/user";

import colors from "../../../../config/colors"

export default function EditDonationLinkScreen({ route }) {
  const { title, field, value } = route.params;
  const [textInputValue, setTextInputValue] = useState(value);
  const navigation = useNavigation();
  const onSave = () => {
    saveUserDonateLink(field, textInputValue).then(() => navigation.goBack());
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
          placeholder="add GoFundMe link"
          placeholderTextColor={"gray"}
          autoCapitalize="none"
          dataDetectorTypes={"link"}
          autoCorrect={false}
          maxLength={50}
          value={textInputValue}
          onChangeText={setTextInputValue}
        />
      </View>

      <View style={styles.infoView}>
        <Text style={styles.info}>
          <Text style={styles.infoTextGreen}>Add GoFundMe Link</Text>{" "}
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