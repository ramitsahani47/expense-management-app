
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/index";

export default function App() {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}