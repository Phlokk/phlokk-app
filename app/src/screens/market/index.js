import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native'
import styles from './styles'
import React from 'react'

import MarketNavBar from '../../components/profile/navBar/market'



    

export default function Market() {
    const navigation = useNavigation()

  
    
    
    return (
        <SafeAreaView style={styles.container}>
            
            <MarketNavBar />
       
        
    </SafeAreaView>
        
    )
}
