import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { errorLog } from '../../helpers/log';

import { ScaleComponent } from '../../components/Scale/Scales';
import { chooseScale } from '../../helpers/chooseScale';
import { submitScale } from '../../services/scale';
import { connect } from 'react-redux';
import { getLatestProgress } from '../../redux/actions/scaleActions';

const createPayloadForSubmitScale = (mainScale, answers) => {
  const requestBody = {
    questionnairesId: mainScale.id,
    questionAnswers: answers.map((ans) => ({
      question: ans.question,
      answer: ans.optionLabel,
      value: ans.optionValue,
    })),
    score: answers.reduce((a, o) => a + parseInt(o.optionValue), 0),
  };

  let severity = '';
  if (mainScale.isMesaurable) {
    mainScale.severityRange.forEach((s) => {
      if (s.min <= requestBody.score && s.max >= requestBody.score) {
        severity = s.severity;
      }
    });
  }

  requestBody.severity = severity;
  return requestBody;
};

const Scale = ({ navigation, route, ...props }) => {
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const scaleName = route.params.scaleName;
  const mainScale = chooseScale(scaleName);
  const questions = mainScale.questionnaires;
  const totalScore = questions.reduce(
    (acc, question) =>
      acc +
      Math.max(...question.options.map((o) => parseInt(o.value))),
    0,
  );

  console.log(totalScore);

  const [answers, setAnswers] = useState(
    new Array(questions.length).fill(null),
  );

  useEffect(() => {
    if (submitted) {
      const payload = createPayloadForSubmitScale(mainScale, answers);
      (async () => {
        setIsLoading(true);
        try {
          await submitScale(payload, props.accessToken);
          await getLatestProgress(props.accessToken);
          await navigation.navigate('ScaleResult', {
            score: payload.score,
            stage: payload.severity,
            type: payload.questionnairesId,
            totalScore,
          });
        } catch (error) {
          errorLog(error);
        } finally {
          setIsLoading(false);
        }
      })();
    }
  }, [submitted]);

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView>
        <ScaleComponent
          questions={questions}
          answers={answers}
          setAnswers={setAnswers}
          setSubmitted={setSubmitted}
          isLoading={isLoading}
        />
      </ScrollView>
    </View>
  );
};

const mapStateToProps = (state) => ({
  accessToken: state.auth.accessToken,
});

export default connect(mapStateToProps, {
  getLatestProgress,
})(Scale);
