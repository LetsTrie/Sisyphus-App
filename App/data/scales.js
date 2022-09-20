import { createSlug } from '../helpers/string';

const getAnswersAnxiety = (weights) => [
  {
    label: 'একেবারেই হয় না',
    value: weights[0],
  },
  {
    label: 'খুব সামান্য হয়',
    value: weights[1],
  },
  {
    label: 'মোটামুটি হয়',
    value: weights[2],
  },
  {
    label: 'বেশী হয়',
    value: weights[3],
  },
  {
    label: 'অনেক বেশী',
    value: weights[4],
  },
];

const pssOptions = [
  { label: 'কখনোই না', value: 0 },
  { label: 'অনেকাংশে না', value: 1 },
  { label: 'মাঝে মাঝে', value: 2 },
  { label: 'প্রায়শই', value: 3 },
  { label: 'ঘন ঘন', value: 4 },
];

/*
  General Structure
  [
    {
      id,
      scaleName,
      scaleType,
      shortName,
      totalMarks,
      questionnaires: [
        {
          question,
          answerType,
          options: [
            {
              label, 
              value,
            }
          ]
        }
      ],
      severityRange: [
        {
          min,
          max,
          severity
        }
      ]
    }
  ]
*/
// *****************

export default [
  {
    id: 'DS-1',
    scaleName: 'Depression Scale',
    scaleType: createSlug('SCALE: Depression Scale'),
    shortName: 'DS',
    isMesaurable: true,
    questionnaires: [
      {
        question: 'আমার অশান্তি লাগে',
        answerType: 'multiple-choice',
        options: [
          { label: 'একেবারেই প্রযোজ্য নয়', value: 1 },
          { label: 'প্রযোজ্য নয়', value: 2 },
          { label: 'মাঝামাঝি', value: 3 },
          { label: 'কিছুটা প্রযোজ্য', value: 4 },
          { label: 'পুরোপুরি প্রযোজ্য', value: 5 },
        ],
      },
      {
        question: 'ইদানিং আমি মন মরা থাকি',
        answerType: 'multiple-choice',
        options: [
          { label: 'একেবারেই প্রযোজ্য নয়', value: 1 },
          { label: 'প্রযোজ্য নয়', value: 2 },
          { label: 'মাঝামাঝি', value: 3 },
          { label: 'কিছুটা প্রযোজ্য', value: 4 },
          { label: 'পুরোপুরি প্রযোজ্য', value: 5 },
        ],
      },
      {
        question: 'আমার ভবিষ্যত অন্ধকার',
        answerType: 'multiple-choice',
        options: [
          { label: 'একেবারেই প্রযোজ্য নয়', value: 1 },
          { label: 'প্রযোজ্য নয়', value: 2 },
          { label: 'মাঝামাঝি', value: 3 },
          { label: 'কিছুটা প্রযোজ্য', value: 4 },
          { label: 'পুরোপুরি প্রযোজ্য', value: 5 },
        ],
      },
      {
        question: 'ভবিষ্যতে আমার অবস্থা দিন দিন আরো খারাপ হবে',
        answerType: 'multiple-choice',
        options: [
          { label: 'একেবারেই প্রযোজ্য নয়', value: 1 },
          { label: 'প্রযোজ্য নয়', value: 2 },
          { label: 'মাঝামাঝি', value: 3 },
          { label: 'কিছুটা প্রযোজ্য', value: 4 },
          { label: 'পুরোপুরি প্রযোজ্য', value: 5 },
        ],
      },
      {
        question: 'আমার সব শেষ হয়ে গেছে',
        answerType: 'multiple-choice',
        options: [
          { label: 'একেবারেই প্রযোজ্য নয়', value: 1 },
          { label: 'প্রযোজ্য নয়', value: 2 },
          { label: 'মাঝামাঝি', value: 3 },
          { label: 'কিছুটা প্রযোজ্য', value: 4 },
          { label: 'পুরোপুরি প্রযোজ্য', value: 5 },
        ],
      },
      {
        question: 'আমি মনে করি যে , জীবনটা বর্তমানে খুব বেশি কষ্টকর',
        answerType: 'multiple-choice',
        options: [
          { label: 'একেবারেই প্রযোজ্য নয়', value: 1 },
          { label: 'প্রযোজ্য নয়', value: 2 },
          { label: 'মাঝামাঝি', value: 3 },
          { label: 'কিছুটা প্রযোজ্য', value: 4 },
          { label: 'পুরোপুরি প্রযোজ্য', value: 5 },
        ],
      },
      {
        question:
          'বর্তমানে আমি অনুভব করি যে মানুষ হিসাবে আমি সম্পূর্ণ ব্যর্থ',
        answerType: 'multiple-choice',
        options: [
          { label: 'একেবারেই প্রযোজ্য নয়', value: 1 },
          { label: 'প্রযোজ্য নয়', value: 2 },
          { label: 'মাঝামাঝি', value: 3 },
          { label: 'কিছুটা প্রযোজ্য', value: 4 },
          { label: 'পুরোপুরি প্রযোজ্য', value: 5 },
        ],
      },
      {
        question: 'আমি কোথাও আনন্দ ফুর্তি পাই না',
        answerType: 'multiple-choice',
        options: [
          { label: 'একেবারেই প্রযোজ্য নয়', value: 1 },
          { label: 'প্রযোজ্য নয়', value: 2 },
          { label: 'মাঝামাঝি', value: 3 },
          { label: 'কিছুটা প্রযোজ্য', value: 4 },
          { label: 'পুরোপুরি প্রযোজ্য', value: 5 },
        ],
      },
      {
        question: 'নিজেকে খুব ছোট মনে হয়',
        answerType: 'multiple-choice',
        options: [
          { label: 'একেবারেই প্রযোজ্য নয়', value: 1 },
          { label: 'প্রযোজ্য নয়', value: 2 },
          { label: 'মাঝামাঝি', value: 3 },
          { label: 'কিছুটা প্রযোজ্য', value: 4 },
          { label: 'পুরোপুরি প্রযোজ্য', value: 5 },
        ],
      },
      {
        question: 'সবকিছুতে আমার আত্নবিশ্বাস কমে গেছে',
        answerType: 'multiple-choice',
        options: [
          { label: 'একেবারেই প্রযোজ্য নয়', value: 1 },
          { label: 'প্রযোজ্য নয়', value: 2 },
          { label: 'মাঝামাঝি', value: 3 },
          { label: 'কিছুটা প্রযোজ্য', value: 4 },
          { label: 'পুরোপুরি প্রযোজ্য', value: 5 },
        ],
      },
      {
        question: 'আমার মনে হয় মানুষ আমাকে করুণা করে',
        answerType: 'multiple-choice',
        options: [
          { label: 'একেবারেই প্রযোজ্য নয়', value: 1 },
          { label: 'প্রযোজ্য নয়', value: 2 },
          { label: 'মাঝামাঝি', value: 3 },
          { label: 'কিছুটা প্রযোজ্য', value: 4 },
          { label: 'পুরোপুরি প্রযোজ্য', value: 5 },
        ],
      },
      {
        question: 'জীবনটা অর্থহীন',
        answerType: 'multiple-choice',
        options: [
          { label: 'একেবারেই প্রযোজ্য নয়', value: 1 },
          { label: 'প্রযোজ্য নয়', value: 2 },
          { label: 'মাঝামাঝি', value: 3 },
          { label: 'কিছুটা প্রযোজ্য', value: 4 },
          { label: 'পুরোপুরি প্রযোজ্য', value: 5 },
        ],
      },
      {
        question: 'প্রায়ই আমার কান্না পায়',
        answerType: 'multiple-choice',
        options: [
          { label: 'একেবারেই প্রযোজ্য নয়', value: 1 },
          { label: 'প্রযোজ্য নয়', value: 2 },
          { label: 'মাঝামাঝি', value: 3 },
          { label: 'কিছুটা প্রযোজ্য', value: 4 },
          { label: 'পুরোপুরি প্রযোজ্য', value: 5 },
        ],
      },
      {
        question: 'আমি প্রায়ই বিরক্ত বোধ করি',
        answerType: 'multiple-choice',
        options: [
          { label: 'একেবারেই প্রযোজ্য নয়', value: 1 },
          { label: 'প্রযোজ্য নয়', value: 2 },
          { label: 'মাঝামাঝি', value: 3 },
          { label: 'কিছুটা প্রযোজ্য', value: 4 },
          { label: 'পুরোপুরি প্রযোজ্য', value: 5 },
        ],
      },
      {
        question: 'আমি কোন কিছুতেই আগ্রহ পাই না',
        answerType: 'multiple-choice',
        options: [
          { label: 'একেবারেই প্রযোজ্য নয়', value: 1 },
          { label: 'প্রযোজ্য নয়', value: 2 },
          { label: 'মাঝামাঝি', value: 3 },
          { label: 'কিছুটা প্রযোজ্য', value: 4 },
          { label: 'পুরোপুরি প্রযোজ্য', value: 5 },
        ],
      },
      {
        question: 'আমি ইদানিং চিন্তা করতে ও সিদ্ধান্ত নিতে পারি না',
        answerType: 'multiple-choice',
        options: [
          { label: 'একেবারেই প্রযোজ্য নয়', value: 1 },
          { label: 'প্রযোজ্য নয়', value: 2 },
          { label: 'মাঝামাঝি', value: 3 },
          { label: 'কিছুটা প্রযোজ্য', value: 4 },
          { label: 'পুরোপুরি প্রযোজ্য', value: 5 },
        ],
      },
      {
        question: 'আমি আজকাল অনেক কিছুতেই মনোযোগ দিতে পারি না',
        answerType: 'multiple-choice',
        options: [
          { label: 'একেবারেই প্রযোজ্য নয়', value: 1 },
          { label: 'প্রযোজ্য নয়', value: 2 },
          { label: 'মাঝামাঝি', value: 3 },
          { label: 'কিছুটা প্রযোজ্য', value: 4 },
          { label: 'পুরোপুরি প্রযোজ্য', value: 5 },
        ],
      },
      {
        question: 'আমি আগের মতো মনে রাখতে পারি না',
        answerType: 'multiple-choice',
        options: [
          { label: 'একেবারেই প্রযোজ্য নয়', value: 1 },
          { label: 'প্রযোজ্য নয়', value: 2 },
          { label: 'মাঝামাঝি', value: 3 },
          { label: 'কিছুটা প্রযোজ্য', value: 4 },
          { label: 'পুরোপুরি প্রযোজ্য', value: 5 },
        ],
      },
      {
        question: 'আমি দুর্বল বোধ করি এবং অল্পতেই ক্লান্ত হয়ে পরি',
        answerType: 'multiple-choice',
        options: [
          { label: 'একেবারেই প্রযোজ্য নয়', value: 1 },
          { label: 'প্রযোজ্য নয়', value: 2 },
          { label: 'মাঝামাঝি', value: 3 },
          { label: 'কিছুটা প্রযোজ্য', value: 4 },
          { label: 'পুরোপুরি প্রযোজ্য', value: 5 },
        ],
      },
      {
        question: 'আমি এখন কম ঘুমাই',
        answerType: 'multiple-choice',
        options: [
          { label: 'একেবারেই প্রযোজ্য নয়', value: 1 },
          { label: 'প্রযোজ্য নয়', value: 2 },
          { label: 'মাঝামাঝি', value: 3 },
          { label: 'কিছুটা প্রযোজ্য', value: 4 },
          { label: 'পুরোপুরি প্রযোজ্য', value: 5 },
        ],
      },
      {
        question: 'আমি এখন বেশি ঘুমাই',
        answerType: 'multiple-choice',
        options: [
          { label: 'একেবারেই প্রযোজ্য নয়', value: 1 },
          { label: 'প্রযোজ্য নয়', value: 2 },
          { label: 'মাঝামাঝি', value: 3 },
          { label: 'কিছুটা প্রযোজ্য', value: 4 },
          { label: 'পুরোপুরি প্রযোজ্য', value: 5 },
        ],
      },
      {
        question: 'আমার মেজাজ খিটখিটে হয়ে গেছে',
        answerType: 'multiple-choice',
        options: [
          { label: 'একেবারেই প্রযোজ্য নয়', value: 1 },
          { label: 'প্রযোজ্য নয়', value: 2 },
          { label: 'মাঝামাঝি', value: 3 },
          { label: 'কিছুটা প্রযোজ্য', value: 4 },
          { label: 'পুরোপুরি প্রযোজ্য', value: 5 },
        ],
      },
      {
        question: 'আমার ক্ষুধা কমে গেছে',
        answerType: 'multiple-choice',
        options: [
          { label: 'একেবারেই প্রযোজ্য নয়', value: 1 },
          { label: 'প্রযোজ্য নয়', value: 2 },
          { label: 'মাঝামাঝি', value: 3 },
          { label: 'কিছুটা প্রযোজ্য', value: 4 },
          { label: 'পুরোপুরি প্রযোজ্য', value: 5 },
        ],
      },
      {
        question: 'আমার ক্ষুধা বেড়ে গেছে',
        answerType: 'multiple-choice',
        options: [
          { label: 'একেবারেই প্রযোজ্য নয়', value: 1 },
          { label: 'প্রযোজ্য নয়', value: 2 },
          { label: 'মাঝামাঝি', value: 3 },
          { label: 'কিছুটা প্রযোজ্য', value: 4 },
          { label: 'পুরোপুরি প্রযোজ্য', value: 5 },
        ],
      },
      {
        question:
          'আমার ওজন কমে গেছে (ইচ্ছাকৃতভাবে ওজন নিয়ন্ত্রণের চেষ্টা করার ফলে নয়)',
        answerType: 'multiple-choice',
        options: [
          { label: 'একেবারেই প্রযোজ্য নয়', value: 1 },
          { label: 'প্রযোজ্য নয়', value: 2 },
          { label: 'মাঝামাঝি', value: 3 },
          { label: 'কিছুটা প্রযোজ্য', value: 4 },
          { label: 'পুরোপুরি প্রযোজ্য', value: 5 },
        ],
      },
      {
        question: 'আমার মনে হয় যে আমার কাজকর্মের গতি কমে গেছে',
        answerType: 'multiple-choice',
        options: [
          { label: 'একেবারেই প্রযোজ্য নয়', value: 1 },
          { label: 'প্রযোজ্য নয়', value: 2 },
          { label: 'মাঝামাঝি', value: 3 },
          { label: 'কিছুটা প্রযোজ্য', value: 4 },
          { label: 'পুরোপুরি প্রযোজ্য', value: 5 },
        ],
      },
      {
        question: 'হাসির কোন ঘটনা ঘটলেও আমি আর হাসতে পারি না',
        answerType: 'multiple-choice',
        options: [
          { label: 'একেবারেই প্রযোজ্য নয়', value: 1 },
          { label: 'প্রযোজ্য নয়', value: 2 },
          { label: 'মাঝামাঝি', value: 3 },
          { label: 'কিছুটা প্রযোজ্য', value: 4 },
          { label: 'পুরোপুরি প্রযোজ্য', value: 5 },
        ],
      },
      {
        question: 'যৌন বিষয়ে আমার আগ্রহ কমে গেছে',
        answerType: 'multiple-choice',
        options: [
          { label: 'একেবারেই প্রযোজ্য নয়', value: 1 },
          { label: 'প্রযোজ্য নয়', value: 2 },
          { label: 'মাঝামাঝি', value: 3 },
          { label: 'কিছুটা প্রযোজ্য', value: 4 },
          { label: 'পুরোপুরি প্রযোজ্য', value: 5 },
        ],
      },
      {
        question: 'সামাজিক কাজকর্মে আগের মতো অংশগ্রহণ করতে পারি না',
        answerType: 'multiple-choice',
        options: [
          { label: 'একেবারেই প্রযোজ্য নয়', value: 1 },
          { label: 'প্রযোজ্য নয়', value: 2 },
          { label: 'মাঝামাঝি', value: 3 },
          { label: 'কিছুটা প্রযোজ্য', value: 4 },
          { label: 'পুরোপুরি প্রযোজ্য', value: 5 },
        ],
      },
      {
        question: 'শিক্ষা বা পেশাগত কাজকর্ম আগের মতো করতে পারি না',
        answerType: 'multiple-choice',
        options: [
          { label: 'একেবারেই প্রযোজ্য নয়', value: 1 },
          { label: 'প্রযোজ্য নয়', value: 2 },
          { label: 'মাঝামাঝি', value: 3 },
          { label: 'কিছুটা প্রযোজ্য', value: 4 },
          { label: 'পুরোপুরি প্রযোজ্য', value: 5 },
        ],
      },
    ],
    severityRange: [
      { min: 30, max: 93, severity: 'Depressed' },
      { min: 94, max: 100, severity: 'Minimal' },
      { min: 101, max: 114, severity: 'Mild' },
      { min: 115, max: 123, severity: 'Moderate' },
      { min: 124, max: 150, severity: 'Severe' },
    ],
  },
  {
    id: 'ANX-1',
    scaleName: 'Anxiety',
    scaleType: createSlug('SCALE: Anxiety'),
    shortName: 'ANXIETY',
    isMesaurable: true,
    questionnaires: [
      {
        question: 'আমার ঘনঘন শ্বাস পড়ে',
        answerType: 'multiple-choice',
        options: getAnswersAnxiety([0, 1, 2, 3, 4]),
      },
      {
        question: 'আমার দমবন্ধবোধ হয়',
        answerType: 'multiple-choice',
        options: getAnswersAnxiety([0, 1, 2, 3, 4]),
      },
      {
        question: 'আমার বুক ভার ভার লাগে',
        answerType: 'multiple-choice',
        options: getAnswersAnxiety([0, 1, 2, 3, 4]),
      },
      {
        question: 'আমার বুক ধড়ফড় করে',
        answerType: 'multiple-choice',
        options: getAnswersAnxiety([0, 1, 2, 3, 4]),
      },
      {
        question: 'আমি বুকে ব্যাথা অনুভব করে',
        answerType: 'multiple-choice',
        options: getAnswersAnxiety([0, 1, 2, 3, 4]),
      },
      {
        question: 'আমার গা/হাত-পা শিরশির করে',
        answerType: 'multiple-choice',
        options: getAnswersAnxiety([0, 1, 2, 3, 4]),
      },
      {
        question: 'আমার হাত/পা কাঁপে',
        answerType: 'multiple-choice',
        options: getAnswersAnxiety([0, 1, 2, 3, 4]),
      },
      {
        question: 'আমার হাত/পা অবশ লাগে',
        answerType: 'multiple-choice',
        options: getAnswersAnxiety([0, 1, 2, 3, 4]),
      },
      {
        question: 'আমার হাত/পা জ্বালাপোড়া করে',
        answerType: 'multiple-choice',
        options: getAnswersAnxiety([0, 1, 2, 3, 4]),
      },
      {
        question: 'আমার মাথা ঝিমঝিম করে',
        answerType: 'multiple-choice',
        options: getAnswersAnxiety([0, 1, 2, 3, 4]),
      },
      {
        question: 'আমার মাথা ঘোরে',
        answerType: 'multiple-choice',
        options: getAnswersAnxiety([0, 1, 2, 3, 4]),
      },
      {
        question: 'আমার মাথা  ব্যাথা করে',
        answerType: 'multiple-choice',
        options: getAnswersAnxiety([0, 1, 2, 3, 4]),
      },
      {
        question: 'আমার মাথা থেকে গরম ভাব ওঠে',
        answerType: 'multiple-choice',
        options: getAnswersAnxiety([0, 1, 2, 3, 4]),
      },
      {
        question: 'আমার গলা শুঁকিয়ে যায় ও পিপাসা লাগে',
        answerType: 'multiple-choice',
        options: getAnswersAnxiety([0, 1, 2, 3, 4]),
      },
      {
        question: 'আমি অসুস্থ হয়ে যাবো এমন মনে হয়',
        answerType: 'multiple-choice',
        options: getAnswersAnxiety([0, 1, 2, 3, 4]),
      },
      {
        question: 'আমি আমার স্বাস্থ্য নিয়ে চিন্তিত থাকি',
        answerType: 'multiple-choice',
        options: getAnswersAnxiety([0, 1, 2, 3, 4]),
      },
      {
        question: 'আমি দুর্বলবোধ করি',
        answerType: 'multiple-choice',
        options: getAnswersAnxiety([0, 1, 2, 3, 4]),
      },
      {
        question: 'আমার হজমে অসুবিধা হয়',
        answerType: 'multiple-choice',
        options: getAnswersAnxiety([0, 1, 2, 3, 4]),
      },
      {
        question: 'আমার পেটে অস্বস্থি লাগে',
        answerType: 'multiple-choice',
        options: getAnswersAnxiety([0, 1, 2, 3, 4]),
      },
      {
        question: 'আমার বমি বমি লাগে',
        answerType: 'multiple-choice',
        options: getAnswersAnxiety([0, 1, 2, 3, 4]),
      },
      {
        question: 'আমার খুব ঘাম হয় (গরমের জন্য নয়)',
        answerType: 'multiple-choice',
        options: getAnswersAnxiety([0, 1, 2, 3, 4]),
      },
      {
        question: 'আমি আরাম করতে পারি না',
        answerType: 'multiple-choice',
        options: getAnswersAnxiety([0, 1, 2, 3, 4]),
      },
      {
        question: 'আমার সামাজিক পরিবেশে কথা বলতে অসুবিধা হয়',
        answerType: 'multiple-choice',
        options: getAnswersAnxiety([0, 1, 2, 3, 4]),
      },
      {
        question: 'এক বিষয় নিয়ে আমার বারবার চিন্তা হয়',
        answerType: 'multiple-choice',
        options: getAnswersAnxiety([0, 1, 2, 3, 4]),
      },
      {
        question: 'আমার খুব খারাপ কিছু ঘটবে বলে আশংকা হয়',
        answerType: 'multiple-choice',
        options: getAnswersAnxiety([0, 1, 2, 3, 4]),
      },
      {
        question: 'আমি প্রায়ই দুঃশ্চিন্তাগ্রস্থ থাকি',
        answerType: 'multiple-choice',
        options: getAnswersAnxiety([0, 1, 2, 3, 4]),
      },
      {
        question: 'আমি প্রায়ই চমকে উঠি',
        answerType: 'multiple-choice',
        options: getAnswersAnxiety([0, 1, 2, 3, 4]),
      },
      {
        question: 'আমি বিচলিত ও সন্ত্রস্তবোধ করি',
        answerType: 'multiple-choice',
        options: getAnswersAnxiety([0, 1, 2, 3, 4]),
      },
      {
        question: 'আমার আত্মনিয়ন্ত্রন হারাবার ভয় হয়',
        answerType: 'multiple-choice',
        options: getAnswersAnxiety([0, 1, 2, 3, 4]),
      },
      {
        question:
          'আমি এত নার্ভাস বা উত্তেজিত বোধ করি যে মনে হয় আমার সবকিছু এলোমেলো হয়ে যাচ্ছে',
        answerType: 'multiple-choice',
        options: getAnswersAnxiety([0, 1, 2, 3, 4]),
      },
      {
        question: 'আমি ধৈর্য ধরতে পারি না',
        answerType: 'multiple-choice',
        options: getAnswersAnxiety([0, 1, 2, 3, 4]),
      },
      {
        question: 'আমি সিদ্ধান্তহীনতায় ভুগি',
        answerType: 'multiple-choice',
        options: getAnswersAnxiety([0, 1, 2, 3, 4]),
      },
      {
        question: 'আমার আত্মবিশ্বাসের অভাববোধ হয়',
        answerType: 'multiple-choice',
        options: getAnswersAnxiety([0, 1, 2, 3, 4]),
      },
      {
        question:
          'একটা বিষয়ের প্রতি মনোযোগ দিয়ে রাখা আমার জন্য বেশ কষ্টকর',
        answerType: 'multiple-choice',
        options: getAnswersAnxiety([0, 1, 2, 3, 4]),
      },
      {
        question: 'আমার মনে হয় আমি এখনই মারা যাচ্ছি',
        answerType: 'multiple-choice',
        options: getAnswersAnxiety([0, 1, 2, 3, 4]),
      },
      {
        question: 'আমার মৃত্যু ভয় হয়',
        answerType: 'multiple-choice',
        options: getAnswersAnxiety([0, 1, 2, 3, 4]),
      },
    ],
    severityRange: [
      { min: 0, max: 54, severity: 'Mild' },
      { min: 55, max: 66, severity: 'Moderate' },
      { min: 67, max: 77, severity: 'Severe' },
      { min: 78, max: 10000, severity: 'Profound' },
    ],
  },
  {
    id: 'WHO-1',
    scaleName: 'WHO-5 Well-Being Index',
    scaleType: createSlug('WHO-5 Well-Being Index'),
    shortName: 'WHO-5 Well-Being Index',
    isMesaurable: false,
    questionnaires: [
      {
        question: 'গত দুই সপ্তাহে আমি উৎফুল্ল এবং উৎসাহিতবোধ করেছি',
        answerType: 'multiple-choice',
        options: [
          { label: 'সবসময়', value: 5 },
          { label: 'বেশিরভাগ সময়', value: 4 },
          { label: 'অর্ধেকের বেশি সময়', value: 3 },
          { label: 'অর্ধেকের কম সময়', value: 2 },
          { label: 'মাঝে মাঝে', value: 1 },
          { label: 'কখনোই না', value: 0 },
        ],
      },
      {
        question: 'গত দুই সপ্তাহে আমি শান্ত এবং হালকা বোধ করেছি',
        answerType: 'multiple-choice',
        options: [
          { label: 'সবসময়', value: 5 },
          { label: 'বেশিরভাগ সময়', value: 4 },
          { label: 'অর্ধেকের বেশি সময়', value: 3 },
          { label: 'অর্ধেকের কম সময়', value: 2 },
          { label: 'মাঝে মাঝে', value: 1 },
          { label: 'কখনোই না', value: 0 },
        ],
      },
      {
        question: 'গত দুই সপ্তাহে আমি কর্মক্ষম এবং সজীব অনুভব করেছি',
        answerType: 'multiple-choice',
        options: [
          { label: 'সবসময়', value: 5 },
          { label: 'বেশিরভাগ সময়', value: 4 },
          { label: 'অর্ধেকের বেশি সময়', value: 3 },
          { label: 'অর্ধেকের কম সময়', value: 2 },
          { label: 'মাঝে মাঝে', value: 1 },
          { label: 'কখনোই না', value: 0 },
        ],
      },
      {
        question:
          'গত দুই সপ্তাহে সতেজ এবং আরামের অনুভূতি নিয়ে আমি ঘুম থেকে জেগে উঠেছি',
        answerType: 'multiple-choice',
        options: [
          { label: 'সবসময়', value: 5 },
          { label: 'বেশিরভাগ সময়', value: 4 },
          { label: 'অর্ধেকের বেশি সময়', value: 3 },
          { label: 'অর্ধেকের কম সময়', value: 2 },
          { label: 'মাঝে মাঝে', value: 1 },
          { label: 'কখনোই না', value: 0 },
        ],
      },
      {
        question:
          'গত দুই সপ্তাহে আমি যা কিছু পছন্দ করি তা দিয়ে আমার দৈনন্দিন জীবন পূর্ণ রয়েছে',
        answerType: 'multiple-choice',
        options: [
          { label: 'সবসময়', value: 5 },
          { label: 'বেশিরভাগ সময়', value: 4 },
          { label: 'অর্ধেকের বেশি সময়', value: 3 },
          { label: 'অর্ধেকের কম সময়', value: 2 },
          { label: 'মাঝে মাঝে', value: 1 },
          { label: 'কখনোই না', value: 0 },
        ],
      },
    ],
  },
  {
    id: 'PSS-1',
    scaleName: 'Perceived Stress Scale 10 Item',
    scaleType: createSlug('Perceived Stress Scale 10 Item'),
    shortName: 'PSS-10',
    isMesaurable: false,
    questionnaires: [
      {
        question:
          'গত এক মাসে আপনি কতটুকু অনুভব করতে পেরেছিলেন যে আপনার জীবনের গুরুত্বপূর্ণ ঘটনাগুলো আপনি নিয়ন্ত্রণ করতে পারছেন না?',
        answerType: 'multiple-choice',
        options: pssOptions,
      },
      {
        question:
          'গত এক মাসে আপনি কতটুকু ঘাবড়ে যাওয়া এবং চাপ অনুভব করেছিলেন?',
        answerType: 'multiple-choice',
        options: pssOptions,
      },
      {
        question:
          'গত এক মাসে আপনার ব্যক্তিগত সমস্যাগুলো নিয়ন্ত্রনের ক্ষেত্রে আপনি কতটুকু আÍবিশ্বাসী ছিলেন?',
        answerType: 'multiple-choice',
        options: pssOptions,
      },
      {
        question:
          'গত এক মাসে আপনি কতটুকু অনুভব করেছিলেন যে চলমান ঘটনাগুলো আপনার অনুকুলে যাচ্ছে?',
        answerType: 'multiple-choice',
        options: pssOptions,
      },
      {
        question:
          'গত এক মাসে আপনি কতটুকু অনুভব করেছিলেন যে আপনার যা করণীয় তা আপনি করতে পারেন নি?',
        answerType: 'multiple-choice',
        options: pssOptions,
      },
      {
        question:
          'গত এক মাসে আপনি আপনার জীবনের বিরক্তি/ তিক্ততা কতটুকু নিয়ন্ত্রন করতে পেরেছিলেন?',
        answerType: 'multiple-choice',
        options: pssOptions,
      },
      {
        question:
          'গত এক মাসে আপনি কতটুকু অনুভব করেছিলেন যে আপনি সবকিছুর ঊর্ধ্বে? (আপনার প্রাধান্য বেশি)',
        answerType: 'multiple-choice',
        options: pssOptions,
      },
      {
        question:
          'গত এক মাসে নিয়ন্ত্রনের বাহিরে যাওয়া কোন ঘটনার জন্য আপনি কতটুকু ক্রোধান্বিত হয়েছিলেন?',
        answerType: 'multiple-choice',
        options: pssOptions,
      },
      {
        question:
          'গত এক মাসে আপনি কতটুকু অনুভব করেছিলেন যে জীবনের জটিলতাগুলো এতই বড় যে আপনি তা অতিক্রম করতে পারবেন না?',
        answerType: 'multiple-choice',
        options: pssOptions,
      },
      {
        question:
          'গত এক মাসে অনাকাক্সিক্ষত কোন ঘটনার জন্য আপনি কতটুকু বিপর্যস্ত  ছিলেন?',
        answerType: 'multiple-choice',
        options: pssOptions,
      },
    ],
  },
];
