import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WeatherUI from "./components/WeatherUI";
import About from "./components/About";

const Stack = createNativeStackNavigator();


export default function App() {

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={WeatherUI} options={{
                    headerShown: false
                }}/>
                <Stack.Screen name="About" component={About} options={{
                    headerStyle:{
                        backgroundColor:'#041624'
                    },
                    headerTintColor:'white'
                }}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
