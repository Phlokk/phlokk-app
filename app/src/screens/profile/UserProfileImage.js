import { View, Modal, Image,  StyleSheet,Pressable } from 'react-native'
import React from 'react'
import colors from '../../../config/colors';
import { useTheme } from "../../theme/context";
const UserProfileImage = ({visible, setIsVisible, imageUrl = null}) => {
  const { theme } = useTheme();
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.pressedModal}>
        <Pressable style={styles.pressedStyle} onPress={setIsVisible} />
        <View
          style={
            theme == "light" ? styles.container_light : styles.container_dark
          }
        > 
        <Image 
        style={styles.profileImage}
        source={{uri: imageUrl }}
        />
        </View>
      </View>
    </Modal>
  )
}
const styles = StyleSheet.create({
  container_light: {
    padding: 10,
    backgroundColor: colors.white,
    height: "70%",
    alignItems:"center",
    justifyContent:"center"
  },
  container_dark: {
    padding: 10,
    backgroundColor: colors.primary,
    height: "70%",
    alignItems:"center",
    justifyContent:"center"
  },
  profileImage:{
    width: 250,
    height: 250,
    borderRadius: 3,
    alignItems:"center",
  },
  pressedStyle: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  pressedModal: {
    flex: 1,
    justifyContent: "flex-end",
  }, 
  
});
export default UserProfileImage