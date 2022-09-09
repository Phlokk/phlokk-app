import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import colors from "../../../../config/colors";
import { generalStyles } from "../../../styles";

const GiftingModalScreen = (props, route) => {
  const navigation = useNavigation();
  const [giftPoints, setGiftPoints] = useState(0);

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        style={styles.fireIcon}
        name="fire"
        size={50}
        color={colors.red}
      />
      <Text style={styles.giftText}>Light It Up</Text>

      <View style={styles.fieldValueContainer}>
        <Feather name="chevron-right" size={8} color={colors.primary} />
      </View>
      <View style={styles.mainContainer}>
        <TextInput
          style={generalStyles.textGiftingInput}
          placeholder="0"
          placeholderTextColor={"gray"}
          autoCapitalize="none"
          autoCorrect={false}
          maxLength={24}
          returnKeyType="done"
          
        />
        <View style={styles.pointsContainer}>
          <Text style={styles.giftPointText}>
            Gift accumulations: {giftPoints}
          </Text>
          <Text style={styles.priceOfGiftText}>
      </Text>
        </View>
      </View>

      <TouchableOpacity style={styles.giftButtonContainer}
      onPress={() => {
        // navigation.navigate(routes.MARKET)
      }}
      >
        <MaterialCommunityIcons name="fire" size={20} color={colors.red} />
        <Text style={styles.text}> Light Up Post</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    height: "70%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  pointsContainer: {
    margin: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: colors.secondary,
    fontSize: 18,
  },
  priceOfGiftText: {
    color: colors.secondary,
    fontSize: 14,
  },
  giftPointText: {
    color: colors.secondary,
  },
  giftText: {
    color: colors.secondary,
    fontSize: 18,
  },
  fireIcon: {
    marginBottom: 50,
  },
  mainContainer: {
    width: "50%",
    height: "50%",

    marginHorizontal: 20,
  },

  fieldValueContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  giftButtonContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    width: "70%",
    margin: 10,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default GiftingModalScreen;
