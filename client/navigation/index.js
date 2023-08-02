import * as React from "react";
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Colors from "../constants/Colors";
import HomeScreen from '../screens/HomeScreen';

const theme = {
    ...DefaultTheme,
    colors : {
        ...DefaultTheme.colors,
        // background: Colors.background
    }
}

export default function Navigation() {
    return (
        <NavigationContainer theme={theme}>
            <RootNavigator />
        </NavigationContainer>
    )
}

// * A root stack navigator is often used for displaying modals on top of all other content

const Stack = createNativeStackNavigator();

function RootNavigator() {
    return (
        <Stack.Navigator 
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>

    )
}