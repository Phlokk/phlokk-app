// import React, { useEffect, useRef, useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Pressable,
//   StyleSheet,
//   SafeAreaView,
// } from "react-native";
// import { useIsFocused } from "@react-navigation/core";
// import { Feather } from "@expo/vector-icons";
// import { useNavigation } from "@react-navigation/native";
// import BottomMenu from "./BottomMenu";
// import colors from "../../../config/colors";
// import routes from "../../navigation/routes";

// export default function EditPostsScreen(sourceThumb, uri) {
//   const isFocused = useIsFocused();
//   const navigation = useNavigation();

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity
//         style={{ position: "absolute", top: 50, right: 360 }}
//         onPress={() =>
//           navigation.navigate(routes.SAVE_POST, {
//             // source: uri,
//             sourceThumb,
//           })
//         }
//       >
//         <Feather name="x" size={25} color={colors.black} />
//       </TouchableOpacity>

//       <View style={styles.bottomBarContainer}>
//         <BottomMenu />
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   bottomBarContainer: {
//     backgroundColor: colors.danger,
//     flex: 1,
//     position: "absolute",
//     bottom: 120,
//     flexDirection: "row",
//     alignItems: "center",
//   },

//   sideBarContainer: {
//     top: 48,
//     right: 0,
//     marginHorizontal: 20,
//     position: "absolute",
//   },
//   iconText: {
//     color: colors.white,
//     fontSize: 8,
//     marginTop: 1,
//   },
//   sideBarButton: {
//     alignItems: "center",
//     marginBottom: 25,
//   },
//   soundText: {
//     color: colors.white,
//   },
//   errorView: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",

//     backgroundColor: colors.primary,
//   },
//   cameraErrorText: {
//     margin: 20,
//     textAlign: "center",
//     color: colors.green,
//   },
// });
