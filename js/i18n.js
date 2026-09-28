/**
 * Digital Literacy Boisar — Multilingual Localization (EN, HI, MR)
 * Preserves user preference in localStorage and updates DOM text dynamically.
 */

const I18N = {
  currentLang: localStorage.getItem("dlb_lang") || "en",

  translations: {
    en: {
      siteTitle: "Digital Literacy Boisar",
      siteSubtitle: "Community Data & Insights Platform — Palghar District",
      collegeTag: "Theem College of Arts, Commerce & Science · Dept. of IT",
      disclaimerBanner: "Academic Project Notice: Current figures are derived from an illustrative research dataset (n=60) for Boisar, Palghar District. Confidential draft for academic & stakeholder review.",
      
      // Nav
      navHome: "Home",
      navInsights: "Insights & Dashboard",
      navSelfCheck: "Digital Self-Check",
      navTraining: "Training & Resources",
      navAbout: "About the Study",
      navAdmin: "Mentor Console",

      // Hero
      heroTag: "COMMUNITY ENGAGEMENT & DATA SCIENCE INITIATIVE",
      heroTitle: "Bridging the Digital Divide in Boisar",
      heroDesc: "A data-driven platform assessing digital literacy, identifying critical practical skill gaps, and delivering targeted community training across Boisar's industrial and residential clusters.",
      ctaSelfCheck: "Take Digital Self-Check",
      ctaInsights: "Explore Study Insights",
      ctaTraining: "View 7-Session Training Plan",

      // Stat Cards
      statMeanScore: "Mean Literacy Score",
      statMeanDesc: "Out of 100 points across 60 respondents",
      statCorrelation: "Correlation (r ≈ 0.73)",
      statCorrelationDesc: "Strong link between literacy & daily digital impact",
      statAccess: "Smartphone Availability",
      statAccessDesc: "High hardware access at home (56/60 homes)",
      statBarrier: "Top Community Barrier",
      statBarrierDesc: "Fear of cyber fraud & fake payment scams (48.3%)",

      // Pillars
      pillar1Title: "1. Public Insights & 7 Core Charts",
      pillar1Desc: "Interactive charts presenting digital access, task performance gaps (Email 45%, e-Gov 51.7%), score distribution, and barriers.",
      pillar2Title: "2. Mobile-First Digital Self-Check",
      pillar2Desc: "A 3-minute task-based questionnaire calculating an instant score (0–100) and diagnosing your weakest skill with guidance.",
      pillar3Title: "3. Training & Assisted E-Desk",
      pillar3Desc: "A structured 7-session community syllabus, multilingual safety guides, and an in-person tech desk at Theem College campus.",

      // Insights Page
      insightsTitle: "Community Data & Analytics Dashboard",
      insightsSubtitle: "Explore the 7 key findings from the source study with interactive filters.",
      filterCategory: "Filter by Category:",
      filterAge: "Filter by Age Band:",
      allCategories: "All Categories (n=60)",
      studentsOnly: "Students (n=20)",
      workersOnly: "Working Adults / MIDC (n=20)",
      homemakersOnly: "Homemakers & Parents (n=20)",
      allAges: "All Age Bands",

      // Self Check
      selfCheckTitle: "Digital Literacy Self-Check",
      selfCheckSubtitle: "Answer 8 quick questions to calculate your digital literacy score and receive a tailored learning roadmap.",
      selfCheckPrivacyNote: "Strictly Anonymous: No names, phone numbers, or passwords are ever requested.",
      retakeNotice: "Have a Respondent ID from a previous check? Enter it to compare your progress:",
      startTestBtn: "Start Quick Assessment",

      // Training
      trainingTitle: "Community Training & Resources Hub",
      trainingSubtitle: "Bridging the gap between device ownership and confident, safe digital participation.",
      deskTitle: "Assisted E-Service Help Desk",
      deskLocation: "Theem College Campus, Boisar West — Tech Center Room 204",
      deskHours: "Monday to Friday: 10:00 AM – 4:00 PM | Saturday: 10:00 AM – 1:00 PM",
      deskServices: "Services: Online government forms (Aaple Sarkar, Aadhaar, DigiLocker), document scanning, and 1-on-1 student mentor guidance.",
      downloadGuidesTitle: "Multilingual Step-by-Step Handbooks",

      // Footer
      footerText: "Digital Literacy Boisar Platform — Community Engagement Project using Data Science. Developed at Theem College of Arts, Commerce & Science, Boisar.",
      footerTeam: "Project Team: Rohit Kumar Prasad (Roll No. 17) · Sunny Singh (Roll No. 25) | Mentor: Prof. Sarvesh K Kasar"
    },

    hi: {
      siteTitle: "डिजिटल साक्षरता बोईसर",
      siteSubtitle: "सामुदायिक डेटा एवं अंतर्दृष्टि मंच — पालघर जिला",
      collegeTag: "थीम कॉलेज ऑफ आर्ट्स, कॉमर्स एंड साइंस · सूचना प्रौद्योगिकी विभाग",
      disclaimerBanner: "शैक्षणिक अध्ययन सूचना: प्रस्तुत आंकड़े बोईसर, पालघर जिले के 60 उत्तरदाताओं के शोध डेटासेट पर आधारित हैं। केवल शैक्षणिक एवं हितधारक समीक्षा हेतु।",
      
      // Nav
      navHome: "होम",
      navInsights: "डैशबोर्ड एवं आंकड़े",
      navSelfCheck: "डिजिटल सेल्फ-चेक",
      navTraining: "प्रशिक्षण एवं संसाधन",
      navAbout: "अध्ययन के बारे में",
      navAdmin: "मार्गदर्शक कंसोल",

      // Hero
      heroTag: "सामुदायिक सहभागिता एवं डेटा साइंस पहल",
      heroTitle: "बोईसर में डिजिटल अंतर को पाटना",
      heroDesc: "डेटा-आधारित मंच जो बोईसर के औद्योगिक (MIDC) और आवासीय क्षेत्रों में डिजिटल साक्षरता का आकलन करता है, कौशल अंतराल की पहचान करता है और लक्षित प्रशिक्षण प्रदान करता है।",
      ctaSelfCheck: "डिजिटल सेल्फ-चेक शुरू करें",
      ctaInsights: "अध्ययन के आंकड़े देखें",
      ctaTraining: "7-सत्रीय प्रशिक्षण योजना",

      // Stat Cards
      statMeanScore: "औसत साक्षरता स्कोर",
      statMeanDesc: "60 प्रतिभागियों में से 100 में से औसत अंक",
      statCorrelation: "सहसंबंध (r ≈ 0.73)",
      statCorrelationDesc: "साक्षरता स्कोर और दैनिक जीवन में लाभ के बीच गहरा संबंध",
      statAccess: "स्मार्टफोन उपलब्धता",
      statAccessDesc: "घरों में स्मार्टफोन की व्यापक पहुंच (93.3%)",
      statBarrier: "प्रमुख सामुदायिक बाधा",
      statBarrierDesc: "ऑनलाइन धोखाधड़ी और फर्जी संदेशों का डर (48.3%)",

      // Pillars
      pillar1Title: "1. सार्वजनिक अंतर्दृष्टि एवं 7 चार्ट",
      pillar1Desc: "डिजिटल पहुंच, कौशल अंतराल (ईमेल 45%, सरकारी सेवाएं 51.7%), स्कोर वितरण और प्रमुख बाधाओं के इंटरैक्टिव चार्ट।",
      pillar2Title: "2. मोबाइल-फ्रेंडली सेल्फ-चेक",
      pillar2Desc: "3 मिनट की कार्य-आधारित प्रश्नावली जो तुरंत स्कोर (0-100) देती है और आपकी सबसे कमजोर स्किल के अनुसार मार्गदर्शन करती है।",
      pillar3Title: "3. प्रशिक्षण व सहायता डेस्क",
      pillar3Desc: "थीम कॉलेज में 7-सत्रीय व्यावहारिक कार्यशालाएं, बहुभाषी सुरक्षा गाइड और व्यक्तिगत ई-सेवा सहायता केंद्र।",

      // Insights Page
      insightsTitle: "सामुदायिक डेटा एवं विश्लेषिकी डैशबोर्ड",
      insightsSubtitle: "स्रोत अध्ययन के 7 मुख्य निष्कर्षों को इंटरैक्टिव फ़िल्टर के साथ देखें।",
      filterCategory: "श्रेणी अनुसार फ़िल्टर करें:",
      filterAge: "आयु वर्ग अनुसार फ़िल्टर करें:",
      allCategories: "सभी श्रेणियां (n=60)",
      studentsOnly: "विद्यार्थी (n=20)",
      workersOnly: "श्रमिक व कामकाजी (MIDC) (n=20)",
      homemakersOnly: "गृहिणी व अभिभावक (n=20)",
      allAges: "सभी आयु वर्ग",

      // Self Check
      selfCheckTitle: "डिजिटल साक्षरता स्व-मूल्यांकन",
      selfCheckSubtitle: "8 सरल प्रश्नों के उत्तर देकर अपना डिजिटल स्कोर जानें और व्यक्तिगत शिक्षण सहायता प्राप्त करें।",
      selfCheckPrivacyNote: "पूर्णतः गोपनीय: कोई भी नाम, मोबाइल नंबर या पासवर्ड नहीं लिया जाता।",
      retakeNotice: "क्या आपके पास पूर्व परीक्षण का कोड है? अपनी प्रगति जांचने के लिए यहाँ दर्ज करें:",
      startTestBtn: "स्व-मूल्यांकन शुरू करें",

      // Training
      trainingTitle: "सामुदायिक प्रशिक्षण एवं संसाधन केंद्र",
      trainingSubtitle: "स्मार्टफोन होने और उसका सुरक्षित व सक्षम उपयोग करने के बीच के अंतर को समाप्त करना।",
      deskTitle: "सहायता प्राप्त ई-सेवा केंद्र (Assisted Desk)",
      deskLocation: "थीम कॉलेज परिसर, बोईसर (पश्चिम) — टेक लैब कमरा सं. 204",
      deskHours: "सोमवार से शुक्रवार: सुबह 10:00 से शाम 4:00 | शनिवार: सुबह 10:00 से दोपहर 1:00",
      deskServices: "उपलब्ध सेवाएं: ऑनलाइन सरकारी फॉर्म (आपले सरकार, आधार, डिजिलॉकर), दस्तावेज स्कैनिंग और छात्र मेंटर मार्गदर्शन।",
      downloadGuidesTitle: "सरल बहुभाषी मार्गदर्शिकाएं",

      // Footer
      footerText: "डिजिटल साक्षरता बोईसर मंच — डेटा साइंस आधारित सामुदायिक सहभागिता परियोजना। थीम कॉलेज ऑफ आर्ट्स, कॉमर्स एंड साइंस, बोईसर।",
      footerTeam: "प्रोजेक्ट टीम: रोहित कुमार प्रसाद (रोल नं. 17) · सन्नी सिंह (रोल नं. 25) | मार्गदर्शक: प्रो. सर्वेश के. कासार"
    },

    mr: {
      siteTitle: "डिजिटल साक्षरता बोईसर",
      siteSubtitle: "सामुदायिक डेटा व अंतर्दृष्टी मंच — पालघर जिल्हा",
      collegeTag: "थीम कॉलेज ऑफ आर्ट्स, कॉमर्स अँड सायन्स · माहिती तंत्रज्ञान विभाग",
      disclaimerBanner: "शैक्षणिक प्रकल्प सूचना: सध्याचे आकडे बोईसर, पालघर जिल्ह्यातील ६० उत्तरदात्यांच्या संशोधन डेटासेटवर आधारित आहेत. केवळ शैक्षणिक व पुनरावलोकनासाठी.",
      
      // Nav
      navHome: "मुख्यपृष्ठ",
      navInsights: "डॅशबोर्ड व आकडेवारी",
      navSelfCheck: "डिजिटल सेल्फ-चेक",
      navTraining: "प्रशिक्षण व साधने",
      navAbout: "अभ्यासाबद्दल",
      navAdmin: "मार्गदर्शक कन्सोल",

      // Hero
      heroTag: "सामुदायिक सहभाग आणि डेटा सायन्स उपक्रम",
      heroTitle: "बोईसरमधील डिजिटल दरी कमी करणे",
      heroDesc: "बोईसरमधील औद्योगिक (MIDC) व रहिवासी भागातील डिजिटल साक्षरतेचे मोजमाप करणारा, कौशल्य त्रुटी शोधणारा आणि प्रत्यक्ष प्रशिक्षण देणारा डेटा-आधारित मंच.",
      ctaSelfCheck: "डिजिटल सेल्फ-चेक सुरू करा",
      ctaInsights: "अभ्यासाची आकडेवारी पहा",
      ctaTraining: "७-सत्रांचे प्रशिक्षण वेळापत्रक",

      // Stat Cards
      statMeanScore: "सरासरी साक्षरता गुण",
      statMeanDesc: "६० सहभागींमध्ये १०० पैकी सरासरी गुण",
      statCorrelation: "सहसंबंध (r ≈ ०.७३)",
      statCorrelationDesc: "साक्षरता आणि दैनंदिन जीवनातील फायद्यामधील थेट संबंध",
      statAccess: "स्मार्टफोन उपलब्धता",
      statAccessDesc: "घरांमध्ये स्मार्टफोनचा उच्च वापर (९३.३%)",
      statBarrier: "प्रमुख सामाजिक अडचण",
      statBarrierDesc: "ऑनलाइन फसवणूक आणि खोट्या मेसेजची भीती (४८.३%)",

      // Pillars
      pillar1Title: "१. सार्वजनिक अंतर्दृष्टी व ७ तक्ते",
      pillar1Desc: "डिजिटल वापर, कौशल्य त्रुटी (ईमेल ४५%, शासकीय सेवा ५१.७%), गुणांचे वितरण आणि मुख्य अडचणींचे संवादी आलेख.",
      pillar2Title: "२. मोबाईल-अनुकूल सेल्फ-चेक",
      pillar2Desc: "३ मिनिटांची कार्य-आधारित प्रश्नावली जी त्वरित गुण (०-१००) देते आणि तुमच्या गरजेनुसार योग्य मार्गदर्शन करते.",
      pillar3Title: "३. प्रशिक्षण आणि मदत केंद्र",
      pillar3Desc: "थीम कॉलेजमध्ये ७-सत्रांच्या प्रत्यक्ष कार्यशाळा, बहुभाषिक सुरक्षा पुस्तिका आणि वैयक्तिक ई-सेवा मदत कक्ष.",

      // Insights Page
      insightsTitle: "सामुदायिक डेटा व विश्लेषण डॅशबोर्ड",
      insightsSubtitle: "संशोधन अभ्यासातील ७ मुख्य निष्कर्ष संवादी फिल्टरसह तपासा.",
      filterCategory: "वर्गवारीनुसार फिल्टर करा:",
      filterAge: "वयोगटानुसार फिल्टर करा:",
      allCategories: "सर्व वर्ग (n=६०)",
      studentsOnly: "विद्यार्थी (n=२०)",
      workersOnly: "कामगार व कर्मचारी (MIDC) (n=२०)",
      homemakersOnly: "गृहिणी व पालक (n=२०)",
      allAges: "सर्व वयोगट",

      // Self Check
      selfCheckTitle: "डिजिटल साक्षरता स्व-तपासणी",
      selfCheckSubtitle: "८ सोप्या प्रश्नांची उत्तरे देऊन आपले डिजिटल गुण जाणून घ्या आणि सानुकूल शिक्षण योजना मिळवा.",
      selfCheckPrivacyNote: "पूर्णपणे निनावी: नाव, फोन नंबर किंवा पासवर्ड कधीही मागितला जात नाही.",
      retakeNotice: "मागील तपासणीचा कोड आहे का? आपली प्रगती तपासण्यासाठी येथे टाका:",
      startTestBtn: "स्व-तपासणी सुरू करा",

      // Training
      trainingTitle: "सामुदायिक प्रशिक्षण व साधन केंद्र",
      trainingSubtitle: "स्मार्टफोन असणे आणि त्याचा सुरक्षित व प्रभावी वापर करणे यातील अंतर मिटवणे.",
      deskTitle: "सहाय्यक ई-सेवा मदत कक्ष (Assisted Desk)",
      deskLocation: "थीम कॉलेज कॅम्पस, बोईसर (पश्चिम) — टेक लॅब खोली क्र. २०४",
      deskHours: "सोमवार ते शुक्रवार: सकाळी १०:०० ते दुपारी ४:०० | शनिवार: सकाळी १०:०० ते दुपारी १:००",
      deskServices: "सेवा: शासकीय ऑनलाइन फॉर्म (आपले सरकार, आधार, डिजीलॉकर), कागदपत्र स्कॅनिंग आणि विद्यार्थी मार्गदर्शकांची मदत.",
      downloadGuidesTitle: "सुलभ बहुभाषिक माहितीपुस्तिका",

      // Footer
      footerText: "डिजिटल साक्षरता बोईसर मंच — डेटा सायन्स आधारित समुदाय सहभाग प्रकल्प. थीम कॉलेज ऑफ आर्ट्स, कॉमर्स अँड सायन्स, बोईसर.",
      footerTeam: "प्रकल्प टीम: रोहित कुमार प्रसाद (रोल क्र. १७) · सनी सिंग (रोल क्र. २५) | मार्गदर्शक: प्रा. सर्वेश के. कासार"
    }
  },

  init() {
    this.applyLanguage(this.currentLang);
    this.setupListeners();
  },

  t(key) {
    const dict = this.translations[this.currentLang] || this.translations.en;
    return dict[key] || this.translations.en[key] || key;
  },

  setLanguage(lang) {
    if (this.translations[lang]) {
      this.currentLang = lang;
      localStorage.setItem("dlb_lang", lang);
      this.applyLanguage(lang);
      // Trigger charts update if chart texts need refresh
      if (window.renderAllCharts) {
        window.renderAllCharts();
      }
    }
  },

  applyLanguage(lang) {
    const dict = this.translations[lang] || this.translations.en;
    document.documentElement.lang = lang;

    // Elements with data-i18n
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      if (dict[key]) {
        el.textContent = dict[key];
      }
    });

    // Elements with data-i18n-html
    document.querySelectorAll("[data-i18n-html]").forEach(el => {
      const key = el.getAttribute("data-i18n-html");
      if (dict[key]) {
        el.innerHTML = dict[key];
      }
    });

    // Select language picker value
    const picker = document.getElementById("lang-select");
    if (picker) {
      picker.value = lang;
    }
  },

  setupListeners() {
    const picker = document.getElementById("lang-select");
    if (picker) {
      picker.addEventListener("change", (e) => {
        this.setLanguage(e.target.value);
      });
    }
  }
};

window.I18N = I18N;
