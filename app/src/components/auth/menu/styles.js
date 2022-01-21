import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    container: {
        flex: 1,
        
        backgroundColor: '#131313'
    },
    containerMain: {
        flex: 1,
        padding: 30
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 25,
        marginBottom: 25,
        color: 'white',
        textAlign: 'center'
    },
    providerButton: {
        borderColor: 'lightgray',
        borderWidth: 1,
        borderStyle: 'solid',
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    providerButtonText: {
        paddingRight: 20,
        color: '#fff',
    },
    containerBottomButton: {
        backgroundColor: 'ghostwhite',
        padding: 20,
        alignItems: 'center',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'lightgray',
    },
    bottomButtonText: {
        fontWeight: 'bold',
        color: 'red',
    },

    logoContainer: {
        alignItems: 'center'
    },
    phlokkLogo: {
        marginBottom: 20,
    }
   
});


export default styles;