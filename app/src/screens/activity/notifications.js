import { useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
} from "react-native";
import colors from "../../../config/colors";
import { useAtom } from "jotai";
import { userAtom } from "../../../../App";
import { timeSince } from "../../services/posts";

export default function NotificationScreen({ navigation, item }) {
  const [user, setUser] = useAtom(userAtom);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Activity</Text>
      <ScrollView>
        <TouchableOpacity
        // onPress={() => }
        >
          <View style={styles.containerInput}>
            <Image
              style={styles.avatar}
              source={require("../../../assets/userImage.png")}
              cache="only-if-cached"
            />
            <View style={styles.notificationView}>
              <Text style={styles.usernameView}>{user.username}</Text>

              <View style={styles.mentionsView}>
                <Text style={styles.mentionsText}>liked your video </Text>
                <Text style={styles.date}>56 secs ago </Text>
                {/* <Text style={styles.date}>
            {item.created_at ? timeSince(new Date(item.created_at)) : "Now"}
          </Text> */}
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: colors.primary,
  },
  containerInput: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  mentionsView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  notificationView: {
    paddingLeft: 10,
  },
  text: {
    color: colors.white,
  },
  usernameView: {
    color: colors.white,
  },
  mentionsText: {
    fontSize: 10,
    marginTop: 5,
    color: colors.green,
  },
  date: {
    fontSize: 10,
    marginTop: 5,
    paddingLeft: 10,
    color: colors.secondary,
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "lightgray",
  },
});
