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
import axios from 'axios';
import baseUrl from '../../config/baseUrl';
import Chart from '../../components/Chart';
import Table from '../../components/Table';
import { getFormattedDate } from '../../helpers/utils';

const AssessmentResultHistory = ({ navigation, route, ...props }) => {
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [label, setLabel] = useState([]);

  const { accessToken } = props;

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      };
      const { data } = await axios.get(
        `${baseUrl}/scale/history/${route.params.scaleId}`,
        { headers },
      );
      const tests = data.history;

      let testArray = [];
      const dataArray = [];
      const dateArray = [];
      for (let test of tests) {
        const createdAt = getFormattedDate(test.createdAt);
        let singleTestArray = [];
        singleTestArray.push(createdAt);
        singleTestArray.push(`${test.score ?? 0}`);

        singleTestArray.push(test.severity ? test.severity : '-');
        testArray.push(singleTestArray);
        dataArray.unshift(parseInt(test.score ?? 0));
        dateArray.unshift(createdAt);
      }
      setTableData(testArray);
      setData(dataArray);
      setLabel(dateArray);

      setIsLoading(false);
    })();
  }, []);

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
      {isLoading ? (
        <>
          <View
            style={{
              textAlign: 'center',
              width: '100%',
              paddingTop: 50,
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
            <View style={styles.resultContainer}>
              <Chart data={data} labels={label} />
              {tableData && (
                <Table
                  widthArr={[100, 100, 120]}
                  tableData={tableData}
                />
              )}
            </View>
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
  isAuthenticated: state.auth.isAuthenticated,
  isAccountVerified: state.auth.isAccountVerified,
  accessToken: state.auth.accessToken,
  refreshToken: state.auth.refreshToken,
});

export default connect(mapStateToProps, {})(AssessmentResultHistory);
