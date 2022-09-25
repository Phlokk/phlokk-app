import {useNavigation} from '@react-navigation/core';
import React, {useState} from 'react';
import {
	Image,
	TouchableOpacity,
	StyleSheet,
	Alert,
	ActivityIndicator,
	View,
	Text,
} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import routes from '../../../../navigation/routes';
import colors from '../../../../../config/colors';
import {deletePostById} from '../../../../services/posts';
import {useQueryClient} from 'react-query';
import {useAtom} from 'jotai';
import {userAtom} from '../../../../../../App';

export default function ProfilePostListItem({item, index, posts, setPosts}) {
	const navigation = useNavigation();
	const [isLoading, setIsLoading] = useState(false);
	const queryClient = useQueryClient();

	const [currentUser, setCurrentUser] = useAtom(userAtom);

	const deleteUserPost = async () => {
		try {
			setIsLoading(true);
			await deletePostById(item._id);
			queryClient.invalidateQueries(['userPosts', item.creator]);

			setIsLoading(false);
			alert('Video Deleted Successfully');

			setPosts(prev => prev.filter(postItem => postItem._id !== item._id));
		} catch (err) {
			alert(err?.message);
			setIsLoading(false);
		}
	};

	const deletePost = () => {
		const uid = currentUser._id;
		if (item.user._id === uid) {
			Alert.alert(
				'Delete Video',
				'Are you sure you want to delete this video?',
				[
					{
						text: 'Cancel',
						style: 'cancel',
					},
					{text: 'OK', onPress: deleteUserPost},
				]
			);
		}
	};

	const thumbUrl = item.media[1].original_url;
	if ((item.media[1].generated_conversions.length ?? 0) > 0) {
		if ((item.media[1].generated_conversions.optimal ?? false) == true) {
			if ((item.media[1].conversions_disk ?? 'local') == 'digitalocean') {
				const thumbUrl = 'https://cdn.phlokk.com/' + item.media[1].id + '/conversions/' + item.media[1].name + '-optimal.png';
			}
		}
	}

	return (
		<TouchableOpacity
			style={styles.container}
			onLongPress={deletePost}
			onPress={() => {
				navigation.navigate(routes.USER_POSTS, {
					creator: item.user,
					profile: true,
					selectedVideo: item.media[0].original_url,
					selectedIndex: index,
					preloadedPosts: posts,
				});
			}}
		>
			<Image
				style={styles.image}
				source={{uri: thumbUrl}}
				onLoadStart={() => {
					setIsLoading(true)
				}}
				onLoadEnd={() => setIsLoading(false)}/>
			{isLoading && (
				<View
					style={{
						position: 'absolute',
						width: '100%',
						height: '100%',
						justifyContent: 'center',
					}}
				>
					<ActivityIndicator size="small" color={colors.green} />
				</View>
			)}

			<Text style={styles.playCountText}>
				<Ionicons
					style={styles.playCountText}
					name="ios-play-outline"
					size={14}
					color={colors.white}
				/>{' '}
				{ item?.play_count ?? 0 }
			</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1 / 3,
		height: 180,
	},
	image: {
		flex: 1,
	},
	text: {
		alignItems: 'center',
		backgroundColor: colors.primary,

		color: colors.white,
		zIndex: -5,
	},
	videoCountText: {
		color: colors.white,
	},
	playCountText: {
		color: colors.white,
		marginLeft: 5,
		fontSize: 11,
		position: 'absolute',
		bottom: 3,
		left: 0,
	},
});
