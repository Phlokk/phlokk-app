import { useNavigation } from '@react-navigation/native'
import { View, Text, TouchableOpacity, Image, SafeAreaView } from 'react-native'
import styles from './styles'
import React, { useContext, useEffect, useState } from 'react'
import MarketHeader from '../../components/profile/header/market'
import MarketNavBar from '../../components/profile/navBar/market'



    

export default function Market() {
    const navigation = useNavigation()

  
    
    
    return (
        <SafeAreaView style={styles.container}>
            
            <MarketNavBar />
        <MarketHeader />
        
    </SafeAreaView>
        
    )
}
