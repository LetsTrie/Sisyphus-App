import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
} from 'react';

import {
  View,
  ScrollView,
  BackHandler,
  Text,
  TouchableWithoutFeedback,
  Dimensions,
  ActivityIndicator,
  Button,
} from 'react-native';

import Box from '../../components/Scale/Box';
import { connect } from 'react-redux';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import NewCardModal from './NewCardModal';
import { getCardList, deleteCard } from '../../services/card';
import { errorLog } from '../../helpers/log';
import { AppButton } from '../../components/button';
import readingMaterials from '../readingMaterials/data';

const windowWidth = Dimensions.get('window').width;

const sectionsAllCards = [
  {
    id: 'cpc-01',
    name: 'রাগ সম্পর্কিত',
    cards: [
      {
        createdByUser: false,
        text: 'আপনার নিজের মূল্যায়ন আপনিই সবথকে ভাল করতে পারেন। নিজের শক্তি/গুনগুলোতে বিশ্বাস রাখি',
      },
      {
        createdByUser: false,
        text: 'অন্যরা আমাকে নিয়ে কি ভাবছে সেটা আসলে বোঝার উপায় নেই। শুধু শুধু অনুমান করে কষ্ট বাড়িয়ে লাভ কি?',
      },
      {
        createdByUser: false,
        text: 'মানুষ মাত্রই তো ভুল করে। অন্যরাও আমাকে ভুল বুঝতে পারে।',
      },
      {
        createdByUser: false,
        text: 'সবাই সবকিছু ঠিকমতো করতে পারবে না, এটাই স্বাভাবিক। কোন মানুষই ১০০% সঠিক কিছু করতে পারবেনা, এটাই স্বাভাবিক',
      },
      {
        createdByUser: false,
        text: 'রাগের অতিরিক্ত বহিঃপ্রকাশ আমার স্বাস্থ্যের জন্য ও ক্ষতিকর। চেষ্টা করি শরীরটাকে শান্ত করার। চাইলেই রাগ নিয়ন্ত্রণ',
      },
      {
        createdByUser: false,
        text: 'চাইলে আপনি নিজেও এরকম কোপিং কার্ড তৈরি করতে পারেন। \n \n লিখুন',
      },
    ],
  },
  {
    id: 'cpc-02',
    name: 'চাপ নিয়ন্ত্রণ',
    cards: [
      {
        createdByUser: false,
        text: 'আমি কি প্রতিনিয়ত কিছু দায়িত্ব যোগ করছি? এবার আমাকে না বলতে হবে',
      },
      {
        createdByUser: false,
        text: 'আমার একার পক্ষে সবাইকে খুশি করা সম্ভব না।',
      },
      {
        createdByUser: false,
        text: 'একটু বুক ভরে নিঃশ্বাস নিই, শরীর মন দুটোই হালকা লাগবে।',
      },
      {
        createdByUser: false,
        text: 'অন্যরা কাজটা ঠিকমতো করবে কিনা এই ভেবে সবকিছু নিজের কাঁধে নিয়েছি কি? কিছুটা দায়িত্ব ভাগ করে নিই।',
      },
      {
        createdByUser: false,
        text: '"শতভাগ সফল না হওয়া মানে জীবনটাই ব্যার্থ" আমি কি তাই বিশ্বাস করছি? ছোটখাটো অর্জনগুলোকে গুরুত্ব দিই আর জীবনটাকে উপভোগ করি।',
      },
      {
        createdByUser: false,
        text: 'চাইলে আপনি নিজেও এরকম কোপিং কার্ড তৈরি করতে পারেন। \n \n লিখুন',
      },
    ],
  },
  {
    id: 'cpc-03',
    name: 'আত্মহত্যার চিন্তা',
    cards: [
      {
        createdByUser: false,
        text: 'এই একটাই জীবন। না চাইলেও মৃত্যু আসবেই। কিন্তু চাইলেও আমি আরেকটা জীবন পাবো না।',
      },
      {
        createdByUser: false,
        text: 'যে কোন মানুষেরই কখনো না কখনো আত্মহত্যার চিন্তা চলে আসতে পারে। এর মানেই আত্মহত্যা করা নয়।',
      },
      {
        createdByUser: false,
        text: 'এই মুহূর্তে বেঁচে থাকাটা খুব অসহনীয় লাগছে, কিন্তু আমি যদি একটু ধৈর্য ধরি, জীবনে আবার সহজ সময় আসবে।',
      },
      {
        createdByUser: false,
        text: 'একা একা এই সময়টা কষ্ট না করে, আমি নির্ভরযোগ্য কারো সহযোগিতা নিবো।',
      },
      {
        createdByUser: false,
        text: 'আমি আত্মহত্যা করলে আমার খুব কাছের মানুষগুলোকে সেটার জন্য বড় একটা কষ্ট দিবো, যেটা সারাজীবন তাঁদের বয়ে বেড়াতে হবে।',
      },
      {
        createdByUser: false,
        text: 'প্রতিটা সমস্যার একটা না একটা সমাধান আছে। দরকার হলে আমি যোগ্য কোন পেশাজীবির সাহায্য নিবো।',
      },
      {
        createdByUser: false,
        text: 'চাইলে আপনি নিজেও এরকম কোপিং কার্ড তৈরি করতে পারেন। \n \n লিখুন',
      },
    ],
  },
  {
    id: 'cpc-04',
    name: 'সম্পর্কের টানাপোড়ন',
    cards: [
      {
        createdByUser: false,
        text: 'সব সম্পর্কেই টানাপোড়ন থাকে আমি এর ব্যাতিক্রম নই।',
      },
      {
        createdByUser: false,
        text: 'আমি কি সবসময় অন্যের সম্পর্কের সাথে নিজেকে তুলনা করছি আর হতাশ হচ্ছি।',
      },
      {
        createdByUser: false,
        text: 'আমি কি সবসময় আমার পার্টনার কে তুচ্ছ তাচ্ছিল্য করছি? দিনে অন্তত আধ ঘণ্টা সময় কথা বলি যাতে শ্রদ্ধাবোধ থাকে।',
      },
      {
        createdByUser: false,
        text: 'আমি আমার পার্টনারকে দোষারোপ না করে, বরং দুজন কথা বলে একটি বিষয় মীমাংসা করতে পারি।',
      },
      {
        createdByUser: false,
        text: 'কোন মানুষই পারফেক্ট নয়, আমার সম্পর্কের মানুষটিরও দুর্বলতা থাকতে পারে।',
      },
      {
        createdByUser: false,
        text: 'চাইলে আপনি নিজেও এরকম কোপিং কার্ড তৈরি করতে পারেন। \n \n লিখুন',
      },
    ],
  },
  {
    id: 'cpc-05',
    name: 'পড়াশোনার দক্ষতা',
    cards: [
      {
        createdByUser: false,
        text: 'আমি নিয়ম করে সময় দিলে এবং ধৈর্য ধরে রাখলে, পড়াশোনায় মনোযোগ আসবে।',
      },
      {
        createdByUser: false,
        text: 'সব কাজ আমাকে এক বসায় সেরে ফেলতে হবে এমন কোন কথা নাই। আমি চাইলেই কাজটাকে ছোট ছোট ভাগ করে কয়েক বারে শেষ করতে পারি।',
      },

      {
        createdByUser: false,
        text: 'উৎসাহ বা মনোযোগ না থাকলেও, আমি প্রতিদিন নিয়ম করে অল্প কিছুক্ষণ (৫-১০ মিনিট) পড়তে পারি। সঠিক কৌশল ব্যবহার করলে, পাঁচ মিনিটে এমনকি একটা অধ্যায় সম্পর্কে ধারণা নেয়া যায়। (দ্রষ্টব্যঃ স্টাডি স্কিল, SQ3R)',
      },
      {
        createdByUser: false,
        text: 'নতুন কিছু শুরু করার সময় বিষয়টা কঠিন লাগা খুব স্বাভাবিক। এমন কঠিন পরিস্থিতি আমি আগেও পার করেছি। এবারও এটা সময়ের সাথে ঠিক সামাল দেয়া যাবে।',
      },
      {
        createdByUser: false,
        text: '“প্রশ্ন কমন পড়বে তো?” “উত্তর দিতে পারবো তো?/মনে থাকবে তো?” – এই সব চিন্তা পাত্তা না দিই। আমি জানি, আমি পারি এবং পারবো।',
      },
      {
        createdByUser: false,
        text: 'নিজেকে শান্ত রাখার জন্য, আমি নিয়মিত রিলাক্সেশন/মাইন্ডফুলনেস প্র্যাকটিস করবো।',
      },
      {
        createdByUser: false,
        text: 'চাইলে আপনি নিজেও এরকম কোপিং কার্ড তৈরি করতে পারেন। \n \n লিখুন',
      },
    ],
  },
  {
    id: 'cpc-06',
    name: 'আবেগ নিয়ন্ত্রণ (A.C.C.E.P.T.S)',
    cards: [
      {
        createdByUser: false,
        text: 'A for Activities\n\nতীব্র আবেগ আচ্ছন্ন করলে, আমি গভীর চিন্তা ও/বা মনোযোগ দিতে হয় এমন কোন শখের বা ক্লাসের কাজে নিজেকে নিযুক্ত করি।',
      },
      {
        createdByUser: false,
        text: 'C for Contributing\n\nতীব্র আবেগ আচ্ছন্ন করলে, আমি নিজের উপর ফোকাস না করে, আমি কোন ভাল কাজ করি যেটা অন্যের বা সমাজের জন্য মঙ্গল।',
      },
      {
        createdByUser: false,
        text: 'C for Comparisons\n\nতীব্র আবেগ আচ্ছন্ন করলে,আমি আমার জীবনে ঘটে যাওয়া এর চেয়েও কোন খারাপ ঘটনা বা সময়ের সাথে এই সময়/ঘটনাটা তুলনা করে দেখি।',
      },
      {
        createdByUser: false,
        text: 'P for Pushing away\n\nতীব্র আবেগ আচ্ছন্ন করলে, আমি তখনকার জন্য সেইসব চিন্তা দূরে ঠেলে রাখি। কল্পনা করি, সেই সময় যা কিছু মাথায় আসছে টা মনে মনে একটা কাগজে লিখে, কাগজটা দুমড়ে মুচড়ে নদীর পানিতে ভাসিয়ে দিচ্ছি বা পাহাড়ের উপর থেকে দূরে ছুঁড়ে মারছি। এবং ভাল সময় না আসা পর্যন্ত সেগুলোকে আর প্রশ্রয় দেই না।',
      },
      {
        createdByUser: false,
        text: 'T for thoughts\n\nতীব্র আবেগ আচ্ছন্ন করলে,আমি আমার চিন্তাগুলোর উপর ফোকাস করার চেষ্টা করি, ১০ পর গুনি এবং মনে মনে একটা কবিতা পড়ার চেষ্টা করি অথবা কোন বইয়ের পাতা খুলে পড়তে থাকি।',
      },
      {
        createdByUser: false,
        text: 'S for Sensations\n\nতীব্র আবেগ আচ্ছন্ন করলে,আমি শরীরে নিরাপদ কোন তীব্র সংবেদন/অনুভূতি সৃষ্টি করি, যেমনঃ হাতে কোন বরফখণ্ড ধরে রাখি বা জিভে কোন ঝাল/টক (মরিচ/লেবুর রস) স্বাদ দেই এবং পুরো মনোযোগ দিয়ে সেটা লক্ষ্য করতে থাকি।',
      },
      {
        createdByUser: false,
        text: 'চাইলে আপনি নিজেও এরকম কোপিং কার্ড তৈরি করতে পারেন। \n \n লিখুন',
      },
    ],
  },
];

const CopyingCards = ({ navigation, route, ...props }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [carouselItems, setCarouselItems] = useState([]);
  const [cardList, setCardList] = useState(sectionsAllCards);
  const ref = useRef(null);
  const [selectedOption, setSelectedOption] = useState('cpc-01');
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingForDlt, setIsLoadingForDlt] = useState(false);

  const reloadCards = async (showLoading = true) => {
    try {
      if (showLoading) setIsLoading(true);
      const cards = await getCardList(props.accessToken);
      const currentCards = JSON.parse(
        JSON.stringify(sectionsAllCards),
      );
      cards.forEach((card) => {
        const idx = currentCards.findIndex(
          (s) => s.id === card.sectionId,
        );
        if (idx !== -1) {
          const len = currentCards[idx].cards.length;
          currentCards[idx].cards.splice(len - 1, 0, {
            createdByUser: true,
            text: card.text,
            _id: card._id,
          });
        }
      });
      setCardList((p) => currentCards);
      setCarouselItems(
        currentCards.find((c) => c.id === selectedOption).cards,
      );
    } catch (error) {
      errorLog(error.stack);
    } finally {
      if (showLoading) setIsLoading(false);
    }
  };

  const handleDeleteCards = async (cardId) => {
    try {
      setIsLoadingForDlt(true);
      await deleteCard(props.accessToken, cardId);
      await reloadCards(false);
    } catch (error) {
      errorLog(error.stack);
    } finally {
      setIsLoadingForDlt(false);
    }
  };

  useState(() => {
    reloadCards();
  }, []);

  useEffect(() => {
    setActiveIndex(0);
    setCarouselItems(
      cardList.find((c) => c.id === selectedOption).cards,
    );

    ref.current.snapToItem(0);
  }, [selectedOption]);

  const renderItem = useCallback(
    ({ item, index }) => (
      <View
        style={{
          backgroundColor: '#EAE7B1',
          paddingHorizontal: 15,
          paddingVertical: 15,
          paddingBottom: 8,
          height: 280,
          flexDirection: 'column',
          justifyContent: 'center',
          borderRadius: 10,
          position: 'relative',
        }}
      >
        <TouchableWithoutFeedback
          onPress={() =>
            item.text.search(
              'চাইলে আপনি নিজেও এরকম কোপিং কার্ড তৈরি করতে পারেন।',
            ) !== -1 && setModalVisible(true)
          }
        >
          <View>
            <Text
              style={{
                fontSize: 18,
                textAlign: 'center',
              }}
            >
              {item.text}
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
          }}
        >
          {item.createdByUser && (
            <View>
              {!isLoadingForDlt ? (
                <AppButton
                  title="মুছে ফেলুন"
                  style={{
                    margin: 'auto',
                    width: 120,
                    backgroundColor: '#FF3F5C',
                    borderRadius: 5,
                    shadowColor: 'black',
                    shadowOpacity: 0.5,
                    shadowRadius: 3,
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    elevation: 4,
                    padding: 10,
                    paddingRight: 15,
                  }}
                  textStyle={{
                    fontSize: 17,
                    paddingBottom: 3,
                  }}
                  onPress={() => handleDeleteCards(item._id)}
                  showIcon={true}
                />
              ) : (
                <ActivityIndicator size={50} color={'#FF3F5C'} />
              )}
            </View>
          )}
        </View>
      </View>
    ),
    [isLoadingForDlt],
  );

  function handleBackButtonClick() {
    navigation.navigate('Homepage');
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

  const handleCarouselClick = (slideIndex) => {
    setActiveIndex(slideIndex);
  };

  return (
    <View style={{ backgroundColor: '#efefef', flex: 1 }}>
      <View>
        <Carousel
          ref={ref}
          layoutCardOffset={9}
          data={carouselItems}
          sliderWidth={windowWidth}
          itemWidth={windowWidth}
          renderItem={renderItem}
          onSnapToItem={handleCarouselClick}
        />

        <Pagination
          dotsLength={carouselItems.length}
          activeDotIndex={activeIndex}
          containerStyle={{ paddingVertical: 12 }}
          dotStyle={{
            backgroundColor: '#479162',
            width: 8,
            height: 8,
            borderRadius: 5,
            marginHorizontal: 3,
          }}
        />

        <NewCardModal
          accessToken={props.accessToken}
          sectionId={selectedOption}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          reloadCards={reloadCards}
        />
      </View>
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {isLoading ? (
          <ActivityIndicator
            size={50}
            color={'#52a871'}
            style={{ paddingTop: 30 }}
          />
        ) : (
          <View style={{ marginBottom: 8 }}>
            {cardList.map((card) => (
              <View key={card.id}>
                <Box
                  name={card.name}
                  onPress={() => setSelectedOption(card.id)}
                  boxStyle={{
                    minHeight: 58,
                    marginLeft: 14,
                    marginTop: 0,
                    marginBottom: 10,
                    padding: 5,
                    backgroundColor:
                      selectedOption === card.id
                        ? '#479162'
                        : 'white',
                    borderRadius: 5,
                  }}
                  boxTitleStyle={{
                    paddingTop: 11,
                    paddingHorizontal: 15,
                    fontWeight: '700',
                    fontSize: 17,
                    letterSpacing: 1,
                    paddingBottom: 0,
                    color:
                      selectedOption === card.id
                        ? 'white'
                        : '#52a871',
                  }}
                />
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const mapStateToProps = (state) => ({
  accessToken: state.auth.accessToken,
});

export default connect(mapStateToProps, {})(CopyingCards);
