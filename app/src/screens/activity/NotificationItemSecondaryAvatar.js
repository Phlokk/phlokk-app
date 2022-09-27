import FastImage from "react-native-fast-image";
import { Pressable, StyleSheet, View} from "react-native";
import colors from "../../../config/colors";
import {useState} from "react";
import NotificationItem from "./NotificationItem";
import CustomActivityIndicator from "../../components/common/ActivityIndicator";

const NotificationItemSecondaryAvatar = ({notification, image, key}) => {

    const [imageIsLoading, setImageIsLoading] = useState(false);

    return (
        <Pressable
            key={key}
            style={styles.iconRowAvatars}
            // TODO navigate to initialUser profile when clicked

            // onPress={() => {
            //   navigation.navigate("feedProfile", {
            //     initialUserId: key,
            //   });
            // }}
        >
            <FastImage
                style={styles.avatarList}
                source={{
                    uri: image,
                    priority: FastImage.priority.low,
                }}
                cache={FastImage.cacheControl.web}
                onLoadStart={() => {setImageIsLoading(true)}}
                onLoadEnd={() => {setImageIsLoading(false)}}
            />
            {imageIsLoading && (
                <View
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: 30,
                        marginLeft: 1,
                        justifyContent: 'center',
                    }}
                >
                    <CustomActivityIndicator />
                </View>
            )}
        </Pressable>
    );
};

const styles = StyleSheet.create({
    avatarList: {
        height: 30,
        width: 30,
        borderRadius: 50,
    },
    iconRow: {
        flexDirection: "row",
        paddingTop: 5,
    },
    iconRowAvatars: {
        marginRight: 10,
    },
});

export default NotificationItemSecondaryAvatar;
