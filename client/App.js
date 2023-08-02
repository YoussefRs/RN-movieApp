import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native';
import Navigation from './navigation';
import { store } from './redux/Store';
import { Provider } from 'react-redux';



export default function App() {
  return (
    <>
    <Provider store={store}>
      <Navigation />
      <StatusBar style='light' />
    </Provider>
    </>
  );
}


