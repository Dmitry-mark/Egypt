// App.js
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import StartScreen from './screens/StartScreen.js';
import QuizScreen from './screens/QuizScreen.js';
import QuizStartScreen from './screens/QuizStartScreen.js';
import MiniGameScreen from './screens/MiniGameScreen.js';
import AttractionsScreen from './screens/AttractionsScreen.js';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="StartScreen">
        <Stack.Screen 
          name="StartScreen" 
          component={StartScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="QuizScreen" 
          component={QuizScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="QuizStartScreen" 
          component={QuizStartScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="MiniGameScreen" 
          component={MiniGameScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="AttractionsScreen" 
          component={AttractionsScreen} 
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
