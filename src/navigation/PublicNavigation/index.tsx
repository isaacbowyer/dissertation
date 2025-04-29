import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "../../screens/ScreenHome";
import { LogInScreen } from "../../screens/ScreenLogIn";
import { CreateAccountScreen } from "../../screens/ScreenCreateAccount";

export const PublicNavigation = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Home"
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Log In" component={LogInScreen} />
      <Stack.Screen name="Create Account" component={CreateAccountScreen} />
    </Stack.Navigator>
  );
};
