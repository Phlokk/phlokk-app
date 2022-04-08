import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

import routes from "../../../navigation/routes"
import colors from "../../../../config/colors"


export default function SellerDashboardScreen({ user }) {
  const auth = useSelector((state) => state.auth);
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.box}
        onPress={() =>
          navigation.navigate(routes.ADMISSION, {
            title: "Admission Fee",
            field: "admissionFee",
            value: auth.currentUser.admissionFee,
          })
        }
      >
        <View style={styles.inner}>
          <FontAwesome5 name="money-bill-alt" size={45} color="white" />
          <Text style={styles.greenText}>${auth.currentUser.admissionFee}</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.box}
        onPress={() =>
          navigation.navigate(routes.BUY_LINK, {
            title: "Buy Link",
            field: "buyLink",
            value: auth.currentUser.buyLink,
          })
        }
      >
        <View style={styles.inner}>
          <MaterialIcons name="add-shopping-cart" size={45} color="white" />
          <Text style={styles.greenText}>{auth.currentUser.buyLink}</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.box}
        onPress={() =>
          navigation.navigate(routes.DONATION, {
            title: "Donation Link",
            field: "donationLink",
            value: auth.currentUser.donationLink,
          })
        }
      >
        <View style={styles.inner}>
          <Feather name="link" size={40} color="white" />
          <Text style={styles.greenText}>{auth.currentUser.donationLink}</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.box}
        onPress={() =>
          navigation.navigate(routes.REVIEWS, {
            title: "Reviews",
          })
        }
      >
        <View style={styles.inner}>
          <FontAwesome5 name="thumbs-up" size={45} color="white" />
          <Text style={styles.sellerText}>Reviews</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.box}
        onPress={() =>
          navigation.navigate(routes.ADS, {
            title: "Ad Account",
          })
        }
      >
        <View style={styles.inner}>
          <FontAwesome name="spinner" size={45} color="white" />
          <Text style={styles.sellerText}>Run Ads</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.box}
        onPress={() =>
          navigation.navigate(routes.SUBSCRIPTIONS, {
            title: "Subscriptions",
          })
        }
      >
        <View style={styles.inner}>
          <MaterialIcons name="attach-money" size={45} color="white" />
          <Text style={styles.sellerText}>Subscription</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
      width: '100%',
      height: '45%',
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: 30,
  },
  box: {
      width: '50%',
      height: '50%',
      padding: 5,
  },
  inner: {
      flex: 1,
      backgroundColor: '#2E2E2E',
      alignItems: 'center',
      justifyContent: 'center',
      
      borderRadius: 8,
  },
  sellerText: {
      color: colors.secondary,
      marginTop: 20,
  },
  greenText: {
      marginTop: 20,
      padding: 3,
      color: 'green',
  }
  
  
});
