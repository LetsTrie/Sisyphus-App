import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  BackHandler,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux';
import moment from 'moment';

import { errorLog } from '../../helpers/log';
import { getChallangeData } from '../../services/user';
import colors from '../../config/colors';

import { useIsFocused } from '@react-navigation/native';

import { AppButton } from '../../components/button';
import baseUrl from '../../config/baseUrl';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Accordion = ({ item, index }) => {
  const [on, setOn] = useState(index === 0 ? true : false);
  const handleClick = () => setOn((prev) => !prev);
  return (
    <>
      <TouchableOpacity
        style={styles.accordionContainer}
        onPress={handleClick}
      >
        <View>
          <View
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Text
              style={[
                { fontSize: 18, paddingLeft: 7 },
                on && {
                  fontWeight: 'bold',
                  fontSize: 19,
                  paddingLeft: 2,
                },
              ]}
            >
              {moment(new Date(item.createdAt)).format(
                'ddd, MMM DD, YYYY h:mm a',
              )}
            </Text>
            <MaterialCommunityIcons
              name={on ? 'chevron-down' : 'chevron-right'}
              size={25}
              color={colors.primary}
            />
          </View>
          <View>
            {on && (
              <View>
                <View style={{ paddingTop: 15, paddingBottom: 5 }}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: 'bold',
                      color: colors.primary,
                      paddingBottom: 10,
                    }}
                  >
                    পূর্ববর্তী চিন্তা
                  </Text>
                  <Text
                    style={{
                      textAlign: 'justify',
                      color: '#333',
                      fontSize: 16.5,
                    }}
                  >
                    {item.oneOptionOfThoughts}
                  </Text>
                </View>
                <View style={{ paddingTop: 15, paddingBottom: 15 }}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: 'bold',
                      color: colors.primary,
                      paddingBottom: 10,
                    }}
                  >
                    বিকল্প চিন্তা
                  </Text>
                  <View
                    style={{
                      textAlign: 'justify',
                      color: '#333',
                    }}
                  >
                    {item.finalThought.map((n, i) => (
                      <Text
                        style={{ fontSize: 16.5, paddingBottom: 2 }}
                        key={`${i}-${n}`}
                      >
                        ◉ {n}
                      </Text>
                    ))}
                  </View>
                </View>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

const Summary = ({ navigation, route, ...props }) => {
  const [isFullPageLoading, setIsFullPageLoading] = useState(true);
  const [lists, setLists] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      (async () => {
        try {
          const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${props.accessToken}`,
          };
          const { data } = await axios.get(
            `${baseUrl}/account/thought-challenge-summary`,
            { headers },
          );
          setLists(data.lists ?? []);
        } catch (err) {
          errorLog(err);
        } finally {
          setIsFullPageLoading(false);
        }
      })();
    } else {
      setIsFullPageLoading(true);
    }
  }, [isFocused]);

  function handleBackButtonClick() {
    navigation.navigate('ThoughtChallengeInit');
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
    <View>
      {isFullPageLoading ? (
        <ActivityIndicator
          size={50}
          color={'#52a871'}
          style={{ paddingTop: 25 }}
        />
      ) : (
        <ScrollView>
          {lists.length === 0 ? (
            <View>
              <Text
                style={{
                  textAlign: 'center',
                  padding: 25,
                  paddingBottom: 20,
                  fontSize: 35,
                  fontWeight: 'bold',
                  color: '#333',
                }}
              >
                কোন ডাটা নেই
              </Text>
              <View>
                <AppButton
                  title="নতুন চিন্তার পরিবর্তন করুন"
                  style={{ backgroundColor: colors.medium }}
                  textStyle={{ fontSize: 17 }}
                  onPress={() =>
                    navigation.navigate('ThoughtChallengeP1', {
                      goBack: 'Homepage',
                    })
                  }
                />
              </View>
            </View>
          ) : (
            <View style={{ paddingTop: 10 }}>
              {lists.map((list, index) => (
                <Accordion item={list} key={index} index={index} />
              ))}
              <View style={styles.redirectionButtonContainer}>
                <AppButton
                  title="হোমপেইজে প্রবেশ করুন"
                  style={styles.redirectionButton}
                  onPress={() =>
                    navigation.navigate('Homepage', {
                      goBack: 'Homepage',
                    })
                  }
                />
              </View>
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  redirectionButton: {
    marginTop: 15,
  },
  accordionContainer: {
    backgroundColor: 'white',
    padding: 15,
    margin: 8,
    marginVertical: 5,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: colors.primary,
  },
});

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isAccountVerified: state.auth.isAccountVerified,
  accessToken: state.auth.accessToken,
  refreshToken: state.auth.refreshToken,
});

export default connect(mapStateToProps, {})(Summary);
