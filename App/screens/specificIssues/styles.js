import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  upperHeaderContainer: {
    backgroundColor: '#479162',
    paddingTop: 10,
    marginBottom: 15,
    paddingLeft: 7,
    shadowColor: 'black',
    shadowOffset: 50,
    elevation: 2,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  upperHeaderText: {
    fontSize: 40,
    color: '#fffef4',
    fontFamily: 'playfair-bold',
    textAlign: 'center',
    paddingBottom: 20,
    letterSpacing: 0.2,
  },
  container: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  sectionHeaderText: {
    fontWeight: 'bold',
    fontSize: 19,
    paddingBottom: 8,
    textAlign: 'justify',
    textDecorationLine: 'underline',
  },
  sectionSubHeaderText: {
    fontWeight: 'bold',
    fontSize: 17,
    paddingBottom: 8,
    textAlign: 'justify',
  },
  sectionParagraphText: {
    textAlign: 'justify',
    lineHeight: 21.5,
    paddingBottom: 10,
    color: '#3c3c3c',
  },
  bulletPoints: {
    paddingLeft: 20,
    paddingBottom: 10,
  },
  bulletItems: {
    textAlign: 'justify',
    lineHeight: 21.5,
    paddingBottom: 1,
    color: '#3c3c3c',
  },
});

export default styles;
