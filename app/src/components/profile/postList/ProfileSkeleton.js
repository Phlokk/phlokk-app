import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
    PlaceholderContainer,
    Placeholder,
} from 'react-native-loading-placeholder';
import colors from '../../../../config/colors';
import Colors from "../../../../config/colors";

const { height, width } = Dimensions.get('window');

const Gradient = () => {
    return (
        <LinearGradient
            colors={['#131313', Colors.darkGrey, '#131313']}
            start={{ x: 6.0, y: 0.0 }}
            end={{ x: 0.0, y: 0.0 }}
            style={{
                flex: 1,
                width: 100,
            }}
        />
    );
};

const ProfileSkeleton = () => {
    return (
        /** Main Container */
        <PlaceholderContainer
            style={styles.container}
            animatedComponent={<Gradient />}
            duration={2500}
            replace={true}
        >
            <View style={styles.banner}>
                <Placeholder
                    style={{
                        ...styles.profileImage,
                        width: '29%',
                        height: 110,
                    }}
                />
            </View>
            <View style={styles.text}>
                <Placeholder
                    style={{
                        ...styles.username,
                        width: '20%',
                        height: 25,
                    }}
                />
            </View>
            <View style={styles.text}>
                <Placeholder
                    style={{
                        ...styles.quote,
                        width: '60%',
                        height: 30,
                    }}
                />
            </View>
            <View style={styles.mediaContent}>
                <View style={{ width: '33%' }}>
                    <Placeholder
                        style={{
                            ...styles.placeholder,
                            height: 180,
                        }}
                    />
                </View>
                <View style={{ width: '33%' }}>
                <Placeholder
                        style={{
                            ...styles.placeholder,
                            height: 180,
                        }}
                    />
                </View>
                <View style={{ width: '33%' }}>
                <Placeholder
                        style={{
                            ...styles.placeholder,
                            width: '90%',
                            height: 180,
                        }}
                    />
                </View>

            </View>
            <View style={styles.mediaContent}>
                <View style={{ width: '33%' }}>
                    <Placeholder
                        style={{
                            ...styles.placeholder,
                            height: 180,
                        }}
                    />
                </View>
                <View style={{ width: '33%' }}>
                <Placeholder
                        style={{
                            ...styles.placeholder,
                            height: 180,
                        }}
                    />
                </View>
                <View style={{ width: '33%' }}>
                <Placeholder
                        style={{
                            ...styles.placeholder,
                            width: '90%',
                            height: 180,
                        }}
                    />
                </View>

            </View>
            <View style={styles.mediaContent}>
                <View style={{ width: '33%' }}>
                    <Placeholder
                        style={{
                            ...styles.placeholder,
                            height: 180,
                        }}
                    />
                </View>
                <View style={{ width: '33%' }}>
                <Placeholder
                        style={{
                            ...styles.placeholder,
                            height: 180,
                        }}
                    />
                </View>
                <View style={{ width: '33%' }}>
                <Placeholder
                        style={{
                            ...styles.placeholder,
                            width: '90%',
                            height: 180,
                        }}
                    />
                </View>

            </View>
        </PlaceholderContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        zIndex: 10,
        position: 'absolute',
        width,
        backgroundColor: colors.primary,
        height,
    },
    placeholder: {
        backgroundColor: colors.lightBlack,
    },
    profileImage: {
        backgroundColor: colors.lightBlack,
        borderRadius: 100,
        top: 120,
    },
    username: {
        backgroundColor: colors.lightBlack,
        top: 100,
    },
    quote: {
        backgroundColor: colors.lightBlack,
        top: 100,
    },
    banner: {
        display: 'flex',
        marginTop: 10,
        width: '100%',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    text: {
        marginTop: 30,
        paddingHorizontal: 10,
        alignItems: "center",
    },
    mediaContent:{
        top: 200,
        marginTop: 2,
        flexDirection: 'row',
        paddingLeft: 10,
        justifyContent: 'space-between',


    },
});

export default ProfileSkeleton;