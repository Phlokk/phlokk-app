import React, {useCallback, useEffect, useState} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {
	StyleSheet,
	FlatList,
	View,
} from 'react-native';
import uuid from 'uuid-random';
import colors from '../../../config/colors';
import {SafeAreaView} from 'react-native-safe-area-context';
import StatsNavBar from '../../components/general/profileNavBar/StatsNavBar';
import FollowingListItem from "./FollowingListItem";
import {getFollowers} from "../../services/user";
import * as SecureStore from "expo-secure-store";

// import SearchFollowing from './SearchFollowing';


export default function FollowingListScreen({route}) {

	const {user,isCurrentUser} = route.params;

	const [followersList, setFollowersList] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [pageSize, setPageSize] = useState({});
	const [pageNumber, setPageNumber] = useState(1);
	const [currentItemIndex, setCurrentItemIndex] = useState(0);
	const [hasNextPage, setHasNextPage] = useState(1);
	const [loggedInUserFollowingList, setLoggedInUserFollowingList] = useState(
		[]
	);
	const isFocused = useIsFocused();
	const getCurrentUser = async () => {
		const chunkSize = 50;
		let followingList = [];
		let i = 0;
		while (true) {
			const chunkKey = `followingList-${i}`;
			const chunkData = await SecureStore.getItemAsync(chunkKey);
			if (!chunkData) {
				break;
			}
			const chunkArray = JSON.parse(chunkData);
			followingList = [...followingList, ...chunkArray];
			i++;
		}
		// setIsFollowing(IsUserFollowing(followingList));
		return followingList;
	}; 
	const getFollowersList = async () => {
		
		if(hasNextPage) {
			const followers = await getFollowers(pageNumber ,user);
			followers.hasOwnProperty('next_page_number')? setHasNextPage(1):setHasNextPage(0) ;
			

					let newList = [...followersList, ...followers.data]
					setFollowersList(newList);
					setPageNumber(pageNumber+1);
		}
	} 
	useEffect(async () => {
		//const getFollowerList = async () => {
			setIsLoading(true);
		await getFollowersList();
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
	useEffect(async () => {
		setLoggedInUserFollowingList(await getCurrentUser());
	}, []);  
	const renderItem = useCallback(({item, index}) => {
		return (
			<FollowingListItem item={item} index={index} followersList = {loggedInUserFollowingList} 
			setLoggedInUserFollowingList={setLoggedInUserFollowingList}
			/>
		)
	})

	return (
		<SafeAreaView style={styles.container}>
			
			<StatsNavBar title="Following" />
			{/* <SearchFollowing placeholder={placeholder} /> */}
			
			<FlatList
				data={followersList}
				renderItem={renderItem}
				keyExtractor={(item) => item.id.toString()}
				showsVerticalScrollIndicator={false}
				initialNumToRender={20}
				onEndReachedThreshold={0.1}
				onEndReached={getFollowersList}
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