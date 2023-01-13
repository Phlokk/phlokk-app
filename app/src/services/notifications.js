import React, { useState } from 'react';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import {Platform, View, Text} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { MaterialIcons } from "@expo/vector-icons";
import axios from '../redux/apis/axiosDeclaration';

// Can use this function below, OR use Expo's Push Notification Tool-> https://expo.dev/notifications
export async function enableNotificationsForDevice() {


	let user = JSON.parse(await SecureStore.getItemAsync('user'));

	axios
		.post('/api/me/enroll-notifications', {
			expoPushToken: user.expoPushToken,
		})
		.then(async response => {
			setIsEnrolled(true);
			user.notificationsForDeviceEnabled = true;
			await SecureStore.setItemAsync('user', JSON.stringify(user));
		})
		.catch(error => {
			throw error;
		});
}

export async function disableNotificationsForDevice() {
	let user = JSON.parse(await SecureStore.getItemAsync('user'));

	axios
		.post('/api/me/unenroll-notifications', {
			expoPushToken: user.expoPushToken,
		})
		.then(async response => {
			isNoticeDisabled(true);
			user.notificationsForDeviceEnabled = false;
			await SecureStore.setItemAsync('user', JSON.stringify(user));
		})
		.catch(error => {
			throw error;
		});
}

export async function sendTestPushNotification() {
	let user = JSON.parse(await SecureStore.getItemAsync('user'));

	const message = {
		to: user.expoPushToken,
		sound: 'default',
		title: 'Original Title',
		body: 'And here is the body!',
		data: {someData: 'goes here'},
	};

	await fetch('https://exp.host/--/api/v2/push/send', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Accept-encoding': 'gzip, deflate',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(message),
	})
		.then(resp => {
			JSON.stringify(resp);
		})
		.catch(e => {
			setIsTestNotification(true);
		});
}

// should this code below (function registerForPushNotificationsAsync) be in the App.js file at root of project Tony?
export async function registerForPushNotificationsAsync(setExpoPushToken) {
	/* @info We should also make sure the app is running on a physical device, since push notifications.js won't work on a simulator. */
	if (Device.isDevice) {
		/* @end */
		const {status: existingStatus} = await Notifications.getPermissionsAsync();
		let finalStatus = existingStatus;
		if (existingStatus !== 'granted') {
			const {status} = await Notifications.requestPermissionsAsync();
			finalStatus = status;
		}
		if (finalStatus !== 'granted') {
			setIsFailedNotice(true);
			return;
		}
		/* @info Alright, we got our token! */
		const experienceId = '@batslion/PhlokkApp';
		const token = (await Notifications.getExpoPushTokenAsync({experienceId}))
			.data;
		/* @end */

		/* @info On Android, we need to specify a channel. Find out more specifics in the expo-notifications.js documentation. */
		if (Platform.OS === 'android') {
			await Notifications.setNotificationChannelAsync('default', {
				name: 'default',
				importance: Notifications.AndroidImportance.MAX,
				vibrationPattern: [0, 250, 250, 250],
				lightColor: '#FF231F7C',
			});
		}
		return token;
	} else {
		setIsPhysicalDevice(true);
	}
	/* @end */
}


const notifications = () => {
	const [isEnrolled, setIsEnrolled] = useState(false);
	const [isNoticeDisabled, setIsNoticeDisabled] = useState(false);
	const [isTestNotification, setIsTestNotification] = useState(false);
	const [isFailedNotice, setIsFailedNotice] = useState(false);
	const [isPhysicalDevice, setIsPhysicalDevice] = useState(false);

	return (
		<View>
			<Text>notifications</Text>
			<CustomAlert
            alertTitle={
              <Text>
                <MaterialIcons name="info" size={24} color={colors.green} />
              </Text>
            }
            customAlertMessage={<Text>Device has been enrolled in notifications!</Text>}
            positiveBtn="Ok"
            modalVisible={isEnrolled}
            dismissAlert={setIsEnrolled}
            animationType="fade"
          />
					<CustomAlert
            alertTitle={
              <Text>
                <MaterialIcons name="info" size={24} color={colors.green} />
              </Text>
            }
            customAlertMessage={<Text>Notifications has been disabled for this device!</Text>}
            positiveBtn="Ok"
            modalVisible={isNoticeDisabled}
            dismissAlert={setIsNoticeDisabled}
            animationType="fade"
          />
					<CustomAlert
            alertTitle={
              <Text>
                <MaterialIcons name="info" size={24} color={colors.green} />
              </Text>
            }
            customAlertMessage={<Text>Test Notification not sent!</Text>}
            positiveBtn="Ok"
            modalVisible={isTestNotification}
            dismissAlert={setIsTestNotification}
            animationType="fade"
          />
					<CustomAlert
            alertTitle={
              <Text>
                <MaterialIcons name="info" size={24} color={colors.green} />
              </Text>
            }
            customAlertMessage={<Text>Failed to get push token for push notification!</Text>}
            positiveBtn="Ok"
            modalVisible={isFailedNotice}
            dismissAlert={setIsFailedNotice}
            animationType="fade"
          />
					<CustomAlert
            alertTitle={
              <Text>
                <MaterialIcons name="info" size={24} color={colors.green} />
              </Text>
            }
            customAlertMessage={<Text>Must use physical device for Push Notifications!</Text>}
            positiveBtn="Ok"
            modalVisible={isPhysicalDevice}
            dismissAlert={setIsPhysicalDevice}
            animationType="fade"
          />
		</View>
	)
}

export default notifications
