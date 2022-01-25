import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        paddingVertical: 5,
        alignItems: 'center',
        paddingHorizontal: 50,
        borderBottomWidth: 1,
        borderColor: 'lightgray',
    },
    imageContainer: {
        alignItems: 'center',
        marginTop: 20
    },
    imageViewContainer: {
        backgroundColor: 'gray',
        height: 100,
        width: 100,
        borderRadius: 50,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        height: 100,
        width: 100,
        position: 'absolute'
    },
    imageOverlay: {
        backgroundColor: 'rgba(0,0,0, 0.5)',
        ...StyleSheet.absoluteFill
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
    text: {
        color: 'lightgray',
        fontWeight: 'bold',

    },
    avatar: {
        height: 100,
        width: 100,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: 'lightgray',
    },
    reviews: {
        color: 'yellow',
    },

    sales: {
        color: 'green',
    }

});

export default styles;