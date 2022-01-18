import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { View, Text, TextInput } from 'react-native'
import { Divider } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import NavBarGeneral from '../../../../components/general/navBar'
import { saveUserField } from '../../../../../src/services/user'
import { generalStyles } from '../../../../../src/styles'
import styles from './styles'

export default function EditProfileFieldScreen({ route }) {
    const { title, field, value } = route.params
    const [textInputValue, setTextInputValue] = useState(value)
    const navigation = useNavigation()
    const onSave = () => {
        saveUserField(field, textInputValue)
            .then(() => navigation.goBack())
    }
    return (
        <SafeAreaView style={styles.container}>
            <NavBarGeneral title={title} leftButton={{ display: true, name: 'save', action: onSave }} />
            <Divider />
            <View style={styles.mainContainer}>
                

                <TextInput
                    style={generalStyles.textInput} 
                    placeholder='username'
                    placeholderTextColor={'gray'}
                    autoCapitalize="none"
                    autoCorrect={false}
                    textContentType='username'
                    maxLength={24}
                    value={textInputValue}
                    onChangeText={setTextInputValue}
                />
            </View>

            <View style={styles.infoView}>
                <Text style={styles.info}><Text style={styles.infoTextGreen}>Info:</Text> Can only contain letters, numbers,underscores, and periods. When you change your username it will update the link to your profile.</Text>
            </View>

        </SafeAreaView>
    )
}