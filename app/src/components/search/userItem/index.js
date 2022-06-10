import { useNavigation } from "@react-navigation/core";
import React from "react";
import { Text, View, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import routes from "../../../navigation/routes";
import colors from "../../../../config/colors";
import verifiedCheck from "../../../../assets/verified.png";
import { fetchUserData } from "../../../redux/actions/users";

export default function SearchUserItem() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.userReducer.user);

  useEffect(() => {
    dispatch(fetchUserData(['username','is_verified','photo_url']));
  }, [dispatch]);

  return (
    <TouchableOpacity
      style={styles.container}
      // onPress={() =>
      //   navigation.navigate(routes.PROFILE_OTHER, { initialUserId: user.id })
      // }
    >
      <View style={styles.verifiedRow}>
        {users.username !== null || !undefined ? (
          <Text>
            {users &&
              users.map((user, i) => (
                <Text style={styles.text} key={i}>
                  @{user.username}
                </Text>
              ))}
            <View>
              {users[0] && users[0].is_verified === 1 && (
                <Image style={styles.verifiedBadge} source={verifiedCheck} />
              )}
            </View>
          </Text>
        ) : (
          <Text style={styles.username}>@user</Text>
        )}
      </View>

      <View>
      {users &&
        users.map((user, i) =>
          user.photo_url !== null || !undefined ? (
            <Image
              style={styles.image}
              key={i}
              source={{ uri: user.photo_url }}
            />
          ) : (
            <Image
              style={styles.image}
              source={require("../../../../assets/userImage.png")}
            />
          )
        )}
      </View>
    
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  verifiedRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  verifiedBadge: {
    width: 10,
    height: 10,
    top: 1,
    marginHorizontal: 3,
  },
  text: {
    fontSize: 12,
    color: colors.secondary,
  },
  image: {
    backgroundColor: "#0C0C0C",
    height: 45,
    width: 45,
    borderRadius: 25,
  },
  username: {
    color: colors.white,
    marginTop: 10,
    marginBottom: 20,
  },
});
