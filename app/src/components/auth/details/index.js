import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'; 
import styles from './styles';
import { useDispatch } from 'react-redux';
import { login, register } from '../../../redux/actions';

// const DismissKeys = ({ children }) => (
//     <TouchableWithoutFeedback onPress={() => Keyboard.dismiss() }>
//         { children }
//     </TouchableWithoutFeedback>
// );


export default function AuthDetails({ authPage, setDetailsPage }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const handleLogin = () => {
        dispatch(login(email, password))
        .then(() => {
            console.log('login successful')
        })
        .catch(() => {
            console.log('login unsuccessful')
        })

    }
    const handleRegister =() => {
        dispatch(register(email, password))
        .then(() => {
            console.log('register successful')
        })
        .catch(() => {
            console.log('register unsuccessful')
        })
    }
    return (
        
        <View style={styles.container}>
            <TouchableOpacity onPress={() => setDetailsPage(false)}>
                <Ionicons name="arrow-back-circle-outline" size={24} color="black" />
            </TouchableOpacity>
            <TextInput
                onChangeText={(text) => setEmail(text)}
                style={styles.textInput}
                placeholder='Email'
            />
            <TextInput
                onChangeText={(text) => setPassword(text)}
                style={styles.textInput}
                secureTextEntry
                placeholder='Password'
            />

            <TouchableOpacity
                style={styles.button}
                onPress={() => authPage === 0 ? handleLogin() : handleRegister()}>
                <Text style={styles.buttonText}>{authPage === 0 ? 'Sign In' : 'Sign Up'}</Text>
            </TouchableOpacity>
        </View>
        
    )
}
