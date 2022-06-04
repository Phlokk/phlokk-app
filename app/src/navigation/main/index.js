import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userAuthStateListener } from "../../redux/actions";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthScreen from "../../screens/auth";
import SavePostScreen from "../../screens/savePost";
import EditProfileScreen from "../../screens/profile/edit";
import Modal from "../../components/modal";
import EditProfileFieldScreen from "../../screens/profile/edit/field";
import FeedScreen from "../../screens/videoFeed";
import ProfileScreen from "../../screens/profile";
import Market from "../../screens/market";
import DisplayMenuScreen from "../../screens/profile/displayMenu";
import SettingsScreen from "../../screens/settings";
import PrivacyPolicyScreen from "../../screens/policies/privacy";
import TermsOfServiceScreen from "../../screens/policies/terms";
import CopyrightPolicyScreen from "../../screens/policies/copyright";
import CommunityGuidelinesScreen from "../../screens/policies/guidelines";
import EditLinkFieldScreen from "../../screens/profile/link";
import ManageAccountScreen from "../../screens/manageAccount";
import EditAdmissionScreen from "../../screens/market/admission";
import EditBuyLinkScreen from "../../screens/market/buyLink";
import EditDonationLinkScreen from "../../screens/market/donation";
import EditAdsScreen from "../../screens/market/ads";
import ReviewScreen from "../../screens/market/reviews";
import SubscriptionScreen from "../../screens/market/subscription";
import ActivityScreen from "../../screens/activity";
import SettingsModal from "../../components/modal/settingsModal";
import EditPhoneScreen from "../../screens/manageAccount/phone";
import EditEmailScreen from "../../screens/manageAccount/emailAddress";
import EditPasswordScreen from "../../screens/manageAccount/profilePassword";
import EditYoutubeScreen from "../../screens/profile/youtube";
import EditInstagramScreen from "../../screens/profile/instagram";
import { navigationRef } from "../rootNavigation.js";
import UserTabs from "../userTabs";
import DeleteProfileScreen from "../../screens/manageAccount/deleteProfile";
import SoundScreen from "../../screens/sounds";
import DraftsScreen from "../../screens/savePost/drafts";
import EditPostScreen from "../../screens/savePost/editPost";
import MessageScreen from "../../screens/messages/list";
import ChatSingleScreen from "../../screens/messages/single";
import PhlokkMarketToolsScreen from "../../screens/market/sellerTools";
import EditCreatorFieldScreen from "../../screens/profile/creator";
import RelationshipCategoryScreen from "../../screens/profile/relationships";
import GiftingModal from "../../components/modal/GiftingModal";
import SettingsSheetModal from "../../components/modal/settingsSheetModal";
import EndUserAgreementScreen from "../../screens/policies/eulaPolicy";
import ReportScreen from "../../screens/reports";
import FeedNavigation from "../feed";
import EditQuotesFieldScreen from "../../screens/profile/quotes/quotes";
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
import RecordingScreen from "../../screens/sounds/recorder/recording"
import AudioPlay from "../../screens/sounds/recorder/playAudio"


const Stack = createNativeStackNavigator();

export default function Route() {
  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userAuthStateListener());
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        {auth.currentUser === null ? (
          <Stack.Screen
            name="auth"
            component={AuthScreen}
            options={{ headerShown: false }}
          />
        ):(
          <>
          <Stack.Screen
              name="home"
              component={UserTabs}
              options={{ headerShown: false }}
            />
          <Stack.Screen
              name="feed"
              component={FeedNavigation}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="savePost"
              component={SavePostScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="userPosts"
              component={FeedScreen}
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
              component={EndUserAgreementScreen}
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
            
            </>
        )}
      </Stack.Navigator>
      <Modal />
      <SettingsModal />
      <GiftingModal />
      <SettingsSheetModal />
    </NavigationContainer>
  );
}
