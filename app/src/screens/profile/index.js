import ProfileHeader from "../../components/header/";
import ProfileNavBar from "../../components/general/profileNavBar/";
import { SafeAreaView } from "react-native-safe-area-context";
// import { useRefreshOnFocus } from "../../hooks/useRefreshOnFocus";
import { FlatList, View, StyleSheet } from "react-native";
import ProfilePostListItem from "../../components/profile/postList/item";
import { useDispatch } from "react-redux";
import colors from "../../../config/colors";
import { useIsFocused } from "@react-navigation/native";
import { useAtom } from "jotai";
import { userAtom } from "../../../../App";
import { useUserVideoFeed } from "../../services/posts";

export default function ProfileScreen({ route }) {
  // const { posts, getMoreVideos } = useVideoFeed();

  const userProfile = route?.params?.initialUser;

  const [user, setUser] = useAtom(userAtom);

  const { posts, getMoreUserPosts } = useUserVideoFeed(
    userProfile?._id || user._id
  );

  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const ListHeader = () => {
    return (
      <View style={styles.container} edges={["top"]}>
        <ProfileHeader user={userProfile || user} />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ProfileNavBar />
      <FlatList
        numColumns={3}
        removeClippedSubviews
        nestedScrollEnabled={false}
        data={posts}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={ListHeader}
        renderItem={({ item, index }) => (
          <ProfilePostListItem item={item} index={index} />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  text: {
    color: colors.green,
  },
  textPad: {
    padding: 10,
  },
});
