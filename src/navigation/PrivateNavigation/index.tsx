import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { colors } from "../../data/colors";
import Icon from "react-native-vector-icons/Ionicons";
import { SymptomNavigation } from "../SymptomNavigation";
import { CurrentEntityProvider } from "../../contexts/useCurrentEntityContext";
import { UsersProvider } from "../../contexts/useUsersContext";
import { SettingsNavigation } from "../SettingsNavigation";
import { WorkResourceNavigation } from "../WorkResourceNavigation";
import { ResourceTypesProvider } from "../../contexts/useResourceTypesContext";

export const PrivateNavigation = () => {
  const Tab = createBottomTabNavigator();

  return (
    <UsersProvider>
      <CurrentEntityProvider>
        <ResourceTypesProvider>
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
                }

                // You can return any component that you like here!
                return <Icon name={iconName} size={size} color={color} />;
              },
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
            <Tab.Screen
              name="Work Resources"
              component={WorkResourceNavigation}
            />
            <Tab.Screen name="Settings" component={SettingsNavigation} />
          </Tab.Navigator>
        </ResourceTypesProvider>
      </CurrentEntityProvider>
    </UsersProvider>
  );
};
