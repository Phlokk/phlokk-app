import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { userAtom } from "../../../../../App";
import { useAtom } from "jotai";
import colors from "../../../../config/colors";
import { updateCreator } from "../../../services/user";
import InfoScreenNav from "../../../components/general/navBar/infoScreenNav";

export default function EditCreatorFieldScreen({ route }) {
  const { title } = route.params;
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState();
  const [user, setUser] = useAtom(userAtom);

  const [categories, setCategories] = useState([
    { id: 1, key: "cat1", value: false, category: "Actor", selected: false },
    {
      id: 2,
      key: "cat2",
      value: false,
      category: "Actress",
      selected: false,
    },
    {
      id: 3,
      key: "cat3",
      value: false,
      category: "Artist",
      selected: false,
    },
    {
      id: 4,
      key: "cat4",
      value: false,
      category: "Athlete",
      selected: false,
    },
    { id: 5, key: "cat5", value: false, category: "Brand", selected: false },
    {
      id: 6,
      key: "cat6",
      value: false,
      category: "Black Sheep",
      selected: false,
    },
    {
      id: 7,
      key: "cat7",
      value: false,
      category: "Comedian",
      selected: false,
    },
    {
      id: 8,
      key: "cat8",
      value: false,
      category: "Cosplay",
      selected: false,
    },
    {
      id: 9,
      key: "cat9",
      value: false,
      category: "Dancer",
      selected: false,
    },
    {
      id: 10,
      key: "cat10",
      value: false,
      category: "Gym & Fitness",
      selected: false,
    },
    {
      id: 11,
      key: "cat11",
      value: false,
      category: "Foodie",
      selected: false,
    },
    {
      id: 12,
      key: "cat12",
      value: false,
      category: "Health & Beauty",
      selected: false,
    },
    {
      id: 13,
      key: "cat13",
      value: false,
      category: "Model",
      selected: false,
    },
    {
      id: 14,
      key: "cat14",
      value: false,
      category: "Musician",
      selected: false,
    },
    {
      id: 15,
      key: "cat15",
      value: false,
      category: "Producer",
      selected: false,
    },
    {
      id: 16,
      key: "cat16",
      value: false,
      category: "Public Figure",
      selected: false,
    },
    {
      id: 17,
      key: "cat17",
      value: false,
      category: "Education",
      selected: false,
    },
    {
      id: 18,
      key: "cat18",
      value: false,
      category: "Watcher",
      selected: false,
    },
    {
      id: 19,
      key: "cat19",
      value: false,
      category: "Youtuber",
      selected: false,
    },
    {
      id: 20,
      key: "cat20",
      value: false,
      category: "Creator",
      selected: false,
    },
  ]);

  const onSave = async () => {
    const updateObject = { creator_type: selectedCategory.category };
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
        leftButton={{ display: true, name: "save", action: onSave }}
      />
      <ScrollView>
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
    color: colors.secondary,
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
    backgroundColor: colors.secondary,
  },
});
