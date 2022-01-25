import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { MaterialIcons } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 
import styles from './styles';




export default function MarketNavBar({ title = 'Phlokk Market', leftButton = { display: true } }) {
    const navigation = useNavigation()
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
            <MaterialIcons  name="keyboard-arrow-left" size={28} color="lightgray" />
            </TouchableOpacity>

            <Text style={styles.title}>{title}</Text>

            <TouchableOpacity style={styles.button} 
            onPress={() => navigation.navigate('seller', { title: 'Ad Account', field: 'Seller Dashboard'})}>
            <Ionicons name="settings-sharp" size={24} color="lightgray" />
            </TouchableOpacity>
        </View>

    )
}