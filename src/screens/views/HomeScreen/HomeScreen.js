import React, { useEffect, useState } from 'react' ; 
import { FlatList, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native' ; 
import { ListItem, Card, Button, Avatar } from 'react-native-elements'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons'

import styles from './styles';
import PostScreen from '../PostScreen/PostScreen'
import { firebase_app, firebase } from '../../../firebase/config'

function HomeScreenFeed({navigation, route }) {

    const [entities, setEntities] = useState([])

    const entityRef = firebase_app.firestore().collection('entities')
    const userId = route.params.userId
    const userFullName = route.params.userFullName

    useEffect(() => {
        entityRef
            .orderBy('createdAt', 'desc')
            .onSnapshot(
                querySnapshot => {
                    const newEntities = []
                    querySnapshot.forEach(doc => {
                        const entity = doc.data()
                        entity.id = doc.id
                        entity.avatar_url = 'https://avatars.dicebear.com/v2/identicon/67c19c14c3833efe63ccfeffb0e43a29.svg'
                        newEntities.push(entity)
                    });
                    setEntities(newEntities)
                },
                error => {
                    console.log(error)
                }
            )
        return () => {
            setEntities([]) ; 
        } ;
    }, [])

    keyExtractor = (item, index) => index.toString()

    renderItem = ({ item }) => (
          <ListItem
            onPress={() => navigation.navigate('Workout', { item: item, styles: styles })}
            bottomDivider>
                <ListItem.Content>
                    <ListItem.Title style={{ textAlignVertical: 'center' }}>
                        <Avatar source={item.avatar_url && { uri: item.avatar_url}}/>
                        <Text style={styles.entityAuthorName}>{item.authorFullName}</Text>
                    </ListItem.Title>
                    <ListItem.Subtitle style={{ paddingBottom: 10, paddingTop: 2.5, color: 'grey' }}>
                        { item.createdAt ? item.createdAt.toDate().toLocaleString() : '' } 
                    </ListItem.Subtitle>
                    <Text style={styles.entityName}>{item.name}</Text>
                    <Text style={styles.entityText}>{item.text}</Text>
                </ListItem.Content>
            </ListItem>
    )

    return (
        <View style={{ flex: 1 }}>
            <Card style={{ flex: 0.9 }}>
                { entities && (
                   <FlatList
                      keyExtractor={keyExtractor}
                      data={entities}
                      renderItem={renderItem}
                    />
                )}
            </Card>
        </View>
    )
}

const Tab = createBottomTabNavigator();

export default function HomeScreen({navigation, route }) {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreenFeed} 
              initialParams={{ userId: route.params.userId, userFullName: route.params.userFullName }}
              options={{
                tabBarIcon: ({focused, color, size}) => <Ionicons name="home" color={color} size={size}/>
            }}/>
            <Tab.Screen name="Post" component={PostScreen} 
              initialParams={{ userId: route.params.userId, userFullName: route.params.userFullName }}
              options={{
                tabBarIcon: ({focused, color, size}) => <Ionicons name="add-circle" color={color} size={size}/>
            }}/>
        </Tab.Navigator>
    )
}