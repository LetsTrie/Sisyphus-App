import { useEffect, useCallback } from 'react';
import { Button, View, Text } from 'react-native';
import AppLoading from 'expo-app-loading';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from './App/redux/store';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ScreenContainer } from './App/components/screenContainer';
import LoginSignupComponent from './App/screens/onboarding/loginSignup';
import DemographicInformation from './App/screens/onboarding/demographicInformation';
import Homepage from './App/screens/homepage';
import { SpecificIssues } from './App/screens/specificIssues';

import AssessmentList from './App/screens/assessments/AssessmentList.js';
import Scale from './App/screens/assessments/Scale';
import Result from './App/screens/assessments/Result';
import { ScaleDescriptionPage } from './App/screens/assessments/ScaleDescriptionPage';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import colors from './App/config/colors';

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded, error] = useFonts({
    'poppins-bold': require('./App/assests/fonts/Poppins/Poppins-Bold.ttf'),
    'poppins-regular': require('./App/assests/fonts/Poppins/Poppins-Regular.ttf'),
    'playfair-black': require('./App/assests/fonts/PlayfairDisplay/PlayfairDisplay-Black.ttf'),
    'playfair-bold': require('./App/assests/fonts/PlayfairDisplay/PlayfairDisplay-Bold.ttf'),
    openSans: require('./App/assests/fonts/Open_Sans/OpenSans.ttf'),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ScreenContainer onLayout={onLayoutRootView}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="LoginSignup"
              screenOptions={{
                headerStyle: {
                  backgroundColor: '#479162',
                  height: 60,
                },
                headerTitleStyle: {
                  color: 'white',
                  fontSize: 20,
                },
                headerTintColor: 'white',
                headerBackTitle: 'Back',
                headerTitleAlign: 'center',
              }}
            >
              <Stack.Screen
                name="LoginSignup"
                component={LoginSignupComponent}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="DemographicInformation"
                component={DemographicInformation}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="Homepage"
                component={Homepage}
                options={({ navigation }) => ({
                  title: 'Quality Life',
                  headerShown: false,
                })}
              />

              <Stack.Screen
                name="AssessmentList"
                component={AssessmentList}
                options={({ navigation }) => ({
                  title: 'নিজেকে মূল্যায়ন করুন',
                })}
              />

              <Stack.Screen
                name="SpecificIssues"
                component={SpecificIssues}
                options={({ navigation }) => ({
                  headerShown: false,
                })}
              />
              {/* ExploreScale */}
              <Stack.Screen
                name="ExploreScale"
                component={Scale}
                options={({ navigation, route, ...props }) => ({
                  title: route.params.banglaTitle,
                })}
              />
              {/* Result */}
              <Stack.Screen
                name="ScaleResult"
                component={Result}
                options={({ navigation }) => ({
                  title: 'Scale Result',
                })}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </ScreenContainer>
  );
}
