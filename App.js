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
  return React.createElement(
    NavigationContainer,
    null,
    React.createElement(
      Stack.Navigator,
      { initialRouteName: 'StartScreen' },
      React.createElement(Stack.Screen, {
        name: 'StartScreen',
        component: StartScreen,
        options: { headerShown: false },
      })
    ),
    React.createElement(
      Stack.Navigator,
      { initialRouteName: 'QuizScreen' },
      React.createElement(Stack.Screen, {
        name: 'QuizScreen',
        component: QuizScreen,
        options: { headerShown: false },
      })
    ),
    React.createElement(
      Stack.Navigator,
      { initialRouteName: 'QuizStartScreen' },
      React.createElement(Stack.Screen, {
        name: 'QuizStartScreen',
        component: QuizStartScreen,
        options: { headerShown: false },
      })
    ),
    React.createElement(
      Stack.Navigator,
      { initialRouteName: 'MiniGameScreen' },
      React.createElement(Stack.Screen, {
        name: 'MiniGameScreen',
        component: MiniGameScreen,
        options: { headerShown: false },
      })
    ),
    React.createElement(
      Stack.Navigator,
      { initialRouteName: 'AttractionsScreen' },
      React.createElement(Stack.Screen, {
        name: 'AttractionsScreen',
        component: AttractionsScreen,
        options: { headerShown: false },
      })
    )
  );
}

export default App;