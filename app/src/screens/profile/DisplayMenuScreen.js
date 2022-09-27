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
import CustomAlert from '../../components/Alerts/CustomAlert';
import SettingsModalScreen from '../../components/modal/settingsModalScreen/SettingsModalScreen';
import colors from '../../../config/colors';
import {useIsFocused} from '@react-navigation/native';
import {useAtom} from 'jotai';
import {userAtom} from '../../../../App';

const RenderButton = ({onPress, isSelected, icon}) => {
	return (
		<TouchableOpacity style={styles.itemContainer} onPress={onPress}>
			{typeof icon === 'string' && (
				<MaterialIcons
					style={
						isSelected ? styles.nonTransparentIcons : styles.transparentIcons
					}
					name={icon}
					size={24}
					color={isSelected ? colors.green : colors.secondary}
				/>
			)}
			{typeof icon !== 'string' && icon}
			{isSelected && <View style={styles.underline} />}
		</TouchableOpacity>
	);
};

function DisplayMenuScreen({user, onTabSelected}) {
	const isFocused = useIsFocused();

	useEffect(() => {
		setIsSettingsModalOpen(false);
	}, [isFocused]);

	const [currentUser] = useAtom(userAtom);

	const [isVisible, setIsVisible] = useState(false);
	const [isBookmark, setIsBookmark] = useState(false);
	const [isPrivate, setIsPrivate] = useState(false);
	const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

	const [selectedTab, setSelectedTab] = useState('cloud');

	if (user._id !== currentUser._id) {
		return null;
	}

	return (
		<View style={styles.container}>
			<View style={styles.menuContainer}>
				<RenderButton
					onPress={() => {
						setSelectedTab('cloud');
						onTabSelected('cloud');
					}}
					isSelected={selectedTab === 'cloud'}
					icon="cloud-upload"
					onTabSelected={onTabSelected}
				/>

				<RenderButton
					onPress={() => {
						setSelectedTab('star');
						onTabSelected('star');
						//setIsVisible(true)
					}}
					isSelected={selectedTab === 'star'}
					icon={
						<AntDesign
							style={
								selectedTab === 'star'
									? styles.nonTransparentIcons
									: styles.transparentIcons
							}
							name="star"
							size={24}
							color={selectedTab === 'star' ? colors.green : colors.secondary}
						/>
					}
				/>

				<RenderButton
					onPress={() => {
						setSelectedTab('bookmark');
						onTabSelected('bookmark');
						//setIsBookmark(true);
					}}
					isSelected={selectedTab === 'bookmark'}
					icon="bookmark"
				/>

				<RenderButton
					onPress={() => {
						setSelectedTab('private');
						onTabSelected('private');
						//setIsPrivate(true);
					}}
					isSelected={selectedTab === 'private'}
					icon={
						<FontAwesome
							style={
								selectedTab === 'private'
									? styles.nonTransparentIcons
									: styles.transparentIcons
							}
							name="lock"
							size={24}
							color={
								selectedTab === 'private' ? colors.green : colors.secondary
							}
						/>
					}
				/>

				<RenderButton
					onPress={() => setIsSettingsModalOpen(true)}
					isSelected={false}
					icon="settings"
				/>

				{/* Alerts and modals */}
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
	nonTransparentIcons: {
		opacity: 1,
	},
	underline: {
		width: 20,
		height: 2,
		backgroundColor: colors.green,
		marginTop: 6,
	},
});

export default React.memo(DisplayMenuScreen);
