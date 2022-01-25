import React from 'react'
import { View, Text } from 'react-native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 
import CameraScreen from '../../screens/camera';
import UserProfileScreen from '../../screens/profile';
import MessageScreen from '../../screens/messages';
import SearchScreen from '../../screens/search';
import FeedNavigation from '../feed';
import firebase from 'firebase';
import { EvilIcons } from '@expo/vector-icons'; 
import styles from './styles';




const Tab = createMaterialBottomTabNavigator()

const EmptyScreen = () => {
    return <View></View>
}


export default function HomeScreen() {
    return (
        
        <Tab.Navigator
            barStyle={{ backgroundColor: '#1C1D1E' }}
            initialRouteName="feed">
            <Tab.Screen
                name="feed"
                component={FeedNavigation}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="md-home" size={22} color='lightgray' />
                    )
                    

                }}
            />
            <Tab.Screen
                name="Discover"
                component={SearchScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <EvilIcons name="search" size={30} color='lightgray' />
                    )
                    
                    
                }}
                
            />
            <Tab.Screen
                name="Cam"
                component={CameraScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <FontAwesome5 name="film" size={27} color='#8a2be2' />
                    )
                }}
            />
            <Tab.Screen
                name="Inbox"
                component={MessageScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="message-processing" size={22} color='lightgray' />
                    )
                }}
            />
            <Tab.Screen
                name="Me"
                component={UserProfileScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Feather name="user" size={22} color='lightgray' />
                    )
                }}
                initialParams={{ initialUserId: firebase.auth().currentUser.uid }}
            />
        </Tab.Navigator>
        

    )
}

