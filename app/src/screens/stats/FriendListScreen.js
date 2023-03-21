import React, {useCallback, useEffect, useState} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {
	StyleSheet,
	FlatList,
	View,
} from 'react-native';
// import uuid from 'uuid-random';
import colors from '../../../config/colors';
import {SafeAreaView} from 'react-native-safe-area-context';
import StatsNavBar from '../../components/general/profileNavBar/StatsNavBar';
import FriendListItem from "./FriendListItem";
import {getFriends} from "../../services/user";

// import SearchFollowing from './SearchFollowing';


export default function FriendListScreen({route}) {

	const {user,isCurrentUser} = route.params;

	const [friendsList, setFriendsList] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [pageSize, setPageSize] = useState({});
	const [pageNumber, setPageNumber] = useState(1);
	const [currentItemIndex, setCurrentItemIndex] = useState(0);
	const [hasNextPage, setHasNextPage] = useState(1);
	const isFocused = useIsFocused();

	

	const getFriendsList = async () => {
		console.log(hasNextPage, "has next page", pageNumber);
		
		if(hasNextPage) {
			const friends = await getFriends(pageNumber);
			console.log(friends.hasOwnProperty('next_page_number'), pageNumber, "asdf");
			friends.hasOwnProperty('next_page_number')? setHasNextPage(1):setHasNextPage(0) ;
			
					console.log("list of followers ===> ", friends.data.length)
					let newList = [...friendsList, ...friends.data]
					setFriendsList(newList);
					setPageNumber(pageNumber+1);
		}
	}

	useEffect(async () => {
		//const getFollowerList = async () => {
			setIsLoading(true);
console.log(isCurrentUser, "curent user")
		await getFriendsList();
			// if(isCurrentUser) {
			// 	const followers = await getFollowers();
			// 	console.log("list of followers ===> ", followers.length)
			// 	setFollowersList(followers);
			 	setIsLoading(false);
			// } 
		//};

		//if (isFocused) {
		//	await getFollowerList();
		//}
	}, []);

	

	const renderItem = useCallback(({item, index}) => {
		return (
			<FriendListItem item={item} index={index} />
		)
	})

	return (
		<SafeAreaView style={styles.container}>
			
			<StatsNavBar title="Friends" />
			{/* <SearchFollowing placeholder={placeholder} /> */}
			{console.log("friends form return ==> ", friendsList.length)}
			
			<FlatList
				data={friendsList}
				renderItem={renderItem}
				keyExtractor={(item) => item.id.toString()}
				showsVerticalScrollIndicator={false}
				initialNumToRender={20}
				onEndReachedThreshold={0.5}
				onEndReached={console.log('end')}
				onRefresh={console.log('refresh')}
			/>

			
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.primary,
	},
});
