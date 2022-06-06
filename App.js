import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import { HomeScreen, PostScreen, LoginScreen, RegistrationScreen } from './src/screens'

import {decode, encode} from 'base-64'
if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }

import { firebase_app } from './src/firebase/config'


const Stack = createStackNavigator();

export default function App() {

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const usersRef = firebase_app.firestore().collection('users');
    firebase_app.auth().onAuthStateChanged(user => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data()
            setLoading(false)
            setUser(userData)
          })
          .catch((error) => {
            setLoading(false)
          });
      } else {
        setLoading(false)
      }
    });
  }, []);

  if (loading) {  
    return (  
      <></> 
    ) 
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        { user ? (
          <>
            <Stack.Screen name="Home" component={HomeScreen}
              initialParams={{ userId: user.id }} />
            <Stack.Screen name="Post" component={PostScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Registration" component={RegistrationScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
