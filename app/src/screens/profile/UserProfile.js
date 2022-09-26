import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {MaterialIcons} from '@expo/vector-icons';
import colors from '../../../config/colors';
import {useFonts} from 'expo-font';
import CustomAlert from '../../components/Alerts/CustomAlert';
import VerifiedIcon from '../../components/common/VerifiedIcon';

function UserProfile({user, setPopUpImage}) {
	const [topFavFive, setTopFavFive] = useState(false);
	const [fontsLoaded] = useFonts({
		'Waterfall-Regular': require('../../../assets/fonts/Waterfall-Regular.ttf'),
	});

	if (!fontsLoaded) {
		return null;
	}

	

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
				{user.username !== null ? (
					<Text selectable={true} style={styles.username}>
						@{user.username}
						<View>{user && user.is_verified === 1 && <VerifiedIcon />}</View>
					</Text>
				) : (
					<Text style={styles.username}>@user</Text>
				)}
			</View>

			<View style={styles.quotesView}>
				{user.quote !== null ? (
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
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingVertical: 5,
		alignItems: 'center',
		backgroundColor: colors.primary,
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
});

export default React.memo(UserProfile);
