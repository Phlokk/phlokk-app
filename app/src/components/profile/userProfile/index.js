import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as Linking from "expo-linking";
import verifiedCheck from "../../../../assets/verified.png";
import colors from "../../../../config/colors";
import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "../../../redux/actions/users";
import * as SecureStore from "expo-secure-store";
import axios from "axios";

function UserProfile() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const users = useSelector((state) => state.users.users);
  console.log("Fetch Object Below");
  console.log(users);
  console.log("Fetch Object Above");

  useEffect(() => {
    dispatch(getUsers());
  }, [getUsers]);

  // old data above

  // const url = "https://dev.phlokk.com/api/creators";

  // const fetchCreatorsProfileInfo = async () => {
  //   const token = JSON.parse(await SecureStore.getItemAsync('user'));
  //   const response = await fetch(url, {
  //     method: "GET",
  //     headers: {
  //       Authorization: `Bearer ${token.token}`,
  //     }
  //   })
  //   return response.json()

  // }

  // // const url = "https://dev.phlokk.com/api/creators/test/work";
  
  // const fetchCreatorsProfileInfo = async () => {
  //   let user = await SecureStore.getItemAsync("user");
  //   user = JSON.parse(user);
  //   axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
  //   axios
  //     .get("https://dev.phlokk.com/api/creators/working/results", {
        
  //         responseType: "json",
  //       })
      
  //     .then((response) => {
  //       console.log(response);
  //     })
  //     .catch((error) => {
  //       console.log(error.response);
  //     });
  // };

  // const { data, status } = useQuery("users", fetchCreatorsProfileInfo);


  // const fetchCreatorsProfileInfo = async () => {
  //   const response = await fetch("https://jsonplaceholder.typicode.com/users")
  //   return response.json();
  // };

  
  // if (status === "loading") {
  //   return (
  //     <View>
  //       <Text style={styles.users}>Loading...</Text>
  //     </View>
  //   );
  // }

  // if (status === "error") {
  //   return (
  //     <View>
  //       <Text style={styles.error}>ERROR</Text>
  //     </View>
  //   );
  // }

  const userLink = async () => {
    try {
      Linking.openURL(users.link);
    } catch (err) {
      null;
    }
  };

  const youtubeUser = async () => {
    try {
      await Linking.openURL(users.youtubeLink);
    } catch (err) {
      null;
    }
  };

  const instagramUser = async () => {
    try {
      await Linking.openURL(users.instagramLink);
    } catch (err) {
      null;
    }
  };

  return (
    // <View>
    //   {data={}.map((users, i) => (
    //     <View>
    //       <Text style={styles.users} key={i}>
    //         {users.username}
    //       </Text>
    //     </View>
    //   ))}
    // </View>
    <View style={styles.container}>
      {users.photo_url !== null ? (
        <Image style={styles.avatar} source={{ uri: users.photo_url }} />
      ) : (
        <Image
          style={styles.avatar}
          source={require("../../../../assets/userImage.png")}
        />
      )}
      <View style={styles.usernameView}>
        {users.username !== null ? (
          <Text style={styles.username}>@{users.username}</Text>
        ) : (
          <Text style={styles.username}>@user</Text>
        )}
        {users.verified === 1 ? (
          <Image style={styles.phlokkVerified} source={verifiedCheck} />
        ) : (
          <TouchableOpacity></TouchableOpacity>
        )}
      </View>
      <View style={styles.linkRow}>
        <TouchableOpacity style={styles.linkText}>
          <Feather
            onPress={youtubeUser}
            name="youtube"
            size={20}
            color={colors.green}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.linkText}>
          <MaterialCommunityIcons
            onPress={userLink}
            name="link"
            size={25}
            color={colors.green}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.linkText}>
          <Feather
            onPress={instagramUser}
            name="instagram"
            size={18}
            color={colors.green}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.relationshipContainer}>
        <Text style={styles.relationshipText}>{users.relationship_type}</Text>
        <Text style={styles.relationshipText}>{users.relationship_name}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
    alignItems: "center",
    backgroundColor: colors.primary,
  },
  relationshipContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  creatorText: {
    color: colors.white,
    fontSize: 15,
    marginBottom: 20,
  },
  relationshipText: {
    color: colors.white,
    marginBottom: 20,
    marginHorizontal: 2,
  },
  link: {
    alignItems: "center",
    marginVertical: 5,
  },
  linkRow: {
    flexDirection: "row",
  },
  linkText: {
    color: colors.secondary,
    marginBottom: 20,
    padding: 2,
    justifyContent: "center",
    margin: 15,
  },
  avatar: {
    height: 100,
    width: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "lightgray",
  },
  username: {
    color: colors.white,
    marginTop: 10,
    marginBottom: 20,
  },
  users: {
    color: colors.white,
  },
  error: {
    color: colors.red,
  },
  phlokkVerified: {
    width: 12,
    height: 12,
    bottom: 4,
    marginHorizontal: 3,
  },
  usernameView: {
    flexDirection: "row",
    alignItems: "center",
  },
  messageText: {
    color: colors.black,
    fontWeight: "700",
  },
  dividerBar: {
    backgroundColor: "#fff",
    width: 20,
  },
});

export default UserProfile;
