import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import routes from "../../navigation/routes";
import { useNavigation } from "@react-navigation/native";
import colors from "../../../config/colors";
import GiftingNavBar from "../../components/general/giftingNav/GiftingNavBar"

function FireRulesScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.mainContainer}>
      <GiftingNavBar title="Gifting Rules" />
      <Text style={styles.text}>
        <Text style={styles.textRules}>Rules & regulations</Text>{"\n"}{"\n"}
        <Text style={styles.textInfo}>
          Fire can be used to light up creators post if you think they have HOT
          content.
        </Text>{"\n"}{"\n"}

        <Text style={styles.textInfo}>
          This will help Creators have their content shown on Rising Stars video
          feed.
        </Text>{"\n"}{"\n"}

        <Text style={styles.textInfo}>
          Creators are not allowed to light up their own post.
        </Text>{"\n"}{"\n"}

        <Text style={styles.textInfo}>
          Creators content must meet all Community Guideline standards to be
          considered for the Rising Stars video feed.
        </Text>{"\n"}{"\n"}

        <Text style={styles.textInfo}>All purchases are NON-REFUNDABLE</Text>{"\n"}{"\n"}

        <Text style={styles.textInfo}>
          All Rules & Regulations
          <Text
            onPress={() => navigation.navigate(routes.TERMS)}
            style={styles.textReg}
          >
            {" "}
            (Terms & Conditions)
          </Text>
        </Text>
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    textAlign: "center",
    backgroundColor: colors.primary
  },

  textInfo: {
    fontSize: 12,
    // textAlign: "center",
    color: colors.secondary,
    marginTop: 30,
    padding: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    // textAlign: "center",
    color: colors.secondary,
    marginTop: 30,
    padding: 15,
  },

  textRules: {
    fontSize: 18,
    textAlign: "center",
    color: colors.orange,
    marginTop: 30,
    padding: 10,
  },
  textReg: {
    fontSize: 12,
    textAlign: "center",
    color: colors.orange,
    marginTop: 30,
    padding: 10,
  },
});

export default FireRulesScreen;
