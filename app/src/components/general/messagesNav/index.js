import { Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import colors from "../../../../config/colors";

export default function MessagesNavBar(props) {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <MaterialIcons name="keyboard-arrow-left" size={28} color="lightgray" />
      </TouchableOpacity>

      <Text style={styles.title}>{props.title}</Text>

      <TouchableOpacity
        style={styles.button}
        // onPress={() => navigation.navigate('messages')}
      >
        <Feather name="plus" size={22} color="#131313" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    paddingVertical: 2,
  },

  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.secondary,
  },
  text: {
    color: colors.white,
  },
});
