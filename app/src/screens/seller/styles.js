import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#131313',
        paddingVertical: 5,
        alignItems: 'center',
        paddingHorizontal: 50,
        borderBottomWidth: 1,
        borderColor: 'lightgray',
    },
    counterContainer: {
        paddingBottom: 20,
        flexDirection: 'row',
        
    },
    counterItemContainer: {
        flex: 1,
        alignItems: 'center'
    },
    creatorText: {
        padding: 20,
        color: 'white',
        fontWeight: 'bold',
    },
    counterNumberText: {
        fontWeight: 'bold',
        fontSize: 14,
        color: 'white'
    },
    counterLabelText: {
        color: 'gray',
        fontSize: 11,
    },
    text: {
        color: 'lightgray',
        fontWeight: 'bold',

    },
    reviews: {
        color: 'yellow',
    },

    sales: {
        color: 'green',
    }

});

export default styles;