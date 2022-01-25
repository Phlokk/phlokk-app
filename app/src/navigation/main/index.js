import React, { useEffect } from 'react'
import { View, Text, StatusBar } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { userAuthStateListener } from '../../redux/actions';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthScreen from '../../screens/auth'
import HomeScreen from '../../navigation/home';
import SavePostScreen from '../../screens/savePost';
import EditProfileScreen from '../../screens/profile/edit';
import Modal from '../../components/modal';
import EditProfileFieldScreen from '../../screens/profile/edit/field';
import FeedScreen from '../../screens/videoFeed';
import ProfileScreen from '../../screens/profile';
import Market from '../../screens/market';
import SellerToolsScreen from '../../screens/seller';
import DisplayMenuScreen from '../profile';
import EditBioFieldScreen from '../../screens/bio';
import SettingsScreen from '../../screens/settings';
import PrivacyPolicyScreen from '../../screens/privacy';
import TermsOfServiceScreen from '../../screens/terms';
import CopyrightPolicyScreen from '../../screens/copyright';
import CommunityGuidelinesScreen from '../../screens/guidelines';
import EditLinkFieldScreen from '../../screens/link';
import ManageAccountScreen from '../../screens/manageAccount';
import EditAdmissionScreen from '../../screens/admission';
import EditBuyLinkScreen from '../../screens/buyLink';
import EditDonationLinkScreen from '../../screens/donation';
import EditAdsScreen from '../../screens/ads';



const Stack = createNativeStackNavigator()

export default function Route() {
    const currentUserObj = useSelector(state => state.auth)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userAuthStateListener());
    }, [])

    if (!currentUserObj.loaded) {
        return (
            <View></View>
        )
    }
      
    return (
        <NavigationContainer>
            <Stack.Navigator>
                {currentUserObj.currentUser == null ?
                    <Stack.Screen name="auth" component={AuthScreen} options={{ headerShown: false }} />
                    :
                    <>
                        <Stack.Screen name="home" component={HomeScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="savePost" component={SavePostScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="userPosts" component={FeedScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="profileOther" component={ProfileScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="edit" component={EditProfileScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="editProfileField" component={EditProfileFieldScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="market" component={Market} options={{ headerShown: false }} />
                        <Stack.Screen name="seller" component={SellerToolsScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="profile" component={DisplayMenuScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="bio" component={EditBioFieldScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="link" component={EditLinkFieldScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="settingsScreen" component={SettingsScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="guidelines" component={CommunityGuidelinesScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="terms" component={TermsOfServiceScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="privacy" component={PrivacyPolicyScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="copyright" component={CopyrightPolicyScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="manageAccount" component={ManageAccountScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="admission" component={EditAdmissionScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="buyLink" component={EditBuyLinkScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="donation" component={EditDonationLinkScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="ads" component={EditAdsScreen} options={{ headerShown: false }} />




                        


                        
                        
                        
                    </>
                }
            </Stack.Navigator>
            <Modal />
        </NavigationContainer>
    )
}