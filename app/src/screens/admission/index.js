import { View, Text, SafeAreaView, TextInput } from 'react-native';
import React, { useState } from 'react';
import { Divider } from 'react-native-paper';
import { saveUserAdmission } from '../../services/user';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import NavBarGeneral from '../../components/general/navBar';
import { generalStyles } from '../../../src/styles';

export default function EditAdmissionScreen({ route }) {
    const { title, field, value } = route.params
    const [textInputValue, setTextInputValue] = useState(value)
    const navigation = useNavigation()
    const onSave = () => {
        saveUserAdmission(field, textInputValue)
            .then(() => navigation.goBack())
    }
  return (
    <SafeAreaView style={styles.container}>
            <NavBarGeneral title={title} leftButton={{ display: true, name: 'save', action: onSave }} />
            <Divider />
            <View style={styles.mainContainer}>
                

                <TextInput
                    style={generalStyles.textInput} 
                    placeholder='$'
                    placeholderTextColor={'gray'}
                    autoCapitalize="none"
                    keyboardType='numeric'
                    autoCorrect={false}
                    maxLength={24}
                    value={textInputValue}
                    onChangeText={setTextInputValue}
                />
            </View>

            <View style={styles.infoView}>
                <Text style={styles.info}><Text style={styles.infoTextGreen}>Add Gift Amount</Text> </Text>
            </View>

        </SafeAreaView>
    )
}