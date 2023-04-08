import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Modal,
  BackHandler,
} from 'react-native';
import colors from '../config/colors';

const HelpCenter = () => {
  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      <View style={[styles.helpCenterContainer, { paddingTop: 18 }]}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerContainerText}>Psychotic</Text>
        </View>
        <View style={styles.centerContainer}>
          <Text style={styles.centerNameText}>
            নাসিরুল্লাহ সাইকথেরাপি ইউনিট, ঢাকা বিশ্ববিদ্যালয়
          </Text>
          <Text style={styles.centerPhoneNo}>০১৭১৫৬৫৪৫৩৮</Text>
        </View>
        <View style={styles.centerContainer}>
          <Text style={styles.centerNameText}>
            জাতীয় মানসিক স্বাস্থ্য ইনস্টিউট ও হাসপাতাল
          </Text>
          <Text style={styles.centerPhoneNo}>
            ০১৪০৪০০০০৮০ (সকাল ৮ টা থেকে রাত ১০ টা পর্যন্ত)
          </Text>
          <Text style={styles.centerPhoneNo}>
            ০১৪০৪০০০০৮১ (সকাল ৮ টা থেকে রাত ১০ টা পর্যন্ত)
          </Text>
          <Text style={styles.centerPhoneNo}>
            ০১৪০৪০০০০৮২ (WhatsApp) (সকাল ৮ টা থেকে রাত ১০ টা পর্যন্ত)
          </Text>
          <Text style={styles.centerPhoneNo}>
            ০১৪০৪০০০০৮৩ (WhatsApp) (সকাল ৮ টা থেকে রাত ১০ টা পর্যন্ত)
          </Text>
        </View>
      </View>

      <View style={styles.helpCenterContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerContainerText}>
            Suicidal Ideation
          </Text>
        </View>
        <View style={styles.centerContainer}>
          <Text style={styles.centerNameText}>
            নাসিরুল্লাহ সাইকথেরাপি ইউনিট, ঢাকা বিশ্ববিদ্যালয়
          </Text>
          <Text style={styles.centerPhoneNo}>০১৭১৫৬৫৪৫৩৮</Text>
        </View>

        <View style={styles.centerContainer}>
          <Text style={styles.centerNameText}>
            জাতীয় মানসিক স্বাস্থ্য ইনস্টিউট ও হাসপাতাল
          </Text>
          <Text style={styles.centerPhoneNo}>
            ০১৪০৪০০০০৮০ (সকাল ৮ টা থেকে রাত ১০ টা পর্যন্ত)
          </Text>
          <Text style={styles.centerPhoneNo}>
            ০১৪০৪০০০০৮১ (সকাল ৮ টা থেকে রাত ১০ টা পর্যন্ত)
          </Text>
          <Text style={styles.centerPhoneNo}>
            ০১৪০৪০০০০৮২ (WhatsApp) (সকাল ৮ টা থেকে রাত ১০ টা পর্যন্ত)
          </Text>
          <Text style={styles.centerPhoneNo}>
            ০১৪০৪০০০০৮৩ (WhatsApp) (সকাল ৮ টা থেকে রাত ১০ টা পর্যন্ত)
          </Text>
        </View>
      </View>

      <View style={styles.helpCenterContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerContainerText}>
            Domestic Violence
          </Text>
        </View>
        <View style={styles.centerContainer}>
          <Text style={styles.centerNameText}>
            মহিলা ও শিশু বিষয়ক মন্ত্রণালয়
          </Text>
          <Text style={styles.centerPhoneNo}>109 (টোল ফ্রী)</Text>
        </View>

        <View style={styles.centerContainer}>
          <Text style={styles.centerNameText}>
            আইন ও সালিশ কেন্দ্র
          </Text>
          <Text style={styles.centerPhoneNo}>
            ০১৭২৪৪১৫৬৭৭ (সকাল ৯ টা থেকে ৫ টা পর্যন্ত)
          </Text>
        </View>

        <View style={styles.centerContainer}>
          <Text style={styles.centerNameText}>
            ন্যাশনাল ইমার্জেন্সি সার্ভিস
          </Text>
          <Text style={styles.centerPhoneNo}>৯৯৯</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  helpCenterContainer: {
    padding: 5,
    paddingLeft: 15,
    paddingBottom: 8,
  },
  headerContainer: {
    paddingBottom: 4,
  },
  headerContainerText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: colors.primary,
  },
  centerContainer: {
    padding: 10,
    paddingBottom: 2,
  },
  centerNameText: {
    paddingBottom: 5,
    fontSize: 15,
    fontWeight: 'bold',
    color: '#3e3e3e',
  },
  centerPhoneNo: {
    fontSize: 12.5,
    paddingBottom: 2,
    letterSpacing: 0.2,
  },
});

export default HelpCenter;
