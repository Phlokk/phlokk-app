import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import styles from './styles'
import { Entypo } from '@expo/vector-icons'; 
import { SafeAreaView } from 'react-native-safe-area-context'
import { SimpleLineIcons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native'
import { MaterialCommunityIcons } from '@expo/vector-icons'; 



export default function ProfileNavBar({ user }) {
    const navigation = useNavigation()
    return (
        
        <View style={styles.container}>
            <TouchableOpacity>
            <Entypo name="shop" size={26} color='#fff' onPress={() => navigation.navigate('market')}  />
            </TouchableOpacity>
            <Text style={styles.text}>SS  600 </Text>
            <TouchableOpacity >
            
            <MaterialCommunityIcons name="menu" size={28} color="white" onPress={() => navigation.navigate('edit')}  />
            
            </TouchableOpacity>
        </View>
       
    )
}