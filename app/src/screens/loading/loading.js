import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import colors from "../../../config/colors";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserData } from "../../redux/actions/users";



function LoadingScreen() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.userReducer.user);

  useEffect(() => {
    dispatch(
      fetchUserData([
        "username",
        "photo_url",
        "quote",
        "is_verified",
        "relationship_name",
        "relationship_type",
      ])
    );
  }, []);


  return (
    <View style={styles.container}>
      <Text style={styles.text}>Loading Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
  },
  text: {
    color: colors.secondary,
  },
  
});

export default LoadingScreen;
