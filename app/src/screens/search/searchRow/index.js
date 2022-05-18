import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

import colors from "../../../../config/colors";

export default function SearchRowScreen() {
  return (
    <View style={styles.searchRow}>
      <TouchableOpacity
        onPress={() => Alert.alert("Star search", "Coming in beta version 3!")}
      >
        <Text style={styles.horizontalListText}>
          <MaterialCommunityIcons color={colors.green} size={16} name={"star"} />{" "}
          
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          Alert.alert("Creators search", "Coming in beta version 3!")
        }
      >
        <Text style={styles.horizontalListText}>
          <Feather name="user" size={16} color={colors.green} /> 
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => Alert.alert("Video search", "Coming in beta version 3!")}
      >
        <Text style={styles.horizontalListText}>
          <Feather name="video" size={16} color={colors.green} /> 
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          Alert.alert("Sound Bar search", "Coming in beta version 3!")
        }
      >
        <Text style={styles.horizontalListText}>
          <Entypo name="beamed-note" size={16} color={colors.green} /> 
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => Alert.alert("Tags search", "Coming in beta version 3!")}
      >
        <Text style={styles.horizontalListText}>
          <Feather name="hash" size={16} color={colors.green} /> 
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  horizontalListText: {
    marginHorizontal: 5,
    color: colors.white,
    fontSize: 12,
  },
  searchRow: {
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
