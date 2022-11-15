import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import routes from "../../../navigation/routes";
import colors from "../../../../config/colors";

export default function PostNavBar(props) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button}>
        <MaterialIcons
          name="keyboard-arrow-left"
          size={28}
          color={colors.secondary}
          onPress={() => navigation.goBack()}
        />
      </TouchableOpacity>

      <Text style={styles.title}>{props.title}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate(routes.FEED)}
      >
        <Feather name="x" size={24} color={colors.secondary} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    top: 5,
  },

  title: {
    fontSize: 12,
    fontWeight: "bold",
    color: colors.white,
  },
  text: {
    color: colors.white,
  },
  cancelText: {
    color: colors.white,
    fontSize: 10,
  },
});
