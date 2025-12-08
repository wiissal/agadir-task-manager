import react from 'react';
import {NaviagtionContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import SplashScreen from '../screens/SplashScreen';
import LoginScreen from 'screens/LoginScreen';
import RegisterScreen from 'screens/RegisterScreen';
import TaskListScreen from 'screens/TaskListScreen';
import AddTaskScreen from 'screens/AddTaskScreen';
import TaskHistoryScreen from 'screens/TaskHistoryScreen';

const stack = createStackNavigator();
export const AppNavigator = ({isLoggedIn , isSplashLoading}) =>{
  return ( 
<NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {isSplashLoading ? (
          <Stack.Screen name="Splash" component={SplashScreen} />
        ) : !isLoggedIn ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="TaskList" component={TaskListScreen} />
            <Stack.Screen name="AddTask" component={AddTaskScreen} />
            <Stack.Screen name="TaskHistory" component={TaskHistoryScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
  