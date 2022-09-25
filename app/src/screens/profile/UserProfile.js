import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {MaterialIcons} from '@expo/vector-icons';
import colors from '../../../config/colors';
import {useFonts} from 'expo-font';
import CustomAlert from '../../components/Alerts/CustomAlert';
import VerifiedIcon from '../../components/common/VerifiedIcon';
import InformationGraphics from './InformationGraphics';

function UserProfile({user, setPopUpImage}) {
	const [topFavFive, setTopFavFive] = useState(false);
	const [fontsLoaded] = useFonts({
		'Waterfall-Regular': require('../../../assets/fonts/Waterfall-Regular.ttf'),
	});


	// function infoGraphics() {
	// 	if (user.username !== null || user.photo_url !== null) {
	// 	  return <InformationGraphics/>;
	// 	}}
	

	return (
		<View style={styles.container}>
			<TouchableOpacity
				onPress={() => setPopUpImage(true)}
				disabled={!user?.photo_url}
			>
				<Image
					style={styles.avatar}
					source={
						user?.photo_url
							? {uri: user?.photo_url}
							: require('../../../assets/userImage.png')
					}
				/>
			</TouchableOpacity>

			<View style={styles.usernameView}>
				{user.username !== null || !undefined ? (
					<Text selectable={true} style={styles.username}>
						@{user.username}
						<View>{user && user.is_verified === 1 && <VerifiedIcon />}</View>
					</Text>
				) : (
					<Text style={styles.username}>@user</Text>
				)}
			</View>

			<View style={styles.quotesView}>
				{user.quote !== null || !undefined ? (
					<Text style={styles.quotes}>{user.quote}</Text>
				) : (
					<></>
				)}
			</View>

			<>
				<TouchableOpacity>
					<CustomAlert
						alertTitle={
							<Text>
								<MaterialIcons name="info" size={24} color={colors.green} />
							</Text>
						}
						customAlertMessage={
							<Text>Top Favorite 5{'\n'}coming in beta 3</Text>
						}
						positiveBtn="Ok"
						modalVisible={topFavFive}
						dismissAlert={setTopFavFive}
						animationType="fade"
					/>
					<MaterialCommunityIcons
						name="diamond-stone"
						size={25}
						color={colors.diamondBlue}
						onPress={() => setTopFavFive(true)}
					/>
				</TouchableOpacity>
			</>
			{/* {infoGraphics()} */}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingVertical: 5,
		alignItems: 'center',
		backgroundColor: colors.primary,
	},
	relationshipNameContainer: {
		flexDirection: 'row',
		paddingTop: 5,
		justifyContent: 'space-between',
		bottom: 2,
	},
	verifiedRow: {
		flexDirection: 'row',
		justifyContent: 'center',
		// bottom: 2,
	},
	creatorText: {
		color: colors.white,
		fontSize: 15,
		marginBottom: 20,
	},
	relationshipText: {
		color: colors.white,
		marginBottom: 10,
		marginHorizontal: 2,
	},
	avatar: {
		height: 100,
		width: 100,
		borderRadius: 50,
		borderWidth: 1,
		borderColor: 'lightgray',
	},
	username: {
		color: colors.white,
		marginTop: 10,
		marginBottom: 20,
	},
	quotes: {
		color: colors.white,
		marginBottom: 20,
		textAlign: 'center',
		fontFamily: 'Waterfall-Regular',
		fontSize: 27,
	},
	users: {
		color: colors.white,
	},
	error: {
		color: colors.red,
	},
	phlokkVerified: {
		width: 12,
		height: 12,
		bottom: 0,
		marginHorizontal: 3,
	},
	usernameView: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingTop: 5,
	},
	quotesView: {
		flexDirection: 'row',
		alignItems: 'center',
		textAlign: 'center',
		paddingTop: 10,
		paddingBottom: 10,
		paddingRight: 25,
		paddingLeft: 25,
	},
	messageText: {
		color: colors.black,
		fontWeight: '700',
	},
	dividerBar: {
		backgroundColor: '#fff',
		width: 20,
	},
});

export default React.memo(UserProfile);
