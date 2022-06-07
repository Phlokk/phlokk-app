import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Divider } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import NavBarGeneral from "../../../components/general/navBar";

import colors from "../../../../config/colors";
import { saveCreatorType } from "../../../services/user";

let categoryId = null;

export default function EditCreatorFieldScreen({ route }) {
  const { title } = route.params;
  const navigation = useNavigation();
  const [categories, setCategories] = useState([
    { id: 1,  category: "Actor", selected: false },
    { id: 2,  category: "Actress", selected: false },
    { id: 3,  category: "Artist", selected: false },
    { id: 4,  category: "Athlete", selected: false },
    { id: 5,  category: "Brand", selected: false },
    { id: 6,  category: "Black Sheep",selected: false},
    { id: 7,  category: "Comedian", selected: false },
    { id: 8,  category: "Cosplay", selected: false },
    { id: 9,  category: "Dancer", selected: false },
    { id: 10, category: "Gym & Fitness",selected: false},
    { id: 11, category: "Foodie", selected: false },
    { id: 12, category: "Health & Beauty",selected: false},
    { id: 13, category: "Model", selected: false },
    { id: 14, category: "Musician",selected: false},
    { id: 15, category: "Producer",selected: false},
    { id: 16, category: "Public Figure",selected: false},
    { id: 17, category: "Education",selected: false},
    { id: 18, category: "Watcher",selected: false},
    { id: 19, category: "Youtuber",selected: false },
  ]);

  const onRadioBtnClick = (item) => {
    categoryId = item.category;

    setCategories(item);

    let updatedState = categories.map((i) =>
      i.id === item.id ? { ...i, selected: true } : { ...i, selected: false }
    );
    // console.log(updatedState);
    setCategories(updatedState);
    onSave();
  };
  


  const onSave = () => {
    saveCreatorType(categoryId)
    .then(() => navigation.goBack());
  };
  

  return (
    <SafeAreaView style={styles.container}>
      <NavBarGeneral
        title={title}
        leftButton={{ display: false, name: "save", action: onSave }}
      />
      <ScrollView>
        {categories.map((item) => (
          <View style={styles.radioButtonContainer} key={item.id}>
            <TouchableOpacity onPress={() => onRadioBtnClick(item)}>
              <Text style={styles.radioButtonText}>{item.category}</Text>
            </TouchableOpacity>
            <View style={{ flex: 1 }}>
            </View>
            <TouchableOpacity
              onPress={
                () => onRadioBtnClick(item)
              }
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
    marginRight: 15,
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

    marginLeft: 16,
  },
  divider: {
    backgroundColor: "gray",
  },
});
