import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, Image, Linking } from "react-native";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import DisplayMenuScreen from "../../../navigation/profile";
import styles from "./styles";

export default function ProfileHeader({ user }) {
  const navigation = useNavigation();
  const auth = useSelector((state) => state.auth);

  return (
    <View style={styles.container}>
      <View style={styles.counterContainer}>
        <View style={styles.counterItemContainer}>
          <Text style={styles.counterNumberText}>20k</Text>
          <Text style={styles.counterLabelText}>Following</Text>
        </View>
        <View style={styles.counterItemContainer}>
          <Text style={styles.counterNumberText}>40k</Text>
          <Text style={styles.counterLabelText}>Friends</Text>
        </View>
        <View style={styles.counterItemContainer}>
          <Text style={styles.counterNumberText}>100k</Text>
          <Text style={styles.counterLabelText}>Stars</Text>
        </View>
      </View>
      <View>
        <DisplayMenuScreen />
      </View>

      <Image style={styles.avatar} source={{ uri: user.photoURL }} />
      <View style={styles.usernameView}>
      <Text style={styles.username}>@{user.username}</Text>
      <Image style={styles.phlokkVerified} source={require('../../../../../app/assets/verified.png')} />
      </View>
      <Text style={styles.bioText}>{user.Bio}</Text>
      <Text style={styles.linkText}>
        <Ionicons style={styles.link} name="link" size={15} color="green" />
        {user.link}
      </Text>
    </View>
  );
}
