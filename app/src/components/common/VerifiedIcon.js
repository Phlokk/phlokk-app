import React from 'react';
import {View} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; 
import colors from '../../../config/colors'

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
			<FontAwesome5 name="check" size={9} color={colors.white} />
		</View>
	);
}
export default VerifiedIcon;
