import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import * as SecureStore from "expo-secure-store";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import NavBarGeneral from "../../../components/general/navBar";
import routes from "../../../navigation/routes";
import colors from "../../../../config/colors";
import FormData from "form-data";
// import { saveUserField } from "../../../services/user";
import { useFocusEffect } from '@react-navigation/native';
import { fetchMarketCreatorData} from "../../../redux/actions/creators";
import MarketProfileNavBar from "../../../components/general/profileNavBar/market/marketProfileNav";



export default function SellerDashboardScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const isFocused = useIsFocused();
  const creators = useSelector((state) => state.creatorReducer.creator);


  // useFocusEffect(
  //     React.useCallback(() => {
  //       dispatch(fetchMarketCreatorData());
  //     }, [])
  // );

  // useEffect(() => {
  //   dispatch(fetchMarketCreatorData());
  // }, [dispatch]);

 

 

  const chooseImage = async () => {

    console.log("START UPLOADING...");
    let user = await SecureStore.getItemAsync("user");
    user = JSON.parse(user);
    console.log(user.token);

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }

    const formData = new FormData();
    formData.append("market_photo_url", {
      name: "market_photo_url",
      uri: result.uri,
      type: "image/png",
    });

    let res = await fetch("https://phlokk.com/api/market/profile", {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${user.token}`,
        ContentType: "application/json",
      },
    }).catch((err) => {
      console.log(err);
    });

    console.log(formData);
    console.log("The status was", +res.status);
    let test = await res.json();
    console.log(test);
    console.log("RESULT -------------------->");
  };

  const onSave = () => {
    saveUserField(field, textInputValue).then(() => navigation.goBack());
  };

  return (
    <View style={styles.container}>
      <MarketProfileNavBar
        title="Market profile"
        leftButton={{ display: false, name: "save", action: onSave }}
      />
      <View style={styles.imageContainer}>
        {creators.market_photo_url !== null ? (
          <TouchableOpacity
            style={styles.imageViewContainer}
            onPress={() => chooseImage()}
          >
            {creators &&
              creators.map((creator, i) => (
                <Image
                  style={styles.image}
                  key={i}
                  source={{ uri: image ? image : creator.market_photo_url }}
                />
              ))}

            <View style={styles.imageOverlay} />

            <Feather name="camera" size={26} color={colors.white} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.imageViewContainer}
            onPress={() => chooseImage()}
          >
            <Image
              style={styles.image}
              source={require("../../../../assets/userImage.png")}
            />
            <View style={styles.imageOverlay} />
            <Feather name="camera" size={26} color={colors.white} />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.fieldsContainer}>
        {creators &&
          creators.map((creator, i) => (
            <TouchableOpacity
              style={styles.fieldItemContainer}
              key={i}
              autoCapitalize="none"
              onPress={() =>
                navigation.navigate(routes.ADMISSION, {
                  title: "Admission Fee",
                  field: "admission_fee",
                  value: creator.admission_fee,
                  // userId: user.id
                })
              }
            >
              <Text numberOfLines={1} style={styles.text}>
                Admission
              </Text>
              <View style={styles.fieldValueContainer}>
                    <Text style={styles.text} key={i}>
                       {creator.admission_fee}
                    </Text>
                <Feather name="chevron-right" size={28} color={colors.white} />
              </View>
            </TouchableOpacity>
          ))}

        {creators &&
          creators.map((creator, i) => (
            <TouchableOpacity
              style={styles.fieldItemContainer}
              key={i}
              autoCapitalize="none"
              onPress={() =>
                navigation.navigate(routes.BUY_LINK, {
                  title: "Buy Link",
                  field: "buy_link",
                  value: creator.buy_link,
                  
                })
              }
            >
              <Text style={styles.text}>Buy Link</Text>
              <View style={styles.fieldValueContainer}>
                    <Text numberOfLines={1} style={styles.text} key={i}>
                      {creator.buy_link}
                    </Text>
                <Feather name="chevron-right" size={28} color={colors.white} />
              </View>
            </TouchableOpacity>
          ))}

        {creators &&
          creators.map((creator, i) => (
            <TouchableOpacity
              style={styles.fieldItemContainer}
              key={i}
              autoCapitalize="none"
              onPress={() =>
                navigation.navigate(routes.DONATION, {
                  title: "Donation Lin",
                  field: "donation_link",
                  value: creator.donation_link,
                  
                })
              }
            >
              <Text style={styles.text}>Donation</Text>
              <View style={styles.fieldValueContainer}>
                    <Text numberOfLines={1} style={styles.text} key={i}>
                      {creator.donation_link}
                    </Text>
                <Feather name="chevron-right" size={28} color={colors.white} />
              </View>
            </TouchableOpacity>
          ))}

        {creators &&
          creators.map((creator, i) => (
            <TouchableOpacity
              style={styles.fieldItemContainer}
              key={i}
              autoCapitalize="none"
              onPress={() =>
                navigation.navigate(routes.REVIEWS, {
                  title: "Reviews",
                  field: "reviews",
                  value: creator.market_reviews,
                  
                })
              }
            >
              <Text style={styles.text}>Reviews</Text>
              <View style={styles.fieldValueContainer}>          
                    <Text numberOfLines={1} style={styles.text} key={i}>
                      {creator.market_reviews}
                    </Text>
                <Feather name="chevron-right" size={28} color={colors.white} />
              </View>
            </TouchableOpacity>
          ))}

        {creators &&
          creators.map((creator, i) => (
            <TouchableOpacity
              style={styles.fieldItemContainer}
              key={i}
              autoCapitalize="none"
              onPress={() =>
                navigation.navigate(routes.ADS, {
                  title: "Ad Account",
                  field: "ad_account",
                  value: creator.campaign_account,
                  
                })
              }
            >
              <Text style={styles.text}>Campaign Account</Text>
              <View style={styles.fieldValueContainer}>
                    <Text numberOfLines={1} style={styles.text} key={i}>
                      {creator.campaign_account}
                    </Text>
                <Feather name="chevron-right" size={28} color={colors.white} />
              </View>
            </TouchableOpacity>
          ))}

        
        {creators &&
          creators.map((creator, i) => (
            <TouchableOpacity
              style={styles.fieldItemContainer}
              key={i}
              autoCapitalize="none"
              onPress={() =>
                navigation.navigate(routes.SUBSCRIPTIONS, {
                  title: "Subscriptions",
                  field: "subscriptions",
                  value: creator.subscriptions,
                  
                })
              }
            >
              <Text style={styles.text}>Subscriptions</Text>
              {creators.subscriptions === null || undefined ? (
                <View style={styles.fieldValueContainer}>
                  <Text numberOfLines={1} style={styles.text}>
                    Add Subscription
                  </Text>
                  <Feather
                    name="chevron-right"
                    size={28}
                    color={colors.white}
                  />
                </View>
              ) : (
                <View>
                  <Text numberOfLines={1} style={styles.text}></Text>
                  <Feather name="check-circle" size={16} color={colors.green} />
                </View>
              )}
            </TouchableOpacity>
          ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingTop: 25,
  },
  imageContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  imageViewContainer: {
    backgroundColor: "gray",
    height: 100,
    width: 100,
    borderRadius: 50,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: 100,
    width: 100,
    position: "absolute",
  },
  imageOverlay: {
    backgroundColor: "rgba(0,0,0, 0.5)",
    ...StyleSheet.absoluteFill,
  },

  fieldsContainer: {
    marginTop: 20,
    padding: 20,
    flex: 1,
  },
  fieldItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    fontSize: 12,
  },
  fieldValueContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    color: colors.white,
    fontSize: 12,
  },
  authText: {
    color: colors.white,
  },
  avatar: {
    height: 100,
    width: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "lightgray",
  },
});
