import React, { useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  BackHandler,
} from 'react-native';
import { connect } from 'react-redux';
import { AppButton } from '../../components/button';

const screenName = 'ThoughtChallengeP1';

const ThoughtChallengeP1 = ({ navigation, ...props }) => {
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
    <View>
      <ScrollView>
        <View style={{ padding: 15 }}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerContainerText}>
              নেতিবাচক বা ক্ষতিকর চিন্তার পরিবর্তন
            </Text>
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionContainerText}>
              নেতিবাচক চিন্তার ক্ষতিকর প্রভাব সম্পর্কে প্রায় সবাই কম
              বেশি জানেন। আমাদের অনুভূতি ও আচরণের উপর সরাসরি প্রভাব
              রাখে আমাদের চিন্তা। সুতরাং নেতিবাচক চিন্তাগুলো পরিবর্তন
              করতে না জানলে, ঐ চিন্তা আমাদের শুধু অপ্রীতিকর অনুভূতিই
              দেয় না, আমাদের স্বাভাবিক আচরণ ও কর্মক্ষমতার উপরও বাজে
              প্রভাব রাখে। এই চিন্তাগুলো বিভিন্ন পরিস্থিতিতে একদম আপনা
              থেকেই চলে আসে (অটোমেটিক), এমন না যে আপনি বসে বসে ইচ্ছা
              করে এই চিন্তাগুলো করেন। আবার, আপনি হয়তো কখনো সচেতনভাবে
              আপনার নেতিবাচক চিন্তাগুলো নির্ণয়ই করে ওঠেন নাই। কিংবা
              হয়তো আপনি এই নেতিবাচক চিন্তাগুলোকে নিজের অজান্তেই
              অকাট্য সত্য হিসেবে ধরে নিয়েছেন। ফলে, দিনের পর দিন এই
              চিন্তাগুলো আপনার মনে ঘাপটি মেরে বসে থাকে এবং পরিস্থিতি
              বুঝে সক্রিয় হয়ে আপনাকে ঘায়েল করে। ইন্টারেস্টিং বিষয়
              হচ্ছে, আপনি হয়তো অনেক সময়ই এই অটোমেটিক চিন্তাগুলোর
              উপস্থিতি খেয়ালই করেন না, কেবল হয়তো আপনার উপর
              চিন্তাগুলোর প্রভাব (দুঃখ, রাগ, হতাশা, উৎসাহ ও উদ্দিপনার
              অভাব ইত্যাদি) দেখতে পান। এবং বেশিরভাগ ক্ষেত্রেই এই সব
              প্রভাবের জন্য শুধুমাত্র পরিস্থিতির উপর সব দায় চেপে বসে।
              অথচ খেয়াল করেছেন নিশ্চয়, একই পরিস্থিতিতে একাধিক
              ব্যক্তি ভিন্ন ভিন্ন প্রতিক্রিয়া দেখিয়ে থাকেন।
              পরিস্থিতি নয়, বরং কোন পরিস্থিতি আপনার কাছে যেই অর্থ বহন
              করে (বা, ঐ পরিস্থিতিতে আপনার মনে যেই চিন্তা আসে) সেটাই
              আপনার অনুভূতি ও আচরনের উপর সরাসরি প্রভাব রাখে। তাই
              নেতিবাচক চিন্তার পরিবর্তন কৌশল রপ্ত করে আপনি নিজেকে অনেক
              মানসিক ফাঁদ থেকে মুক্ত করতে পারেন।
            </Text>
          </View>
          <View style={styles.redirectionButtonContainer}>
            <AppButton
              title="পরবর্তী পেইজ"
              style={styles.redirectionButton}
              onPress={() =>
                navigation.navigate('ThoughtChallengeP2', {
                  goBack: screenName,
                })
              }
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingVertical: 15,
    paddingTop: 7,
  },
  headerContainerText: {
    textAlign: 'center',
    fontSize: 21,
    fontWeight: 'bold',
    color: '#222',
  },
  descriptionContainer: {},
  descriptionContainerText: {
    fontSize: 15,
    lineHeight: 25,
    textAlign: 'justify',
  },
  redirectionButtonContainer: {},
  redirectionButton: {},
});

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isAccountVerified: state.auth.isAccountVerified,
  accessToken: state.auth.accessToken,
  refreshToken: state.auth.refreshToken,
});

export default connect(mapStateToProps, {})(ThoughtChallengeP1);
