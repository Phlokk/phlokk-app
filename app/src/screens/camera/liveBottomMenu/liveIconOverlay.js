import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
  } from "react-native";
  import React, { useEffect, useState } from "react";
  import { useNavigation } from "@react-navigation/native";
  import colors from "../../../../config/colors";
  import { Octicons } from "@expo/vector-icons";
  import { Entypo } from '@expo/vector-icons'; 
  import { MaterialIcons } from "@expo/vector-icons";
  import { Ionicons } from '@expo/vector-icons'; 
  import { MaterialCommunityIcons } from '@expo/vector-icons'; 
  import CustomAlert from "../../../components/Alerts/customAlert";
  import routes from '../../../navigation/routes'
  
  function LiveIconOverlay() {
    const navigation = useNavigation();
  
    const [isMarketLive, setIsMarketLive] = useState(false);
    const [fX, setFx] = useState(false);
    const [isSettings, setIsSettings] = useState(false);
    const [isPPV, setIsPPV] = useState(false);
    const [isFilters, setIsFilters] = useState(false);




  
    return (
      <View style={styles.iconRow}>
        <ScrollView horizontal={true}>
          <CustomAlert
            alertTitle={
              <Text>
                <MaterialIcons name="info" size={24} color={colors.green} />
              </Text>
            }
            customAlertMessage={<Text>Phlokk Market LIVE{"\n"}coming in official release</Text>}
            positiveBtn="Ok"
            modalVisible={isMarketLive}
            dismissAlert={setIsMarketLive}
            animationType="fade"
          />
          <TouchableOpacity
            style={styles.sideBarButton}
            onPress={() => setIsMarketLive(true)}
          >
            <Entypo name="shop" size={24} color={colors.white} />
            <Text style={styles.iconText}>LIVE</Text>
          </TouchableOpacity>


          <CustomAlert
            alertTitle={
              <Text>
                <MaterialIcons name="info" size={24} color={colors.green} />
              </Text>
            }
            customAlertMessage={<Text>Pay-Per-View{"\n"}coming in official release</Text>}
            positiveBtn="Ok"
            modalVisible={isPPV}
            dismissAlert={setIsPPV}
            animationType="fade"
          />
          <TouchableOpacity
            style={styles.sideBarButton}
            onPress={() => setIsPPV(true)}
          >
              <MaterialCommunityIcons name="door-closed-lock" size={24} color={colors.white} />

            <Text style={styles.iconText}>PPV</Text>
          </TouchableOpacity>

          <CustomAlert
            alertTitle={
              <Text>
                <MaterialIcons name="info" size={24} color={colors.green} />
              </Text>
            }
            customAlertMessage={<Text>Filters{"\n"}coming in official release</Text>}
            positiveBtn="Ok"
            modalVisible={isFilters}
            dismissAlert={setIsFilters}
            animationType="fade"
          />
          <TouchableOpacity
            style={styles.sideBarButton}
            onPress={() => setIsFilters(true)}
          >
            <Entypo name="adjust" size={24} color={colors.white} />
            <Text style={styles.iconText}>Filters</Text>
          </TouchableOpacity>

          <CustomAlert
            alertTitle={
              <Text>
                <MaterialIcons name="info" size={24} color={colors.green} />
              </Text>
            }
            customAlertMessage={<Text>Settings{"\n"}coming in official release</Text>}
            positiveBtn="Ok"
            modalVisible={isSettings}
            dismissAlert={setIsSettings}
            animationType="fade"
          />
          <TouchableOpacity
            style={styles.sideBarButton}
            onPress={() => setIsSettings(true)}
          >
            <Ionicons
          name="settings-sharp"
          size={27}
          color={colors.white}
        />
            <Text style={styles.iconText}>Settings</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }


  
  const styles = StyleSheet.create({
    iconRow: {
      justifyContent: "space-evenly",
      alignItems: "center",
      flex: 1,
      paddingTop: 20,
    },
    iconText: {
      color: colors.white,
      fontSize: 7,
      marginTop: 1,
    },
    sideBarButton: {
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 20,
    },
    backBtn: {
      justifyContent: "center",
    },
  });
  
  export default LiveIconOverlay;