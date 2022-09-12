import React from 'react';
import {View} from 'react-native';
import {Feather} from '@expo/vector-icons';

function VerifiedIcon() {
	return (
		<View
			style={{
				width: 12,
				height: 12,
				backgroundColor: '#4cd0e1',
				borderRadius: 6,
				justifyContent: 'center',
				alignItems: 'center',
				paddingTop: 1,
				marginHorizontal: 3,
			}}
		>
			<Feather name="check" size={11} color="white" />
		</View>
	);
}
export default VerifiedIcon;
