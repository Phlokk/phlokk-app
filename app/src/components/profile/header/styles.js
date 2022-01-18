import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        paddingVertical: 5,
        alignItems: 'center',
        paddingHorizontal: 50,
        borderBottomWidth: 1,
        borderColor: 'lightgray',
        backgroundColor: '#131313',
    },
    counterContainer: {
        paddingBottom: 20,
        flexDirection: 'row',
        
    },
    counterItemContainer: {
        flex: 1,
        alignItems: 'center',
        marginTop: 10,
    },
    creatorText: {
        padding: 20,
        color: 'white'
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

    bioText: {
        color: '#fff',
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 30,

    },

    display: {
        flexDirection: 'row',
        alignItems: 'center',
        fontWeight: 'bold',
        padding: 20,
        color: 'white',
    },
    text: {
        color: 'lightgray',
        fontWeight: 'bold',

    },
    linkText: {
        color: 'lightgray',
        marginBottom: 30

    },
    link: {
        alignItems: 'center',
        marginVertical: 5,
    },
    avatar: {
        height: 100,
        width: 100,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: 'lightgray',
  
    },
    username: {
        color: '#fff', 
        marginTop: 10,
        marginBottom: 20,

    },

});

export default styles;