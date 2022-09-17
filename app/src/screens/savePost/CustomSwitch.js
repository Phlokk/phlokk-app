import React, { useState } from "react";
import { Text, View, Switch, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import colors from "../../../config/colors";

function CustomSwitch() {
  const [publicTog, setPublic] = useState(false);
  const [privateTog, setPrivate] = useState(false);
  const [comments, setComments] = useState(false);
  const [market, setMarket] = useState(false);
  const [duets, setDuets] = useState(false);
  const [reviews, setReviews] = useState(false);

  const togglePublic = () => {
    setPublic((previousState) => !previousState);
  };
  const togglePrivate = () => {
    setPrivate((previousState) => !previousState);
  };
  const toggleComments = () => {
    setComments((previousState) => !previousState);
  };
  const toggleMarket = () => {
    setMarket((previousState) => !previousState);
  };
  const toggleDuets = () => {
    setDuets((previousState) => !previousState);
  };
  const toggleReviews = () => {
    setReviews((previousState) => !previousState);
  };

  return (
    <View style={styles.fieldsContainer}>
      <View style={styles.postRowContainer}>
        <View
          style={styles.fieldItemContainer}
          autoCapitalize="none"
          // onPress={() =>
          //   navigation.navigate("editUserPost", {
          //     title: "Edit post",
          //   })
          // }
        >
          <Text style={styles.settingsText}>
            <Octicons
              style={styles.icons}
              name="globe"
              size={12}
              color={colors.white}
            />{" "}
            Post Public
          </Text>
          <View style={styles.fieldValueContainer}>
            <Switch
              style={styles.switch}
              trackColor={{ false: "grey", true: colors.green }}
              thumbColor={{false:  "f4f3f4", true: "f4f3f4"}}
              onValueChange={togglePublic}
              value={publicTog}
            />
          </View>
        </View>
        <View
          style={styles.fieldItemContainer}
          autoCapitalize="none"
          // onPress={() =>
          //   navigation.navigate("editUserPost", {
          //     title: "Edit post",
          //   })
          // }
        >
          <Text style={styles.settingsText}>
            <FontAwesome name="lock" size={14} color={colors.white} /> Post
            Private
          </Text>
          <View style={styles.fieldValueContainer}>
            <Switch
              style={styles.switch}
              trackColor={{ false: "grey", true: colors.green }}
              thumbColor={{false: "f4f3f4", true: "f4f3f4"}}
              onValueChange={togglePrivate}
              value={privateTog}
            />
          </View>
        </View>
      </View>
      <View style={styles.commentRowContainer}>
        <View
          style={styles.fieldItemContainer}
          autoCapitalize="none"
          // onPress={() =>
          //   navigation.navigate("editUserPost", {
          //     title: "Edit post",
          //   })
          // }
        >
          <Text style={styles.settingsText}>
            <Feather
              style={styles.shareIcon}
              name="message-circle"
              size={12}
              color={colors.white}
            />{" "}
            Comments
          </Text>
          <View style={styles.fieldValueContainer}>
            <Switch
              style={styles.switch}
              trackColor={{ false: "grey", true: colors.green }}
              thumbColor={{false: "f4f3f4", true: "f4f3f4"}}
              onValueChange={toggleComments}
              value={comments}
            />
          </View>
        </View>

        <View
          style={styles.fieldItemContainer}
          autoCapitalize="none"
          // onPress={() =>
          //   navigation.navigate("editUserPost", {
          //     title: "Edit post",
          //   })
          // }
        >
          <Text style={styles.settingsText}>
            <MaterialCommunityIcons
              name="account-box-multiple-outline"
              size={13}
              color={colors.white}
            />{" "}
            Duets ON
          </Text>
          <View style={styles.fieldValueContainer}>
            <Switch
              style={styles.switch}
              trackColor={{ false: "grey", true: colors.green }}
              thumbColor={{false: "f4f3f4", true: "f4f3f4"}}
              onValueChange={toggleDuets}
              value={duets}
            />
          </View>
        </View>
      </View>
      <View style={styles.marketRowContainer}>
        <View
          style={styles.fieldItemContainer}
          autoCapitalize="none"
          // onPress={() =>
          //   navigation.navigate("editUserPost", {
          //     title: "Edit post",
          //   })
          // }
        >
          <Text style={styles.settingsText}>
            <Entypo name="shop" size={12} color={colors.white} />
             Post Market
          </Text>
          <View style={styles.fieldValueContainer}>
            <Switch
              style={styles.switch}
              trackColor={{ false: "grey", true: colors.green }}
              thumbColor={{false: "f4f3f4", true: "f4f3f4"}}
              onValueChange={toggleMarket}
              value={market}
            />
          </View>
        </View>
        <View
          style={styles.fieldItemContainer}
          autoCapitalize="none"
          // onPress={() =>
          //   navigation.navigate("editUserPost", {
          //     title: "Edit post",
          //   })
          // }
        >
          <Text style={styles.settingsText}>
            <Entypo name="shop" size={12} color={colors.white} /> Reviews
          </Text>
          <View style={styles.fieldValueContainer}>
            <Switch
              style={styles.switch}
              trackColor={{ false: "grey", true: colors.green }}
              thumbColor={{false: "f4f3f4", true: "f4f3f4"}}
              onValueChange={toggleReviews}
              value={reviews}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    
  fieldItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 50,
    fontSize: 12,
  },
  postRowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  commentRowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  marketRowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
//   
  fieldValueContainer: {
    marginRight: 10,
  },  

  shareContainer: {
    flexDirection: "row",
    top: 30,
  },
  settingsText: {
    color: colors.secondary,
    fontSize: 12,
    marginLeft: 20,
    marginHorizontal: 8,
    opacity: 0.9,
  }
});

export default CustomSwitch;
