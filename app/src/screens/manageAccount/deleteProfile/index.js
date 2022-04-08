import React from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import firebase from "firebase";
import AccountNavBar from "../../../components/general/manageAccount";
import { SafeAreaView } from "react-native-safe-area-context";

import colors from "../../../../config/colors"

export default function DeleteProfileScreen() {
  const deleteUser = async () => {
    const dbRef = firebase
      .firestore()
      .collection("user")
      .doc(firebase.auth().currentUser.uid);
    await dbRef.delete();
    firebase.auth().signOut();
  };

  return (
    <SafeAreaView style={styles.container}>
      <AccountNavBar title={"Account deletion"} />

      <View style={styles.fieldsContainer}>
        <Text style={styles.text}>
          If you delete your account, you will lose the services stated in our
          Terms Of Service agreement permanently. All data will be deleted. You will not be able to recover it.
        </Text>

        <TouchableOpacity
          style={styles.fieldItemContainer}
          onPress={() => deleteUser()}
        >
          <View style={styles.fieldValueContainer}>
            
            <Text style={styles.text}>
              <Text style={styles.danger}>Delete account!</Text>
            </Text>
            
            <MaterialCommunityIcons
              name="delete-circle"
              size={40}
              color={colors.red}
            />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    
  },
  fieldItemContainer: {
    flexDirection: "row",
  },
  fieldsContainer: {
    marginTop: '50%',
    padding: 20,
    alignItems: "center",
  },
  fieldValueContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: colors.white,
    padding: 10,
  },
  danger: {
    color: colors.red,
    fontWeight: 'bold',
    fontSize: 18,
  },
  warningWhite: {
    marginBottom: 30,
    color: colors.white,
  },
});
