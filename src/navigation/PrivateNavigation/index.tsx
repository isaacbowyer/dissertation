import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { colors } from "../../data/colors";
import Icon from "react-native-vector-icons/Ionicons";
import { SymptomNavigation } from "../SymptomNavigation";
import { CurrentEntityProvider } from "../../contexts/useCurrentEntityContext";
import { UsersProvider } from "../../contexts/useUsersContext";
import { SettingsNavigation } from "../SettingsNavigation";
import { WorkResourceNavigation } from "../WorkResourceNavigation";
import { ResourceTypesProvider } from "../../contexts/useResourceTypesContext";
import { NotificationsNavigation } from "../NotificationNavigation";
import {
  NotificationsProvider,
  useNotificationsContext,
} from "../../contexts/useNotificationContext";
import { displayNotificationBadge } from "../../utils/displayNotificationBadge";

const CustomNavigation = () => {
  const Tab = createBottomTabNavigator();
  const { state, methods } = useNotificationsContext();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Symptoms") {
            iconName = "accessibility-outline";
          } else if (route.name === "Settings") {
            iconName = "settings";
          } else if (route.name === "Work Resources") {
            iconName = "book-outline";
          } else if (route.name === "Notifications") {
            iconName = "notifications-outline";
          }

          // You can return any component that you like here!
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarBadge: displayNotificationBadge(route.name, state.count), // Show badge only for Notifications tab
        tabBarActiveTintColor: colors.dark_blue,
        tabBarInactiveTintColor: colors.gray,
        headerTitleAlign: "center",
        tabBarStyle: {
          height: 60,
          paddingBottom: 4,
        },
      })}
    >
      <Tab.Screen name="Symptoms" component={SymptomNavigation} />
      <Tab.Screen name="Work Resources" component={WorkResourceNavigation} />
      <Tab.Screen
        name="Notifications"
        component={NotificationsNavigation}
      ></Tab.Screen>
      <Tab.Screen name="Settings" component={SettingsNavigation} />
    </Tab.Navigator>
  );
};

export const PrivateNavigation = () => {
  return (
    <NotificationsProvider>
      <UsersProvider>
        <CurrentEntityProvider>
          <ResourceTypesProvider>
            <CustomNavigation />
          </ResourceTypesProvider>
        </CurrentEntityProvider>
      </UsersProvider>
    </NotificationsProvider>
  );
};
