import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '65%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 30,
    },
    box: {
        width: '50%',
        height: '50%',
        padding: 5,
    },
    inner: {
        flex: 1,
        backgroundColor: '#131313',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'lightgray',
        borderWidth: 1,
        borderRadius: 8,
    },
    sellerText: {
        color: 'lightgray',
        marginTop: 20,
    },
    greenText: {
        marginTop: 20,
        color: 'green',
    }
    
    
});

export default styles;