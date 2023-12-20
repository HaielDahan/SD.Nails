import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from './Loginpage'; // Import your LoginPage component
import HomePage from './Homepage';
import SignUp from './Signup';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="Sign" component={SignUp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
