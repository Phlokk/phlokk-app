import ProfileHeader from '../../components/header/ProfileHeader';
import ProfileNavBar from '../../components/general/profileNavBar/ProfileNavBar';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FlatList, View, StyleSheet, Text, RefreshControl} from 'react-native';
import ProfilePostListItem from '../../components/profile/postList/item/ProfilePostListItem';
import colors from '../../../config/colors';
import {useAtom} from 'jotai';
import {userAtom} from '../../../../App';
import {useUserVideoFeed} from '../../services/posts';
import {useEffect, useState} from 'react';
import {fetchGetUser} from '../../redux/sagas/requests/fetchUsers';
import CustomImageModal from '../../components/Image/CustomImageModal';

export default function ProfileScreen({route}) {
	const [postsToDisplay, setPostsToDisplay] = useState([]);
	const [isRefreshing, setIsRefreshing] = useState(false);
	const [popUpImage, setPopUpImage] = useState(false);

	const [loggedInUser] = useAtom(userAtom);
	const [profile, setProfile] = useState();

	const fetchUser = async userId => {
		try {
			const response = await fetchGetUser(userId);
			setProfile(response);
		} catch {}
	};

	useEffect(() => {
		if (!route) {
			return;
		}

		const userProfile = route?.params?.initialUser;
		if (!userProfile) {
			setProfile(loggedInUser);
		} else {
			setProfile(userProfile);
			fetchUser(userProfile._id);
		}
	}, [route]);

	const {posts, getMoreUserPosts, refresh, loading} = useUserVideoFeed(
		profile?._id
	);

	useEffect(() => {
		if (posts?.length > 0) {
			setPostsToDisplay(posts);
		}
	}, [posts]);

	if (!profile) {
		return <SafeAreaView style={styles.container} edges={['top']} />;
	}

	const ListHeader = () => {
		return (
			<View style={styles.container} edges={['top']}>
				<ProfileHeader user={profile} setPopUpImage={setPopUpImage} />
			</View>
		);
	};

	return (
		<SafeAreaView style={styles.container} edges={['top']}>
			<ProfileNavBar
				userProfile={profile}
				showFireIcon={profile === undefined}
			/>
			<FlatList
				numColumns={3}
				showsVerticalScrollIndicator={false}
				removeClippedSubviews
				nestedScrollEnabled={false}
				data={postsToDisplay}
				keyExtractor={item => item.id}
				ListHeaderComponent={ListHeader}
				renderItem={({item, index}) => (
					<ProfilePostListItem
						item={item}
						index={index}
						posts={postsToDisplay}
						setPosts={setPostsToDisplay}
					/>
				)}
				refreshControl={
					<RefreshControl
						refreshing={isRefreshing}
						tintColor="white"
						onRefresh={async () => {
							setIsRefreshing(true);
							await refresh();
							setIsRefreshing(false);
						}}
					/>
				}
				onEndReached={() => {
					if (postsToDisplay?.length <= 10) {
						return;
					}

					if (!loading) {
						getMoreUserPosts();
					}
				}}
			/>

			<CustomImageModal
				customAlertMessage={<Text>User Bio</Text>}
				positiveBtn="Back"
				modalVisible={popUpImage}
				dismissAlert={setPopUpImage}
				animationType="fade"
				user={profile}
				setUser={setProfile}
				isCurrentUser={loggedInUser?._id === profile?._id}
			/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.primary,
	},
	text: {
		color: colors.green,
	},
	textPad: {
		padding: 10,
	},
});
