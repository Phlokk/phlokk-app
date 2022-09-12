import React, {useState, useEffect} from 'react';
import {
	View,
	TouchableOpacity,
	StyleSheet,
	Text,
	Modal,
	Pressable,
} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import {FontAwesome} from '@expo/vector-icons';
import {AntDesign} from '@expo/vector-icons';
import CustomAlert from '../../../components/Alerts/customAlert';
import SettingsModalScreen from '../../../components/modal/settingsModalScreen';
import colors from '../../../../config/colors';
import {useIsFocused} from '@react-navigation/native';
import {useAtom} from 'jotai';
import {userAtom} from '../../../../../App';

function DisplayMenuScreen({user}) {
	const isFocused = useIsFocused();

	useEffect(() => {
		setIsSettingsModalOpen(false);
	}, [isFocused]);

	const [currentUser, setCurrentUser] = useAtom(userAtom);

	const [isVisible, setIsVisible] = useState(false);
	const [isBookmark, setIsBookmark] = useState(false);
	const [isPrivate, setIsPrivate] = useState(false);
	const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

	if (user._id !== currentUser._id) {
		return null;
	}

	return (
		<View style={styles.container}>
			<View style={styles.menuContainer}>
				<CustomAlert
					alertTitle={
						<Text>
							<MaterialIcons name="info" size={24} color={colors.secondary} />
						</Text>
					}
					customAlertMessage={<Text>Star videos{'\n'}coming in beta 2</Text>}
					positiveBtn="Ok"
					modalVisible={isVisible}
					dismissAlert={setIsVisible}
					animationType="fade"
				/>
				<TouchableOpacity style={styles.itemContainer}>
					<MaterialIcons
						style={styles.transparentIcons}
						name="cloud-upload"
						size={24}
						color={colors.secondary}
					/>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.itemContainer}
					onPress={() => setIsVisible(true)}
				>
					<AntDesign
						style={styles.transparentIcons}
						name="star"
						size={24}
						color={colors.secondary}
					/>
				</TouchableOpacity>
				<CustomAlert
					alertTitle={
						<Text>
							<MaterialIcons name="info" size={24} color={colors.secondary} />
						</Text>
					}
					customAlertMessage={
						<Text>Favorite videos{'\n'}coming in beta 2</Text>
					}
					positiveBtn="Ok"
					modalVisible={isBookmark}
					dismissAlert={setIsBookmark}
					animationType="fade"
				/>
				<TouchableOpacity
					style={styles.itemContainer}
					onPress={() => setIsBookmark(true)}
				>
					<MaterialIcons
						style={styles.transparentIcons}
						name="bookmark"
						size={24}
						color={colors.secondary}
					/>
				</TouchableOpacity>
				<CustomAlert
					alertTitle={
						<Text>
							<MaterialIcons name="info" size={24} color={colors.secondary} />
						</Text>
					}
					customAlertMessage={<Text>Private videos{'\n'}coming in beta 2</Text>}
					positiveBtn="Ok"
					modalVisible={isPrivate}
					dismissAlert={setIsPrivate}
					animationType="fade"
				/>
				<TouchableOpacity
					style={styles.itemContainer}
					onPress={() => setIsPrivate(true)}
				>
					<FontAwesome
						style={styles.transparentIcons}
						name="lock"
						size={24}
						color={colors.secondary}
					/>
				</TouchableOpacity>

				<TouchableOpacity style={styles.itemContainer}>
					<MaterialIcons
						style={styles.transparentIcons}
						name="admin-panel-settings"
						size={24}
						color={colors.secondary}
						onPress={() => setIsSettingsModalOpen(true)}
					/>
				</TouchableOpacity>

				<Modal
					animationType="slide"
					transparent={true}
					visible={isSettingsModalOpen}
				>
					<View style={styles.pressedModal}>
						<Pressable
							style={styles.pressedStyle}
							onPress={() => setIsSettingsModalOpen(false)}
						/>
						<SettingsModalScreen user={user} />
					</View>
				</Modal>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		paddingHorizontal: 0,
		paddingVertical: 10,
		justifyContent: 'center',
		alignItems: 'center',
	},
	text: {
		color: colors.white,
	},
	itemContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	menuContainer: {
		paddingBottom: 5,
		flexDirection: 'row',
	},
	pressedStyle: {
		position: 'absolute',
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
	},
	pressedModal: {
		flex: 1,
		justifyContent: 'flex-end',
	},
	transparentIcons: {
		opacity: 0.3,
	},
});

export default React.memo(DisplayMenuScreen);
