
import React from "react";
import { View } from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from '../../../config/colors'

function RisingStarFeed() {
	return (
		<View
			style={{
				
				borderRadius: 6,
				justifyContent: 'center',
				alignItems: 'center',
        top: -13.5,
        left: 15,
        opacity: 0.8,
			}}
		>
      <MaterialCommunityIcons name="star" size={15} color={colors.white} />
		</View>
	);
}
export default RisingStarFeed;