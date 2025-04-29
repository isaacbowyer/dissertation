import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SettingsScreen } from "../../screens/ScreenAppSettings";
import { PersonalProfileScreen } from "../../screens/ScreenAppPersonalProfile";
import { NotificationsScreen } from "../../screens/ScreenAppNotifications";

export const SettingsNavigation = () => {
  const SettingsStack = createNativeStackNavigator();

  return (
    <SettingsStack.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
      })}
    >
      <SettingsStack.Screen name="Settings" component={SettingsScreen} />
      <SettingsStack.Screen
        name="Personal Profile"
        component={PersonalProfileScreen}
      />
      <SettingsStack.Screen
        name="Notifications"
        component={NotificationsScreen}
      />
    </SettingsStack.Navigator>
  );
};
