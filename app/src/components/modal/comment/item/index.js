import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import colors from "../../../../../config/colors";
import { useAtom } from "jotai";
import { userAtom } from "../../../../../../App";
import verifiedCheck from "../../../../../assets/verified.png";

const CommentItem = ({ item }) => {
  const navigation = useNavigation();
  const [user, setUser] = useAtom(userAtom);

  const timeSince = function (date) {
    var seconds = Math.floor((new Date() - date) / 1000);
    var interval = seconds / 31536000;

    if (interval > 1) {
      return Math.floor(interval) + " years";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  };

  return (
    <View style={styles.container}>
      {!user?.photo_url && !user?.photo_url ? (
				<Image
					style={styles.avatar}
					source={require('../../../../../assets/userImage.png')}
					cache="only-if-cached"
				/>
			) : (
      <Image style={styles.avatar} source={{ uri: item.user.photo_url }} />
      )}

      <View style={styles.containerText}>
        <View style={styles.verifiedRow}>
          <TouchableOpacity
          // onPress={() => {
          //   navigation.navigate("feedProfile", {
          //     initialUser: user,
          //   });
          // }}
          >
            <Text style={styles.username}>@{item.user.username}</Text>
          </TouchableOpacity>
            {item.user && item.user.is_verified === 1 && (
              <Image style={styles.phlokkVerified} source={verifiedCheck} />
            )}
            <MaterialCommunityIcons
              onPress={() => Alert.alert("Stars", "Coming in beta version 3!")}
              style={styles.star}
              color="white"
              size={17}
              name={"star" ? "star-outline" : "star"}
            />
        </View>
        <Text style={styles.textComment}>{item.message}</Text>
        <View style={styles.replyRow}>
          <Text style={styles.date}>
            {item.created_at ? timeSince(new Date(item.created_at)) : "Now"}
          </Text>
          <TouchableOpacity
            onPress={() => Alert.alert("Replies", "Coming in beta version 3!")}
          >
            <Text style={styles.textReplies}>Reply</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 14,
    flexDirection: "row",
    flex: 1,
  },
  containerText: {
    marginHorizontal: 14,
  },
  verifiedRow: {
    flex:1,
    flexDirection: "row",
    alignItems: "center",
  },
  replyRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  username: {
    flex: 1,
    color: colors.green,
    fontSize: 11,
  },
  textComment: {
    color: colors.white,
    paddingRight: 40,
    fontSize: 12,
    marginTop: 2,
  },
  textReplies: {
    color: colors.secondary,
    paddingRight: 20,
    fontSize: 10,
    marginHorizontal: 5,
  },
  date: {
    color: colors.secondary,
    fontSize: 9,
  },
  avatar: {
    height: 30,
    width: 30,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "lightgray",
  },
  phlokkVerified: {
    width: 10,
    height: 10,
    marginHorizontal: 3,
  },
  star: {
    // position: "absolute",
    // left: 310,
    // marginLeft:'auto',
    bottom: 1,
  },

});

export default CommentItem;
