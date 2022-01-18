import { setStatusBarBackgroundColor } from "expo-status-bar";
import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        
    },
    button: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        
        
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
    text: {
        color: 'white',

    }
});

export default styles;