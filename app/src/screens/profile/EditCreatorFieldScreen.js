import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { userAtom } from "../../../../App";
import { useAtom } from "jotai";
import colors from "../../../config/colors";
import { updateCreator } from "../../services/user";
import InfoScreenNav from "../../components/general/navBar/InfoScreenNav";
import { useTheme } from "../../theme/context";

export default function EditCreatorFieldScreen({ route }) {
  const { theme, setTheme } = useTheme();

  const { title, value } = route.params;
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState();
  const [user, setUser] = useAtom(userAtom);

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setCategories(initializeCategories());
    setSelectedCategory(categories.find(cat => cat.selected))
  }, []);

  const initializeCategories = () => {
    const options = [
      "Actor",
      "Actress",
      "Artist",
      "Athlete",
      "Attorney",
      "Brand",
      "Black Sheep",
      "Comedian",
      "Cosplay",
      "Creator",
      "Dancer",
      "Developer",
      "Entertainer",
      "Entrepreneur",
      "Gym & Fitness",
      "Foodie",
      "Health & Beauty",
      "Influencer",
      "Law Enforcement",
      "Model",
      "Musician",
      "Producer",
      "Promoter",
      "Public Figure",
      "Teacher",
      "Watcher",
      "Youtuber",
    ];

    return options.map((category, index) => {
      return {
        id: index,
        key: `cat${index + 1}`,
        category: category,
        selected: value === category
      }
      });
    };



  const onSave = async () => {
    const updateObject = { creator_type: selectedCategory.category };
    try {
      await updateCreator(updateObject);
      const updatedUser = { ...user, ...updateObject };
      setUser(updatedUser);
      navigation.goBack();
    } catch (error) {
      Alert.alert("Data not saved, please check user data");
    }
  };

  return (
    <SafeAreaView
      style={theme == "light" ? styles.container_light : styles.container_dark}
    >
      <InfoScreenNav
        title={title}
        leftButton={{ display: true, name: "save", action: onSave }}
      />
      <ScrollView>
        {categories.map((item) => (
          <View style={styles.radioButtonContainer} key={item.id}>
            <Text
              style={
                theme == "light"
                  ? styles.radioButtonText_light
                  : styles.radioButtonText_dark
              }
            >
              {item.category}
            </Text>
            <View style={{ flex: 1 }}></View>
            <TouchableOpacity
              onPress={() => setSelectedCategory(item)}
              style={
                theme == "light"
                  ? styles.radioButton_light
                  : styles.radioButton_dark
              }
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
  container_light: {
    flex: 1,
    backgroundColor: colors.white,
  },
  container_dark: {
    flex: 1,
    backgroundColor: colors.black,
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
    opacity: 0.9,
  },
  radioButton_light: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.grey,
    alignItems: "center",
    justifyContent: "center",
  },
  radioButton_dark: {
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
  radioButtonText_light: {
    color: colors.black,
    fontSize: 12,
    marginLeft: 16,
  },
  radioButtonText_dark: {
    color: colors.secondary,
    fontSize: 12,
    marginLeft: 16,
  },
});
