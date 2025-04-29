import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NotificationsScreen } from "../../screens/ScreenAppNotifications";

export const NotificationsNavigation = () => {
  const NotificationsStack = createNativeStackNavigator();

  return (
    <NotificationsStack.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
      })}
    >
      <NotificationsStack.Screen
        name="Notifications"
        component={NotificationsScreen}
      />
    </NotificationsStack.Navigator>
  );
};
