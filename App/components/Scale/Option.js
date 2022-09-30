import React from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import Text from '../text';
import { RadioButton } from 'react-native-paper';

const Option = ({
  question,
  text,
  value,
  selected,
  handleClick,
  handleQuestionChange,
  answers,
  setAnswers,
  currentQuestion,
}) => {
  const onPress = () => {
    const optionData = question.options.find(
      (op) => op.label === text,
    );
    handleClick({
      question: question.question,
      optionLabel: optionData.label,
      optionValue: optionData.value,
    });
    handleQuestionChange(true, false);
  };

  const checked =
    (selected && selected.optionLabel === text) ||
    (answers[currentQuestion] &&
      answers[currentQuestion].optionLabel === text);

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View
        style={[
          styles.optionContainer,
          checked ? styles.selectedOption : {},
        ]}
      >
        <Text
          style={[
            styles.optionText,
            checked ? styles.selectedOptionText : {},
          ]}
        >
          {text}
        </Text>
        <RadioButton
          value={text}
          status={checked ? 'checked' : 'unchecked'}
          color={'#52a871'}
          style={styles.optionStyle}
          onPress={onPress}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  optionContainer: {
    flexDirection: 'row',
    borderWidth: 0.5,
    elevation: 2,
    borderColor: '#ddd',
    paddingHorizontal: 13.5,
    paddingVertical: 5,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  selectedOption: {
    borderWidth: 2,
    borderColor: '#52a871',
    elevation: 1,
  },
  optionText: {
    flex: 1,
    fontSize: 15,
    color: '#444',
    alignSelf: 'center',
  },
  selectedOptionText: {
    color: '#52a871',
  },
});

export default Option;
