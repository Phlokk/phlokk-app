import { View, Text } from 'react-native'
import React from 'react'
import CustomAlert from '../../components/Alerts/CustomAlert'

const Alert = ({text, open, onClose}) => {
  return (
    <CustomAlert
        alertTitle={
          <Text>
            <Text style={{fontSize:15}}>&#x1F389;</Text>
          </Text>
        }
        customAlertMessage={<Text>{text}</Text>}
        positiveBtn="Ok" 
        modalVisible={open}
        dismissAlert={onClose}
        onPositivePressed={onClose}
        animationType="fade"
      />
  )
}

export default Alert