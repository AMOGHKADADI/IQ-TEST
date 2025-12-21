
import { CognitiveDomain, Question } from './types';

export const QUESTIONS: Question[] = [
  // --- CHILD / KID CATEGORY (Difficulty 1-4) ---
  {
    id: 'k_l1',
    domain: CognitiveDomain.LOGICAL,
    difficulty: 1,
    text: {
      en: "Identify the item that does not belong in this kitchen set: Pressure Cooker, Tawa, Cricket Bat, Belan (Rolling Pin)",
      hi: "रसोई के इस सेट में कौन सी वस्तु नहीं होनी चाहिए: प्रेशर कुकर, तवा, क्रिकेट बैट, बेलन",
      kn: "ಈ ಅಡುಗೆಮನೆಯ ಸೆಟ್‌ನಲ್ಲಿ ಇರಬಾರದ ವಸ್ತು ಯಾವುದು: ಪ್ರೆಶರ್ ಕುಕ್ಕರ್, ತವಾ, ಕ್ರಿಕೆಟ್ ಬ್ಯಾಟ್, ಲಟ್ಟಣಿಗೆ"
    },
    options: [
      { en: "Pressure Cooker", hi: "प्रेशर कुकर", kn: "ಪ್ರೆಶರ್ ಕುಕ್ಕರ್" },
      { en: "Tawa", hi: "तवा", kn: "ತವಾ" },
      { en: "Cricket Bat", hi: "क्रिकेट बैट", kn: "ಕ್ರಿಕೆಟ್ ಬ್ಯಾಟ್" },
      { en: "Belan", hi: "बेलन", kn: "ಲಟ್ಟಣಿಗೆ" }
    ],
    correctIndex: 2
  },
  {
    id: 'k_p1',
    domain: CognitiveDomain.PATTERN,
    difficulty: 2,
    text: {
      en: "In a rangoli pattern: Red, White, Red, White. What comes next to keep the symmetry?",
      hi: "रंगोली के पैटर्न में: लाल, सफेद, लाल, सफेद। समरूपता बनाए रखने के लिए आगे क्या आता है?",
      kn: "ರಂಗೋಲಿಯ ವಿನ್ಯಾಸದಲ್ಲಿ: ಕೆಂಪು, ಬಿಳಿ, ಕೆಂಪು, ಬಿಳಿ. ಸಮತೋಲನ ಕಾಯ್ದುಕೊಳ್ಳಲು ಮುಂದೆ ಏನು ಬರುತ್ತದೆ?"
    },
    options: [
      { en: "Red", hi: "लाल", kn: "ಕೆಂಪು" },
      { en: "Green", hi: "हरा", kn: "ಹಸಿರು" },
      { en: "Blue", hi: "नीला", kn: "ನೀಲಿ" },
      { en: "Yellow", hi: "पीला", kn: "ಹಳದಿ" }
    ],
    correctIndex: 0
  },
  {
    id: 'k_m1',
    domain: CognitiveDomain.MEMORY,
    difficulty: 3,
    text: {
      en: "If you have your school assembly on Monday and Wednesday, and today is Tuesday, when is your next assembly?",
      hi: "यदि आपकी स्कूल असेंबली सोमवार और बुधवार को होती है, और आज मंगलवार है, तो आपकी अगली असेंबली कब है?",
      kn: "ನಿಮ್ಮ ಶಾಲಾ ಪ್ರಾರ್ಥನೆಯು ಸೋಮವಾರ ಮತ್ತು ಬುಧವಾರ ನಡೆಯುತ್ತಿದ್ದರೆ, ಮತ್ತು ಇಂದು ಮಂಗಳವಾರವಾಗಿದ್ದರೆ, ನಿಮ್ಮ ಮುಂದಿನ ಪ್ರಾರ್ಥನೆ ಯಾವಾಗ?"
    },
    options: [
      { en: "Tomorrow (Wednesday)", hi: "कल (बुधवार)", kn: "ನಾಳೆ (ಬುಧವಾರ)" },
      { en: "Today", hi: "आज", kn: "ಇಂದು" },
      { en: "Yesterday", hi: "कल (बीता हुआ)", kn: "ನಿನ್ನೆ" },
      { en: "Friday", hi: "शुक्रवार", kn: "ಶುಕ್ರವಾರ" }
    ],
    correctIndex: 0
  },
  {
    id: 'k_v1',
    domain: CognitiveDomain.VERBAL,
    difficulty: 2,
    text: {
      en: "Select the word that correctly describes a 'Banyan' tree:",
      hi: "'बरगद' के पेड़ का सही वर्णन करने वाला शब्द चुनें:",
      kn: "'ಆಲದ' ಮರವನ್ನು ಸರಿಯಾಗಿ ವಿವರಿಸುವ ಪದವನ್ನು ಆರಿಸಿ:"
    },
    options: [
      { en: "Tiny", hi: "नन्हा", kn: "ಸಣ್ಣದು" },
      { en: "Huge", hi: "विशाल", kn: "ಬೃಹತ್" },
      { en: "Blue", hi: "नीला", kn: "ನೀಲಿ" },
      { en: "Fast", hi: "तेज़", kn: "ವೇಗವಾಗಿ" }
    ],
    correctIndex: 1
  },

  // --- TEEN CATEGORY (Difficulty 4-8) ---
  {
    id: 't_l1',
    domain: CognitiveDomain.LOGICAL,
    difficulty: 5,
    text: {
      en: "A Shatabdi Express train leaves Delhi at 6:00 AM and reaches Jaipur in 4 hours. If it is delayed by 45 minutes, at what time will it arrive?",
      hi: "एक शताब्दी एक्सप्रेस दिल्ली से सुबह 6:00 बजे निकलती है और 4 घंटे में जयपुर पहुँचती है। यदि इसमें 45 मिनट की देरी होती है, तो यह कितने बजे पहुँचेगी?",
      kn: "ಶತಾಬ್ದಿ ಎಕ್ಸ್‌ಪ್ರೆಸ್ ರೈಲು ದೆಹಲಿಯಿಂದ ಬೆಳಿಗ್ಗೆ 6:00 ಗಂಟೆಗೆ ಹೊರಟು 4 ಗಂಟೆಗಳಲ್ಲಿ ಜೈಪುರವನ್ನು ತಲುಪುತ್ತದೆ. ರೈಲು 45 ನಿಮಿಷ ತಡವಾದರೆ, ಅದು ಎಷ್ಟು ಗಂಟೆಗೆ ತಲುಪುತ್ತದೆ?"
    },
    options: [
      { en: "10:00 AM", hi: "10:00 AM", kn: "10:00 AM" },
      { en: "10:45 AM", hi: "10:45 AM", kn: "10:45 AM" },
      { en: "11:15 AM", hi: "11:15 AM", kn: "11:15 AM" },
      { en: "9:45 AM", hi: "9:45 AM", kn: "9:45 AM" }
    ],
    correctIndex: 1
  },
  {
    id: 't_sp1',
    domain: CognitiveDomain.SPATIAL,
    difficulty: 6,
    text: {
      en: "If you rotate a 'L' shaped bracket 180 degrees clockwise, what will its orientation be?",
      hi: "यदि आप 'L' आकार के ब्रैकेट को घड़ी की दिशा में 180 डिग्री घुमाते हैं, तो इसकी स्थिति क्या होगी?",
      kn: "ನೀವು 'L' ಆಕಾರದ ಬ್ರಾಕೆಟ್ ಅನ್ನು ಪ್ರದಕ್ಷಿಣಾಕಾರವಾಗಿ 180 ಡಿಗ್ರಿ ತಿರುಗಿಸಿದರೆ, ಅದರ ಸ್ಥಿತಿ ಹೇಗಿರುತ್ತದೆ?"
    },
    options: [
      { en: "Upside down and mirrored", hi: "उल्टा और प्रतिबिंबित", kn: "ತಲೆಕೆಳಗಾದ ಮತ್ತು ಪ್ರತಿಬಿಂಬಿತ" },
      { en: "Same as before", hi: "पहले जैसा ही", kn: "ಮೊದಲಿನಂತೆಯೇ" },
      { en: "Upside down only", hi: "केवल उल्टा", kn: "ತಲೆಕೆಳಗಾಗಿ ಮಾತ್ರ" },
      { en: "90 degrees tilted", hi: "90 डिग्री झुका हुआ", kn: "90 ಡಿಗ್ರಿ ವಾಲಿದ" }
    ],
    correctIndex: 2
  },
  {
    id: 't_v2',
    domain: CognitiveDomain.VERBAL,
    difficulty: 7,
    text: {
      en: "Analogy: Library is to Books as Museum is to:",
      hi: "सादृश्य: पुस्तकालय का पुस्तकों से वही संबंध है जो संग्रहालय का किससे है:",
      kn: "ಹೋಲಿಕೆ: ಲೈಬ್ರರಿ ಮತ್ತು ಪುಸ್ತಕಗಳಿಗೆ ಇರುವ ಸಂಬಂಧವು ಮ್ಯೂಸಿಯಂ ಮತ್ತು ಯಾವುದಕ್ಕೆ ಇರುತ್ತದೆ?"
    },
    options: [
      { en: "Artifacts", hi: "कलाकृतियाँ", kn: "ಕಲಾಕೃತಿಗಳು" },
      { en: "Movies", hi: "फ़िल्में", kn: "ಚಲನಚಿತ್ರಗಳು" },
      { en: "Plants", hi: "पौधे", kn: "ಸಸ್ಯಗಳು" },
      { en: "Students", hi: "छात्र", kn: "ವಿದ್ಯಾರ್ಥಿಗಳು" }
    ],
    correctIndex: 0
  },

  // --- ADULT CATEGORY (Difficulty 7-10) ---
  {
    id: 'a_l1',
    domain: CognitiveDomain.LOGICAL,
    difficulty: 9,
    text: {
      en: "Premise: All chartered accountants are professionals. Some professionals are consultants. Conclusion: Therefore, some chartered accountants are consultants.",
      hi: "आधार: सभी चार्टर्ड अकाउंटेंट पेशेवर हैं। कुछ पेशेवर सलाहकार हैं। निष्कर्ष: इसलिए, कुछ चार्टर्ड अकाउंटेंट सलाहकार हैं।",
      kn: "ಆವರಣ: ಎಲ್ಲಾ ಚಾರ್ಟರ್ಡ್ ಅಕೌಂಟೆಂಟ್‌ಗಳು ವೃತ್ತಿಪರರು. ಕೆಲವು ವೃತ್ತಿಪರರು ಸಲಹೆಗಾರರು. ತೀರ್ಮಾನ: ಆದ್ದರಿಂದ, ಕೆಲವು ಚಾರ್ಟರ್ಡ್ ಅಕೌಂಟೆಂಟ್‌ಗಳು ಸಲಹೆಗಾರರಾಗಿದ್ದಾರೆ."
    },
    options: [
      { en: "Valid", hi: "मान्य", kn: "ಸಿಂಧು" },
      { en: "Invalid", hi: "अमान्य", kn: "ಅಸಿಂಧು" },
      { en: "Indeterminate", hi: "अनिश्चित", kn: "ಅನಿರ್ದಿಷ್ಟ" },
      { en: "Context dependent", hi: "संदर्भ पर निर्भर", kn: "ಸಂದರ್ಭಕ್ಕೆ ಅನುಗುಣವಾಗಿ" }
    ],
    correctIndex: 1
  },
  {
    id: 'a_p1',
    domain: CognitiveDomain.PATTERN,
    difficulty: 8,
    text: {
      en: "Solve the sequence: 2, 6, 14, 30, 62, ...",
      hi: "श्रृंखला हल करें: 2, 6, 14, 30, 62, ...",
      kn: "ಸರಣಿಯನ್ನು ಪೂರ್ಣಗೊಳಿಸಿ: 2, 6, 14, 30, 62, ..."
    },
    options: [
      { en: "124", hi: "124", kn: "124" },
      { en: "126", hi: "126", kn: "126" },
      { en: "128", hi: "128", kn: "128" },
      { en: "130", hi: "130", kn: "130" }
    ],
    correctIndex: 1
  },
  {
    id: 'a_d1',
    domain: CognitiveDomain.DECISION,
    difficulty: 9,
    text: {
      en: "A company must reduce expenses by 15%. They have three options: A) Cut R&D by 30%, B) Reduce staff by 10%, C) Lower marketing by 20%. If R&D is the long-term growth driver, which is the most strategically sound decision?",
      hi: "एक कंपनी को खर्चों में 15% की कटौती करनी होगी। उनके पास तीन विकल्प हैं: A) R&D में 30% की कटौती, B) कर्मचारियों में 10% की कटौती, C) मार्केटिंग में 20% की कटौती। यदि R&D दीर्घकालिक विकास का चालक है, तो सबसे रणनीतिक निर्णय कौन सा है?",
      kn: "ಒಂದು ಕಂಪನಿಯು ವೆಚ್ಚವನ್ನು 15% ರಷ್ಟು ಕಡಿಮೆ ಮಾಡಬೇಕು. ಅವರಲ್ಲಿ ಮೂರು ಆಯ್ಕೆಗಳಿವೆ: A) R&D ಅನ್ನು 30% ರಷ್ಟು ಕಡಿತಗೊಳಿಸುವುದು, B) ಸಿಬ್ಬಂದಿಯನ್ನು 10% ರಷ್ಟು ಕಡಿಮೆ ಮಾಡುವುದು, C) ಮಾರ್ಕೆಟಿಂಗ್ ಅನ್ನು 20% ರಷ್ಟು ಕಡಿಮೆ ಮಾಡುವುದು. R&D ಯು ದೀರ್ಘಕಾಲದ ಬೆಳವಣಿಗೆಗೆ ಮುಖ್ಯವಾಗಿದ್ದರೆ, ಅತ್ಯಂತ ಕಾರ್ಯತಂತ್ರದ ನಿರ್ಧಾರ ಯಾವುದು?"
    },
    options: [
      { en: "Option A", hi: "विकल्प A", kn: "ಆಯ್ಕೆ A" },
      { en: "Option B", hi: "विकल्प B", kn: "ಆಯ್ಕೆ B" },
      { en: "Option C", hi: "विकल्प C", kn: "ಆಯ್ಕೆ C" },
      { en: "Combination of B & C", hi: "B और C का संयोजन", kn: "B ಮತ್ತು C ಗಳ ಸಂಯೋಜನೆ" }
    ],
    correctIndex: 3
  }
];

export const APP_CONFIG = {
  currency: '₹',
  contactEmail: 'institute@saca.edu.in'
};
