import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { View, Text, SafeAreaView } from 'react-native'
import SellerNavBar from '../../components/profile/navBar/market/seller'
import styles from './styles'

export default function SellerToolsScreen() {
    const navigation = useNavigation()

  
    
    
    return (
        <SafeAreaView style={styles.container}>
            
            <SellerNavBar />
        
        
    </SafeAreaView>
        
    )
}