// import React, { useState } from 'react';
// import { View } from 'react-native';
// import QuestionCard from './QuestionCard';
// import questions from './questions.json'; // API se aane wala JSON data

// const QuizScreen = () => {
//     const [currentIndex, setCurrentIndex] = useState(0);

//     const nextQuestion = () => {
//         if (currentIndex < questions.length - 1) {
//             setCurrentIndex(currentIndex + 1);
//         }
//     };

//     return (
//         <View style={{ flex: 1, justifyContent: 'center' }}>
//             <QuestionCard questionData={questions[currentIndex]} onNext={nextQuestion} />
//         </View>
//     );
// };

// export default QuizScreen;


import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import SplashScreen from './src/screens/SplashScreen';
import MyTabs from './src/BottomTab/Tab';
import Quiz from './src/screens/Quiz';
import { StorageContextProvider } from './src/context/storageContext';
import Result from './src/screens/Result';
import AuthScreen from './src/screens/AuthScreen';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="AuthScreen" component={AuthScreen} />
      <Stack.Screen name="Quiz" component={Quiz}/>
      <Stack.Screen name="Tabs" component={MyTabs} />
      <Stack.Screen name="Result" component={Result} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <StorageContextProvider>
      <SafeAreaProvider>
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    </SafeAreaProvider>
    </StorageContextProvider>
  );
}
