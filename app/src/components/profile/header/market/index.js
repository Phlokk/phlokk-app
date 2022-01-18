import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { Avatar } from 'react-native-paper'
import { useSelector } from 'react-redux'
import styles from './styles'
// import { useUser } from '../../../hooks/useUser'


    

export default function MarketHeader() {
    const navigation = useNavigation()
    
    
    return (
        <View style={styles.container}>
            {/* <Image style={styles.avatar} source={{ uri: user.photoURL}}/> */}
            <Text style={styles.creatorText}>Name of Business</Text>
            <View style={styles.counterContainer}>
                <View style={styles.counterItemContainer}>
                    <Text style={styles.counterNumberText}>0</Text>
                    <Text style={styles.counterLabelText}>Following</Text>
                </View>
                <View style={styles.counterItemContainer}>
                    <Text style={styles.counterNumberText}>0</Text>
                    <Text style={styles.sales}>Sales</Text>
                </View>
                <View style={styles.counterItemContainer}>
                    <Text style={styles.counterNumberText}>0</Text>
                    <Text style={styles.reviews}>Reviews</Text>
                </View>
            </View>
            <TouchableOpacity>
                <Text style={styles.text}>Seller Profile</Text>
            </TouchableOpacity>
        </View>
        
    )
}
