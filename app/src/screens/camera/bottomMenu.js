import { View, StyleSheet} from 'react-native';
import React from 'react';
import { useNavigation } from "@react-navigation/native";
import colors from '../../../config/colors';
import IconOverlay from './iconOverlay';

export default function BottomMenu () {


  return (
    <View style={styles.container}>
      <IconOverlay /> 
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
    height: 80,
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: colors.black,
    },
})

