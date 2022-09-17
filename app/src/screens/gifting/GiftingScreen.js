import React, { useCallback, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import routes from "../../navigation/routes";
import GiftingNavBar from "../../components/general/giftingNav/giftingNavBar";
import colors from "../../../config/colors";
import CustomAlert from "../../components/Alerts/customAlert";



const GiftingModal = [
  {
    id: 1,
    quantity: "5 ",
    price: "$1",
    coin: require("../../../assets/coin.png"),
  },
  {
    id: 2,
    quantity: "25 ",
    price: "$5",
    coin: require("../../../assets/coin.png"),
  },
  {
    id: 3,
    quantity: "50 ",
    price: "$10",
    coin: require("../../../assets/coin.png"),
  },
  {
    id: 4,
    quantity: "75 ",
    price: "$15",
    coin: require("../../../assets/coin.png"),
  },
  {
    id: 5,
    quantity: "150 ",
    price: "$20",
    coin: require("../../../assets/coin.png"),
  },
  {
    id: 6,
    quantity: "500 ",
    price: "$50",
    coin: require("../../../assets/coin.png"),
  },
];

export default function GiftingScreen() {
  //   const dispatch = useDispatch();
  const navigation = useNavigation();



  const ItemRender = ({ item }) => (
    <View style={styles.item}>
      <View style={styles.fireModalRow}>
        <Image style={styles.coin} source={item.coin} />
      </View>
      <View style={styles.fireRow}>
        <TouchableWithoutFeedback>
          <Text style={styles.moneyText}>{item.price}</Text>
        </TouchableWithoutFeedback>

        <View style={styles.dotRow}>
          <Text>
            <TouchableOpacity>
            <Text style={styles.fireText}>{item.quantity}</Text>
            </TouchableOpacity>
            <Text style={styles.fireIcon}>
              <MaterialCommunityIcons
                name="fire"
                size={25}
                color={colors.orange}
              />
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );

  const ItemHeader = () => {
    return (
      <SafeAreaView style={styles.container}>
        <GiftingNavBar title="Gifting Store" />
        <View style={styles.giftingTextView}>
          <View style={styles.shopContainer}>
            <Text style={styles.text}>
              LIGHT IT UP{"\n"}Buy tokens to purchase{" "}
              <Text style={styles.fireTextSm}>fire</Text>
            </Text>
            <Text style={styles.text}>Buy Fire{"\n"}Light Up Post</Text>
          </View>
        </View>
      </SafeAreaView>
    );
  };

  ItemSeparator = () => {
    return <View style={styles.seperator}></View>;
  };

  const keyExtractor = useCallback((item) => item.id);

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.paddingFlat}
        data={GiftingModal}
        renderItem={ItemRender}
        ListHeaderComponent={ItemHeader}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={ItemSeparator}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    textAlign: "center",
  },
  item: {
    flexDirection: "row",
    color: colors.secondary,
    paddingHorizontal: 15,
    alignItems: "center",
    marginTop: 5,
  },
  seperator: {
    height: 1,
    width: "90%",
    opacity: 0.1,
    backgroundColor: colors.secondary,
    alignSelf: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  dotRow: {
    flexDirection: "row-reverse",
    bottom: 10,
  },

  fireRow: {
    flex: 1,
  },
  coin: {
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
    fontWeight: "bold",
    color: colors.white,
  },
  fireTextSm: {
    fontWeight: 'bold',
    color: colors.orange

  },
  fireIcon: {
    margin: 10,
  },
  fireModalRow: {
    paddingBottom: 10,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  iconRow: {
    bottom: 10,
  },
  textInfo: {
    fontSize: 12,
    // textAlign: "center",
    color: colors.secondary,
    marginTop: 30,
    padding: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: colors.secondary,
    marginTop: 30,
    padding: 10,
  },
  bullets: {
    fontSize: 20,
    fontWeight: "bold",
  },
  textRules: {
    fontSize: 12,
    // textAlign: "center",
    color: colors.orange,
    marginTop: 30,
    padding: 10,
  },
  giftingTextView: {
    alignItems: "center",
  },
  textMargin:{
    marginBottom: 20, 
  }
});
