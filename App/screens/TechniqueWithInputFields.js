import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  BackHandler,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';
import { AppButton } from '../components/button';
import InputList from '../components/InputList';
import { storeMetaData, getMetaData } from '../services/user';
import readingMaterials from './readingMaterials/data';

const screenName = 'TechniqueWithInputFields';

const toArray = (arr) =>
  Array.isArray(arr) ? (arr.length > 0 ? arr : ['']) : [arr ?? ''];

const TechniqueWithInputFields = ({
  route,
  navigation,
  ...props
}) => {
  const { accessToken } = props;

  const [text, setText] = useState(['']);
  const [isLoading, setIsLoading] = useState(false);
  const headerText = route?.params?.banglaName;
  const pageId = route?.params?.id;

  const data = {
    technique_of_paying_attention_to_good_moments: {
      urlText:
        'ভাল লাগার মুহূর্তগুলো সম্পর্কে বিস্তারিত জানতে এখানে ক্লিক করুন',
      description: `অনিশ্চয়তা ও ভাবনার এই সময়ে, তাই নিজেকে জানতে ও ভাল রাখতে ভাল লাগার মুহূর্তগুলো লিখে ফেলুন:`,
      readingMaterialsName: 'Focusing on good moments',
    },
    learn_how_to_love_yourself: {
      urlText:
        'নিজেকে ভালবাসতে জানার কৌশলগুলো সম্পর্কে জানতে এখানে ক্লিক করুন',
      description: `এখনই শুরু করুন আপনার নিজের নিজেকে ভাল লাগার তালিকা। প্রতিদিন একবার করে চোখ বোলান আর যোগ করুন নতুন কিছু যা আগের বার লেখার সময় মনে ছিল না।`,
      readingMaterialsName: 'Learn to love yourself',
    },
  };

  const specificData = data[pageId];

  function handleBackButtonClick() {
    navigation.navigate(route.params.goBack ?? 'Homepage');
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

  useEffect(() => {
    const getMetaDataInit = async () => {
      setIsLoading(true);
      const data = await getMetaData(accessToken, pageId);
      if (data) {
        setText(toArray(data[pageId]));
      }
      setIsLoading(false);
    };

    if (pageId) {
      getMetaDataInit();
    }
  }, [pageId]);

  const handleSubmit = async () => {
    setIsLoading(true);
    const payload = { [pageId]: text };
    await storeMetaData(accessToken, payload);
    setIsLoading(false);
  };

  if (!specificData) {
    return <></>;
  }

  return (
    <View>
      <ScrollView>
        <View style={{ padding: 15 }}>
          <View>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('ReadingMaterials', {
                  ...route.params,
                  data: readingMaterials.find(
                    (issue) =>
                      issue.name ===
                      specificData.readingMaterialsName,
                  ),
                  goBack: screenName,
                })
              }
            >
              <Text
                style={{
                  fontSize: 20,
                  paddingBottom: 15,
                  fontWeight: 'bold',
                  textDecorationLine: 'underline',
                  color: 'navy',
                }}
              >
                {specificData.urlText}
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <View>
              <Text style={{ lineHeight: 23 }}>
                {specificData.description}
              </Text>
              {isLoading ? (
                <ActivityIndicator
                  size={50}
                  color={'#52a871'}
                  style={{ padding: 25 }}
                />
              ) : (
                <InputList items={text} setItems={setText} />
              )}

              <AppButton
                title={'Save'}
                style={{ marginTop: 18 }}
                onPress={handleSubmit}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isAccountVerified: state.auth.isAccountVerified,
  accessToken: state.auth.accessToken,
  refreshToken: state.auth.refreshToken,
});

export default connect(mapStateToProps, {})(TechniqueWithInputFields);
