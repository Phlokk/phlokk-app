import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { generalStyles } from "../../../../styles";
import { useDispatch } from "react-redux";
import colors from "../../../../../config/colors";
import { useAtom } from "jotai";
import { userAtom } from "../../../../../../App";
import verifiedCheck from "../../../../../assets/verified.png";

const CommentItem = ({ item }) => {
  const dispatch = useDispatch();
  const [user, setUser] = useAtom(userAtom);


  return (
    <View style={styles.container}>
          { user.photo_url !== null || !undefined ? (
            <Image
              style={styles.avatar}
              source={{ uri: user.photo_url }}
            />
          ) : (
            <Image
              style={styles.avatar}
              source={require("../../../../../assets/userImage.png")}
            />
          )}

      <View style={styles.containerText}>
        <View style={styles.verifiedRow}>
        {user.username !== null || !undefined ? (
          <Text>
                <Text style={styles.username}>
                  @{user.username}
                </Text>
            <View>
              {user && user.is_verified === 1 && (
                <Image style={styles.phlokkVerified} source={verifiedCheck} />
              )}
            </View>
          </Text>
        ) : (
          <></>
        )}
      
          <View style={styles.starRow}>
          <MaterialCommunityIcons
          onPress={() => (Alert.alert("Stars", "Coming in beta version 3!"))}
                color="white"
                size={17}
                name={"star" ? "star-outline" : "star"}
              />
              </View>
        </View>
        
        <Text style={styles.textComment}>Static text</Text>
        <View style={styles.replyRow}>
        <Text style={styles.date}>
          {/* {item.creation
            ? new Date(item.creation.seconds * 1000).toISOString().slice(6, 10)
            : "Now"} */}
        </Text>
        <TouchableOpacity
        onPress={() => (Alert.alert("Replies", "Coming in beta version 3!"))}
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
    flexDirection: "row",
    alignItems: "center",
    
  },
  replyRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  // starRow:{
  //   // marginHorizontal: 250,
  //   flexDirection: 'row',
  //   alignItems: 'center'
  // },
  username: {
    color: "gray",
    fontSize: 11,
  },
  textComment: {
    color: colors.white,
    paddingRight: 20,
    fontSize: 12,
  },
  textReplies: {
    color: colors.secondary,
    paddingRight: 20,
    fontSize: 10,
    marginHorizontal: 5,
  },
  date: {
    color: colors.secondary,
    fontSize: 10,
    
  },
  verifiedBadge: {
    width: 10,
    height: 10,
    top: 1,
    marginHorizontal: 3,
  },
});

export default CommentItem;
