import { config } from "@gluestack-ui/config";
import { GluestackUIProvider, SafeAreaView } from "@gluestack-ui/themed";
import { AuthenticationProvider } from "./src/contexts/useAuthenticationContext";
import { AppNavigation } from "./src/navigation/AppNavigation";
import { Platform, StatusBar } from "react-native";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const isAndorid = Platform.OS === "android";

export const queryClient = new QueryClient();

export default function App() {
  return (
    <>
      <SafeAreaView
        flex={1}
        marginTop={isAndorid ? StatusBar.currentHeight : 0}
      >
        <GluestackUIProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <AuthenticationProvider>
              <AppNavigation />
            </AuthenticationProvider>
          </QueryClientProvider>
        </GluestackUIProvider>
      </SafeAreaView>
      <ExpoStatusBar style="auto"></ExpoStatusBar>
    </>
  );
}
