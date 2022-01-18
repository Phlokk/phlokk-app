import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { MaterialIcons } from '@expo/vector-icons'; 
import styles from './styles';
import { Entypo } from '@expo/vector-icons'; 



export default function SellerNavBar({ title = 'Seller Account', leftButton = { display: true } }) {
    const navigation = useNavigation()
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
            <MaterialIcons  name="keyboard-arrow-left" size={28} color="lightgray" />
            </TouchableOpacity>

            <Text style={styles.title}>{title}</Text>

            <TouchableOpacity style={styles.button}>
            
            <Entypo name="tools" size={28} color='#131313' />
            </TouchableOpacity>
        </View>

    )
}