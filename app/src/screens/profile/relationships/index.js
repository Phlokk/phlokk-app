import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import colors from "../../../../config/colors";
import saveRelationshipField from "../../../services/user";
import InfoScreenNav from "../../../components/general/navBar/infoScreenNav";
import { userAtom } from "../../../../../App";
import { useAtom } from "jotai";
import { updateCreator } from "../../../services/user";


export default function RelationshipCategoryScreen({ route, props }) {
  const { title } = route.params;
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState();
  const [user, setUser] = useAtom(userAtom);

  const [categories, setCategories] = useState([
    {id: 1,key: "cat1", value: false, category: "Single",selected: false},
    {id: 2, key: "cat2", value: false, category: "Married",selected: false},
    {id: 3, key: "cat3", value: false, category: "Taken",selected: false},
    {id: 4, key: "cat4", value: false,category: "Looking",selected: false},
    {id: 5, key: "cat5", value: false, category: "Divorced",selected: false},
    {id: 6, key: "cat6", value: false, category: "Widow",selected: false},
  ]);


  const onSave = async () => {
    const updateObject = { relationship_type: selectedCategory.id };
    try {
      await updateCreator(updateObject);
      const updatedUser = { ...user, ...updateObject };
      setUser(updatedUser);
      navigation.goBack();
    } catch (error) {
      console.log(error);
      Alert.alert("Data not saved, please check user data");
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      <InfoScreenNav
        title={title}
        // changed left button to false (white)
        leftButton={{ display: true, name: "save", action: onSave }}
      />
      <View style={styles.reportView}>
      {categories.map((item) => (
              <View style={styles.radioButtonContainer} key={item.id}>
                <TouchableOpacity onPress={() => onRadioBtnClick(item)}>
                  <Text style={styles.radioButtonText}>{item.category}</Text>
                </TouchableOpacity>
                <View style={{ flex: 1 }}></View>
                <TouchableOpacity
                  onPress={() => setSelectedCategory(item)}
                  style={styles.radioButton}
                >
                  {selectedCategory?.id === item.id && (
                    <View style={styles.radioButtonIcon} />
                  )}
                </TouchableOpacity>
              </View>
            ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  text: {
    color: colors.white,
    marginBottom: 10,
    fontSize: 16,
  },
  title: {
    color: "gray",
  },
  reportView: {
    marginTop: 30,
    padding: 10,
  },
  infoView: {
    paddingHorizontal: 20,
  },
  radioButtonContainer: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    marginRight: 5,
    marginHorizontal: 5,
  },
  radioButton: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.secondary,
    alignItems: "center",
    justifyContent: "center",
  },
  radioButtonIcon: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: colors.green,
  },
  radioButtonText: {
    color: colors.secondary,
    fontSize: 14,

    marginLeft: 5,
  },
});
