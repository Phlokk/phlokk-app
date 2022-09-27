import {
	View,
	Text,
	StyleSheet,
	Image,
	Modal,
	TouchableOpacity,
} from 'react-native';
import {Feather} from '@expo/vector-icons';
import {Octicons} from '@expo/vector-icons';
import {Ionicons} from '@expo/vector-icons';
import {SimpleLineIcons} from '@expo/vector-icons';
import * as Linking from 'expo-linking';
import colors from '../../../config/colors';
import {useState} from 'react';
import axios from '../../redux/apis/axiosDeclaration';

export default function CustomImageModal({
	modalVisible,
	dismissAlert,
	user,
	isCurrentUser,
	setUser,
}) {
	const [following, setFollowing] = useState(user?.follow_count);
	const [isFollowing, setIsFollowing] = useState(user?.is_following);
	// const [isFriends, setIsFriends] = useState(false);

	const toggleIsFollowing = async function (userId) {
		await axios.post(
			'/api/creator/' + userId + '/' + (isFollowing ? 'unfollow' : 'follow')
		),
			{};
		setIsFollowing(!isFollowing);
		setFollowing(!isFollowing ? following + 1 : following - 1);

		setUser(prev => {
			let updatedUser = {...prev};
			updatedUser.is_following = !isFollowing;
			updatedUser.follow_count = !isFollowing ? following + 1 : following - 1;
			return updatedUser;
		});
	};

	return (
		<Modal
			visible={modalVisible}
			transparent={true}
			animationType={'fade'}
			onRequestClose={() => setModalVisible(false)}
		>
			<View style={styles.mainContainer}>
				<View style={styles.goBackView}>
					<Feather
						onPress={() => dismissAlert(false)}
						style={styles.alertMessageButtonText}
						name="x"
						size={25}
					/>
				</View>

				<View style={styles.container}>
					<View style={styles.top}>
						<Image
							source={{uri: user.photo_url}}
							resizeMode={'contain'}
							style={styles.alertIconStyle}
						/>
					</View>

					<View style={styles.middle}>
						<Text style={styles.relationshipStatusIcon}>
							<Ionicons name="md-heart-sharp" size={24} color={colors.red} />
						</Text>
						<Text style={[styles.statusText, styles.relationshipStatusIcon]}>
							{user.relationship_type}
						</Text>

						{!isCurrentUser && (
							<TouchableOpacity
								style={[styles.imageViewContainer, styles.followingView]}
								onPress={() => toggleIsFollowing(user._id)}
							>
								<View
									style={isFollowing ? styles.followingBtn : styles.followBtn}
								>
									<Text
										style={
											isFollowing
												? styles.alertMessageFriendsText
												: styles.alertMessageFollowText
										}
									>
										{isFollowing ? 'Following' : 'Follow'}
									</Text>
								</View>
							</TouchableOpacity>
						)}

						<Text style={styles.alertMessageTextStyle}>{user.bio}</Text>

						<View style={styles.linkRow}>
							<View style={styles.linkText}>
								<SimpleLineIcons
									onPress={
										user && user.youtube_link
											? () => Linking.openURL(user.youtube_link)
											: null
									}
									name="social-youtube"
									size={28}
									color={
										user && user.youtube_link ? colors.green : colors.white
									}
								/>
							</View>
							<View style={styles.linkText}>
								<Octicons
									onPress={
										user && user.link ? () => Linking.openURL(user.link) : null
									}
									name="link-external"
									size={27}
									color={user && user.link ? colors.green : colors.white}
								/>
							</View>
							<View style={styles.linkText}>
								<Feather
									onPress={
										user && user.instagram_link
											? () => Linking.openURL(user.instagram_link)
											: null
									}
									name="instagram"
									size={23}
									color={
										user && user.instagram_link ? colors.green : colors.white
									}
								/>
							</View>
						</View>
					</View>
				</View>
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.primary,
		height: '100%',
		width: '100%',
		padding: 4,
	},
	top: {
		alignItems: 'center',
		paddingHorizontal: 5,
		paddingVertical: 2,
	},
	middle: {
		textAlign: 'center',
		padding: 20,
		margin: 10,
		color: colors.white,
		fontSize: 16,
	},
	alertIconStyle: {
		borderRadius: 100,
		marginTop: 50,
		height: 175,
		width: 175,
	},
	statusText: {
		color: colors.secondary,
		fontWeight: 'bold',
	},
	alertTitleTextStyle: {
		flex: 1,
		justifyContent: 'center',
		textAlign: 'center',
		color: colors.green,
		fontSize: 18,
		fontWeight: 'bold',
		padding: 2,
		marginHorizontal: 2,
	},
	alertMessageTextStyle: {
		color: colors.secondary,
		marginTop: 40,
		opacity: 0.6,
		textAlign: 'center',
		fontSize: 16,
	},
	alertMessageFriendsText: {
		color: colors.secondary,
		opacity: 0.6,
		textAlign: 'center',
		fontSize: 16,
	},
	alertMessageFollowText: {
		color: colors.green,
		fontWeight: 'bold',
		textAlign: 'center',
		fontSize: 16,
	},
	followBtn: {
		width: 100,
		borderWidth: 1,
		borderColor: colors.green,
		padding: 5,
		borderRadius: 5,
	},
	followingBtn: {
		width: 100,
		borderWidth: 1,
		borderColor: colors.green,
		padding: 5,
		borderRadius: 5,
	},
	relationshipStatusIcon: {
		color: colors.secondary,
		textAlign: 'center',
		fontSize: 16,
	},
	alertMessageButtonText: {
		textAlign: 'center',
		fontSize: 25,
		fontWeight: 'bold',
		color: colors.green,
	},
	text: {
		color: colors.white,
	},
	linkRow: {
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
		flexDirection: 'row',
		padding: 5,
		paddingTop: 10,
	},
	linkText: {
		color: colors.secondary,
		padding: 5,
		alignSelf: 'center',
		padding: 20,
	},
	goBackView: {
		zIndex: 99,
		position: 'absolute',
		left: 15,
		top: 20,
		marginTop: 20,
	},
	followingView: {
		marginTop: 20,
	},
	heart: {
		justifyContent: 'center',
	},
	imageViewContainer: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	imageOverlay: {
		backgroundColor: 'rgba(0,0,0, 0.5)',
		...StyleSheet.absoluteFill,
	},
});
