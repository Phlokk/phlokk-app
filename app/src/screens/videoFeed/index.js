import React, {useEffect, useState, useCallback, useRef} from 'react';
import {
	View,
	StyleSheet,
	TouchableOpacity,
	Text,
	Animated,
	FlatList,
	useWindowDimensions,
} from 'react-native';

import {Ionicons} from '@expo/vector-icons';
import {Entypo} from '@expo/vector-icons';
import VideoItem from './videoItem';
import {types} from '../../redux/constants';
import {useUserVideoFeed, useVideoFeed} from '../../services/posts';
import LinearGradient from 'react-native-linear-gradient';
import {atom, useAtom} from 'jotai';
import {userAtom} from '../../../../App';
import colors from '../../../config/colors';

import {useDispatch} from 'react-redux';
import CustomAlert from '../../components/Alerts/customAlert';

export const newFeedItemAtom = atom('');

const VideoFeed = ({navigation, route}) => {
	const {profile, selectedIndex, creator, preloadedPosts} = route.params;

	const [currentUser, setCurrentUser] = useAtom(userAtom);
	const [pageSize, setPageSize] = useState(); // Used for making a the flatlist full screen
	const [postFeed, setPostFeed] = useState([]);
	const [marketAlert, setMarketAlert] = useState(false);
	const [areTabsShowing, setAreTabsShowing] = useState();
	const windowSize = useWindowDimensions();

	const flatListRef = useRef();
	const dispatch = useDispatch();

	const user = creator || currentUser;

	const [currentVideoIndex, setCurrentVideoIndex] = useState(
		selectedIndex || 0
	);

	const {
		posts,
		getMoreVideos,
		loading: loadingMainFeed,
		refresh: refreshMainFeed,
	} = useVideoFeed({
		skip: preloadedPosts || profile,
	});
	const {
		posts: userPosts,
		getMoreUserPosts,
		loading: loadingUserFeed,
	} = useUserVideoFeed(user._id, {
		skip: preloadedPosts || !profile,
	});

	useEffect(() => {
		if (!posts && !userPosts) {
			return;
		}
		const postsToUse = profile ? userPosts : posts;

		// set likes// make sure to refetch video data when the hooks fire
		const AllLikes = postsToUse.map(post => {
			return {
				postId: post._id,
				likes: handleLikeCount(post.like_count),
				liked: post.is_liked,
			};
		});
		dispatch({
			type: types.SET_POSTS_LIKES,
			postsLikes: AllLikes,
		});
		// end set likes
		setPostFeed(postsToUse);
	}, [posts, userPosts]);

	const [newFeedItem, setNewFeedItem] = useAtom(newFeedItemAtom);

	useEffect(() => {
		if (!newFeedItem) {
			return;
		}

		setPostFeed(prev => [newFeedItem, ...prev]);
		setNewFeedItem('');
		flatListRef.current.scrollToIndex({index: 0, animated: false});
	}, [newFeedItem]);

	useEffect(() => {
		if (currentVideoIndex >= posts?.length - 2) {
			if (loadingMainFeed || loadingUserFeed) {
				return;
			}

			if (profile) {
				getMoreUserPosts();
			} else {
				getMoreVideos();
			}
		}
	}, [currentVideoIndex]);

	useEffect(() => {
		setAreTabsShowing(pageSize?.height < windowSize?.height);
	}, [pageSize, windowSize]);

	const handleLikeCount = likes => {
		if (typeof likes === 'number') {
			return likes;
		} else {
			return likes.length;
		}
	};

	const renderItem = useCallback(
		({item, index}) => {
			return (
				<VideoItem
					item={item}
					index={index}
					currentVideoIndex={currentVideoIndex}
					currentUser={currentUser}
					itemHeight={pageSize?.height || 0}
					areTabsShowing={areTabsShowing}
				/>
			);
		},
		[currentVideoIndex, pageSize, areTabsShowing]
	);

	return (
		<View
			style={styles.mainContainer}
			onLayout={e =>
				setPageSize({
					height: e.nativeEvent.layout.height,
					width: e.nativeEvent.layout.width,
				})
			}
		>
			{/* only render the flatlist once we know the page size, it helps prevent sizing issues */}
			{pageSize && (
				<FlatList
					ref={ref => (flatListRef.current = ref)}
					initialScrollIndex={selectedIndex}
					showsVerticalScrollIndicator={false}
					data={preloadedPosts || postFeed}
					renderItem={renderItem}
					horizontal={false}
					windowSize={Platform.OS === 'android' ? 1 : 3}
					initialNumToRender={5}
					maxToRenderPerBatch={2}
					removeClippedSubviews
					keyExtractor={item => item._id}
					pagingEnabled={true}
					onMomentumScrollEnd={ev => {
						const index = Math.round(
							ev.nativeEvent.contentOffset.y / pageSize.height
						);
						setCurrentVideoIndex(index);
					}}
					getItemLayout={(data, index) => ({
						length: pageSize?.height || 1,
						offset: (pageSize?.height || 1) * index,
						index,
					})}
				/>
			)}

			<View pointerEvents="none" style={styles.bottomGradientWrapper}>
				<LinearGradient
					colors={['rgba(0,0,0,.2)', 'rgba(0,0,0,0.0)']}
					style={{height: 200, width: '100%'}}
				/>
			</View>

			<TouchableOpacity
				onPress={() => {
					if (!navigation?.canGoBack()) {
						flatListRef?.current?.scrollToOffset({offset: 0, animated: true});
						refreshMainFeed();
					} else {
						navigation?.goBack();
					}
				}}
				style={{position: 'absolute', top: 45, left: 18}}
			>
				{!navigation?.canGoBack() ? (
					<Ionicons
						style={styles.refreshIcon}
						name="refresh"
						size={24}
						color={colors.white}
					/>
				) : (
					<Ionicons
						style={styles.refreshIcon}
						name="chevron-back-sharp"
						size={24}
						color={colors.white}
					/>
				)}
			</TouchableOpacity>

			<CustomAlert
				customAlertMessage={
					<Text>Phlokk Market{'\n'}coming in official release</Text>
				}
				positiveBtn="Ok"
				modalVisible={marketAlert}
				dismissAlert={setMarketAlert}
				animationType="fade"
			/>
			<TouchableOpacity
				style={{position: 'absolute', top: 48, right: 18}}
				// onPress={() => { navigation.navigate(routes.MARKET)}
				onPress={() => setMarketAlert(true)}
			>
				<Entypo name="shop" size={24} color={colors.white} />
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		backgroundColor: 'black',
	},
	activityIndicator: {
		position: 'absolute',
		height: '100%',
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	bottomGradientWrapper: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		bottom: 90,
	},
	textFeed: {
		backgroundColor: colors.red,
	},
});

export default VideoFeed;
