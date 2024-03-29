import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../../../../config/colors";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

import verifiedCheck from "../../../../assets/verified.png";
import CustomAlert from "../../../components/Alerts/customAlert";
import CustomImageModal from "../../../components/Image/customImage";
import { useAtom } from "jotai";
import { userAtom } from "../../../../../App";




function UserProfile({ user }) {
  const [topFavFive, setTopFavFive] = useState(false);
  const [popUpImage, setPopUpImage] = useState(false);
  const [fontsLoaded] = useFonts({
    "Waterfall-Regular": require("../../../../assets/fonts/Waterfall-Regular.ttf"),
  });

  const [currentUser, setCurrentUser] = useAtom(userAtom);

  const isCurrentUser = currentUser._id === user._id;

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      {!user?.photo_url && !currentUser?.photo_url ? (
				<Image
					style={styles.avatar}
					source={require('../../../../assets/userImage.png')}
					cache="only-if-cached"
				/>
			) : (
				<TouchableOpacity onPress={() => setPopUpImage(true)}>
					<CustomImageModal
						customAlertMessage={<Text>User Bio</Text>}
						positiveBtn="Back"
						modalVisible={popUpImage}
						dismissAlert={setPopUpImage}
						animationType="fade"
						user={user}
					/>
					<Image
						style={styles.avatar}
						source={{
							uri: isCurrentUser ? currentUser.photo_url : user.photo_url,
						}}
					/>
				</TouchableOpacity>
			)}

      <View style={styles.usernameView}>
        {user.username !== null || !undefined ? (
          <Text style={styles.username}>
            @{user.username}
            <View>
              {user && user.is_verified === 1 && (
                <Image style={styles.phlokkVerified} source={verifiedCheck} />
              )}
            </View>
          </Text>
        ) : (
          <Text style={styles.username}>@user</Text>
        )}
      </View>

      <View style={styles.quotesView}>
        {user.quote !== null || !undefined ? (
          <Text style={styles.quotes}>{user.quote}</Text>
        ) : (
          <></>
        )}
      </View>
      <>
        

        <TouchableOpacity>
          <CustomAlert
            alertTitle={
              <Text>
                <MaterialIcons name="info" size={24} color={colors.green} />
              </Text>
            }
            customAlertMessage={
              <Text>Top Favorite 5{"\n"}coming in beta 3</Text>
            }
            positiveBtn="Ok"
            modalVisible={topFavFive}
            dismissAlert={setTopFavFive}
            animationType="fade"
          />
          <MaterialCommunityIcons
            name="diamond-stone"
            size={25}
            color={colors.diamondBlue}
            onPress={() => setTopFavFive(true)}
          />
        </TouchableOpacity>
      </>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
    alignItems: "center",
    backgroundColor: colors.primary,
  },
  relationshipNameContainer: {
    flexDirection: "row",
    paddingTop: 5,
    justifyContent: "space-between",
    bottom: 2,
  },
  verifiedRow: {
    flexDirection: "row",
    justifyContent: "center",
    // bottom: 2,
  },
  creatorText: {
    color: colors.white,
    fontSize: 15,
    marginBottom: 20,
  },
  relationshipText: {
    color: colors.white,
    marginBottom: 10,
    marginHorizontal: 2,
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
  quotes: {
    color: colors.white,
    marginBottom: 20,
    textAlign: "center",
    fontFamily: "Waterfall-Regular",
    fontSize: 27,
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
    bottom: 0,
    marginHorizontal: 3,
  },
  usernameView: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 5,
  },
  quotesView: {
    flexDirection: "row",
    alignItems: "center",
    textAlign: "center",
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 25,
    paddingLeft: 25,
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

export default React.memo(UserProfile);
