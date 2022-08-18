import React, {useEffect, useState, useCallback, useRef} from 'react';
import {
	View,
	StyleSheet,
	Dimensions,
	TouchableOpacity,
	Text,
	Pressable,
	StatusBar,
} from 'react-native';
import SwiperFlatList from 'react-native-swiper-flatlist';
import {FontAwesome} from '@expo/vector-icons';
import {Ionicons} from '@expo/vector-icons';
import {Entypo} from '@expo/vector-icons';
import useMaterialNavBarHeight from '../../hooks/useMaterialNavBarHeight';
import VideoItem from './videoItem';
import {types} from '../../redux/constants';
import {
	POSTS_PER_PAGE,
	useUserVideoFeed,
	useVideoFeed,
} from '../../services/posts';
import LinearGradient from 'react-native-linear-gradient';
import {atom, useAtom} from 'jotai';
import {userAtom} from '../../../../App';
import colors from '../../../config/colors';

import {useDispatch, useSelector} from 'react-redux';
import CustomAlert from '../../components/Alerts/customAlert';

const {height} = Dimensions.get('window');

export const newFeedItemAtom = atom('');

const VideoFeed = ({navigation, route}) => {
	const [currentUser, setCurrentUser] = useAtom(userAtom);
	const [postFeed, setPostFeed] = useState([]);
	const [marketAlert, setMarketAlert] = useState(false);

	const {profile, selectedIndex, creator} = route.params;
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
		skip: profile,
	});
	const {
		posts: userPosts,
		getMoreUserPosts,
		loading: loadingUserFeed,
	} = useUserVideoFeed(user._id, {
		skip: !profile,
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

	const onFeedScroll = ({index, prevIndex}) => {
		setCurrentVideoIndex(index);
	};

	const feedItemHeight =
		Dimensions.get('window').height - useMaterialNavBarHeight(profile);

	const getItemLayout = (data, index) => ({
		length: feedItemHeight,
		offset: feedItemHeight * index,
		index,
	});

	const handleLikeCount = likes => {
		if (typeof likes === 'number') {
			return likes;
		} else {
			return likes.length;
		}
	};

	const renderItem = useCallback(
		({item, index}) => (
			<VideoItem
				item={item}
				index={index}
				currentVideoIndex={currentVideoIndex}
				currentUser={currentUser}
				feedItemHeight={feedItemHeight}
			/>
		),
		[currentVideoIndex]
	);

	return (
		<View style={styles.mainContainer}>
			<SwiperFlatList
				ref={flatListRef}
				index={selectedIndex}
				showsVerticalScrollIndicator={false}
				data={postFeed}
				renderItem={renderItem}
				vertical={true}
				windowSize={Platform.OS === 'android' ? 1 : 5}
				initialNumToRender={5}
				maxToRenderPerBatch={2}
				removeClippedSubviews
				keyExtractor={item => item._id}
				pagingEnabled
				getItemLayout={getItemLayout}
				snapToInterval={feedItemHeight}
				snapToAlignment={'start'}
				decelerationRate={'fast'}
				onChangeIndex={onFeedScroll}
			/>

			<View
				pointerEvents="none"
				style={{
					position: 'absolute',
					left: 0,
					right: 0,
					top: 0,
					bottom: 90,
				}}
			>
				<LinearGradient
					colors={['rgba(0,0,0,.2)', 'rgba(0,0,0,0.0)']}
					style={{height: 200, width: '100%'}}
				/>
			</View>

			<TouchableOpacity
				onPress={() => {
					if (!navigation?.canGoBack()) {
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
	textFeed: {
		backgroundColor: colors.red,
	},
});

export default VideoFeed;
