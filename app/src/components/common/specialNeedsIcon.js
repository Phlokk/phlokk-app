import React from 'react';
import {View, StyleSheet} from 'react-native';
import { Entypo } from '@expo/vector-icons'; 
import colors from '../../../config/colors'

function SpecialNeedsIcon() {
	return (
		<View style={styles.specialNeedsView}>
      <Entypo name="awareness-ribbon" size={18} color={colors.green} />
		</View>
	);
}


const styles = StyleSheet.create({
	specialNeedsView: {
		
		width: 18,
		height: 18,
		borderRadius: 6,
		justifyContent: 'center',
		alignItems: 'center',
		marginHorizontal: 10,
		top: 20,
	},
	


})
export default SpecialNeedsIcon;
