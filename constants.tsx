
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
      { en: "Cricket Bat", hi: "ಕ್ರಿಕೆಟ್ ಬ್ಯಾಟ್", kn: "ಕ್ರಿಕೆಟ್ ಬ್ಯಾಟ್" },
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
  {
    id: 'k_s1',
    domain: CognitiveDomain.SPATIAL,
    difficulty: 4,
    text: {
      en: "If you are facing the rising Sun in the morning at the India Gate, which direction is to your left?",
      hi: "यदि आप सुबह इंडिया गेट पर उगते सूरज की ओर मुंह करके खड़े हैं, तो आपके बाईं ओर कौन सी दिशा है?",
      kn: "ನೀವು ಬೆಳಿಗ್ಗೆ ಇಂಡಿಯಾ ಗೇಟ್‌ನಲ್ಲಿ ಉದಯಿಸುವ ಸೂರ್ಯನ ಕಡೆಗೆ ಮುಖ ಮಾಡಿ ನಿಂತಿದ್ದರೆ, ನಿಮ್ಮ ಎಡಭಾಗದಲ್ಲಿ ಯಾವ ದಿಕ್ಕು ಇರುತ್ತದೆ?"
    },
    options: [
      { en: "North", hi: "उत्तर", kn: "ಉತ್ತರ" },
      { en: "South", hi: "दक्षिण", kn: "ದಕ್ಷಿಣ" },
      { en: "East", hi: "पूर्व", kn: "ಪೂರ್ವ" },
      { en: "West", hi: "पश्चिम", kn: "ಪಶ್ಚಿಮ" }
    ],
    correctIndex: 0
  },
  {
    id: 'k_l2',
    domain: CognitiveDomain.LOGICAL,
    difficulty: 1,
    text: {
      en: "Which Indian currency note is usually bright pink in color?",
      hi: "कौन सा भारतीय नोट आमतौर पर चमकीले गुलाबी रंग का होता है?",
      kn: "ಯಾವ ಭಾರತೀಯ ಕರೆನ್ಸಿ ನೋಟು ಸಾಮಾನ್ಯವಾಗಿ ಗಾಢ ಗುಲಾಬಿ ಬಣ್ಣದ್ದಾಗಿರುತ್ತದೆ?"
    },
    options: [
      { en: "Rs. 10", hi: "10 रुपये", kn: "10 ರೂಪಾಯಿ" },
      { en: "Rs. 500", hi: "500 रुपये", kn: "500 ರೂಪಾಯಿ" },
      { en: "Rs. 2000", hi: "2000 रुपये", kn: "2000 ರೂಪಾಯಿ" },
      { en: "Rs. 100", hi: "100 रुपये", kn: "100 ರೂಪಾಯಿ" }
    ],
    correctIndex: 2
  },
  {
    id: 'k_p2',
    domain: CognitiveDomain.PATTERN,
    difficulty: 3,
    text: {
      en: "On a Ludo board, if you need to reach 'Home' and you are 4 steps away, what number must you roll on the dice?",
      hi: "लूडो बोर्ड पर, यदि आपको 'घर' पहुंचना है और आप 4 कदम दूर हैं, तो आपको पासे पर कौन सा नंबर लाना होगा?",
      kn: "ಲೂಡೋ ಬೋರ್ಡ್‌ನಲ್ಲಿ, ನೀವು 'ಮನೆ' ತಲುಪಲು 4 ಹೆಜ್ಜೆಗಳು ಬಾಕಿ ಇದ್ದರೆ, ದಾಳದಲ್ಲಿ ಯಾವ ಸಂಖ್ಯೆ ಬೀಳಬೇಕು?"
    },
    options: [
      { en: "2", hi: "2", kn: "2" },
      { en: "6", hi: "6", kn: "6" },
      { en: "4", hi: "4", kn: "4" },
      { en: "1", hi: "1", kn: "1" }
    ],
    correctIndex: 2
  },
  {
    id: 'k_d1',
    domain: CognitiveDomain.DECISION,
    difficulty: 3,
    text: {
      en: "Your mother gives you Rs. 50 to buy milk. The milk costs Rs. 42. How much change should you bring back?",
      hi: "आपकी माँ आपको दूध खरीदने के लिए 50 रुपये देती हैं। दूध की कीमत 42 रुपये है। आपको कितना वापस लाना चाहिए?",
      kn: "ನಿಮ್ಮ ತಾಯಿ ಹಾಲು ಖರೀದಿಸಲು 50 ರೂಪಾಯಿ ನೀಡುತ್ತಾರೆ. ಹಾಲಿನ ಬೆಲೆ 42 ರೂಪಾಯಿ. ನೀವು ಎಷ್ಟು ಹಣವನ್ನು ವಾಪಸ್ ತರಬೇಕು?"
    },
    options: [
      { en: "Rs. 10", hi: "10 रुपये", kn: "10 ರೂಪಾಯಿ" },
      { en: "Rs. 8", hi: "8 रुपये", kn: "8 ರೂಪಾಯಿ" },
      { en: "Rs. 5", hi: "5 रुपये", kn: "5 ರೂಪಾಯಿ" },
      { en: "Rs. 12", hi: "12 रुपये", kn: "12 ರೂಪಾಯಿ" }
    ],
    correctIndex: 1
  },
  {
    id: 'k_l3',
    domain: CognitiveDomain.LOGICAL,
    difficulty: 2,
    text: {
      en: "If Peacock is the National Bird of India, which of these is the National Animal?",
      hi: "यदि मोर भारत का राष्ट्रीय पक्षी है, तो इनमें से कौन सा राष्ट्रीय पशु है?",
      kn: "ನವಿಲು ಭಾರತದ ರಾಷ್ಟ್ರೀಯ ಪಕ್ಷಿಯಾಗಿದ್ದರೆ, ಇವುಗಳಲ್ಲಿ ರಾಷ್ಟ್ರೀಯ ಪ್ರಾಣಿ ಯಾವುದು?"
    },
    options: [
      { en: "Lion", hi: "शेर", kn: "ಸಿಂಹ" },
      { en: "Tiger", hi: "बाघ", kn: "ಹುಲಿ" },
      { en: "Elephant", hi: "हाथी", kn: "ಆನೆ" },
      { en: "Cow", hi: "गाय", kn: "ಹಸು" }
    ],
    correctIndex: 1
  },
  {
    id: 'k_p3',
    domain: CognitiveDomain.PATTERN,
    difficulty: 4,
    text: {
      en: "Which shape follows the pattern: Circle, Square, Circle, Square, Circle...?",
      hi: "कौन सा आकार इस पैटर्न का अनुसरण करता है: वृत्त, वर्ग, वृत्त, वर्ग, वृत्त...?",
      kn: "ಈ ವಿನ್ಯಾಸವನ್ನು ಯಾವುದು ಅನುಸರಿಸುತ್ತದೆ: ವೃತ್ತ, ಚೌಕ, ವೃತ್ತ, ಚೌಕ, ವೃತ್ತ...?"
    },
    options: [
      { en: "Triangle", hi: "त्रिभुज", kn: "ತ್ರಿಕೋನ" },
      { en: "Square", hi: "वर्ग", kn: "ಚೌಕ" },
      { en: "Circle", hi: "वृत्त", kn: "ವೃತ್ತ" },
      { en: "Star", hi: "तारा", kn: "ನಕ್ಷತ್ರ" }
    ],
    correctIndex: 1
  },
  {
    id: 'k_s2',
    domain: CognitiveDomain.SPATIAL,
    difficulty: 3,
    text: {
      en: "You are building a tower with 5 blocks. If you put 2 blocks on the bottom, can you put 4 blocks on top of them without falling?",
      hi: "आप 5 ब्लॉकों के साथ एक टावर बना रहे हैं। यदि आप नीचे 2 ब्लॉक रखते हैं, तो क्या आप गिरने के बिना उनके ऊपर 4 ब्लॉक रख सकते हैं?",
      kn: "ನೀವು 5 ಬ್ಲಾಕ್‌ಗಳಿಂದ ಗೋಪುರವನ್ನು ಕಟ್ಟುತ್ತಿದ್ದೀರಿ. ಕೆಳಗೆ 2 ಬ್ಲಾಕ್‌ಗಳನ್ನು ಇಟ್ಟರೆ, ಅವುಗಳ ಮೇಲೆ 4 ಬ್ಲಾಕ್‌ಗಳನ್ನು ಬೀಳದಂತೆ ಜೋಡಿಸಲು ಸಾಧ್ಯವೇ?"
    },
    options: [
      { en: "Yes", hi: "हाँ", kn: "ಹೌದು" },
      { en: "No", hi: "नहीं", kn: "ಇಲ್ಲ" },
      { en: "Maybe", hi: "शायद", kn: "ಇರಬಹುದು" },
      { en: "Depends on color", hi: "रंग पर निर्भर करता है", kn: "ಬಣ್ಣವನ್ನು ಅವಲಂಬಿಸಿದೆ" }
    ],
    correctIndex: 1
  },
  {
    id: 'k_m2',
    domain: CognitiveDomain.MEMORY,
    difficulty: 2,
    text: {
      en: "Remember these three items: Mango, Samosa, Kite. Which item was mentioned first?",
      hi: "इन तीन चीजों को याद रखें: आम, समोसा, पतंग। सबसे पहले किस वस्तु का उल्लेख किया गया था?",
      kn: "ಈ ಮೂರು ವಸ್ತುಗಳನ್ನು ನೆನಪಿಟ್ಟುಕೊಳ್ಳಿ: ಮಾವು, ಸಮೋಸ, ಗಾಳಿಪಟ. ಮೊದಲು ಯಾವ ವಸ್ತುವನ್ನು ಹೇಳಲಾಯಿತು?"
    },
    options: [
      { en: "Kite", hi: "पतंग", kn: "ಗಾಳಿಪಟ" },
      { en: "Samosa", hi: "समोसा", kn: "ಸಮೋಸ" },
      { en: "Mango", hi: "आम", kn: "ಮಾವು" },
      { en: "Apple", hi: "सेब", kn: "ಸೇಬು" }
    ],
    correctIndex: 2
  },
  {
    id: 'k_v2',
    domain: CognitiveDomain.VERBAL,
    difficulty: 4,
    text: {
      en: "Choose the word that means the opposite of 'Big':",
      hi: "'बड़ा' का विलोम शब्द चुनें:",
      kn: "'ದೊಡ್ಡದು' ಪದದ ವಿರುದ್ಧ ಪದವನ್ನು ಆರಿಸಿ:"
    },
    options: [
      { en: "Large", hi: "विशाल", kn: "ಬೃಹತ್" },
      { en: "Small", hi: "छोटा", kn: "ಚಿಕ್ಕದು" },
      { en: "Tall", hi: "लंबा", kn: "ಉದ್ದ" },
      { en: "Fat", hi: "मोटा", kn: "ದಪ್ಪ" }
    ],
    correctIndex: 1
  },
  {
    id: 'k_d2',
    domain: CognitiveDomain.DECISION,
    difficulty: 2,
    text: {
      en: "You have 1 hour before bedtime. Should you watch a 2-hour movie or read a short story book?",
      hi: "सोने के समय से पहले आपके पास 1 घंटा है। क्या आपको 2 घंटे की फिल्म देखनी चाहिए या छोटी कहानियों की किताब पढ़नी चाहिए?",
      kn: "ಮಲಗುವ ಮುನ್ನ ನಿಮ್ಮ ಬಳಿ 1 ಗಂಟೆ ಇದೆ. ನೀವು 2 ಗಂಟೆಯ ಸಿನೆಮಾ ನೋಡಬೇಕೋ ಅಥವಾ ಸಣ್ಣ ಕಥೆ ಪುಸ್ತಕ ಓದಬೇಕೋ?"
    },
    options: [
      { en: "Movie", hi: "फिल्म", kn: "ಸಿನೆಮಾ" },
      { en: "Story book", hi: "कहानी की किताब", kn: "ಕಥೆ ಪುಸ್ತಕ" },
      { en: "Both", hi: "दोनों", kn: "ಎರಡೂ" },
      { en: "None", hi: "कोई नहीं", kn: "ಯಾವುದೂ ಇಲ್ಲ" }
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
  {
    id: 't_p1',
    domain: CognitiveDomain.PATTERN,
    difficulty: 5,
    text: {
      en: "In a T20 cricket match, a batsman scores 4, 6, 0, 1, 4. To keep a strike rate of 200, how many runs must he score on the 6th ball?",
      hi: "एक T20 क्रिकेट मैच में, एक बल्लेबाज 4, 6, 0, 1, 4 रन बनाता है। 200 का स्ट्राइक रेट बनाए रखने के लिए, उसे छठी गेंद पर कितने रन बनाने होंगे?",
      kn: "ಟಿ20 ಕ್ರಿಕೆಟ್ ಪಂದ್ಯದಲ್ಲಿ, ಬ್ಯಾಟ್ಸ್‌ಮನ್ 4, 6, 0, 1, 4 ರನ್ ಗಳಿಸುತ್ತಾನೆ. 200 ಸ್ಟ್ರೈಕ್ ರೇಟ್ ಕಾಯ್ದುಕೊಳ್ಳಲು ಅವನು 6ನೇ ಎಸೆತದಲ್ಲಿ ಎಷ್ಟು ರನ್ ಗಳಿಸಬೇಕು?"
    },
    options: [
      { en: "1 run", hi: "1 रन", kn: "1 ರನ್" },
      { en: "3 runs", hi: "3 रन", kn: "3 ರನ್" },
      { en: "Not possible", hi: "संभव नहीं है", kn: "ಸಾಧ್ಯವಿಲ್ಲ" },
      { en: "-3 runs", hi: "-3 रन", kn: "-3 ರನ್" }
    ],
    correctIndex: 2
  },
  {
    id: 't_m1',
    domain: CognitiveDomain.MEMORY,
    difficulty: 4,
    text: {
      en: "You are traveling on the Delhi Metro. The stations are: Rajiv Chowk, Mandi House, Supreme Court, Indraprastha. If you just left Mandi House, which is the next station?",
      hi: "आप दिल्ली मेट्रो में यात्रा कर रहे हैं। स्टेशन हैं: राजीव चौक, मंडी हाउस, सुप्रीम कोर्ट, इंद्रप्रस्थ। यदि आप अभी मंडी हाउस से निकले हैं, तो अगला स्टेशन कौन सा है?",
      kn: "ನೀವು ದೆಹಲಿ ಮೆಟ್ರೋದಲ್ಲಿ ಪ್ರಯಾಣಿಸುತ್ತಿದ್ದೀರಿ. ನಿಲ್ದಾಣಗಳು: ರಾಜೀವ್ ಚೌಕ್, ಮಂಡಿ ಹೌಸ್, ಸುಪ್ರೀಂ ಕೋರ್ಟ್, ಇಂದ್ರಪ್ರಸ್ಥ. ನೀವು ಈಗಷ್ಟೇ ಮಂಡಿ ಹೌಸ್ ಬಿಟ್ಟಿದ್ದರೆ, ಮುಂದಿನ ನಿಲ್ದಾಣ ಯಾವುದು?"
    },
    options: [
      { en: "Rajiv Chowk", hi: "राजीव चौक", kn: "ರಾಜೀವ್ ಚೌಕ್" },
      { en: "Indraprastha", hi: "इंद्रप्रस्थ", kn: "ಇಂದ್ರಪ್ರಸ್ಥ" },
      { en: "Supreme Court", hi: "सुप्रीम कोर्ट", kn: "ಸುಪ್ರೀಂ ಕೋರ್ಟ್" },
      { en: "Kashmere Gate", hi: "कश्मीरी गेट", kn: "ಕಾಶ್ಮೀರಿ ಗೇಟ್" }
    ],
    correctIndex: 2
  },
  {
    id: 't_l2',
    domain: CognitiveDomain.LOGICAL,
    difficulty: 6,
    text: {
      en: "Pointing to a photograph of a boy, Suresh said, 'He is the son of the only son of my mother.' How is Suresh related to that boy?",
      hi: "एक लड़के की तस्वीर की ओर इशारा करते हुए, सुरेश ने कहा, 'वह मेरी माँ के इकलौते बेटे का बेटा है।' सुरेश उस लड़के से कैसे संबंधित है?",
      kn: "ಹುಡುಗನ ಭಾವಚಿತ್ರವನ್ನು ತೋರಿಸುತ್ತಾ ಸುರೇಶ್ ಹೇಳಿದರು, 'ಇವನು ನನ್ನ ತಾಯಿಯ ಏಕೈಕ ಮಗನ ಮಗ.' ಸುರೇಶ್ ಆ ಹುಡುಗನಿಗೆ ಹೇಗೆ ಸಂಬಂಧಿ?"
    },
    options: [
      { en: "Brother", hi: "भाई", kn: "ಸಹೋದರ" },
      { en: "Uncle", hi: "चाचा", kn: "ಮಾವ" },
      { en: "Father", hi: "पिता", kn: "ತಂದೆ" },
      { en: "Cousin", hi: "चचेरा भाई", kn: "ಸೋದರಸಂಬಂಧಿ" }
    ],
    correctIndex: 2
  },
  {
    id: 't_d1',
    domain: CognitiveDomain.DECISION,
    difficulty: 8,
    text: {
      en: "You are choosing a stream for Grade 11. Physics and Chemistry are required for both Engineering and Medicine. Biology is only for Medicine. If you are unsure but want to keep both options open, which subject set should you choose?",
      hi: "आप कक्षा 11 के लिए स्ट्रीम चुन रहे हैं। इंजीनियरिंग और मेडिसिन दोनों के लिए फिजिक्स और केमिस्ट्री आवश्यक हैं। बायोलॉजी केवल मेडिसिन के लिए है। यदि आप अनिश्चित हैं लेकिन दोनों विकल्प खुले रखना चाहते हैं, तो आपको कौन सा विषय सेट चुनना चाहिए?",
      kn: "ನೀವು 11ನೇ ತರಗತಿಗೆ ವಿಷಯವನ್ನು ಆರಿಸುತ್ತಿದ್ದೀರಿ. ಇಂಜಿನಿಯರಿಂಗ್ ಮತ್ತು ವೈದ್ಯಕೀಯ ಎರಡಕ್ಕೂ ಭೌತಶಾಸ್ತ್ರ ಮತ್ತು ರಸಾಯನಶಾಸ್ತ್ರದ ಅಗತ್ಯವಿದೆ. ಜೀವಶಾಸ್ತ್ರವು ವೈದ್ಯಕೀಯಕ್ಕೆ ಮಾತ್ರ. ನೀವು ಅನಿಶ್ಚಿತವಾಗಿದ್ದರೆ ಆದರೆ ಎರಡೂ ಆಯ್ಕೆಗಳನ್ನು ಮುಕ್ತವಾಗಿಡಲು ಬಯಸಿದರೆ, ನೀವು ಯಾವ ವಿಷಯಗಳನ್ನು ಆರಿಸಬೇಕು?"
    },
    options: [
      { en: "PCMB (Maths & Bio)", hi: "PCMB (गणित और जीव विज्ञान)", kn: "PCMB (ಗಣಿತ ಮತ್ತು ಜೀವಶಾಸ್ತ್ರ)" },
      { en: "PCM (Maths)", hi: "PCM (गणित)", kn: "PCM (ಗಣಿತ)" },
      { en: "PCB (Biology)", hi: "PCB (जीव विज्ञान)", kn: "PCB (ಜೀವಶಾಸ್ತ್ರ)" },
      { en: "Commerce", hi: "वाणिज्य", kn: "ವಾಣಿಜ್ಯ" }
    ],
    correctIndex: 0
  },
  {
    id: 't_v1',
    domain: CognitiveDomain.VERBAL,
    difficulty: 7,
    text: {
      en: "Identify the word derived from a Sanskrit root that refers to 'the cycle of birth and rebirth':",
      hi: "संस्कृत मूल से निकले उस शब्द की पहचान करें जो 'जन्म और पुनर्जन्म के चक्र' को संदर्भित करता है:",
      kn: "ಸಂಸ್ಕೃತ ಮೂಲದಿಂದ ಬಂದ 'ಜನ್ಮ ಮತ್ತು ಮರುಜನ್ಮದ ಚಕ್ರ'ವನ್ನು ಸೂಚಿಸುವ ಪದವನ್ನು ಗುರುತಿಸಿ:"
    },
    options: [
      { en: "Karma", hi: "कर्म", kn: "ಕರ್ಮ" },
      { en: "Samsara", hi: "संस्कार", kn: "ಸಂಸಾರ" },
      { en: "Dharma", hi: "धर्म", kn: "ಧರ್ಮ" },
      { en: "Mantra", hi: "मंत्र", kn: "ಮಂತ್ರ" }
    ],
    correctIndex: 1
  },
  {
    id: 't_l3',
    domain: CognitiveDomain.LOGICAL,
    difficulty: 5,
    text: {
      en: "If all cats are mammals and some mammals are dogs, which of these MUST be true?",
      hi: "यदि सभी बिल्लियाँ स्तनधारी हैं और कुछ स्तनधारी कुत्ते हैं, तो इनमें से कौन सा सत्य होना ही चाहिए?",
      kn: "ಎಲ್ಲಾ ಬೆಕ್ಕುಗಳು ಸಸ್ತನಿಗಳಾಗಿದ್ದರೆ ಮತ್ತು ಕೆಲವು ಸಸ್ತನಿಗಳು ನಾಯಿಗಳಾಗಿದ್ದರೆ, ಇವುಗಳಲ್ಲಿ ಯಾವುದು ಖಂಡಿತವಾಗಿಯೂ ಸತ್ಯ?"
    },
    options: [
      { en: "All cats are dogs", hi: "सभी बिल्लियाँ कुत्ते हैं", kn: "ಎಲ್ಲಾ ಬೆಕ್ಕುಗಳು ನಾಯಿಗಳು" },
      { en: "Some dogs are cats", hi: "कुछ कुत्ते बिल्लियाँ हैं", kn: "ಕೆಲವು ನಾಯಿಗಳು ಬೆಕ್ಕುಗಳು" },
      { en: "None of the above", hi: "उपरोक्त में से कोई नहीं", kn: "ಯಾವುದೂ ಅಲ್ಲ" },
      { en: "All mammals are cats", hi: "सभी स्तनधारी बिल्लियाँ हैं", kn: "ಎಲ್ಲಾ ಸಸ್ತನಿಗಳು ಬೆಕ್ಕುಗಳು" }
    ],
    correctIndex: 2
  },
  {
    id: 't_p2',
    domain: CognitiveDomain.PATTERN,
    difficulty: 6,
    text: {
      en: "Complete the sequence: 1, 4, 9, 16, 25, ...",
      hi: "श्रृंखला पूरी करें: 1, 4, 9, 16, 25, ...",
      kn: "ಸರಣಿಯನ್ನು ಪೂರ್ಣಗೊಳಿಸಿ: 1, 4, 9, 16, 25, ..."
    },
    options: [
      { en: "30", hi: "30", kn: "30" },
      { en: "36", hi: "36", kn: "36" },
      { en: "40", hi: "40", kn: "40" },
      { en: "49", hi: "49", kn: "49" }
    ],
    correctIndex: 1
  },
  {
    id: 't_s2',
    domain: CognitiveDomain.SPATIAL,
    difficulty: 5,
    text: {
      en: "If you are standing in the middle of a football field and you walk 10 meters North, then 10 meters East, in which direction is the center from you?",
      hi: "यदि आप फुटबॉल के मैदान के बीच में खड़े हैं और 10 मीटर उत्तर की ओर चलते हैं, फिर 10 मीटर पूर्व की ओर, तो केंद्र आपसे किस दिशा में है?",
      kn: "ನೀವು ಫುಟ್‌ಬಾಲ್ ಮೈದಾನದ ಮಧ್ಯದಲ್ಲಿ ನಿಂತು 10 ಮೀಟರ್ ಉತ್ತರಕ್ಕೆ, ನಂತರ 10 ಮೀಟರ್ ಪೂರ್ವಕ್ಕೆ ನಡೆದರೆ, ಕೇಂದ್ರವು ನಿಮ್ಮಿಂದ ಯಾವ ದಿಕ್ಕಿನಲ್ಲಿದೆ?"
    },
    options: [
      { en: "North-East", hi: "उत्तर-पूर्व", kn: "ಈಶಾನ್ಯ" },
      { en: "South-West", hi: "दक्षिण-पश्चिम", kn: "ನೈಋತ್ಯ" },
      { en: "South-East", hi: "दक्षिण-पूर्व", kn: "ಆಗ್ನೇಯ" },
      { en: "North-West", hi: "उत्तर-पश्चिम", kn: "ವಾಯುವ್ಯ" }
    ],
    correctIndex: 1
  },
  {
    id: 't_m2',
    domain: CognitiveDomain.MEMORY,
    difficulty: 6,
    text: {
      en: "A security code is 7-4-2-9. If you reverse the digits and subtract 100, what is the result?",
      hi: "एक सुरक्षा कोड 7-4-2-9 है। यदि आप अंकों को उलट देते हैं और 100 घटाते हैं, तो परिणाम क्या होगा?",
      kn: "ಒಂದು ಭದ್ರತಾ ಕೋಡ್ 7-4-2-9 ಆಗಿದೆ. ಅಂಕಿಗಳನ್ನು ಅದಲುಬದಲು ಮಾಡಿ 100 ಕಳೆದರೆ ಬರುವ ಉತ್ತರವೇನು?"
    },
    options: [
      { en: "9147", hi: "9147", kn: "9147" },
      { en: "9247", hi: "9247", kn: "9247" },
      { en: "9127", hi: "9127", kn: "9127" },
      { en: "9347", hi: "9347", kn: "9347" }
    ],
    correctIndex: 0
  },
  {
    id: 't_v3',
    domain: CognitiveDomain.VERBAL,
    difficulty: 6,
    text: {
      en: "Choose the word that is a synonym for 'Vibrant':",
      hi: "'Vibrant' (जीवंत) का पर्यायवाची शब्द चुनें:",
      kn: "'Vibrant' ಪದಕ್ಕೆ ಸಮಾನಾರ್ಥಕ ಪದವನ್ನು ಆರಿಸಿ:"
    },
    options: [
      { en: "Dull", hi: "सुस्त", kn: "ಮಂದ" },
      { en: "Energetic", hi: "ऊर्जावान", kn: "ಚಟುವಟಿಕೆಯುಳ್ಳ" },
      { en: "Quiet", hi: "शांत", kn: "ಶಾಂತ" },
      { en: "Lazy", hi: "आलसी", kn: "ಸೋಮಾರಿ" }
    ],
    correctIndex: 1
  },
  {
    id: 't_d2',
    domain: CognitiveDomain.DECISION,
    difficulty: 7,
    text: {
      en: "You have an exam tomorrow but your best friend is having a birthday party tonight. What is the most responsible choice?",
      hi: "कल आपकी परीक्षा है लेकिन आज रात आपके सबसे अच्छे दोस्त की जन्मदिन की पार्टी है। सबसे जिम्मेदार विकल्प क्या है?",
      kn: "ನಾಳೆ ನಿಮಗೆ ಪರೀಕ್ಷೆ ಇದೆ ಆದರೆ ಇಂದು ರಾತ್ರಿ ನಿಮ್ಮ ಆತ್ಮೀಯ ಸ್ನೇಹಿತನ ಹುಟ್ಟುಹಬ್ಬದ ಪಾರ್ಟಿ ಇದೆ. ಅತ್ಯಂತ ಜವಾಬ್ದಾರಿಯುತ ನಿರ್ಧಾರ ಯಾವುದು?"
    },
    options: [
      { en: "Go to party and skip exam", hi: "पार्टी में जाएं और परीक्षा छोड़ दें", kn: "ಪಾರ್ಟಿಗೆ ಹೋಗಿ ಪರೀಕ್ಷೆ ತಪ್ಪಿಸುವುದು" },
      { en: "Study and skip party", hi: "पढ़ाई करें और पार्टी छोड़ दें", kn: "ಓದಿಕೊಳ್ಳುವುದು ಮತ್ತು ಪಾರ್ಟಿ ಬಿಡುವುದು" },
      { en: "Go to party for 1 hour, then study", hi: "1 घंटे के लिए पार्टी में जाएं, फिर पढ़ाई करें", kn: "1 ಗಂಟೆ ಪಾರ್ಟಿಗೆ ಹೋಗಿ ನಂತರ ಓದುವುದು" },
      { en: "Sleep early and forget both", hi: "जल्दी सो जाएं और दोनों को भूल जाएं", kn: "ಬೇಗ ಮಲಗಿ ಎರಡನ್ನೂ ಮರೆಯುವುದು" }
    ],
    correctIndex: 2
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
  },
  {
    id: 'a_l2',
    domain: CognitiveDomain.LOGICAL,
    difficulty: 8,
    text: {
      en: "In a family of six, A is B’s husband. C is D’s son. D is E’s daughter. F is B’s brother. How is C related to F?",
      hi: "छह सदस्यों के एक परिवार में, A, B का पति है। C, D का बेटा है। D, E की बेटी है। F, B का भाई है। C, F से कैसे संबंधित है?",
      kn: "ಆರು ಜನರ ಕುಟುಂಬದಲ್ಲಿ, A ಎಂಬುವವರು B ಯ ಪತಿ. C ಎಂಬುವವರು D ಯ ಮಗ. D ಎಂಬುವವರು E ಯ ಮಗಳು. F ಎಂಬುವವರು B ಯ ಸಹೋದರ. C ಗೂ F ಗೂ ಇರುವ ಸಂಬಂಧವೇನು?"
    },
    options: [
      { en: "Nephew", hi: "भतीजा", kn: "ಸೋದರಳಿಯ" },
      { en: "Cousin", hi: "चचेरा भाई", kn: "ಸೋದರಸಂಬಂಧಿ" },
      { en: "Indeterminate", hi: "अनिश्चित", kn: "ಅನಿರ್ದಿಷ್ಟ" },
      { en: "Grandson", hi: "पोता", kn: "ಮೊಮ್ಮಗ" }
    ],
    correctIndex: 2
  },
  {
    id: 'a_v1',
    domain: CognitiveDomain.VERBAL,
    difficulty: 9,
    text: {
      en: "Identify the word that means 'to speak evasively':",
      hi: "उस शब्द की पहचान करें जिसका अर्थ 'गोलमोल बोलना' है:",
      kn: "'ತಪ್ಪಿಸಿಕೊಳ್ಳುವಂತೆ ಮಾತನಾಡುವುದು' ಎಂಬ ಅರ್ಥವಿರುವ ಪದವನ್ನು ಗುರುತಿಸಿ:"
    },
    options: [
      { en: "Prevaricate", hi: "छल-कपट करना", kn: "ಸುಳ್ಳು ಹೇಳು" },
      { en: "Articulate", hi: "स्पष्ट बोलना", kn: "ಸ್ಪಷ್ಟವಾಗಿ ಹೇಳು" },
      { en: "Prognosticate", hi: "भविष्यवाणी करना", kn: "ಭವಿಷ್ಯ ನುಡಿ" },
      { en: "Elucidate", hi: "स्पष्ट करना", kn: "ವಿವರಿಸು" }
    ],
    correctIndex: 0
  },
  {
    id: 'a_m1',
    domain: CognitiveDomain.MEMORY,
    difficulty: 8,
    text: {
      en: "Which of these Indian states does NOT share a border with Bangladesh?",
      hi: "इनमें से कौन सा भारतीय राज्य बांग्लादेश के साथ सीमा साझा नहीं करता है?",
      kn: "ಇವುಗಳಲ್ಲಿ ಯಾವ ಭಾರತೀಯ ರಾಜ್ಯ ಬಾಂಗ್ಲಾದೇಶದೊಂದಿಗೆ ಗಡಿಯನ್ನು ಹಂಚಿಕೊಂಡಿಲ್ಲ?"
    },
    options: [
      { en: "Assam", hi: "असम", kn: "ಅಸ್ಸಾಂ" },
      { en: "Tripura", hi: "त्रिपुरा", kn: "ತ್ರಿಪುರಾ" },
      { en: "Nagaland", hi: "नागालैंड", kn: "ನಾಗಾಲ್ಯಾಂಡ್" },
      { en: "Mizoram", hi: "मिजोरम", kn: "ಮಿಜೋರಾಂ" }
    ],
    correctIndex: 2
  },
  {
    id: 'a_s1',
    domain: CognitiveDomain.SPATIAL,
    difficulty: 7,
    text: {
      en: "Imagine a 3x3 cube. If you paint all its outer surfaces red and then cut it into 27 small 1x1 cubes, how many small cubes will have exactly 2 sides painted red?",
      hi: "एक 3x3 क्यूब की कल्पना करें। यदि आप इसकी सभी बाहरी सतहों को लाल रंग से रंगते हैं और फिर इसे 27 छोटे 1x1 क्यूब्स में काटते हैं, तो कितने छोटे क्यूब्स की ठीक 2 सतहें लाल होंगी?",
      kn: "ಒಂದು 3x3 ಘನವನ್ನು ಕಲ್ಪಿಸಿಕೊಳ್ಳಿ. ಅದರ ಎಲ್ಲಾ ಹೊರಮೈಗೆ ಕೆಂಪು ಬಣ್ಣ ಹಚ್ಚಿ 27 ಸಣ್ಣ 1x1 ಘನಗಳಾಗಿ ಕತ್ತರಿಸಿದರೆ, ಎಷ್ಟು ಸಣ್ಣ ಘನಗಳು ನಿಖರವಾಗಿ 2 ಬದಿಯಲ್ಲಿ ಕೆಂಪು ಬಣ್ಣ ಹೊಂದಿರುತ್ತವೆ?"
    },
    options: [
      { en: "8", hi: "8", kn: "8" },
      { en: "12", hi: "12", kn: "12" },
      { en: "6", hi: "6", kn: "6" },
      { en: "4", hi: "4", kn: "4" }
    ],
    correctIndex: 1
  },
  {
    id: 'a_p2',
    domain: CognitiveDomain.PATTERN,
    difficulty: 9,
    text: {
      en: "Which number replaces the question mark? 3, 8, 18, 38, ?",
      hi: "प्रश्न चिह्न के स्थान पर कौन सी संख्या आएगी? 3, 8, 18, 38, ?",
      kn: "ಪ್ರಶ್ನಾರ್ಥಕ ಚಿಹ್ನೆಯ ಜಾಗಕ್ಕೆ ಯಾವ ಸಂಖ್ಯೆ ಬರುತ್ತದೆ? 3, 8, 18, 38, ?"
    },
    options: [
      { en: "78", hi: "78", kn: "78" },
      { en: "82", hi: "82", kn: "82" },
      { en: "76", hi: "76", kn: "76" },
      { en: "80", hi: "80", kn: "80" }
    ],
    correctIndex: 0
  },
  {
    id: 'a_d2',
    domain: CognitiveDomain.DECISION,
    difficulty: 10,
    text: {
      en: "You are the manager of a project. A key team member leaves 2 weeks before the deadline. What is the most effective immediate action?",
      hi: "आप एक प्रोजेक्ट के मैनेजर हैं। एक मुख्य टीम मेंबर डेडलाइन से 2 हफ्ते पहले छोड़ देता है। सबसे प्रभावी तत्काल कार्रवाई क्या है?",
      kn: "ನೀವು ಒಂದು ಪ್ರಾಜೆಕ್ಟ್‌ನ ಮ್ಯಾನೇಜರ್. ಪ್ರಮುಖ ತಂಡದ ಸದಸ್ಯರೊಬ್ಬರು ಗಡುವಿಗೆ 2 ವಾರಗಳ ಮೊದಲು ಕೆಲಸ ಬಿಡುತ್ತಾರೆ. ಅತ್ಯಂತ ಪರಿಣಾಮಕಾರಿ ಕ್ರಮ ಯಾವುದು?"
    },
    options: [
      { en: "Delay the deadline", hi: "डेडलाइन बढ़ा दें", kn: "ಗಡುವನ್ನು ಮುಂದೂಡುವುದು" },
      { en: "Re-distribute tasks", hi: "कार्यों को पुनर्वितरित करें", kn: "ಕೆಲಸಗಳನ್ನು ಮರುಹಂಚಿಕೆ ಮಾಡುವುದು" },
      { en: "Hire a replacement", hi: "नया कर्मचारी नियुक्त करें", kn: "ಹೊಸಬರನ್ನು ನೇಮಿಸಿಕೊಳ್ಳುವುದು" },
      { en: "Work extra hours alone", hi: "अकेले अतिरिक्त घंटे काम करें", kn: "ಒಬ್ಬರೇ ಹೆಚ್ಚು ಸಮಯ ಕೆಲಸ ಮಾಡುವುದು" }
    ],
    correctIndex: 1
  },
  {
    id: 'a_l3',
    domain: CognitiveDomain.LOGICAL,
    difficulty: 8,
    text: {
      en: "If 'A' means '+', 'B' means '-', 'C' means '*' and 'D' means '/', then what is the value of 18 C 14 A 6 B 16 D 4?",
      hi: "यदि 'A' का अर्थ '+', 'B' का अर्थ '-', 'C' का अर्थ '*' और 'D' का अर्थ '/' है, तो 18 C 14 A 6 B 16 D 4 का मान क्या है?",
      kn: "'A' ಎಂದರೆ '+', 'B' ಎಂದರೆ '-', 'C' ಎಂದರೆ '*' ಮತ್ತು 'D' ಎಂದರೆ '/' ಆಗಿದ್ದರೆ, 18 C 14 A 6 B 16 D 4 ರ ಬೆಲೆ ಎಷ್ಟು?"
    },
    options: [
      { en: "254", hi: "254", kn: "254" },
      { en: "258", hi: "258", kn: "258" },
      { en: "250", hi: "250", kn: "250" },
      { en: "260", hi: "260", kn: "260" }
    ],
    correctIndex: 0
  },
  {
    id: 'a_m2',
    domain: CognitiveDomain.MEMORY,
    difficulty: 9,
    text: {
      en: "Which Mughal Emperor was famous for his policy of religious tolerance 'Sulh-i-kul'?",
      hi: "कौन सा मुगल सम्राट अपनी धार्मिक सहिष्णुता की नीति 'सुलह-ए-कुल' के लिए प्रसिद्ध था?",
      kn: "ಧಾರ್ಮಿಕ ಸಹಿಷ್ಣುತೆಯ 'ಸುಲ್-ಇ-ಕುಲ್' ನೀತಿಗೆ ಹೆಸರಾದ ಮೊಘಲ್ ಚಕ್ರವರ್ತಿ ಯಾರು?"
    },
    options: [
      { en: "Babur", hi: "बाबर", kn: "ಬಾಬರ್" },
      { en: "Humayun", hi: "हुमायूँ", kn: "ಹುಮಾಯೂನ್" },
      { en: "Akbar", hi: "अकबर", kn: "ಅಕ್ಬರ್" },
      { en: "Aurangzeb", hi: "औरंगज़ेब", kn: "ಔರಂಗಜೇಬ್" }
    ],
    correctIndex: 2
  },
  {
    id: 'a_v2',
    domain: CognitiveDomain.VERBAL,
    difficulty: 8,
    text: {
      en: "Identify the grammatically correct sentence:",
      hi: "व्याकरणिक रूप से सही वाक्य की पहचान करें:",
      kn: "ವ್ಯಾಕರಣಬದ್ಧವಾಗಿ ಸರಿಯಾದ ವಾಕ್ಯವನ್ನು ಗುರುತಿಸಿ:"
    },
    options: [
      { en: "He don't know nothing.", hi: "उसे कुछ नहीं पता।", kn: "ಅವನಿಗೆ ಏನೂ ಗೊತ್ತಿಲ್ಲ." },
      { en: "She has been working here for three years.", hi: "वह यहाँ तीन साल से काम कर रही है।", kn: "ಅವಳು ಇಲ್ಲಿ ಮೂರು ವರ್ಷಗಳಿಂದ ಕೆಲಸ ಮಾಡುತ್ತಿದ್ದಾಳೆ." },
      { en: "They was going to the market.", hi: "वे बाजार जा रहे थे।", kn: "ಅವರು ಮಾರುಕಟ್ಟೆಗೆ ಹೋಗುತ್ತಿದ್ದರು." },
      { en: "Between you and I, it's a secret.", hi: "तुम्हारे और मेरे बीच, यह एक राज है।", kn: "ನಿನ್ನ ಮತ್ತು ನನ್ನ ನಡುವೆ ಇದೊಂದು ರಹಸ್ಯ." }
    ],
    correctIndex: 1
  }
];

export const APP_CONFIG = {
  currency: '₹',
  contactEmail: 'institute@saca.edu.in'
};
