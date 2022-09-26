import React, {useEffect, useState, useRef} from 'react';
import {FlatList, View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import SearchUserItem from '../../components/search/userItem/SearchUserItem';
// import axios from "../../redux/apis/axiosDeclaration";
import routes from '../../navigation/routes';
import {useNavigation} from '@react-navigation/native';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import colors from '../../../config/colors';
import SearchInput from '../../components/search/SearchInput';
import {SafeAreaView} from 'react-native-safe-area-context';

const SearchScreen = () => {
	const navigation = useNavigation();
	const [textInput, setTextInput] = useState('');
	const [searchUsers, setSearchUsers] = useState([]);

	const Categories = [
		{id: 1, name: 'Comedy', navigateTo: routes.COMEDY_SCREEN},
		{id: 2, name: 'Music', navigateTo: routes.MUSICIAN_SCREEN},
		{id: 3, name: 'Dancers', navigateTo: routes.DANCERS_SCREEN},
		{id: 4, name: 'Lip-sync', navigateTo: routes.LIP_SYNC_SCREEN},
		{id: 5, name: 'Foodies', navigateTo: routes.FOODIES_SCREEN},
		{id: 6, name: 'Cosplay', navigateTo: routes.COSPLAY_SCREEN},
		{id: 7, name: 'Fashion', navigateTo: routes.FASHION_SCREEN},
		{id: 8, name: 'Design', navigateTo: routes.DESIGN_SCREEN},
		{id: 9, name: 'Fitness', navigateTo: routes.FITNESS_SCREEN},
		{id: 10, name: 'Invention', navigateTo: routes.INVENTION_SCREEN},
	];

	const ItemRender = ({name, navigateTo}) => (
		<TouchableOpacity
			style={styles.item}
			onPress={() => {
				navigation.navigate(navigateTo);
			}}
		>
			<Text style={styles.itemText}>{name}</Text>
		</TouchableOpacity>
	);

	const Separator = () => {
		return (
			<View
				style={{
					height: 50,
					width: 1,
					padding: 5,
				}}
			/>
		);
	};

	return (
		<SafeAreaView style={styles.container}>
			<SearchInput placeholder="Search" setSearchUsers={setSearchUsers} />
			<FlatList
				style={styles.list}
				data={searchUsers}
				renderItem={({item}) => <SearchUserItem item={item} />}
				keyExtractor={item => item._id}
			/>
			<View style={styles.risingStarView}>
				<View style={styles.risingStarRow}>
					<Text style={styles.text}>Rising stars</Text>
					<MaterialCommunityIcons
						style={styles.star}
						color={colors.gray}
						size={20}
						name={'star'}
					/>
				</View>
				<FlatList
					data={Categories}
					renderItem={({item}) => (
						<ItemRender name={item.name} navigateTo={item.navigateTo} />
					)}
					keyExtractor={item => item.id}
					initialNumToRender={5}
					ItemSeparatorComponent={Separator}
					showsHorizontalScrollIndicator={false}
					horizontal={true}
				/>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 25,
		backgroundColor: colors.primary,
		padding: 5,
	},
	textInput: {
		backgroundColor: colors.secondary,
		borderRadius: 5,
		flexDirection: 'row',
		width: '100%',
		padding: 10,
		marginVertical: 10,
	},
	text: {
		color: colors.gray,
		fontSize: 12,
		marginBottom: 5,
		marginHorizontal: 3,
	},
	risingStarView: {
		padding: 10,
	},
	risingStarRow: {
		flexDirection: 'row',
	},
	star: {
		alignItems: 'center',
		alignSelf: 'center',
		paddingBottom: 3,
	},
	item: {
		padding: 5,
		backgroundColor: colors.lightBlack,
		width: 60,
		height: 60,
		borderRadius: 100,
		borderWidth: 0.75,
		borderColor: colors.primary,
		justifyContent: 'center',
		alignItems: 'center',
	},
	itemText: {
		fontSize: 8,
		color: colors.green,
		textAlign: 'center',
	},
});

export default SearchScreen;
