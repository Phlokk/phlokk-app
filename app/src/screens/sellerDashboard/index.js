import { View, Text, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from '@expo/vector-icons'; 
import { MaterialIcons } from "@expo/vector-icons";
import { Octicons } from '@expo/vector-icons'; 
import React from "react";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";



export default function SellerDashboardScreen({ user }) {
  const auth = useSelector((state) => state.auth);
  const navigation = useNavigation();

  return (
    
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.box}
        onPress={() =>
          navigation.navigate("admission", {
            title: "Admission Fee",
            field: "admissionFee",
            value: auth.currentUser.admissionFee })}>
        <View style={styles.inner}>
          <FontAwesome5 name="money-bill-alt" size={45} color="white" />
          <Text style={styles.sellerText}>Admission</Text>
          <Text style={styles.greenText}>${auth.currentUser.admissionFee}</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity 
      style={styles.box}
      onPress={() =>
        navigation.navigate("buyLink", {
          title: "Buy Link",
          field: "buyLink",
          value: auth.currentUser.buyLink })}>
        <View
          style={styles.inner}>
          <MaterialIcons name="add-shopping-cart" size={45} color="white" />
          <Text style={styles.sellerText}>Buy Link</Text>
          <Text style={styles.greenText}>{auth.currentUser.buyLink}</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.box}
      onPress={() =>
        navigation.navigate("donation", {
          title: "Donation Link",
          field: "donationLink",
          value: auth.currentUser.donationLink })}>
        <View
          style={styles.inner}>
          <Feather name="link" size={40} color="white" />
          <Text style={styles.sellerText}>Donation Link</Text>
          <Text style={styles.greenText}>{auth.currentUser.donationLink}</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.box}>
        <View
          style={styles.inner}
          onPress={() =>
            navigation.navigate("reviews", {
              title: "Reviews",
              field: "reviews",
              value: auth.currentUser.reviews })}>
          <FontAwesome5 name="thumbs-up" size={45} color="white" />
          <Text style={styles.sellerText}>Reviews</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.box}
       onPress={() =>
        navigation.navigate("ads", {
          title: "Ad Account" })}>
        <View 
        style={styles.inner}>
          <FontAwesome name="spinner" size={45} color="white" />
          <Text style={styles.sellerText}>Run Ads</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.box}>
        <View style={styles.inner}>
          <MaterialIcons name="attach-money" size={45} color="white" />
          <Text style={styles.sellerText}>Subscription</Text>
        </View>
      </TouchableOpacity>
      
    </View>
    
    
  );
}
