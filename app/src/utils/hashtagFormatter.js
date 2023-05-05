import axios from "../redux/apis/axiosDeclaration";
import { Text, StyleSheet } from "react-native";
import colors from "../../config/colors";
export const HASHTAG_FORMATTER = (string, navigation) => {
  if ( !string  ) {
    return;
  }

  return string
    .split(/((?:^|\s)(?:#[a-z\d-] || @[a-z\d-]+))/gi)
    .filter(Boolean)
    .map((tag, i) => {
      if (tag.includes("#") || tag.includes("@")) {
        return (
          <Text
            key={i}
            onPress={async () => {
              await handleSearchUser(JSON.stringify(tag).slice(1, -1), navigation);
            }}
            style={styles.tags}
          >
            {JSON.stringify(tag).slice(2, -1)}
          </Text>
        );
      } else {
        return <Text key={i}>{tag}</Text>;
      }
    });
};
const handleSearchUser = async (tagName, navigation) => {
  let userName = tagName?.substring(1);
  const response = await axios.get(`/api/users/username/${userName}`);
  if (response?.data?.[0]) {
    navigation.navigate("feedProfile", {
      initialUser: response.data[0],
    });
  } else {}
};

const styles = StyleSheet.create({
  tags: {
    color: colors.secondary,
    fontWeight: "600",
  },
});
