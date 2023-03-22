import { View ,StyleSheet, FlatList } from 'react-native';
import React from 'react'
import SearchVideoItem from '../../components/search/SearchVideoItem';
import colors from "../../../config/colors";

const SearchVideos = ({result = []}) => {
  return ( 
    <View style={styles.container}>
       <FlatList
        data={result.data}
        renderItem={({ item }) => <SearchVideoItem item={item} />}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        numColumns = {2}
      />
    </View>
  )
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    margin: 5,
  },
});


export default SearchVideos