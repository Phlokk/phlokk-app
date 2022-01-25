
import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#131313'
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

    fieldsContainer: {
        marginTop: 20,
        padding: 20,
        flex: 1
    },
    fieldItemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
    },
    fieldValueContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    text: {
        color: '#fff',
        fontSize: 10,
    },
    authText: {
        color: 'lightgray',
    },
     socialText: {
         color: 'lightgray',
         fontSize: 8,
         marginTop: 20,
     },
     divider: {
        borderBottomWidth: 0.3,
        borderColor: 'lightgray',
        marginTop: 10,
        

     }
});

export default styles;