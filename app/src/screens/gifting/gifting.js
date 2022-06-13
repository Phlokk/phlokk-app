import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../../../config/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import GiftingNavBar from "../../components/general/giftingNav/giftingNavBar";

export default function GiftingScreen() {
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={styles.container}>
      <GiftingNavBar title="Gifting Store" />
      <View style={styles.giftingTextView}>
        <View style={styles.shopContainer}>
          <Text style={styles.text}>
            Buy tokens to purchase <Text style={styles.fireText}>fire</Text>
          </Text>
          <Text style={styles.text}>Buy Fire</Text>
          <View style={styles.fireRow}>
            <Image
              source={require("../../../assets/coin.png")}
              style={styles.coin}
            />
            <TouchableOpacity>
              <Text style={styles.moneyText}>$1</Text>
            </TouchableOpacity>
            <MaterialCommunityIcons
              style={styles.fireIcon}
              name="fire"
              size={40}
              color={colors.orange}
            />
          </View>
          <View style={styles.fireRow}>
            <Image
              source={require("../../../assets/coin.png")}
              style={styles.coin}
            />
            <TouchableOpacity>
              <Text style={styles.moneyText}>$5</Text>
            </TouchableOpacity>
            <MaterialCommunityIcons
              style={styles.fireIcon}
              name="fire"
              size={40}
              color={colors.orange}
            />
          </View>
          <View style={styles.fireRow}>
            <Image
              source={require("../../../assets/coin.png")}
              style={styles.coin}
            />
            <TouchableOpacity>
              <Text style={styles.moneyText}>$10</Text>
            </TouchableOpacity>
            <MaterialCommunityIcons
              style={styles.fireIcon}
              name="fire"
              size={40}
              color={colors.orange}
            />
          </View>
          <View style={styles.fireRow}>
            <Image
              source={require("../../../assets/coin.png")}
              style={styles.coin}
            />
            <TouchableOpacity>
              <Text style={styles.moneyText}>$15</Text>
            </TouchableOpacity>
            <MaterialCommunityIcons
              style={styles.fireIcon}
              name="fire"
              size={40}
              color={colors.orange}
            />
          </View>
          <View style={styles.fireRow}>
            <Image
              source={require("../../../assets/coin.png")}
              style={styles.coin}
            />
            <TouchableOpacity>
              <Text style={styles.moneyText}>$20</Text>
            </TouchableOpacity>
            <MaterialCommunityIcons
              style={styles.fireIcon}
              name="fire"
              size={40}
              color={colors.orange}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  fireRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  shopContainer: {
    width: 375,
    height: 550,
    backgroundColor: colors.lightBlack,
  },
  userContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  activityContainer: {
    flex: 1,
  },
  text: {
    fontSize: 16,
    textAlign: "center",
    color: colors.secondary,
    marginTop: 30,
  },
  giftingTextView: {
    alignItems: "center",
  },
  fireIcon: {
    justifyContent: "center",
    margin: 10,
  },
  coin: {
    justifyContent: "center",
    width: 25,
    height: 25,
    margin: 10,
    bottom: -10,
  },
  moneyText: {
    fontWeight: "bold",
    justifyContent: "center",
    color: colors.white,
    top: 20,
  },
  fireText: {
    color: colors.orange,
  },
});
