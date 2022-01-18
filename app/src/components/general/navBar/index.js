import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import styles from './styles'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { MaterialIcons } from '@expo/vector-icons'; 


export default function NavBarGeneral({ title = 'Edit profile', leftButton = { display: false } }) {
    const navigation = useNavigation()
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
            <MaterialIcons  name="keyboard-arrow-left" size={28} color="lightgray" />
            </TouchableOpacity>

            <Text style={styles.title}>{title}</Text>

            <TouchableOpacity style={styles.button} onPress={() => leftButton.display ? leftButton.action() : null}>
                <Feather name={leftButton.name} size={26} color={leftButton.display ? 'red' : 'white'} />
            </TouchableOpacity>
        </View>

    )
}