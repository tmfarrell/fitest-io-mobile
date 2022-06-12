import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    formContainer: {
        flexDirection: 'row',
        height: 80,
        marginTop: 40,
        marginBottom: 20,
        flex: 1,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 30,
        paddingRight: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        paddingLeft: 16,
        flex: 1,
        marginRight: 5
    },
    button: {
        height: 50,
        borderRadius: 5,
        backgroundColor: '#ea9999',
        width: 160,
        alignItems: "center",
        justifyContent: 'center'
    },
    buttonText: {
        color: 'white',
        fontSize: 16
    },
    listContainer: {
        flex: 0.9,
        marginTop: 20,
        marginBottom: 20,
        padding: 20,
    },
    entityContainer: {
        marginTop: 15,
        borderBottomColor: '#cccccc',
        borderBottomWidth: 1,
        paddingBottom: 15,
        paddingLeft: 10,
        paddingRight: 15
    },
    entityText: {
        fontSize: 20,
        color: '#333333'
    }, 
    entityName: {
        fontSize: 20,
        color: '#333333',
        fontWeight: 'bold'
    },
    entityAuthorName: {
        fontSize: 18,
        color: '#db3d3d',
        fontWeight: 'bold',
        paddingTop: 10,
        paddingBottom: 5, 
        marginLeft: 10,
        textAlignVertical: 'center'
    }
})