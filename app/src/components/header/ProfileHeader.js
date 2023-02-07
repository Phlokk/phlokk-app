import React from "react";
import { View, StyleSheet } from "react-native";
import DisplayMenuScreen from "../../screens/profile/DisplayMenuScreen";
import UserProfile from "../../screens/profile/UserProfile";
import ProfileStatsContainer from "../profile/profileStats/ProfileStatsContainer";
import colors from "../../../config/colors";
import { useTheme } from "../../theme/context";

function ProfileHeader({ user, setPopUpImage, onTabSelected, isCurrentUser }) {
  const { theme, setTheme } = useTheme();
  return (
    <View
      style={theme == "light" ? styles.container_light : styles.container_dark}
    >
      <ProfileStatsContainer user={user} isCurrentUser={isCurrentUser} />

      <View>
        <UserProfile
          user={user}
          setPopUpImage={setPopUpImage}
          isCurrentUser={isCurrentUser}
        />
      </View>
      <View>
        <DisplayMenuScreen user={user} onTabSelected={onTabSelected} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container_light: {
    alignItems: "center",
    paddingHorizontal: 50,
    backgroundColor: colors.white,
  },
  container_dark: {
    alignItems: "center",
    paddingHorizontal: 50,
    backgroundColor: colors.black,
  },
});

export default React.memo(ProfileHeader);
