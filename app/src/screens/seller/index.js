import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import styles from './styles'
import SellerNavBar from '../../components/profile/navBar/market/seller'
import SellerDashboardScreen from '../sellerDashboard'
import { SafeAreaView } from 'react-native-safe-area-context'


export default function SellerToolsScreen() {
    const navigation = useNavigation()
    
    return (
        
            
        <SafeAreaView style={styles.container}>
            <Text style={styles.creatorText}>Business Name</Text>
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
            <View>
                <Text style={styles.text}>Seller Profile</Text>
            </View>

            <View>
            <SellerDashboardScreen />
            </View>

            
        </SafeAreaView>
        
    )
}
