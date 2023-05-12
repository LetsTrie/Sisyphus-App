import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  imageBackground: {
    height: '100%',
    width: '100%',
  },
  linearGradient: {
    opacity: 0.5,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  headerContainer: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTextContainer: {
    color: 'white',
    fontSize: 50,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  loginSignupButtonContainer: {
    flex: 2,
    justifyContent: 'flex-end',
    paddingBottom: 30,
  },
  buttonText: {
    fontSize: 18,
  },
  buttonStyle: {},
});

export default styles;
