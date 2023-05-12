import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  upperHeaderContainer: {
    backgroundColor: '#479162',
    paddingTop: 20,
    marginBottom: 15,
    paddingLeft: 7,
    shadowColor: 'black',
    shadowOffset: 50,
    elevation: 2,
  },
  upperHeaderText: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
    paddingBottom: 20,
  },
  container: {
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    paddingRight: 15,
  },
  sectionHeaderText: {
    fontWeight: 'bold',
    fontSize: 19,
    paddingBottom: 8,
    textAlign: 'justify',
    // textDecorationLine: 'underline',
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
    paddingLeft: 12,
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
