import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import routes from "../../../navigation/routes";
// import { useDispatch } from "react-redux";
import colors from "../../../../config/colors";
import { useAtom } from "jotai";
import { userAtom } from "../../../../../App";
import CustomAlert from "../../../components/Alerts/customAlert";

export default function ProfileNavBar({ showFireIcon }) {
  const navigation = useNavigation();
  // const dispatch = useDispatch();

  const [user, setUser] = useAtom(userAtom);
  const [isGifting, setIsGifting] = useState(false);
  const [isInfo, setIsInfo] = useState(false);


  // const loading = useSelector(state => state.userReducer.user);

  return (
    <View style={styles.container}>
      <CustomAlert
        alertTitle={<Text><MaterialIcons name="info" size={24} color={colors.green} /></Text>}
        customAlertMessage={<Text>Light It Up{"\n"}coming in Official release</Text>}
        positiveBtn="Ok"
        modalVisible={isGifting}
        dismissAlert={setIsGifting}
        animationType="fade"
      />
      <TouchableOpacity
        onPress={() => setIsGifting(true)}

        // onPress={() => navigation.navigate(routes.BUY_GIFTS)}
        disabled={!showFireIcon}
      >
        <MaterialCommunityIcons
          name="fire"
          size={29}
          color={colors.green}
          style={{ opacity: showFireIcon ? 1 : 0 }}
        />
      </TouchableOpacity>

      <Text style={styles.middleText}>{user.creator_type}</Text>
      <CustomAlert
        alertTitle={<Text><MaterialIcons name="info" size={24} color={colors.green} /></Text>}
        customAlertMessage={<Text>Phlokk Info{"\n"}coming in Official release</Text>}
        positiveBtn="Ok"
        modalVisible={isInfo}
        dismissAlert={setIsInfo}
        animationType="fade"
      />
      {user !== null || !undefined ? (
        <TouchableOpacity>
          <MaterialCommunityIcons
            onPress={() => setIsInfo(true)}
            name="information"
            size={25}
            color={colors.green}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity>
          <Ionicons name="ellipsis-horizontal" size={28} color={colors.white} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
    paddingVertical: 2,
    marginTop: 8,
  },
  text: {
    fontSize: 16,
    color: colors.white,
    flex: 1,
    textAlign: "center",
    fontWeight: "bold",
  },
  middleText: {
    color: colors.secondary,
    flex: 1,
    textAlign: "center",
    alignSelf: "center",
    fontWeight: "bold",
  },
});
