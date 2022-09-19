import {View, StyleSheet } from 'react-native';
import DisplayMenuScreen from '../../screens/profile/DisplayMenuScreen';
import UserProfile from '../../screens/profile/UserProfile';
import ProfileStatsContainer from '../profile/profileStats/ProfileStatsContainer';
import colors from '../../../config/colors';


function ProfileHeader({user}) {

	return (
		<View style={styles.container}>
			<ProfileStatsContainer currentUser={user} />

			<View>
				<UserProfile user={user} />
			</View>
			<View>
				<DisplayMenuScreen user={user} />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		paddingHorizontal: 50,
	},
	creatorText: {
		padding: 20,
		color: colors.white,
	},

	bioText: {
		color: colors.white,
		textAlign: 'center',
		marginTop: 10,
		marginBottom: 30,
	},

	display: {
		flexDirection: 'row',
		alignItems: 'center',
		fontWeight: 'bold',
		padding: 20,
		color: colors.white,
	},
	text: {
		color: colors.secondary,
		fontWeight: 'bold',
	},
	linkText: {
		color: colors.secondary,
		marginBottom: 30,
	},
	link: {
		alignItems: 'center',
		marginVertical: 5,
	},
	avatar: {
		height: 100,
		width: 100,
		borderRadius: 50,
		borderWidth: 1,
		borderColor: colors.secondary,
	},
	username: {
		color: colors.white,
		marginTop: 10,
		marginBottom: 20,
	},
	phlokkVerified: {
		width: 12,
		height: 12,
		bottom: 4,
		marginHorizontal: 3,
	},
	usernameView: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	followButton: {
		borderColor: colors.secondary,
		borderWidth: 1,
		borderRadius: 4,
		paddingVertical: 10,
		paddingHorizontal: 30,
	},
	messageText: {
		color: colors.black,
		fontWeight: '700',
	},
	optionsContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#8a2be2',
		padding: 3,
		borderRadius: 25,
		color: colors.primary,
	},
});

export default ProfileHeader;
