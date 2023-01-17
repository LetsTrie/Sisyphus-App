import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  BackHandler,
  Text,
} from 'react-native';
import Box from '../../components/Scale/Box';
import { connect } from 'react-redux';
import { Dimensions } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const cardList = [
  {
    id: 'cpc-01',
    name: 'রাগ সম্পর্কিত',
    cards: [
      {
        text: 'আপনার নিজের মূল্যায়ন আপনিই সবথকে ভাল করতে পারেন। নিজের শক্তি/গুনগুলোতে বিশ্বাস রাখি',
      },
      {
        text: 'অন্যরা আমাকে নিয়ে কি ভাবছে সেটা আসলে বোঝার উপায় নেই। শুধু শুধু অনুমান করে কষ্ট বাড়িয়ে লাভ কি?',
      },
      {
        text: 'মানুষ মাত্রই তো ভুল করে। অন্যরাও আমাকে ভুল বুঝতে পারে।',
      },
      {
        text: 'সবাই সবকিছু ঠিকমতো করতে পারবে না, এটাই স্বাভাবিক। কোন মানুষই ১০০% সঠিক কিছু করতে পারবেনা, এটাই স্বাভাবিক',
      },
      {
        text: 'রাগের অতিরিক্ত বহিঃপ্রকাশ আমার স্বাস্থ্যের জন্য ও ক্ষতিকর। চেষ্টা করি শরীরটাকে শান্ত করার। চাইলেই রাগ নিয়ন্ত্রণ',
      },
      {
        text: 'চাইলে আপনি নিজেও এরকম কোপিং কার্ড তৈরি করতে পারেন। \n \n লিখুন',
      },
    ],
  },
  {
    id: 'cpc-02',
    name: 'চাপ নিয়ন্ত্রণ',
    cards: [
      {
        text: 'আমি কি প্রতিনিয়ত কিছু দায়িত্ব যোগ করছি? এবার আমাকে না বলতে হবে',
      },
      { text: 'আমার একার পক্ষে সবাইকে খুশি করা সম্ভব না।' },
      {
        text: 'একটু বুক ভরে নিঃশ্বাস নিই, শরীর মন দুটোই হালকা লাগবে।',
      },
      {
        text: 'অন্যরা কাজটা ঠিকমতো করবে কিনা এই ভেবে সবকিছু নিজের কাঁধে নিয়েছি কি? কিছুটা দায়িত্ব ভাগ করে নিই।',
      },
      {
        text: '"শতভাগ সফল না হওয়া মানে জীবনটাই ব্যার্থ" আমি কি তাই বিশ্বাস করছি? ছোটখাটো অর্জনগুলোকে গুরুত্ব দিই আর জীবনটাকে উপভোগ করি।',
      },
      {
        text: 'চাইলে আপনি নিজেও এরকম কোপিং কার্ড তৈরি করতে পারেন। \n \n লিখুন',
      },
    ],
  },
  {
    id: 'cpc-03',
    name: 'আত্মহত্যার চিন্তা',
    cards: [
      {
        text: 'এই একটাই জীবন। না চাইলেও মৃত্যু আসবেই। কিন্তু চাইলেও আমি আরেকটা জীবন পাবো না।',
      },
      {
        text: 'যে কোন মানুষেরই কখনো না কখনো আত্মহত্যার চিন্তা চলে আসতে পারে। এর মানেই আত্মহত্যা করা নয়।',
      },
      {
        text: 'এই মুহূর্তে বেঁচে থাকাটা খুব অসহনীয় লাগছে, কিন্তু আমি যদি একটু ধৈর্য ধরি, জীবনে আবার সহজ সময় আসবে।',
      },
      {
        text: 'একা একা এই সময়টা কষ্ট না করে, আমি নির্ভরযোগ্য কারো সহযোগিতা নিবো।',
      },
      {
        text: 'আমি আত্মহত্যা করলে আমার খুব কাছের মানুষগুলোকে সেটার জন্য বড় একটা কষ্ট দিবো, যেটা সারাজীবন তাঁদের বয়ে বেড়াতে হবে।',
      },
      {
        text: 'প্রতিটা সমস্যার একটা না একটা সমাধান আছে। দরকার হলে আমি যোগ্য কোন পেশাজীবির সাহায্য নিবো।',
      },
      {
        text: 'চাইলে আপনি নিজেও এরকম কোপিং কার্ড তৈরি করতে পারেন। \n \n লিখুন',
      },
    ],
  },
  {
    id: 'cpc-04',
    name: 'সম্পর্কের টানাপোড়ন',
    cards: [
      { text: 'সব সম্পর্কেই টানাপোড়ন থাকে আমি এর ব্যাতিক্রম নই।' },
      {
        text: 'আমি কি সবসময় অন্যের সম্পর্কের সাথে নিজেকে তুলনা করছি আর হতাশ হচ্ছি।',
      },
      {
        text: 'আমি কি সবসময় আমার পার্টনার কে তুচ্ছ তাচ্ছিল্য করছি? দিনে অন্তত আধ ঘণ্টা সময় কথা বলি যাতে শ্রদ্ধাবোধ থাকে।',
      },
      {
        text: 'আমি আমার পার্টনারকে দোষারোপ না করে, বরং দুজন কথা বলে একটি বিষয় মীমাংসা করতে পারি।',
      },
      {
        text: 'কোন মানুষই পারফেক্ট নয়, আমার সম্পর্কের মানুষটিরও দুর্বলতা থাকতে পারে।',
      },
      {
        text: 'চাইলে আপনি নিজেও এরকম কোপিং কার্ড তৈরি করতে পারেন। \n \n লিখুন',
      },
    ],
  },
  {
    id: 'cpc-05',
    name: 'পড়াশোনার দক্ষতা',
    cards: [
      {
        text: 'আমি নিয়ম করে সময় দিলে এবং ধৈর্য ধরে রাখলে, পড়াশোনায় মনোযোগ আসবে।',
      },
      {
        text: 'সব কাজ আমাকে এক বসায় সেরে ফেলতে হবে এমন কোন কথা নাই। আমি চাইলেই কাজটাকে ছোট ছোট ভাগ করে কয়েক বারে শেষ করতে পারি।',
      },

      {
        text: 'উৎসাহ বা মনোযোগ না থাকলেও, আমি প্রতিদিন নিয়ম করে অল্প কিছুক্ষণ (৫-১০ মিনিট) পড়তে পারি। সঠিক কৌশল ব্যবহার করলে, পাঁচ মিনিটে এমনকি একটা অধ্যায় সম্পর্কে ধারণা নেয়া যায়। (দ্রষ্টব্যঃ স্টাডি স্কিল, SQ3R)',
      },
      {
        text: 'নতুন কিছু শুরু করার সময় বিষয়টা কঠিন লাগা খুব স্বাভাবিক। এমন কঠিন পরিস্থিতি আমি আগেও পার করেছি। এবারও এটা সময়ের সাথে ঠিক সামাল দেয়া যাবে।',
      },
      {
        text: '“প্রশ্ন কমন পড়বে তো?” “উত্তর দিতে পারবো তো?/মনে থাকবে তো?” – এই সব চিন্তা পাত্তা না দিই। আমি জানি, আমি পারি এবং পারবো।',
      },
      {
        text: 'নিজেকে শান্ত রাখার জন্য, আমি নিয়মিত রিলাক্সেশন/মাইন্ডফুলনেস প্র্যাকটিস করবো।',
      },
      {
        text: 'চাইলে আপনি নিজেও এরকম কোপিং কার্ড তৈরি করতে পারেন। \n \n লিখুন',
      },
    ],
  },
  {
    id: 'cpc-06',
    name: 'আবেগ নিয়ন্ত্রণ (A.C.C.E.P.T.S)',
    cards: [
      {
        text: 'A for Activities\n\nতীব্র আবেগ আচ্ছন্ন করলে, আমি গভীর চিন্তা ও/বা মনোযোগ দিতে হয় এমন কোন শখের বা ক্লাসের কাজে নিজেকে নিযুক্ত করি।',
      },
      {
        text: 'C for Contributing\n\nতীব্র আবেগ আচ্ছন্ন করলে, আমি নিজের উপর ফোকাস না করে, আমি কোন ভাল কাজ করি যেটা অন্যের বা সমাজের জন্য মঙ্গল।',
      },
      {
        text: 'C for Comparisons\n\nতীব্র আবেগ আচ্ছন্ন করলে,আমি আমার জীবনে ঘটে যাওয়া এর চেয়েও কোন খারাপ ঘটনা বা সময়ের সাথে এই সময়/ঘটনাটা তুলনা করে দেখি।',
      },
      {
        text: 'P for Pushing away\n\nতীব্র আবেগ আচ্ছন্ন করলে, আমি তখনকার জন্য সেইসব চিন্তা দূরে ঠেলে রাখি। কল্পনা করি, সেই সময় যা কিছু মাথায় আসছে টা মনে মনে একটা কাগজে লিখে, কাগজটা দুমড়ে মুচড়ে নদীর পানিতে ভাসিয়ে দিচ্ছি বা পাহাড়ের উপর থেকে দূরে ছুঁড়ে মারছি। এবং ভাল সময় না আসা পর্যন্ত সেগুলোকে আর প্রশ্রয় দেই না।',
      },
      {
        text: 'T for thoughts\n\nতীব্র আবেগ আচ্ছন্ন করলে,আমি আমার চিন্তাগুলোর উপর ফোকাস করার চেষ্টা করি, ১০ পর গুনি এবং মনে মনে একটা কবিতা পড়ার চেষ্টা করি অথবা কোন বইয়ের পাতা খুলে পড়তে থাকি।',
      },
      {
        text: 'S for Sensations\n\nতীব্র আবেগ আচ্ছন্ন করলে,আমি শরীরে নিরাপদ কোন তীব্র সংবেদন/অনুভূতি সৃষ্টি করি, যেমনঃ হাতে কোন বরফখণ্ড ধরে রাখি বা জিভে কোন ঝাল/টক (মরিচ/লেবুর রস) স্বাদ দেই এবং পুরো মনোযোগ দিয়ে সেটা লক্ষ্য করতে থাকি।',
      },
      {
        text: 'চাইলে আপনি নিজেও এরকম কোপিং কার্ড তৈরি করতে পারেন। \n \n লিখুন',
      },
    ],
  },
];

const CopyingCards = ({ navigation, route, ...props }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [carouselItems, setCarouselItems] = useState([]);
  const ref = useRef(null);
  const [selectedOption, setSelectedOption] = useState('cpc-01');

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
        }}
      >
        <Text
          style={{
            fontSize: 18,
            textAlign: 'center',
          }}
        >
          {item.text}
        </Text>
      </View>
    ),
    [],
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

  return (
    <View style={{ backgroundColor: '#efefef', flex: 1 }}>
      <View>
        <Carousel
          layout={'tinder'}
          ref={ref}
          layoutCardOffset={9}
          data={carouselItems}
          sliderWidth={windowWidth}
          itemWidth={windowWidth}
          renderItem={renderItem}
          onSnapToItem={(index) => {
            setActiveIndex(index);
          }}
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
      </View>
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
      >
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
                    selectedOption === card.id ? '#479162' : 'white',
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
                    selectedOption === card.id ? 'white' : '#52a871',
                }}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default connect(() => ({}), {})(CopyingCards);
