import { View, Text, SafeAreaView } from 'react-native';
import React from 'react';
import styles from './styles';

export default function CommunityGuidelinesScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.policyText}>Community Guidelines</Text>
    </SafeAreaView>
  );
}
