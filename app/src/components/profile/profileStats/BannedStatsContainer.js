import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import CustomAlert from "../../Alerts/CustomAlert";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../../../../config/colors";


function BannedStatsContainer() {
 

  return (
    <View style={styles.outerContainer}>
      <View style={styles.counterContainer}>
        <View style={styles.counterItemContainer}>
          <TouchableOpacity>
            <Text
              style={styles. counterNumberText_dark}
            >
              0
            </Text>
          </TouchableOpacity>

          <Text
            style={styles.counterLabelConnections_dark}
          >
            Following
          </Text>
        </View>

        <View style={styles.counterItemContainer}>
          <TouchableOpacity>
            <Text
              style={styles. counterNumberText_dark}
            >
              0
            </Text>
          </TouchableOpacity>
          <Text
            style={styles.counterLabelConnections_dark}
          >
            Friends
          </Text>
        </View>
        <View style={styles.counterItemContainer}>
          <TouchableOpacity
          onPress={() => setIsStar(true)}
          >
        
          <Text
            style={styles. counterNumberText_dark}
          >
            0
          </Text>
          </TouchableOpacity>
          <Text
            style={styles.counterLabelConnections_dark}
          >
            Stars
          </Text>
          
        </View>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    paddingTop: 10, 
    paddingBottom: 10,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  counterContainer: {
    paddingHorizontal: 20,
    paddingBottom: 10,
    flexDirection: "row",
  },
  counterItemContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: 10,
  },
  counterNumberText_light: {
    fontWeight: "bold",
    fontSize: 14,
    color: colors.black,
  },
  counterNumberText_dark: {
    fontWeight: "bold",
    fontSize: 14,
    color: colors.white,
  },
  counterLabelText_light: {
    color: colors.black,
    fontSize: 11,
    opacity: 0.5,
  },
  counterLabelText_dark: {
    color: colors.secondary,
    fontSize: 11,
    opacity: 0.7,
  },
  counterLabelConnections_light: {
    color: colors.black,
    opacity: 0.5,
    fontSize: 11,
    marginTop: 0,
  },
  counterLabelConnections_dark: {
    color: colors.white,
    opacity: 0.7,
    fontSize: 11,
    marginTop: 0,
  },
  counterLabelTextStar_light: {
    color: colors.black,
    fontSize: 11,
    opacity: 0.5,
  },
  counterLabelTextStar_dark: {
    color: colors.secondary,
    fontSize: 11,
    opacity: 0.7,
  },
  profileIconButton: {
    paddingVertical: 7,
  },
  filledButton: {
    paddingVertical: 7,
  },
});

export default BannedStatsContainer;
