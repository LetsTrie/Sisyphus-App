/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useCallback } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HeaderBackButton } from '@react-navigation/elements';
import { store, persistor } from './App/redux/store';
import { ScreenContainer } from './App/components/screenContainer';
import LoginSignupComponent from './App/screens/onboarding/loginSignup';
import DemographicInformation from './App/screens/onboarding/demographicInformation';
import Homepage from './App/screens/homepage';
import { ReadingMaterials } from './App/screens/readingMaterials';
import AssessmentResultHistory from './App/screens/assessments/AssessmentResultHistory';
import AssessmentList from './App/screens/assessments/AssessmentList.js';

import ThoughtChallengeP1 from './App/screens/thoughtChallanges/Page1';
import ThoughtChallengeP2 from './App/screens/thoughtChallanges/Page2';
import ThoughtChallengeP3 from './App/screens/thoughtChallanges/Page3';
import ThoughtChallengeP4 from './App/screens/thoughtChallanges/Page4';
import ThoughtSummary from './App/screens/thoughtChallanges/summery';
import ThoughtChallengeInit from './App/screens/thoughtChallanges/init';

import Scale from './App/screens/assessments/Scale';
import Result from './App/screens/assessments/Result';
import CopyingCards from './App/screens/copyingCards/CopingCards';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import MusicPlayerList from './App/screens/musicPlayers/MusicPlayerList';
import HelpCenter from './App/screens/HelpCenter';
import TechniqueWithInputFields from './App/screens/TechniqueWithInputFields';
import YtScreen from './App/screens/YtScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded, _] = useFonts({
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
              initialRouteName="Homepage"
              screenOptions={{
                headerStyle: {
                  backgroundColor: '#479162',
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
                name="CopyingCards"
                component={CopyingCards}
                options={({ navigation, route }) => ({
                  title:
                    route?.params?.headerTitle ?? 'অনুশীলন কার্ড',
                  headerLeft: (props) => (
                    <HeaderBackButton
                      {...props}
                      style={{ marginLeft: 0 }}
                      onPress={() => {
                        navigation.navigate('Homepage');
                      }}
                    />
                  ),
                })}
              />
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
                options={() => ({
                  title: 'Quality Life',
                  headerShown: false,
                })}
              />
              <Stack.Screen
                name="AssessmentList"
                component={AssessmentList}
                options={({ navigation }) => ({
                  title: 'নিজেকে মূল্যায়ন করুন',
                  headerLeft: (props) => (
                    <HeaderBackButton
                      {...props}
                      style={{ marginLeft: 0 }}
                      onPress={() => {
                        navigation.navigate('Homepage');
                      }}
                    />
                  ),
                })}
              />
              <Stack.Screen
                name="ReadingMaterials"
                component={ReadingMaterials}
                options={({ navigation, route }) => ({
                  title:
                    route?.params?.data?.banglaName ??
                    'নিজেকে মূল্যায়ন করুন',
                  headerLeft: (props) => (
                    <HeaderBackButton
                      {...props}
                      style={{ marginLeft: 0 }}
                      onPress={() =>
                        navigation.navigate(
                          route.params.goBack ?? 'Homepage',
                          { ...route.params },
                        )
                      }
                    />
                  ),
                })}
              />
              <Stack.Screen
                name="TechniqueWithInputFields"
                component={TechniqueWithInputFields}
                options={({ navigation, route }) => ({
                  title:
                    route?.params?.banglaName ??
                    'নিজেকে মূল্যায়ন করুন',
                  headerLeft: (props) => (
                    <HeaderBackButton
                      {...props}
                      style={{ marginLeft: 0 }}
                      onPress={() => navigation.navigate('Homepage')}
                    />
                  ),
                })}
              />
              <Stack.Screen
                name="ThoughtChallengeP1"
                component={ThoughtChallengeP1}
                options={({ navigation }) => ({
                  title: 'চিন্তার পরিবর্তন',
                  headerLeft: (props) => (
                    <HeaderBackButton
                      {...props}
                      style={{ marginLeft: 0 }}
                      onPress={() =>
                        navigation.navigate('ThoughtChallengeInit')
                      }
                    />
                  ),
                })}
              />
              <Stack.Screen
                name="ThoughtChallengeP2"
                component={ThoughtChallengeP2}
                options={({ navigation }) => ({
                  title: 'চিন্তার পরিবর্তন',
                  headerLeft: (props) => (
                    <HeaderBackButton
                      {...props}
                      style={{ marginLeft: 0 }}
                      onPress={() =>
                        navigation.navigate('ThoughtChallengeP1')
                      }
                    />
                  ),
                })}
              />
              <Stack.Screen
                name="ThoughtChallengeP3"
                component={ThoughtChallengeP3}
                options={({ navigation }) => ({
                  title: 'চিন্তার পরিবর্তন',
                  headerLeft: (props) => (
                    <HeaderBackButton
                      {...props}
                      style={{ marginLeft: 0 }}
                      onPress={() =>
                        navigation.navigate('ThoughtChallengeP2')
                      }
                    />
                  ),
                })}
              />
              <Stack.Screen
                name="ThoughtChallengeP4"
                component={ThoughtChallengeP4}
                options={({ navigation }) => ({
                  title: 'চিন্তার পরিবর্তন',
                  headerLeft: (props) => (
                    <HeaderBackButton
                      {...props}
                      style={{ marginLeft: 0 }}
                      onPress={() =>
                        navigation.navigate('ThoughtChallengeP3')
                      }
                    />
                  ),
                })}
              />

              <Stack.Screen
                name="ThoughtChallengeInit"
                component={ThoughtChallengeInit}
                options={({ navigation }) => ({
                  title: 'চিন্তার পরিবর্তন',
                  headerLeft: (props) => (
                    <HeaderBackButton
                      {...props}
                      style={{ marginLeft: 0 }}
                      onPress={() => navigation.navigate('Homepage')}
                    />
                  ),
                })}
              />
              <Stack.Screen
                name="ThoughtSummary"
                component={ThoughtSummary}
                options={({ navigation }) => ({
                  title: 'সার সংক্ষেপ',
                  headerLeft: (props) => (
                    <HeaderBackButton
                      {...props}
                      style={{ marginLeft: 0 }}
                      onPress={() =>
                        navigation.navigate('ThoughtChallengeInit')
                      }
                    />
                  ),
                })}
              />
              <Stack.Screen
                name="ExploreScale"
                component={Scale}
                options={({ navigation, route }) => ({
                  title: route.params.banglaTitle,
                  headerLeft: (props) => (
                    <HeaderBackButton
                      {...props}
                      style={{ marginLeft: 0 }}
                      onPress={() => {
                        navigation.navigate(route.params.goBack);
                      }}
                    />
                  ),
                })}
              />
              <Stack.Screen
                name="YtScreen"
                component={YtScreen}
                options={({ navigation, route }) => ({
                  title: route.params.title ?? 'সংক্ষিপ্ত কিছু কৌশল',
                  headerLeft: (props) => (
                    <HeaderBackButton
                      {...props}
                      style={{ marginLeft: 0 }}
                      onPress={() => navigation.navigate('Homepage')}
                    />
                  ),
                })}
              />
              <Stack.Screen
                name="TatkhonikUposhom"
                component={MusicPlayerList}
              />
              <Stack.Screen
                name="HelpCenter"
                component={HelpCenter}
                options={({ navigation }) => ({
                  title: 'হেল্প সেন্টার',
                  headerLeft: (props) => (
                    <HeaderBackButton
                      {...props}
                      style={{ marginLeft: 0 }}
                      onPress={() => {
                        navigation.navigate('Homepage');
                      }}
                    />
                  ),
                })}
              />
              <Stack.Screen
                name="ScaleResult"
                component={Result}
                options={({ navigation }) => ({
                  title: 'ফলাফল',
                  headerLeft: (props) => (
                    <HeaderBackButton
                      {...props}
                      style={{ marginLeft: 0 }}
                      onPress={() => {
                        navigation.navigate('Homepage');
                      }}
                    />
                  ),
                })}
              />
              <Stack.Screen
                name="AssessmentResultHistory"
                component={AssessmentResultHistory}
                options={({ navigation, route }) => ({
                  title: 'হিস্ট্রি দেখুন',
                  headerLeft: (props) => (
                    <HeaderBackButton
                      {...props}
                      style={{ marginLeft: 0 }}
                      onPress={() => {
                        navigation.navigate(route.params.goBack);
                      }}
                    />
                  ),
                })}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </ScreenContainer>
  );
}
