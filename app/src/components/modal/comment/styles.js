import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-end',
        flex: 1,
        backgroundColor: '#1C1C1C',
        

    },
    containerInput: {
        padding: 25,
        flexDirection: 'row'

    },
    input: {
        backgroundColor: 'lightgrey',
        borderRadius: 8,
        flex: 1,
        marginHorizontal: 10,
        paddingHorizontal: 10
    },

    textComment: {
        color: 'white'
    }
})

export default styles