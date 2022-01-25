import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import styles from './styles'


export default function MarketHeader({ user }) {
    const navigation = useNavigation();
    
     
    return (
        <View style={styles.container}>
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
