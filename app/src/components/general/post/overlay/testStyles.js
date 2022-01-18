import { Dimensions, StyleSheet } from 'react-native'

const styles = StyleSheet.create({

    container: {
        width: Dimensions.get('window').width,
        position: 'absolute',
        zIndex: 999,
        bottom: 0,
        paddingLeft: 10,
        paddingBottom: 10,
        paddingRight: 10,
        marginEnd: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    },

      uiContainer: {
        height: '100%',
        justifyContent: 'flex-end',
      },
      bottomContainer: {
        padding: 5,
        
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
      },
      handle: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 10,
      },
      description: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '300',
        marginBottom: 10,
      },
      songName: {
        color: '#fff',
        fontSize: 16,
        marginLeft: 5,
      },
    
      //  right container
      rightContainer: {
        alignSelf: 'flex-end',
        height: 275,
        justifyContent: 'space-between',
        marginRight: 5,
      },
      profilePicture: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#fff',
      },
    
      iconContainer: {
        alignItems: 'center',
      },
      statsLabel: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        marginTop: 5,
      },

      actionButton: {
        paddingBottom: 16
    },

    actionButtonText: {
        color: 'white',
        textAlign: 'center',
        marginTop: 4
    },
    });
    
    export default styles;