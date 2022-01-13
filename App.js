import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import styled from 'styled-components/native'
import Home from "./screens/Home";
import Pets from "./screens/Pets";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddPet from "./screens/AddPet";


export default function App() {

  const Stack = createNativeStackNavigator();


  return (

      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Pets" component={Pets} />
          <Stack.Screen name="AddPet" component={AddPet} />

        </Stack.Navigator>
      </NavigationContainer>
  );
}

const Input = styled.TextInput`
  border: 1px solid black;
  min-width:300px;
  padding:5px;
  border-radius:10px;
  margin-top:10px;
  margin-bottom:10px;
  `
const Heading = styled.Text`
  font-size:40px;
  margin-bottom:80px;
`
const Button = styled.Text`
  padding: 10px 10px;
  color: white;
  font-size: 20px;
  text-align: center;
`
const Press = styled.Pressable`
  display: flex;
  background-color:blue;
  width: 120px;
  border-radius:10px;
  margin-top: 20px;

`
