import { Text, StyleSheet, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";

import colors from "../../../../config/colors";
import PostNavBar from "../../../components/general/navBar";

export default function CopyrightScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <PostNavBar title="Copyright Policy" />
      <View style={styles.spacerTop}></View>

      <ScrollView style={styles.spacer}>
        <Text style={styles.largeText}> DMCA policy</Text>
        <Text style={styles.middlePar}>
          This Digital Millennium Copyright Act policy (“Policy”) applies to the
          “Phlokk” mobile application (“Mobile Application” or “Service”) and
          any of its related products and services (collectively, “Services”)
          and outlines how Phlokk LLC (“Phlokk LLC”, “we”, “us” or “our”)
          addresses copyright infringement notifications and how you (“you” or
          “your”) may submit a copyright infringement complaint. Protection of
          intellectual property is of utmost importance to us and we ask our
          users and their authorized agents to do the same. It is our policy to
          expeditiously respond to clear notifications of alleged copyright
          infringement that comply with the United States Digital Millennium
          Copyright Act (“DMCA”) of 1998, the text of which can be found at the
          U.S. Copyright Office website.
        </Text>
        <Text style={styles.largeText}>
          What to consider before submitting a copyright complaint
        </Text>
        <Text style={styles.middlePar}>
          Before submitting a copyright complaint to us, consider whether the
          use could be considered fair use. Fair use states that brief excerpts
          of copyrighted material may, under certain circumstances, be quoted
          verbatim for purposes such as criticism, news reporting, teaching, and
          research, without the need for permission from or payment to the
          copyright holder. If you have considered fair use, and you still wish
          to continue with a copyright complaint, you may want to first reach
          out to the user in question to see if you can resolve the matter
          directly with the user. Please note that under 17 U.S.C. § 512(f), you
          may be liable for any damages, including costs and attorneys’ fees
          incurred by us or our users, if you knowingly misrepresent that the
          material or activity is infringing. If you are unsure whether the
          material you are reporting is in fact infringing, you may wish to
          contact an attorney before filing a notification with us. The DMCA
          requires you to provide your personal information in the copyright
          infringement notification. If you are concerned about the privacy of
          your personal information, you may wish to hire an agent to report
          infringing material for you.
        </Text>
        <Text style={styles.largeText}>Notifications of infringement</Text>
        <Text style={styles.middlePar}>
          If you are a copyright owner or an agent thereof, and you believe that
          any material available on our Services infringes your copyrights, then
          you may submit a written copyright infringement notification
          (“Notification”) using the contact details below pursuant to the DMCA
          by providing us with the following information: Identification of the
          copyrighted work that you claim has been infringed, or, if multiple
          copyrighted works are covered by this Notification, you may provide a
          representative list of the copyrighted works that you claim have been
          infringed. Identification of the infringing material and information
          you claim is infringing (or the subject of infringing activity),
          including at a minimum, if applicable, the URL or URLs of the web
          pages where the allegedly infringing material may be found.
          Information reasonably sufficient to permit us to contact you, such as
          an address, telephone number, and, if available, an e-mail address. A
          statement that you have a good faith belief that use of the material
          in the manner complained of is not authorized by the copyright owner,
          the copyright owner’s agent, or the law. A statement that the
          information in the notification is accurate, and under penalty of
          perjury that you are authorized to act on behalf of the owner of an
          exclusive right that is allegedly infringed. A physical or electronic
          signature (typing your full name will suffice) of the copyright owner
          or a person authorized to act on their behalf. All such Notifications
          must comply with the DMCA requirements. You may refer to a DMCA
          takedown notice generator or other similar services to avoid making
          mistake and ensure compliance of your Notification. Filing a DMCA
          complaint is the start of a pre-defined legal process. Your complaint
          will be reviewed for accuracy, validity, and completeness. If your
          complaint has satisfied these requirements, our response may include
          the removal or restriction of access to allegedly infringing material
          as well as a permanent termination of repeat infringers’ accounts. If
          we remove or restrict access to materials or terminate an account in
          response to a Notification of alleged infringement, we will make a
          good faith effort to contact the affected user with information
          concerning the removal or restriction of access. Notwithstanding
          anything to the contrary contained in any portion of this Policy,
          Phlokk LLC reserves the right to take no action upon receipt of a DMCA
          copyright infringement notification if it fails to comply with all the
          requirements of the DMCA for such notifications. The process described
          in this Policy does not limit our ability to pursue any other remedies
          we may have to address suspected infringement.
        </Text>
        <Text style={styles.largeText}>Changes and amendments</Text>
        <Text style={styles.middlePar}>
          We reserve the right to modify this Policy or its terms related to the
          Mobile Application and Services at any time at our discretion. When we
          do, we will revise the updated date at the bottom of this page. We may
          also provide notice to you in other ways at our discretion, such as
          through the contact information you have provided. An updated version
          of this Policy will be effective immediately upon the posting of the
          revised Policy unless otherwise specified. Your continued use of the
          Mobile Application and Services after the effective date of the
          revised Policy (or such other act specified at that time) will
          constitute your consent to those changes.
        </Text>
        <Text style={styles.largeText}>Reporting copyright infringement</Text>
        <Text style={styles.middlePar}>
          If you would like to notify us of the infringing material or activity,
          we encourage you to contact us using the details below:{"\n"}
          {"\n"}
          legal@phlokk.com{"\n"}
          {"\n"}
          This document was last updated on June 8, 2022
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
    paddingTop: 10,
  },
  spacerTop: {
    paddingTop: 40,
  },

  termsText: {
    flexDirection: "row",
    alignItems: "center",
  },
  policyText: {
    color: colors.white,
  },
  middlePar: {
    color: colors.white,
    padding: 10,
    fontWeight: "bold",
  },
  largeText: {
    color: colors.green,
    paddingTop: 10,
    padding: 10,
    fontWeight: "bold",
    fontSize: 15,
  },
});
