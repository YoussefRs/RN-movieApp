import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import fonts from "./config/fonts";
import { Provider } from 'react-redux';
import { store } from './redux/store'

import Navigation from "./navigation";

export default function App() {
  const [fontsLoaded] = useFonts(fonts);

  return !fontsLoaded ? null : (
    <SafeAreaProvider>
     <Provider store={store}>
      <Navigation />
        <StatusBar style='light' />
     </Provider>
    </SafeAreaProvider>
  );
}
