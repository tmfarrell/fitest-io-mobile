import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import styles from './styles';
import { firebase_app, firebase } from '../../../firebase/config'

export default function PostScreen({navigation, route }) {

    const [entityText, setEntityText] = useState('')
    const [entityName, setEntityName] = useState('')
    const [entities, setEntities] = useState([])

    const entityRef = firebase_app.firestore().collection('entities')
    const userID = route.params.userId

    const onPostPress = () => {
        if (entityText && entityText.length > 0) {
            const timestamp = firebase.firestore.FieldValue.serverTimestamp();
            const data = {
                name: entityName,
                text: entityText,
                authorID: userID,
                createdAt: timestamp,
            } ;
            entityRef
                .add(data)
                .then(_doc => {
                    setEntityName('')
                    setEntityText('')
                    Keyboard.dismiss()
                })
                .catch((error) => {
                    alert(error)
                }) ;
            navigation.navigate('Home', { userId: userID }) ; 
        }
    }


    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                <TextInput
                    style={styles.inputName}
                    placeholder='Name'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setEntityName(text)}
                    value={entityName}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    multiline
                    numberOfLines={6}
                    style={styles.multilineInput}
                    placeholderTextColor="#aaaaaa"
                    placeholder='Description'
                    onChangeText={(text) => setEntityText(text)}
                    value={entityText}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <View style={styles.container}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => onPostPress()}>
                        <Text style={styles.buttonTitle}>Post</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}