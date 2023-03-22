import React from 'react'
import { FlatList} from 'react-native';
import SearchUserItem from '../../components/search/userItem/SearchUserItem';

const SearchUsers = ({result = []}) => {
  return (
    <FlatList
        data={result}
        renderItem={({ item }) => <SearchUserItem item={item} />}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
      />
  )
}

export default SearchUsers