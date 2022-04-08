import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import SellerDashboardScreen from "../sellerDashboard"
import { SafeAreaView } from "react-native-safe-area-context";

import colors from "../../../../config/colors"

export default function SellerNavScreen(props) {
  const navigation = useNavigation();
  const [businessName, setBusinessName] = useState("Phlokk Market")
  const [following, setFollowing] = useState(0)
  const [sales, setSales] = useState(0)
  const [reviews, setReviews] = useState(0)

  return (

    <SafeAreaView style={styles.container}>
      <Text style={styles.creatorText}>{businessName}</Text>
      <View style={styles.counterContainer}>
        <View style={styles.counterItemContainer}>
          <Text style={styles.counterNumberText}>{following}</Text>
          <Text style={styles.counterLabelText}>Following</Text>
        </View>
        <View style={styles.counterItemContainer}>
          <Text style={styles.counterNumberText}>{sales}</Text>
          <Text style={styles.sales}>Sales</Text>
        </View>
        <View style={styles.counterItemContainer}>
          <Text style={styles.counterNumberText}>{reviews}</Text>
          <Text style={styles.reviews}>Reviews</Text>
        </View>
      </View>
      <TouchableOpacity>
        <Text style={styles.text}>Seller Profile</Text>
      </TouchableOpacity>
      <SellerDashboardScreen />
    </SafeAreaView>
    
  );
}


const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: colors.primary,
      paddingVertical: 5,
      alignItems: 'center',
      paddingHorizontal: 50,
      borderBottomWidth: 1,
      borderColor: colors.secondary,
      
  },
  counterContainer: {
      paddingBottom: 20,
      flexDirection: 'row',
      
  },
  counterItemContainer: {
      flex: 1,
      alignItems: 'center'
  },
  creatorText: {
      padding: 20,
      color: colors.white,
      fontWeight: 'bold',
  },
  counterNumberText: {
      fontWeight: 'bold',
      fontSize: 14,
      color: colors.white
  },
  counterLabelText: {
      color: 'gray',
      fontSize: 11,
  },
  text: {
      color: colors.secondary,
      fontWeight: 'bold',

  },
  reviews: {
      color: 'yellow',
  },

  sales: {
      color: 'green',
  }

});
