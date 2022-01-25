import { View, Text, SafeAreaView } from 'react-native';
import React from 'react';
import { WebView } from 'react-native-webview';
import styles from './styles';

const TERMS = 'https://www.websitepolicies.com/policies/view/im5eMPMr'

export default function TermsOfServiceScreen() {
  return (
    

      <WebView style={styles.container}
        originWhitelist={['*']}
        source={{ uri: TERMS }} 
        onLoad={console.log('Loaded')} 
        
      />
    
  );
}
