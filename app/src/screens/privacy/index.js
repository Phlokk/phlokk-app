import { View, Text, SafeAreaView } from 'react-native';
import React from 'react';
import { WebView } from 'react-native-webview';
import styles from './styles';

const PRIVACY = 'https://www.websitepolicies.com/policies/view/oVF5j3aw'

export default function PrivacyPolicyScreen() {
  return (
    <WebView style={styles.container}
        originWhitelist={['*']}
        source={{ uri: PRIVACY }} 
        onLoad={console.log('Loaded')} 
        
      />
  );
}
