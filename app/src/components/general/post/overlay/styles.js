import { Dimensions, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        position: 'absolute',
        zIndex: 999,
        bottom: 0,
        paddingLeft: 20,
        paddingBottom: 20,
        paddingRight: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    },
    username: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    description: {
        marginTop: 10,
        color: 'white',
        marginBottom: 10,
    },
    avatar: {
        height: 50,
        width: 50,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: 'white',
        marginBottom: 10
    },
    leftContainer: {
        alignItems: 'center'
    },
    actionButton: {
        paddingBottom: 16
    },
    actionButtonText: {
        color: 'white',
        textAlign: 'center',
        marginTop: 4
    }
})

export default styles