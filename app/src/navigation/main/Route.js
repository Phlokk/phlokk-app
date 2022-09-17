import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userAuthStateListener } from "../../redux/actions";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthScreen from "../../screens/auth/AuthScreen";
import SavePostScreen from "../../screens/savePost/SavePostScreen";
import EditProfileScreen from "../../screens/profile/EditProfileScreen";
import EditProfileFieldScreen from "../../screens/profile/EditProfileFieldScreen";
import VideoFeed from "../../screens/videoFeed/VideoFeed";
import ProfileScreen from "../../screens/profile/ProfileScreen";
import Market from "../../screens/market/Market";
import DisplayMenuScreen from "../../screens/profile/DisplayMenuScreen";
import SettingsScreen from "../../screens/settings/SettingsScreen";
import PrivacyPolicyScreen from "../../screens/policies/PrivacyPolicyScreen";
import TermsOfServiceScreen from "../../screens/policies/TermsOfServiceScreen";
import CopyrightPolicyScreen from "../../screens/policies/CopyrightScreen";
import CommunityGuidelinesScreen from "../../screens/policies/CommunityGuidelinesScreen";
import EditLinkFieldScreen from "../../screens/profile/EditLinkFieldScreen";
import ManageAccountScreen from "../../screens/manageAccount/ManageAccountScreen";
import EditAdmissionScreen from "../../screens/market/admission/EditAdmissionScreen";
import EditBuyLinkScreen from "../../screens/market/buyLink/EditBuyLinkScreen";
import EditDonationLinkScreen from "../../screens/market/donation/EditDonationLinkScreen";
import EditAdsScreen from "../../screens/market/ads/EditAdsScreen";
import ReviewScreen from "../../screens/market/reviews/ReviewScreen";
import SubscriptionScreen from "../../screens/market/subscription/SubscriptionScreen";
import ActivityScreen from "../../screens/activity/ActivityScreen";
import EditPhoneScreen from "../../screens/manageAccount/EditPhoneScreen";
import EditEmailScreen from "../../screens/manageAccount/EditEmailScreen";
import EditPasswordScreen from "../../screens/manageAccount/EditPasswordScreen";
import EditYoutubeScreen from "../../screens/profile/EditYoutubeScreen";
import EditInstagramScreen from "../../screens/profile/EditInstagramScreen";
import { navigationRef } from "../rootNavigation.js/index.js";
import UserTabs from "../userTabs/TabBar";
import DeleteProfileScreen from "../../screens/manageAccount/DeleteProfileScreen";
import SoundScreen from "../../screens/sounds/SoundScreen";
import DraftsScreen from "../../screens/savePost/drafts/DraftsScreen";
import EditPostScreen from "../../screens/savePost/editPost/EditPostScreen";
import MessageScreen from "../../screens/messages/list/MessageScreen";
import ChatSingleScreen from "../../screens/messages/single/ChatSingleScreen";
import PhlokkMarketToolsScreen from "../../screens/market/sellerTools/PhlokkMarketToolsScreen";
import EditCreatorFieldScreen from "../../screens/profile/EditCreatorFieldScreen";
import RelationshipCategoryScreen from "../../screens/profile/RelationshipCategoryScreen";
import EndUserLicenseAgreement from "../../components/auth/details/policy";
import ReportScreen from "../../screens/reports/ReportScreen";
import EditQuotesFieldScreen from "../../screens/profile/EditQuotesFieldScreen";
import ComedyScreen from "../../screens/risingStars/comedy";
import FoodiesScreen from "../../screens/risingStars/foodies";
import CosplayScreen from "../../screens/risingStars/cosplay";
import DancersScreen from "../../screens/risingStars/dancer";
import DesignScreen from "../../screens/risingStars/design";
import FashionScreen from "../../screens/risingStars/fashion";
import FitnessScreen from "../../screens/risingStars/fitness";
import InventionScreen from "../../screens/risingStars/invention";
import LipSyncScreen from "../../screens/risingStars/lipSync";
import MusicianScreen from "../../screens/risingStars/musician";
import RecordingScreen from "../../screens/sounds/recorder/RecordingScreen";
import AudioPlay from "../../screens/sounds/recorder/AudioPlay";
import BioFieldScreen from "../../screens/profile/BioFieldScreen";
import GiftingScreen from "../../screens/gifting/Gifting";
import FollowingListScreen from "../../screens/stats/FollowingListScreen";
import FriendsListScreen from "../../screens/stats/FriendsListScreen";
import CameraScreen from "../../screens/camera/CameraScreen";
import { StyleSheet, View } from "react-native";
import colors from "../../../config/colors";
import FireRulesScreen from "../../screens/gifting/FireRulesScreen";
import PrivacyScreen from "../../screens/settings/privacy/PrivacyScreen";
import BlockedListScreen from "../../screens/settings/privacy/BlockedListScreen";
import ActivityAccountScreen from "../../screens/settings/activity/ActivityAccountScreen";
import SearchScreen from "../../screens/search/SearchScreen";

const Stack = createNativeStackNavigator();

export default function Route() {
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(userAuthStateListener());
  }, []);

  if (!auth.loaded) {
    return <View style={styles.lightBlack} />;
  }

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        {auth.currentUser === null ? (
          <Stack.Screen
            name="auth"
            component={AuthScreen}
            options={{ headerShown: false }}
          />
        ) : (
          <>
            <Stack.Screen
              name="home"
              component={UserTabs}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Cam"
              component={CameraScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="savePost"
              component={SavePostScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="userPosts"
              component={VideoFeed}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="profileOther"
              component={ProfileScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="edit"
              component={EditProfileScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="messages"
              component={MessageScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="editProfileField"
              component={EditProfileFieldScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="market"
              component={Market}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="phlokkMarketTools"
              component={PhlokkMarketToolsScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="profile"
              component={DisplayMenuScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="creator"
              component={EditCreatorFieldScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="link"
              component={EditLinkFieldScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="settingsScreen"
              component={SettingsScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="activityAccount"
              component={ActivityAccountScreen}
              options={{ headerShown: false }}
            />
             <Stack.Screen
              name="privacyScreen"
              component={PrivacyScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="blockedKListScreen"
              component={BlockedListScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="guidelines"
              component={CommunityGuidelinesScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="terms"
              component={TermsOfServiceScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="privacy"
              component={PrivacyPolicyScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="copyright"
              component={CopyrightPolicyScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="manageAccount"
              component={ManageAccountScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="admission"
              component={EditAdmissionScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="buyLink"
              component={EditBuyLinkScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="donation"
              component={EditDonationLinkScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ads"
              component={EditAdsScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="reviews"
              component={ReviewScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="subscriptions"
              component={SubscriptionScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="activity"
              component={ActivityScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="phone"
              component={EditPhoneScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="emailAddress"
              component={EditEmailScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="profilePassword"
              component={EditPasswordScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="youtubeLink"
              component={EditYoutubeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="instagramLink"
              component={EditInstagramScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="deleteProfile"
              component={DeleteProfileScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="sounds"
              component={SoundScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="drafts"
              component={DraftsScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="editPost"
              component={EditPostScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="chatSingle"
              component={ChatSingleScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="relationship"
              component={RelationshipCategoryScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="eula"
              component={EndUserLicenseAgreement}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="reports"
              component={ReportScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="quotes"
              component={EditQuotesFieldScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="bio"
              component={BioFieldScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="comedyScreen"
              component={ComedyScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="foodiesScreen"
              component={FoodiesScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="cosplayScreen"
              component={CosplayScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="dancersScreen"
              component={DancersScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="designScreen"
              component={DesignScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="fashionScreen"
              component={FashionScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="fitnessScreen"
              component={FitnessScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="inventionScreen"
              component={InventionScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="lipSyncScreen"
              component={LipSyncScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="musicianScreen"
              component={MusicianScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="recording"
              component={RecordingScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="audioPlay"
              component={AudioPlay}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="buyGifts"
              component={GiftingScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="followingList"
              component={FollowingListScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="friendsList"
              component={FriendsListScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="fireRules"
              component={FireRulesScreen}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.green,
    flex: 1,
  },
});
