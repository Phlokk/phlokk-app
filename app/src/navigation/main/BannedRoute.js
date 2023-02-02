import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, View } from "react-native";
import { userAuthStateListener } from "../../redux/actions";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthScreen from "../../screens/auth/AuthScreen";
import ResetPassword from "../../components/auth/details/ResetPassword";
import BannedUserProfile from "../../screens/profile/BannedUserProfile";
import colors from "../../../config/colors";


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
    <Stack.Navigator>
      {auth.currentUser === null ? (
        <>
          <Stack.Screen
            name="auth"
            component={AuthScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            
            name="resetPassword"
            component={ResetPassword}
            options={{ headerShown: false }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="bannedUserProfile"
            component={BannedUserProfile}
            options={{ headerShown: false }}
          />
          
        </>
      )}
      
    </Stack.Navigator>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.green,
    flex: 1,
  },
});
