import React, {useEffect, useState} from 'react';
import ActivityNavBar from '../../components/general/activityNav/ActivityNavBar';
import {
	View,
	StyleSheet,
	Text,
	TouchableOpacity,
	FlatList,
	Dimensions,
} from 'react-native';
import colors from '../../../config/colors';
import axios from '../../redux/apis/axiosDeclaration';
import {
	clearNotificationListener,
	getNotifications,
	notificationListener,
} from '../../services/notifications';
import NotificationItem from './NotificationItem';
import {
	Placeholder,
	PlaceholderContainer,
} from 'react-native-loading-placeholder';
import {LinearGradient} from 'expo-linear-gradient';
import Colors from '../../../config/colors';
import {useIsFocused} from '@react-navigation/native';

export default function ActivityScreen({navigation}) {
	const [notificationList, setNotificationList] = useState('');
	const [isLoading, setIsLoading] = useState();
	const isFocused = useIsFocused();

	useEffect(() => {
		const getNotifs = async () => {
			setIsLoading(true);
			const notifications = await getNotifications();
			setNotificationList(notifications);
			setIsLoading(false);
		};

		if (isFocused) {
			getNotifs();
		}
	}, [isFocused]);

	const Gradient = () => {
		return (
			<LinearGradient
				colors={[Colors.lightBlack, Colors.darkGrey, Colors.lightBlack]}
				start={{x: 6.0, y: 0.0}}
				end={{x: 0.0, y: 0.0}}
				style={{
					flex: 1,
					width: 100,
				}}
			/>
		);
	};

	const renderItem = ({item, index}) => {
		// console.log(item);
		return (
			<NotificationItem index={index} item={item} navigation={navigation} />
		);
	};

	const Separator = () => {
		return (
			<View
				style={{
					height: 50,
					width: 1,
					padding: 5,
				}}
			/>
		);
	};

	if (isLoading) {
		return (
			<View style={styles.container}>
				<ActivityNavBar title={'Activity feed'} />
				<PlaceholderContainer
					style={styles.placeholderContainer}
					animatedComponent={<Gradient />}
					duration={1250}
					replace={true}
				>
					<View style={{width: '100%', marginLeft: 24}}>
						<Placeholder
							style={{
								...styles.placeholder,
								width: '94%',
								height: 80,
							}}
						/>
						<Placeholder
							style={{
								...styles.placeholder,
								width: '94%',
								height: 80,
								marginTop: 24,
							}}
						/>
						<Placeholder
							style={{
								...styles.placeholder,
								width: '94%',
								height: 80,
								marginTop: 24,
							}}
						/>
						<Placeholder
							style={{
								...styles.placeholder,
								width: '94%',
								height: 80,
								marginTop: 24,
							}}
						/>
						<Placeholder
							style={{
								...styles.placeholder,
								width: '94%',
								height: 80,
								marginTop: 24,
							}}
						/>
						<Placeholder
							style={{
								...styles.placeholder,
								width: '94%',
								height: 80,
								marginTop: 24,
							}}
						/>
					</View>
				</PlaceholderContainer>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<ActivityNavBar title={'Activity feed'} />
			{notificationList.length === 0 && (
				<View style={styles.alertView}>
					<Text style={styles.alertText}>You have no notifications</Text>
				</View>
			)}
			<FlatList
				data={notificationList}
				ItemSeparatorComponent={Separator}
				renderItem={renderItem}
				showsVerticalScrollIndicator={false}
				keyExtractor={item => item._id}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.primary,
	},
	userContainer: {
		flex: 1,
		backgroundColor: colors.white,
	},
	activityContainer: {
		flex: 1,
	},
	text: {
		color: colors.white,
		marginTop: 30,
	},
	alertText: {
		color: colors.white,
		padding: 20,
		fontSize: 16,
	},
	alertView: {
		alignItems: 'center',
	},
	placeholderContainer: {
		justifyContent: 'space-around',
		flexDirection: 'row',
		width: '100%',
	},
	placeholder: {
		backgroundColor: Colors.lightBlack,
		borderRadius: 5,
	},
});
