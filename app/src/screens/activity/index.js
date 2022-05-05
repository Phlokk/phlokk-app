import React, { useEffect } from "react";
import ActivityNavBar from "../../components/general/activityNav";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { getUsers} from "../../redux/actions/users"

import colors from "../../../config/colors";

export default function ActivityScreen({ navigation }) {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users.users);


  useEffect(() => {
     dispatch(getUsers());
  }, []);


  return (
    <View style={styles.container}>
      <ActivityNavBar title={"Activity feed"} />
      <View>
        {users.map(user, i => <Text key={i} style={styles.text}>{user.name}</Text>)}
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  userContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  activityContainer: {
    flex: 1,
  },
  text: {
    color: colors.white,
    marginTop: 30,
  },
});
