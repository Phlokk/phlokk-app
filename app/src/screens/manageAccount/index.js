import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import React from 'react';
import styles from './styles';
import AccountNavBar from '../../components/general/manageAccount';
import { Feather } from '@expo/vector-icons'; 

export default function ManageAccountScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <AccountNavBar />

    <View style={styles.fieldsContainer}>
                
                    <Text style={styles.socialText}>Account Information</Text>

                <TouchableOpacity
                        style={styles.fieldItemContainer}
                        >
                        <Text style={styles.text}>Phone number</Text>
                        <View style={styles.fieldValueContainer}>
                            <Feather name='chevron-right' size={28} color='gray' />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.fieldItemContainer}
                        >
                        <Text style={styles.text}>Email</Text>
                        <View style={styles.fieldValueContainer}>
                            
                            <Feather name='chevron-right' size={28} color='gray' />
                        </View>
                    </TouchableOpacity>
    
                    <TouchableOpacity
                        style={styles.fieldItemContainer}
                        >
                        <Text style={styles.text}>Password</Text>
                        <View style={styles.fieldValueContainer}>
                            <Feather name='chevron-right' size={28} color='gray' />
                        </View>
                    </TouchableOpacity>

                    <View style={styles.divider}>  
                    </View>
                    <Text style={styles.socialText}>Account control</Text>

                    <TouchableOpacity
                        style={styles.fieldItemContainer}
                        >
                        <Text style={styles.text}>Switch to Business Account</Text>
                        <View style={styles.fieldValueContainer}>
                            <Feather name='chevron-right' size={28} color='gray' />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.fieldItemContainer}
                        >
                        <Text style={styles.text}>Delete account</Text>
                        <View style={styles.fieldValueContainer}>
                            <Feather name='chevron-right' size={28} color='gray' />
                        </View>
                    </TouchableOpacity>

                    






                </View>  
            </SafeAreaView>
        )
    }
