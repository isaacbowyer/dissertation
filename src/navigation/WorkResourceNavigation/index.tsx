import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { WorkResourcesScreen } from "../../screens/ScreenAppWorkResources";
import { WorkResourceScreen } from "../../screens/ScreenAppWorkResource";
import { ResourceCategoriesProvider } from "../../contexts/useResourceCategoriesContext";

export const WorkResourceNavigation = () => {
  const WorkResourceStack = createNativeStackNavigator();

  return (
    <ResourceCategoriesProvider>
      <WorkResourceStack.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
        })}
      >
        <WorkResourceStack.Screen
          name="Work Resources"
          component={WorkResourcesScreen}
        />
        <WorkResourceStack.Screen
          name="Work Resource"
          component={WorkResourceScreen}
        />
      </WorkResourceStack.Navigator>
    </ResourceCategoriesProvider>
  );
};
