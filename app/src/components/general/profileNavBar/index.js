import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import routes from "../../../navigation/routes";
import { useDispatch } from "react-redux";
import colors from "../../../../config/colors";
import { useAtom } from "jotai";
import { userAtom } from "../../../../../App";
export default function ProfileNavBar() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [user, setUser] = useAtom(userAtom);

  // const loading = useSelector(state => state.userReducer.user);
 
  return (
    <View style={styles.container}>
      {user !== null || !undefined ? (
        <TouchableOpacity>
          <MaterialCommunityIcons
            name="fire"
            size={29}
            color={colors.green}
            onPress={() => navigation.navigate(routes.BUY_GIFTS)}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.button}>
          <MaterialIcons
            name="keyboard-arrow-left"
            size={28}
            color={colors.white}
            onPress={() => navigation.goBack()}
          />
        </TouchableOpacity>
      )}
      <Text style={styles.middleText} >{user.creator_type}</Text>
      
      {user !== null || !undefined ? (
        <TouchableOpacity>
          <MaterialCommunityIcons
            name="information"
            size={25}
            color={colors.green}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity>
          <Ionicons
            name="ellipsis-horizontal"
            size={28}
            color={colors.white}
          />
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
