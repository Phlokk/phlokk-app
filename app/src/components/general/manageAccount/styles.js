import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    button: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'lightgray',
    },
    text: {
        color: 'black',

    }
});

export default styles;