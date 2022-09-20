import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {MaterialIcons} from '@expo/vector-icons';
import routes from '../../../navigation/routes';
import * as Linking from 'expo-linking';
import colors from '../../../../config/colors';
import {useAtom} from 'jotai';
import {userAtom} from '../../../../../App';
import CustomAlert from '../../Alerts/CustomAlert';
import {blockUserById} from '../../../services/user';
import {forceRefreshAtom} from '../../../screens/videoFeed/VideoFeed';

export default function ProfileNavBar({userProfile, isCurrentUser}) {
	const navigation = useNavigation();

	const [user, setUser] = useAtom(userAtom);
	const [isGifting, setIsGifting] = useState(false);
	//const [isSupportAlert, setIsSupportAlert] = useState(false);
	const [isBlockUserModalOpen, setIsBlockUserModalOpen] = useState(false);
	const [forceRefresh, setForceRefresh] = useAtom(forceRefreshAtom);

	const reportEmail = 'https://support.phlokk.com';

	const onBlockConfirmed = async () => {
		try {
			await blockUserById(userProfile._id);

			setForceRefresh(true); // This will tell the video feed to refresh the post list, because we blocked someone

			navigation.goBack();
		} catch {
			Alert.alert('Error blocking user.');
		}
	};

	return (
		<View style={styles.container}>
			{isCurrentUser && (
				<TouchableOpacity
					style={styles.fireButton}
					onPress={() => setIsGifting(true)}
				>
					<MaterialCommunityIcons
						name="fire"
						size={22}
						color={colors.red}
						style={{opacity: isCurrentUser ? 1 : 0}}
					/>
				</TouchableOpacity>
			)}

			<Text style={styles.middleText}>
				{userProfile?.creator_type || user.creator_type}
			</Text>

			{!isCurrentUser && (
				<TouchableOpacity style={styles.blockButton}>
					<MaterialIcons
						onPress={() => setIsBlockUserModalOpen(true)}
						// onPress={() => Linking.openURL(reportEmail)}
						name="block"
						size={21}
						color={colors.secondary}
					/>
				</TouchableOpacity>
			)}

			{/* Fire button modal */}
			<CustomAlert
				alertTitle={
					<Text>
						<MaterialIcons name="info" size={24} color={colors.green} />
					</Text>
				}
				customAlertMessage={
					<Text>Light It Up{'\n'}coming in Official release</Text>
				}
				positiveBtn="Ok"
				modalVisible={isGifting}
				dismissAlert={setIsGifting}
				animationType="fade"
			/>

			{/* Block modal */}
			<CustomAlert
				customAlertMessage="Would you like to block this user?"
				positiveBtn="Yes"
				negativeBtn="No"
				modalVisible={isBlockUserModalOpen}
				dismissAlert={setIsBlockUserModalOpen}
				animationType="fade"
				onPositivePressed={onBlockConfirmed}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		padding: 10,
		paddingVertical: 5,
		marginTop: 8,
	},
	text: {
		fontSize: 16,
		color: colors.white,
		flex: 1,
		textAlign: 'center',
		fontWeight: 'bold',
	},
	middleText: {
		color: colors.secondary,
		flex: 1,
		textAlign: 'center',
		alignSelf: 'center',
		fontWeight: 'bold',
		opacity: 0.5,
	},
	fireButton: {
		position: 'absolute',
		top: 0,
		left: 8,
	},
	blockButton: {
		position: 'absolute',
		top: 0,
		right: 8,
	},
});
