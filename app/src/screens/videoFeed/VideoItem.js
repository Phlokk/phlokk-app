import React, {useEffect, useRef, useState} from 'react';
import {View, Pressable, StyleSheet} from 'react-native';
import {Video, Audio} from 'expo-av';
import {useIsFocused} from '@react-navigation/native';
import {FontAwesome5} from '@expo/vector-icons';
import PostSingleOverlay from '../../components/general/post/overlay/PostSingleOverlay';
import UserProfileOverlay from '../../components/general/post/overlay/UserProfileOverlay';
import colors from '../../../config/colors';
import LinearGradient from 'react-native-linear-gradient';
import Slider from '@react-native-community/slider';


import axios from '../../redux/apis/axiosDeclaration';
import {apiUrls} from '../../globals';

const VideoItem = ({
	item,
	index,
	currentVideoIndex,
	itemHeight,
	currentUser,
	areTabsShowing,
}) => {
	const [shouldPlay, setShouldPlay] = useState(true);
	const isFocused = useIsFocused();
	const [playbackStatus, setPlaybackStatus] = useState();
	const [isScrubbing, setIsScrubbing] = useState(false);
	const [videoResizeMode, setVideoResizeMode] = useState(
		Video.RESIZE_MODE_COVER
	);
	const videoPlayerRef = useRef();

	const [isMarkedPlayed, setIsMarkedPlayed] = useState(false);

	// Set up audio play mode for iOS
	useEffect(() => {
		const setupAudio = async () => {
			await Audio.setAudioModeAsync({playsInSilentModeIOS: true});
		};
		setupAudio();
	}, []);

	// watches for index change upon scroll to reset the video status
	useEffect(() => {
		setShouldPlay(true);
	}, [currentVideoIndex]);

	//this is called to play or pause the video
	const playPauseVideo = () => {
		setShouldPlay(!shouldPlay);
	};

	if (
		playbackStatus?.positionMillis >=
			playbackStatus?.playableDurationMillis / 2 &&
		!isMarkedPlayed
	) {
		setIsMarkedPlayed(true);
		axios.post(apiUrls.BASE_URL + '/api/post/view/' + item._id, {
			play_count: true,
		});
	}

	return (
		<View style={{height: itemHeight, backgroundColor: 'black'}}>
			<Pressable style={{flex: 1}} onPress={playPauseVideo}>
				<Video
					ref={videoPlayerRef}
					source={{
						uri: item.media[0].original_url,
						type: item.media[0].mime_type,
					}}
					isMuted={currentVideoIndex !== index || !isFocused}
					resizeMode={videoResizeMode}
					style={styles.videoRenderer}
					shouldPlay={currentVideoIndex === index && shouldPlay && isFocused}
					isLooping
					usePoster
					posterSource={{uri: item.poster}}
					posterStyle={{resizeMode: 'cover', height: '100%'}}
					onPlaybackStatusUpdate={status => setPlaybackStatus(status)}
					onReadyForDisplay={e => {
						const orientation = e.naturalSize.orientation;
						if (orientation === 'landscape') {
							setVideoResizeMode(Video.RESIZE_MODE_CONTAIN);
						} else {
							setVideoResizeMode(Video.RESIZE_MODE_COVER);
						}
					}}
				/>

				{!shouldPlay && (
					<FontAwesome5
						name="play"
						size={50}
						color={colors.white}
						style={styles.pauseIcon}
					/>
				)}
			</Pressable>

			<View pointerEvents="none" style={styles.bottomGradientWrapper}>
				<LinearGradient
					colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.4)']}
					style={{height: 650, width: '100%'}}
				/>
			</View>

			<UserProfileOverlay
				user={item.user}
				post={item}
				currentUser={currentUser}
				areTabsShowing={areTabsShowing}
			/>

			<PostSingleOverlay
				user={item.user}
				post={item}
				isCurrentUser={item.user.username === currentUser.username}
			/>

			<Slider
				style={[styles.timelineSlider, areTabsShowing && {bottom: 0}]}
				minimumValue={0}
				maximumValue={playbackStatus?.durationMillis}
				value={!isScrubbing && playbackStatus?.positionMillis}
				onSlidingStart={() => setIsScrubbing(true)}
				onSlidingComplete={async val => {
					await videoPlayerRef.current.setPositionAsync(val, {
						toleranceMillisAfter: 100,
						toleranceMillisBefore: 100,
					});
					setIsScrubbing(false);
				}}
				minimumTrackTintColor={colors.green}
				thumbTintColor="transparent"
				
				
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	videoRenderer: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
	},
	pauseIcon: {
		position: 'absolute',
		opacity: 0.25,
		top: '45%',
		left: '45%',
	},
	bottomGradientWrapper: {
		position: 'absolute',
		left: 0,
		right: 0,
		bottom: 0,
		height: 650,
	},
	timelineSlider: {
		position: 'absolute',
		left: 0,
		right: 0,
		bottom: 20,
		marginHorizontal: -4,
		
		
	},

});

export default VideoItem;
