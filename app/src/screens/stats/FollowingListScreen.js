import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {useDispatch} from 'react-redux';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {
	View,
	StyleSheet,
	Text,
	FlatList,
	Image,
	TouchableOpacity,
} from 'react-native';
import colors from '../../../config/colors';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import StatsNavBar from '../../components/general/profileNavBar/StatsNavBar';
import SearchFollowing from './SearchFollowing';
import SearchInput from '../../components/search/SearchInput';
import VerifiedIcon from '../../components/common/VerifiedIcon';
import * as PropTypes from "prop-types";
import FollowingListItem from "./FollowingListItem";
import {getNotifications} from "../../services/notifications";
import {getFollowers} from "../../services/user";
import {userAtom} from "../../../../App";
import {useAtom} from "jotai";

export default function FollowingListScreen({route}) {

	const {user,isCurrentUser} = route.params;

	const [followersList, setFollowersList] = useState('');
	const [isLoading, setIsLoading] = useState();
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
			<FollowingListItem item={item} />
		)
	}

	ItemSeparator = () => {
		return <View style={styles.seperator}></View>;
	};

	return (
		<SafeAreaView style={styles.container}>
			<StatsNavBar title="Following" />
			{/*<SearchFollowing placeholder={placeholder} />*/}
			<Text style={styles.following}>Following</Text>
			<FlatList
				style={styles.paddingFlat}
				data={followersList}
				// renderItem={ItemRender}
				renderItem={renderItem}
				keyExtractor={item => item.id}
				showsVerticalScrollIndicator={false}
				ItemSeparatorComponent={ItemSeparator}
			/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.primary,
	},
	followingText: {
		color: colors.green,
		textAlign: 'center',
		fontWeight: 'bold',
	},
	seperator: {
		height: 1,
		width: '90%',
		opacity: 0.1,
		backgroundColor: colors.secondary,
		alignSelf: 'center',
		justifyContent: 'center',
		marginBottom: 10,
	},
	following: {
		color: colors.green,
		paddingBottom: 15,
		paddingHorizontal: 10,
	},
});
