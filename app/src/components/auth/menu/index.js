import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  StyleSheet
} from "react-native";
import { Feather } from "@expo/vector-icons";

import colors from "../../../../config/colors"




export default function AuthMenu({ authPage, setAuthPage, setDetailsPage }) {

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerMain}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../../../../../app/assets/phlokk_logo.png")}
          />
          <Image
            style={styles.phlokkLogo}
            source={require("../../../../../app/assets/small.png")}
          />
        </View>
        <TouchableOpacity
          style={styles.providerButton}
          onPress={() => setDetailsPage(true)}
        >
          <Feather name="user" size={20} color="white" />
          <Text style={styles.providerButtonText}>{authPage === 0 ? "Sign in" : "Create Account"}</Text>
          <View />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.containerBottomButton}
        onPress={() => (authPage === 0 ? setAuthPage(1) : setAuthPage(0))}
      >
        {authPage === 0 ? (
          <Text style={styles.authText}>
            Don't have an account?{" "}
            <Text style={styles.bottomButtonText}>Sign up</Text>
          </Text>
        ) : (
          <Text style={styles.authText}>
            Already have an account?{" "}
            <Text style={styles.bottomButtonText}>Sign in</Text>
          </Text>
        )}
        

      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary
    },
    containerMain: {
        flex: 1,
        padding: 30,
        marginTop: '40%',
        padding: 20,
        paddingHorizontal: 30,
        
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 25,
        marginBottom: 25,
        color: colors.white,
        textAlign: 'center'
    },
    providerButton: {
        borderColor: colors.secondary,
        borderWidth: 1,
        borderRadius: 10,
        borderStyle: 'solid',
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    providerButtonText: {
        paddingRight: 20,
        color: colors.white,
        fontSize: 18,
    },
    containerBottomButton: {
        // backgroundColor: colors.secondary,
        padding: 20,
        alignItems: 'center',
        // borderStyle: 'solid',
        // borderWidth: 1,
        // borderColor: colors.secondary,
    },
    authText:{
      color: colors.secondary,
    },
    bottomButtonText: {
        fontWeight: 'bold',
        color: 'red',
    },

    logoContainer: {
        alignItems: 'center'
    },
    phlokkLogo: {
        marginBottom: 20,
    }
   
});

