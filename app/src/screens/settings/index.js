import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import React from 'react';
import { Feather } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import styles from './styles';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import SettingsNavBar from '../../components/general/settings';
import firebase from 'firebase'

export default function SettingsScreen() {

    


const logout = () => {
    firebase.auth().signOut()
}

    const auth = useSelector(state => state.auth)
    const navigation = useNavigation()

  return (
            <SafeAreaView style={styles.container}>
                <SettingsNavBar />
                
                <View style={styles.fieldsContainer}>
                
                    <Text style={styles.socialText}>ACCOUNT</Text>

                <TouchableOpacity
                        style={styles.fieldItemContainer}
                        autoCapitalize="none"
                        onPress={() => navigation.navigate('manageAccount', { title: 'Manage Account'})}>
                        <Text style={styles.text}><Feather name="user" size={12} color="white" />  Manage Account</Text>
                        <View style={styles.fieldValueContainer}>
                            <Feather name='chevron-right' size={28} color='gray' />
                        </View>
                    </TouchableOpacity>

                <View style={styles.divider}>  
                    </View>
                    <Text style={styles.socialText}>ABOUT</Text>
                    <TouchableOpacity
                        style={styles.fieldItemContainer}
                        autoCapitalize="none"
                        onPress={() => navigation.navigate('guidelines', { title: 'Community Guidelines'})}>
                        <Text style={styles.text}><AntDesign name="exclamationcircleo" size={12} color="white" />  Community Guidelines</Text>
                        <View style={styles.fieldValueContainer}>
                            
                            <Feather name='chevron-right' size={28} color='gray' />
                        </View>
                    </TouchableOpacity>
    
                    <TouchableOpacity
                        style={styles.fieldItemContainer}
                        autoCapitalize="none"
                        onPress={() => navigation.navigate('terms', { title: 'Terms oF Service'})}>
                        <Text style={styles.text}><Feather name="file-text" size={12} color="white" />  Terms of Service</Text>
                        <View style={styles.fieldValueContainer}>
                            <Feather name='chevron-right' size={28} color='gray' />
                        </View>
                    </TouchableOpacity>
    
                    <TouchableOpacity
                        style={styles.fieldItemContainer}
                        autoCapitalize="none"
                        onPress={() => navigation.navigate('privacy', { title: 'Privacy Policy' })}>
                        <Text style={styles.text}><Feather name="file" size={12} color="white" />  Privacy Policy</Text>
                        <View style={styles.fieldValueContainer}>
                            <Feather name='chevron-right' size={28} color='gray' />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.fieldItemContainer}
                        autoCapitalize="none"
                        onPress={() => navigation.navigate('copyright', { title: 'Copyright Policy', field: 'link' })}>
                        <Text style={styles.text}><FontAwesome5 name="copyright" size={12} color="white" />  Copyright Policy</Text>
                        <View style={styles.fieldValueContainer}>
                            <Feather name='chevron-right' size={28} color='gray' />
                        </View>
                    </TouchableOpacity>

                    <View style={styles.divider}>  
                    </View>
                    <Text style={styles.socialText}>LOGIN</Text>

                    <TouchableOpacity style={styles.fieldItemContainer} onPress={logout}>
                    <Text style={styles.text}><MaterialIcons name="logout" size={14} color="white" /> Logout</Text>
                
                    </TouchableOpacity>
                </View>  
            </SafeAreaView>
        )
    }
                        
 