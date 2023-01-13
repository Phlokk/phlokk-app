import React, { useState } from 'react'
import { View, Text } from 'react-native'
import axios from './axiosDeclaration';
import CustomAlert from "../../components/Alerts/CustomAlert";

export const getAllUsers = async (data) => {


  try {
    let users;
    if (data.payload instanceof Array && data.payload.length > 0) {
      users = await axios.post('api/me/filter', data.payload);
    } else {
      users = await axios.get('api/me');
    }

    return [users.data.user];
  } catch (err) {
    return setIsGetAllUsers(true);
  }
};


export const getAllMarketCreators = async () => {

  try {
    const creators = await axios.get('api/market/creators');
    return creators.data;
  } catch (err) {
    return setIsGetAllMarketUsers(true);
  }
};



const contactApi = () => {
  const [isGetAllMarketUsers, setIsGetAllMarketUsers] = useState(false);
  const [isGetAllUsers, setIsGetAllUsers] = useState(false);

  return (
    <View>
      <Text>contactApi</Text>
      <CustomAlert
            alertTitle={
              <Text>
                <MaterialIcons name="info" size={24} color={colors.green} />
              </Text>
            }
            customAlertMessage={<Text>Could not fetch users!</Text>}
            positiveBtn="Ok"
            modalVisible={isGetAllUsers}
            dismissAlert={setIsGetAllUsers}
            animationType="fade"
          />
          <CustomAlert
            alertTitle={
              <Text>
                <MaterialIcons name="info" size={24} color={colors.green} />
              </Text>
            }
            customAlertMessage={<Text>Could not fetch market users!</Text>}
            positiveBtn="Ok"
            modalVisible={isGetAllMarketUsers}
            dismissAlert={setIsGetAllMarketUsers}
            animationType="fade"
          />
    </View>
  )
}

export default contactApi






