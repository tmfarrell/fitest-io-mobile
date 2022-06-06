import React, { useEffect, useState } from 'react'; 
import { FlatList, Text, TouchableOpacity, View } from 'react-native'; 

import styles from './styles';
import { firebase_app, firebase } from '../../../firebase/config'

export default function HomeScreen({navigation, route }) {

    const [entityText, setEntityText] = useState('')
    const [entityName, setEntityName] = useState('')
    const [entities, setEntities] = useState([])

    const entityRef = firebase_app.firestore().collection('entities')
    const userID = route.params.userId

    const onPostLinkPress = () => {
        navigation.navigate('Post', { userId: userID })
    }

    useEffect(() => {
        entityRef
            .orderBy('createdAt', 'desc')
            .onSnapshot(
                querySnapshot => {
                    const newEntities = []
                    querySnapshot.forEach(doc => {
                        const entity = doc.data()
                        entity.id = doc.id
                        newEntities.push(entity)
                    });
                    setEntities(newEntities)
                },
                error => {
                    console.log(error)
                }
            )
    }, [])

    const renderEntity = ({item, index}) => {
        return (
            <View style={styles.entityContainer}>
                <Text style={styles.entityName}>
                    {item.name}
                </Text>
                <Text style={styles.entityText}>
                    {item.text}
                </Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            { entities && (
                <View style={styles.listContainer}>
                    <FlatList
                        data={entities}
                        renderItem={renderEntity}
                        keyExtractor={(item) => item.id}
                        removeClippedSubviews={true}
                    />
                </View>
            )}
            <TouchableOpacity
                style={styles.button}
                onPress={() => onPostLinkPress()}>
                <Text style={styles.buttonText}>Post</Text>
            </TouchableOpacity>
        </View>
    )
}