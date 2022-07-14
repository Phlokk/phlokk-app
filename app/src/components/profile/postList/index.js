// import React from "react";
// import { View, FlatList } from "react-native";
// import ProfilePostListItem from "./item";

// export default function ProfilePostList({ posts }) {
//   return (
//     <View>
//       <FlatList
//         showsVerticalScrollIndicator={false}
//         windowSize={4}
//         numColumns={3}
//         initialNumToRender={0}
//         maxToRenderPerBatch={6}
//         removeClippedSubviews
//         snapToAlignment="start"
//         nestedScrollEnabled={false}
//         data={posts}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item, index }) => {
//           return <ProfilePostListItem item={item} index={index} />;
//         }}
//       />
//     </View>
//   );
// }
