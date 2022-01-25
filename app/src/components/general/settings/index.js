import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import styles from './styles'
import { useNavigation } from '@react-navigation/native'
import { MaterialIcons } from '@expo/vector-icons'; 



export default function SettingsNavBar({ title = 'Settings' }) {
    const navigation = useNavigation()

    


    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
            <MaterialIcons  name="keyboard-arrow-left" size={28} color="lightgray" />
            </TouchableOpacity>

            <Text style={styles.title}>{title}</Text>

            <TouchableOpacity style={styles.button}>
            <MaterialIcons name="power-settings-new" size={24} color="#131313" />
                
            </TouchableOpacity>
        </View>

    )
}
