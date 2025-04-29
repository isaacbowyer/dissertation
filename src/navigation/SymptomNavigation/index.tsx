import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SymptomsScreen } from "../../screens/ScreenAppSymptoms";
import { SymptomsProvider } from "../../contexts/useSymptomsContext";
import { SymptomGoalScreen } from "../../screens/ScreenAppSymptomGoal";
import { AddSymptomScreen } from "../../screens/ScreenAppAddSymptom";
import { AddSymptomProgressScreen } from "../../screens/ScreenAppAddSymptomProgress";

export const SymptomNavigation = () => {
  const SymptomStack = createNativeStackNavigator();

  return (
    <SymptomsProvider>
      <SymptomStack.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
        })}
      >
        <SymptomStack.Screen name="User Symptoms" component={SymptomsScreen} />
        <SymptomStack.Screen
          name="Symptom Goal"
          component={SymptomGoalScreen}
        />
        <SymptomStack.Screen name="Add Symptom" component={AddSymptomScreen} />
        <SymptomStack.Screen
          name="Symptom Progress"
          component={AddSymptomProgressScreen}
        />
      </SymptomStack.Navigator>
    </SymptomsProvider>
  );
};
