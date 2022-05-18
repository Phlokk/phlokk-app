import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NavBarGeneral from "../../../components/general/navBar";

import colors from "../../../../config/colors";
import saveCreatorField from "../../../services/user";

let categoryId = null;

export default function EditCreatorFieldScreen({ route, props }) {
  const [categories, setCategories] = useState([
    { id: 1, value: false, category: "Actor", selected: false },
    { id: 2, value: false, category: "Actress", selected: false },
    { id: 3, value: false, category: "Artist", selected: false },
    { id: 4, value: false, category: "Athlete", selected: false },
    { id: 5, value: false, category: "Brand", selected: false },
    {
      id: 6,
      value: false,
      category: "Black Sheep",
      selected: false,
    },
    { id: 7, value: false, category: "Comedian", selected: false },
    { id: 8, value: false, category: "Cosplay", selected: false },
    { id: 9, value: false, category: "Dancer", selected: false },
    {
      id: 10,
      value: false,
      category: "Gym & Fitness",
      selected: false,
    },
    { id: 11, value: false, category: "Foodie", selected: false },
    {
      id: 12,
      value: false,
      category: "Health & Beauty",
      selected: false,
    },
    { id: 13, value: false, category: "Model", selected: false },
    {
      id: 14,
      value: false,
      category: "Musician",
      selected: false,
    },
    {
      id: 15,
      value: false,
      category: "Producer",
      selected: false,
    },
    {
      id: 16,
      value: true,
      category: "Public Figure",
      selected: false,
    },
    {
      id: 17,
      value: true,
      category: "Education",
      selected: false,
    },
    {
      id: 18,
      value: false,
      category: "Watcher",
      selected: false,
    },
    {
      id: 19,
      value: false,
      category: "Youtuber",
      selected: false,
    },
  ]);

  const onRadioBtnClick = (item) => {
    console.log("radio click");
    console.log(item);
    categoryId = item.id;

    setCategories(item);

    let updatedState = categories.map((i) =>
      i.id === item.id ? { ...i, selected: true } : { ...i, selected: false }
    );
    setCategories(updatedState);
  };

  const onSave = () => {
    saveCreatorField(field, id).then(() => navigation.goBack());
  };
  const { title, field, value, id } = route.params;
  const navigation = useNavigation();

  console.log(id)

  return (
    <SafeAreaView style={styles.container}>
      <NavBarGeneral
        title={title}
        // changed left button to false (white)
        leftButton={{ display: false, name: "save", action: onSave }}
      />
      <ScrollView>
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
      </ScrollView>
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
