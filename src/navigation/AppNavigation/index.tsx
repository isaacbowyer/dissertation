import { NavigationContainer } from "@react-navigation/native";
import { PrivateNavigation } from "../PrivateNavigation";
import { PublicNavigation } from "../PublicNavigation";
import { useAuthenticationContext } from "../../contexts/useAuthenticationContext";

export const AppNavigation = () => {
  const { state } = useAuthenticationContext();

  return (
    <NavigationContainer>
      {state?.isAuthenticated ? <PrivateNavigation /> : <PublicNavigation />}
    </NavigationContainer>
  );
};
