import { useNavigation } from "@react-navigation/native";
import { Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";

import colors from "../../../../config/colors";
import PostNavBar from "../../general/navBar";


export default function EndUserLicenseAgreement({ route, props }) {
  // const { title, field, value } = route.params;
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
        <PostNavBar title="EULA" />
      <ScrollView style={styles.spacer}>
        <Text style={styles.middlePar}>
          End-User License Agreement (EULA) of Phlokk
        </Text>
        <Text style={styles.middlePar}>
          This End-User License Agreement ("EULA") is a legal agreement between
          you and Phlokk LLC.
        </Text>

        <Text style={styles.middlePar}>
          This EULA agreement governs your acquisition
          and use of our Phlokk software ("Software") directly from Phlokk LLC
          or indirectly through a Phlokk LLC authorized reseller or distributor
          (a "Reseller"). Please read this EULA agreement carefully before
          completing the installation process and using the Phlokk software. It
          provides a license to use the Phlokk software and contains warranty
          information and liability disclaimers.
        </Text>

        <Text style={styles.middlePar}>
          If you register for a free trial of the Phlokk software, this EULA
          agreement will also govern that trial. By clicking "accept" or
          installing and/or using the Phlokk software, you are confirming your
          acceptance of the Software and agreeing to become bound by the terms
          of this EULA agreement.
        </Text>
        <Text style={styles.middlePar}>
          If you are entering into this EULA agreement on behalf of a company or
          other legal entity, you represent that you have the authority to bind
          such entity and its affiliates to these terms and conditions. If you
          do not have such authority or if you do not agree with the terms and
          conditions of this EULA agreement, do not install or use the Software,
          and you must not accept this EULA agreement. This EULA agreement shall
          apply only to the Software supplied by Phlokk LLC herewith regardless
          of whether other software is referred to or described herein. The
          terms also apply to any Phlokk LLC updates, supplements,
          Internet-based services, and support services for the Software, unless
          other terms accompany those items on delivery. If so, those terms
          apply. 
          </Text>
          
          <Text style={styles.largeText}>License Grant </Text>
          <Text style={styles.middlePar}>

          Phlokk LLC hereby grants you a personal,
          non-transferable, non-exclusive licence to use the Phlokk software on
          your devices in accordance with the terms of this EULA agreement. You
          are permitted to load the Phlokk software (for example a PC, laptop,
          mobile or tablet) under your control. You are responsible for ensuring
          your device meets the minimum requirements of the Phlokk software. You
          are not permitted to: 
          </Text>
          <Text style={styles.middlePar}>
          * Edit, alter, modify, adapt, translate or
          otherwise change the whole or any part of the Software nor permit the
          whole or any part of the Software to be combined with or become
          incorporated in any other software, nor decompile, disassemble or
          reverse engineer the Software or attempt to do any such things{"\n"} 
          
          {"\n"}* Reproduce, copy, distribute, resell or otherwise use the Software for
          any commercial purpose{"\n"} 
          
          {"\n"}* Allow any third party to use the Software on
          behalf of or for the benefit of any third party {"\n"}
          
          {"\n"}* Use the Software in any way which breaches any applicable local, national or international
          law {"\n"}
          
          {"\n"}* use the Software for any purpose that Phlokk LLC considers is a
          breach of this EULA agreement {"\n"}
          </Text>
          
          <Text style={styles.largeText}>Intellectual Property and Ownership</Text>
          <Text style={styles.middlePar}>
          Phlokk LLC shall at all times retain ownership of the Software as
          originally downloaded by you and all subsequent downloads of the
          Software by you. The Software (and the copyright, and other
          intellectual property rights of whatever nature in the Software,
          including any modifications made thereto) are and shall remain the
          property of Phlokk LLC. Phlokk LLC reserves the right to grant
          licences to use the Software to third parties. 
          </Text>

          <Text style={styles.largeText}>Termination </Text>
          <Text style={styles.middlePar}>
          This EULA
          agreement is effective from the date you first use the Software and
          shall continue until terminated. You may terminate it at any time upon
          written notice to Phlokk LLC. It will also terminate immediately if
          you fail to comply with any term of this EULA agreement. Upon such
          termination, the licenses granted by this EULA agreement will
          immediately terminate and you agree to stop all access and use of the
          Software. The provisions that by their nature continue and survive
          will survive any termination of this EULA agreement. Governing Law
          This EULA agreement, and any dispute arising out of or in connection
          with this EULA agreement, shall be governed by and construed in
          accordance with the laws of us.
          </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    
  },
  spacer: {
    paddingTop: 30,

  },
  termsText: {
    flexDirection: "row",
    alignItems: "center",
  },
  policyText: {
    color: colors.white,
    textAlign: "center",
    fontWeight: "bold",
  },
  eulaText: {
    color: colors.white,
    textAlign: "center",
    fontWeight: "bold",
  },
  topPar: {
    color: colors.white,
    textAlign: "center",
    fontWeight: "bold",
  },
  middlePar: {
    color: colors.white,
    padding: 10,
    fontWeight: "bold",
  },
  largeText: {
    color: colors.green,
    padding: 10,
    fontWeight: "bold",
    fontSize: 15,

  }
});
