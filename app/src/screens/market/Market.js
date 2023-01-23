import { useNavigation } from "@react-navigation/native";
import React from "react";
import MarketNavBar from "../../components/general/profileNavBar/market/PhlokkMarketNavBar";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import { Ionicons } from '@expo/vector-icons'; 
import colors from "../../../config/colors"
import LottieView from "lottie-react-native";
import { useTheme } from "../../theme/context";


export default function Market() {
  const navigation = useNavigation();
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <MarketNavBar title={"Phlokk Market"} />
      <View style={styles.marketView}>
      <Text style={styles.welcomeText}>
          Coming soon...
        </Text>
      <View style={styles.lottieView}>
      
          <LottieView
            autoPlay
            style={{
              alignItems: "center",
              width: 150,
              height: 150,
            }}
            // Find more Lottie files at https://lottiefiles.com/featured
            source={require("../../../assets/animations/shopping.json")}
          />
          <View style={styles.iconRow}>
        </View>
      
        <View>
        <Text style={styles.salesText}>
         
          <Ionicons name="checkmark-circle-sharp" size={14} color={colors.green} />
          Join the Phlokk Market business community! 
        </Text>
        <Text style={styles.salesText}>
          
          <Ionicons name="checkmark-circle-sharp" size={14} color={colors.green} />
          Advertise your products on the business feed! 
        </Text>
        <Text style={styles.salesText}>
         
          <Ionicons name="checkmark-circle-sharp" size={14} color={colors.green} />
          Sell directly to your following!
        </Text>
        <Text style={styles.salesText}>
          
          <Ionicons name="checkmark-circle-sharp" size={14} color={colors.green} />
          Go Live to showcase your products!
        </Text>
        <Text style={styles.salesText}>
          
          <Ionicons name="checkmark-circle-sharp" size={14} color={colors.green} />
          Charge door fees for special live events!
        </Text>
        <Text style={styles.salesText}>
          
          <Ionicons name="checkmark-circle-sharp" size={14} color={colors.green} />
          Link your shop to your business account!
        </Text>
        <Text style={styles.salesText}>
          
          <Ionicons name="checkmark-circle-sharp" size={14} color={colors.green} />
          Verified reviews!
        </Text>
        <Text style={styles.salesText}>
          
          <Ionicons name="checkmark-circle-sharp" size={14} color={colors.green} />
          Phlokk takes 0% of your sales!
        </Text>
        <Text style={styles.salesText}>
          
          <Ionicons name="checkmark-circle-sharp" size={14} color={colors.green} />
          Start ups and established brands
        </Text>
        <Text style={styles.salesText}>
          
          <Ionicons name="checkmark-circle-sharp" size={14} color={colors.green} />
          Transparent selling!
        </Text>
        <Text style={styles.salesText}>
          
          <Ionicons name="checkmark-circle-sharp" size={14} color={colors.green} />
          Subscriptions coming soon!
        </Text>
        </View>
      </View>
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: colors.primary,
      paddingVertical: 2,
      paddingTop: 25, 
  },
  welcomeText: {
    fontSize: 24, 
    top: 80, 
    paddingTop: 5, 
    marginBottom: 20, 
    color: colors.secondary,
  },
  salesText: {
    paddingTop: 7, 
    color: colors.secondary,
  },
  marketView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",

  },
  iconRow: {
    marginBottom: 20, 

  },
  lottieView: {
    flex: 1, 
    justifyContent: "center",
    alignItems: "center",
  },
  
});