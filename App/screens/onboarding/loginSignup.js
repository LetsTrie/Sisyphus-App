import React, { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Text,
  View,
  ImageBackground,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import styles from './loginSignup.styles';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import colors from '../../config/colors';
import { connect } from 'react-redux';
import {
  loginAction,
  logoutAction,
} from '../../redux/actions/authActions';
import { navigateAfterLogin } from '../../helpers/auth';
import { errorLog } from '../../helpers/log';
import { loginWithGoogle } from '../../services/auth';

import {
  googleAndroidClientId,
  expoWebClientId,
} from '../../config/config';
import { AppButton } from '../../components/button';

WebBrowser.maybeCompleteAuthSession();

// TODO: Name, ProfileImage info - get from API
const LoginSignupComponent = ({ navigation, route, ...props }) => {
  const { loginAction, logoutAction } = props;

  const [isLoading, setIsLoading] = useState(false);

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: expoWebClientId,
    // iosClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
    androidClientId: googleAndroidClientId,
    // webClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
    scopes: ['openid', 'profile', 'email'],
  });

  console.log(request, response, promptAsync);

  useEffect(() => {
    navigateAfterLogin(
      navigation,
      props.isAuthenticated,
      props.isAccountVerified,
    );
  }, [props.isAuthenticated, props.isAccountVerified]);

  useEffect(() => {
    if (response?.type === 'success') {
      (async () => {
        try {
          setIsLoading(true);
          await loginWithGoogle(
            response.authentication.accessToken,
            loginAction,
          );
        } catch (error) {
          errorLog(`Getting data from google profile - ${error}`);
        } finally {
          setIsLoading(false);
        }
      })();
    }
  }, [response]);

  const handlePress = () => {
    const hasRedirected = navigateAfterLogin(
      navigation,
      props.isAuthenticated,
      props.isAccountVerified,
    );
    if (!hasRedirected) promptAsync();
  };

  const handleLogout = async () => {
    await logoutAction();

    ToastAndroid.showWithGravity(
      'আপনি সফলভাবে লগআউট করেছেন!',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  };

  return (
    <>
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={require('../../assests/images/loginSignup.jpg')}
          style={styles.imageBackground}
        >
          <LinearGradient
            colors={['#525252', '#757575']}
            start={[0, 0]}
            end={[1, 1]}
            style={styles.linearGradient}
          ></LinearGradient>

          <View style={styles.headerContainer}>
            <Text style={styles.headerTextContainer}>Sisyphus</Text>
          </View>

          <View style={styles.loginSignupButtonContainer}>
            {isLoading && (
              <ActivityIndicator
                size={50}
                color={colors.primary}
                style={{ paddingBottom: 25 }}
              />
            )}
            {props.isAuthenticated ? (
              <View>
                <AppButton
                  title="অ্যাপে প্রবেশ করুন"
                  style={styles.buttonStyle}
                  textStyle={styles.buttonText}
                  onPress={handlePress}
                />
                <AppButton
                  title="লগ আউট"
                  style={styles.buttonStyle}
                  textStyle={styles.buttonText}
                  onPress={handleLogout}
                />
              </View>
            ) : (
              <View>
                <AppButton
                  title="লগিন করুন"
                  style={styles.buttonStyle}
                  textStyle={styles.buttonText}
                  disabled={!request}
                  onPress={handlePress}
                />
                <AppButton
                  title="একাউন্ট তৈরি করুন"
                  style={styles.buttonStyle}
                  textStyle={styles.buttonText}
                  disabled={!request}
                  onPress={handlePress}
                />
              </View>
            )}
          </View>
        </ImageBackground>
      </View>
    </>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isAccountVerified: state.auth.isAccountVerified,
  accessToken: state.auth.accessToken,
  refreshToken: state.auth.refreshToken,
});

export default connect(mapStateToProps, {
  loginAction,
  logoutAction,
})(LoginSignupComponent);
