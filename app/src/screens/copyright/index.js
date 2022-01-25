import { View, Text, SafeAreaView } from 'react-native';
import React from 'react';
import { WebView } from 'react-native-webview';
import styles from './styles';

const COPYRIGHT = 'https://www.websitepolicies.com/policies/view/dW4VKsnC'

export default function CopyrightPolicyScreen() {
  return (
    <WebView style={styles.container}
        originWhitelist={['*']}
        source={{ uri: COPYRIGHT }} 
        onLoad={console.log('Loaded')} 
        
      />
  );
}
