import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Modal,
  BackHandler,
  Text,
  ActivityIndicator,
} from 'react-native';
import Box from '../../components/Scale/Box';
import { connect } from 'react-redux';
import { useHeaderHeight } from '@react-navigation/elements';
import { ScaleDescriptionPage } from './ScaleDescriptionPage';
import { engToBanNumConversion } from '../../helpers/utils';
import colors from '../../config/colors';

const AssessmentResultHistory = ({ navigation, route, ...props }) => {
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [label, setLabel] = useState([]);

  function handleBackButtonClick() {
    navigation.navigate(route.params.goBack);
    return true;
  }

  useEffect(() => {
    BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackButtonClick,
    );
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);

  return (
    <>
      {!isLoading ? (
        <>
          <View
            style={{
              textAlign: 'center',
              width: '100%',
              paddingTop: 10,
            }}
          >
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        </>
      ) : (
        <>
          {data.length === 0 ? (
            <Text
              style={{
                textAlign: 'center',
                fontSize: 25,
                fontWeight: 'bold',
                paddingTop: 15,
                color: '#333',
              }}
            >
              কোন হিস্ট্রি নেই
            </Text>
          ) : (
            <Text>Hello</Text>
          )}
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  resultContainer: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 15,
  },
});

const mapStateToProps = (state) => ({
  jwtToken: state.auth.jwtToken,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {})(AssessmentResultHistory);
