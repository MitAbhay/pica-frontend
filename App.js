import RootNavigator from "./navigation/RootNavigator";
import { Provider as PaperProvider } from "react-native-paper";
export default function App() {
  return (
    <PaperProvider>
      <RootNavigator />
    </PaperProvider>
  );
}
