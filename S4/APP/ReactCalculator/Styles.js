import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    output: {
        flex: 2,
        backgroundColor: '#363636'
    },
    outputText: {
        marginTop: 35,
        color: 'white',
        fontSize: 38,
        fontWeight: 'bold',
        textAlign: 'right',
        alignItems: 'center',
        padding: 20
    },
    buttons: {
        flex: 8,
        backgroundColor: '#fff'
    },
    container: {
      flex: 1,
      backgroundColor: '#fff'
    },
    inputButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0.5,
        borderColor: '#91AA9D'
    },
    inputButtonText: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 10,
        color: 'black'
    },
    inputRow: {
        flex: 1,
        flexDirection: 'row'
    }
  });

  export default styles;