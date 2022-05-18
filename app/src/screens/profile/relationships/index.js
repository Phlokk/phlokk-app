import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NavBarGeneral from "../../../components/general/navBar";

import colors from "../../../../config/colors";
import saveRelationshipField from "../../../services/user";

let categoryId = null;

export default function RelationshipCategoryScreen({ route, props }) {
  const [categories, setCategories] = useState([
    {
      id: 1,
      value: false,
      category: "Single",
      selected: false,
    },
    {
      id: 2,
      value: false,
      category: "Married",
      selected: false,
    },
    {
      id: 3,
      value: false,
      category: "Taken",
      selected: false,
    },
    {
      id: 4,
      value: false,
      category: "Looking",
      selected: false,
    },
    {
      id: 5,
      value: false,
      category: "Divorced",
      selected: false,
    },
    {
      id: 6,
      value: false,
      category: "Widow",
      selected: false,
    },
  ]);

  const { title, field, value, id } = route.params;
  const navigation = useNavigation();
  const onSave = () => {
    saveRelationshipField(field, textInputValue, id).then(() =>
      navigation.goBack()
    );
  };

  console.log(id)

  const onRadioBtnClick = (item) => {
    console.log("radio click");
    console.log(item);
    categoryId = item.id;
    // item.selected = item.selected ? false : true;
    setCategories(item);

    let updatedState = categories.map((i) =>
      i.id === item.id ? { ...i, selected: true } : { ...i, selected: false }
    );
    setCategories(updatedState);
  };

  return (
    <SafeAreaView style={styles.container}>
      <NavBarGeneral
        title={title}
        // changed left button to false (white)
        leftButton={{ display: false, name: "save", action: onSave }}
      />
      <View style={styles.reportView}>
        {categories.map((item) => (
          <View style={styles.radioButtonContainer} key={item.id}>
            <TouchableOpacity onPress={() => onRadioBtnClick(item)}>
              <Text style={styles.radioButtonText}>{item.category}</Text>
            </TouchableOpacity>
            <View style={{ flex: 1 }}></View>
            <TouchableOpacity
              onPress={() => onRadioBtnClick(item)}
              style={styles.radioButton}
            >
              {item.selected ? <View style={styles.radioButtonIcon} /> : null}
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
    marginRight: 45,
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
    backgroundColor: colors.red,
  },
  radioButtonText: {
    color: colors.secondary,
    fontSize: 14,

    marginLeft: 16,
  },
});
