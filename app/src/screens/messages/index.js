import React from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import { View, Text } from 'react-native'
import styles from './styles'

export default function MessageScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Messages / Inbox</Text>
        </View>
    )
}
