import React, { useEffect, useState } from 'react' ; 
import { Text, TouchableOpacity, View } from 'react-native'; 
import { ListItem, Card, Button, Avatar } from 'react-native-elements'

export default function WorkoutPostDetail({ navigation, route }) {
    const item = route.params.item 
    const styles = route.params.styles 
    return (
        <View>
        <Card>
            <ListItem>
                <ListItem.Content>
                    <ListItem.Title style={{ textAlignVertical: 'center' }}>
                        <Avatar source={route.params.item.avatar_url && { uri: item.avatar_url}}/>
                        <Text style={styles.entityAuthorName}>{item.authorFullName}</Text>
                    </ListItem.Title>
                    <ListItem.Subtitle style={{ paddingBottom: 10, paddingTop: 2.5, color: 'grey' }}>
                        {item.createdAt.toDate().toLocaleString()}
                    </ListItem.Subtitle>
                    <Text style={styles.entityName}>{item.name}</Text>
                    <Text style={styles.entityText}>{item.text}</Text>
                </ListItem.Content>
            </ListItem>
        </Card>
        <View style={{ alignItems: 'center', justifyContent: 'center', paddingTop: 10 }}>
            <Button
              buttonStyle={styles.button}
              onPress={() => onExecuteLinkPress()}
              title='Execute' />
            </View>
        </View>
    )
} ; 