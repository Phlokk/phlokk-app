import React, {useEffect, useState} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {
	StyleSheet,
	FlatList,
} from 'react-native';
import uuid from 'uuid-random';
import colors from '../../../config/colors';
import {SafeAreaView} from 'react-native-safe-area-context';
import StatsNavBar from '../../components/general/profileNavBar/StatsNavBar';
import FollowingListItem from "./FollowingListItem";
import {getFollowers} from "../../services/user";
// import SearchFollowing from './SearchFollowing';


export default function FollowingListScreen({route}) {

	const {user,isCurrentUser} = route.params;

	const [followersList, setFollowersList] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const isFocused = useIsFocused();

	useEffect(() => {
		const getFollowerList = async () => {
			setIsLoading(true);

			if(isCurrentUser) {
				const followers = await getFollowers(true);
				setFollowersList(followers);
				setIsLoading(false);
			} else {
				const followers = await getFollowers(false, user._id);
				setFollowersList(followers);
				setIsLoading(false);
			}
		};

		if (isFocused) {
			getFollowerList();
		}
	}, [isFocused]);

	const renderItem = ({item, index}) => {
		return (
			<FollowingListItem item={item} index={index} />
		)
	}

	return (
		<SafeAreaView style={styles.container}>
			<StatsNavBar title="Following" />
			{/* <SearchFollowing placeholder={placeholder} /> */}
			<FlatList
				data={followersList}
				renderItem={renderItem}
				keyExtractor={() => uuid().toString()}
				showsVerticalScrollIndicator={false}
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
