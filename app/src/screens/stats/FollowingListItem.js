import {Image, Text, TouchableOpacity, View, StyleSheet} from "react-native";
import {TouchableWithoutFeedback} from "react-native-gesture-handler";
import VerifiedIcon from "../../components/common/VerifiedIcon";
import React, {useState} from "react";
import colors from "../../../config/colors";
import axios from "../../redux/apis/axiosDeclaration";

const FollowingListItem = ({ item }) => {

    console.log(item.username + ' >> ' + item.is_following);

    const [isFollowing, setIsFollowing] = useState(item.is_following);

    const toggleIsFollowing = async function () {
        await axios.post(
            '/api/creator/' + item._id + '/' + (!isFollowing ? 'unfollow' : 'follow')
        ),
            {};
        setIsFollowing(!isFollowing);
    };

    return (
        <View style={styles.item}>
            <View style={styles.followingRow}>
                <TouchableOpacity>
                    <Image style={styles.image} source={{uri: item.photo_thumb_url}} />
                </TouchableOpacity>
            </View>
            <View style={styles.followingInfoRow}>
                <TouchableWithoutFeedback>
                    <Text style={styles.itemInfo}>
                        {item.username}
                        {item.is_verified && (
                            <View style={styles.logoRow}>
                                <VerifiedIcon />
                            </View>
                        )}
                    </Text>
                    <Text style={styles.itemCreator}> {item.creator}</Text>
                </TouchableWithoutFeedback>

                {isFollowing ? (
                    <TouchableOpacity
                        onPress={toggleIsFollowing}
                        style={styles.followingView}
                    >
                        <Text style={styles.followBtn}>Follow</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        onPress={toggleIsFollowing}
                        style={styles.followingView}
                    >
                        <Text style={styles.followingBtn}>Following</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        color: colors.secondary,
        paddingHorizontal: 15,
        alignItems: 'center',
        marginTop: 5,
    },
    followingRow: {
        justifyContent: 'center',
    },
    followingInfoRow: {
        flex: 1,
    },
    image: {
        height: 65,
        width: 65,
    },
    logo: {
        left: 2,
        height: 12,
        width: 12,
    },
    itemInfo: {
        color: colors.green,
        fontWeight: 'bold',
        top: 8,
        fontSize: 11,
        paddingLeft: 5,
    },
    itemCreator: {
        color: colors.green,
        fontWeight: 'bold',
        top: 10,
        fontSize: 8,
        paddingLeft: 5,
    },
    logoRow: {
        bottom: 12,
        paddingLeft: 5,
    },
    followBtn: {
        color: colors.white,
        textAlign: 'center',
        padding: 2,
        width: '25%',
        height: '100%',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: colors.green,
        backgroundColor: colors.lightBlack,
    },
    followingBtn: {
        color: colors.green,
        textAlign: 'center',
        padding: 2,
        width: '25%',
        height: '100%',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: colors.green,
        backgroundColor: colors.lightBlack,
    },
    followingView: {
        flexDirection: 'row-reverse',
        bottom: 14,
    }
});

export default FollowingListItem;
