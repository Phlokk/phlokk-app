
import React, { useContext } from "react";
import {View, StyleSheet,} from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from '../../../config/colors'
import { useTheme } from "../../theme/context";
function RisingStar() {
	const { theme, setTheme } = useTheme();
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
      <MaterialCommunityIcons style={theme == "light" ? styles.star_light : styles.star_dark} name="star" size={15} color={colors.white} />
		</View>
	);
}
export default RisingStar;

const styles = StyleSheet.create({
	star_light: {
		color: colors.starLight,
	},
	star_dark: {
		color: colors.white,
		
	}

})


