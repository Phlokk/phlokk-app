import { View ,StyleSheet, FlatList } from 'react-native';
import React from 'react'
import SearchVideoItem from '../../components/search/SearchVideoItem';

const SearchVideos = ({result = [], setPlayVideo, setResult}) => {
  return ( 
    <View style={styles.container}>
       <FlatList
        data={result.data}
        renderItem={({ item, index }) => <SearchVideoItem item={item} index={index} setPlayVideo={setPlayVideo} setResult={setResult}/>}
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