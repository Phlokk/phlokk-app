import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import {Platform} from "react-native";
import * as SecureStore from "expo-secure-store";

// Can use this function below, OR use Expo's Push Notification Tool-> https://expo.dev/notifications
export async function sendTestPushNotification() {

    let user = JSON.parse(await SecureStore.getItemAsync("user"));

    const message = {
        to: user.expoPushToken,
        sound: 'default',
        title: 'Original Title',
        body: 'And here is the body!',
        data: { someData: 'goes here' },
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
        .then((resp) => {
            console.log(JSON.stringify(resp));
        })
        .catch((e) => {
            console.log(e);
        });
}

export async function registerForPushNotificationsAsync (setExpoPushToken) {
    /* @info We should also make sure the app is running on a physical device, since push notifications.js won't work on a simulator. */
    if (Device.isDevice) {
        /* @end */
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        /* @info Alright, we got our token! */
        const experienceId = '@batslion/PhlokkApp';
        const token = (await Notifications.getExpoPushTokenAsync({experienceId})).data;
        /* @end */
        console.log(token);

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
        alert('Must use physical device for Push Notifications');
    }
    /* @end */
};

// return (
//     <View
//         style={{
//           flex: 1,
//           alignItems: 'center',
//           justifyContent: 'space-around',
//         }}>
//       <Text>Your expo push token: {expoPushToken}</Text>
//       <View style={{ alignItems: 'center', justifyContent: 'center' }}>
//         <Text>Title: {notification && notification.request.content.title} </Text>
//         <Text>Body: {notification && notification.request.content.body}</Text>
//         <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
//       </View>
//       <Button
//           title="Press to Send Notification"
//           onPress={async () => {
//             await sendPushNotification(expoPushToken);
//           }}
//       />
//     </View>
// );