import React, { useEffect } from 'react';
import { Text, View, ScrollView, BackHandler } from 'react-native';

import styles from './styles';

const SpecificIssues = ({ route, navigation, ...props }) => {
  const data = route?.params?.data?.data ?? [];
  const headerText = route?.params?.data?.banglaName;

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

  const DataContainer = ({ data }) => {
    if (data.header) {
      return (
        <Text style={styles.sectionHeaderText}>{data.header}</Text>
      );
    } else if (data.subheader) {
      return (
        <Text style={styles.sectionSubHeaderText}>
          {data.subheader}
        </Text>
      );
    } else if (data.paragraph) {
      return (
        <Text style={styles.sectionParagraphText}>
          {data.paragraph}
        </Text>
      );
    } else if (data.bulletItems?.length > 0) {
      return (
        <View style={styles.bulletPoints}>
          {data.bulletItems.map((item) => (
            <Text style={styles.bulletItems} key={item}>
              ◉ {item}
            </Text>
          ))}
        </View>
      );
    }
  };
  return (
    <View>
      <ScrollView>
        <View style={styles.upperHeaderContainer}>
          <Text style={styles.upperHeaderText}> {headerText} </Text>
        </View>
        <View style={styles.container}>
          {data.map((el, index) => (
            <DataContainer data={el} key={index} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export { SpecificIssues };
