import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import styles from './styles';

export default function AdsNavBar({ title = "Ad Account" }) {
    const navigation = useNavigation();

    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="keyboard-arrow-left" size={28} color="lightgray" />
        </TouchableOpacity>
  
        <Text style={styles.title}>{title}</Text>
  
        <Feather name="user" size={24} color="#131313" />
      </View>
    );
  }
