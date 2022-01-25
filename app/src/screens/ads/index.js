import { View, Text, SafeAreaView } from 'react-native';
import React from 'react';
import styles from './styles';
import AdsNavBar from '../../components/general/adsNav';


export default function EditAdsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <AdsNavBar />
      
    </SafeAreaView>
  );
}
