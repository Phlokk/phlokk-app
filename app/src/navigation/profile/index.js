import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { MaterialIcons } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import styles from './styles'


export default function DisplayMenuScreen() {

    const navigation = useNavigation()
    
    return (
        <View style={styles.container}>
            <View style={styles.menuContainer}>
                <TouchableOpacity style={styles.itemContainer}>
                <MaterialIcons name="cloud-upload" size={24} color="lightgray" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.itemContainer}>
                <AntDesign name="star" size={24} color="lightgray" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.itemContainer}>
                <MaterialIcons name="bookmark" size={24} color="lightgray" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.itemContainer}>
                <FontAwesome name="lock" size={24} color="lightgray" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.itemContainer}>
                <MaterialIcons name="admin-panel-settings" size={24} color="lightgray" onPress={() => navigation.navigate('settingsScreen')} />
                </TouchableOpacity>
            </View>
        </View>
    )
}
