/**
 * Digital Literacy Boisar — Digital Self-Check Engine
 * Implements mobile-first, step-by-step task questionnaire (Appendix A/C),
 * scoring logic (FR-9), weakest-dimension recommendations (FR-10),
 * anonymous re-measurement tracking (FR-11), and zero-PII privacy (FR-12).
 */

const SelfCheckEngine = {
  currentStep: 0,
  answers: {},
  previousScore: null,
  anonymousId: null,

  questions: [
    {
      id: "age_group",
      titleEn: "What is your age group?",
      titleHi: "आपकी आयु सीमा क्या है?",
      titleMr: "आपला वयोगट कोणता आहे?",
      type: "radio",
      options: [
        { value: "15-20", labelEn: "15 – 20 Years (Youth / Student)", labelHi: "15 – 20 वर्ष (युवा / विद्यार्थी)", labelMr: "१५ – २० वर्षे (तरुण / विद्यार्थी)" },
        { value: "21-30", labelEn: "21 – 30 Years (Young Adult)", labelHi: "21 – 30 वर्ष (युवा वयस्क)", labelMr: "२१ – ३० वर्षे (तरुण)" },
        { value: "31-40", labelEn: "31 – 40 Years", labelHi: "31 – 40 वर्ष", labelMr: "३१ – ४० वर्षे" },
        { value: "41-50", labelEn: "41 – 50 Years", labelHi: "41 – 50 वर्ष", labelMr: "४१ – ५० वर्षे" },
        { value: "51+", labelEn: "51+ Years (Senior / Elder)", labelHi: "51+ वर्ष (वरिष्ठ)", labelMr: "५१+ वर्षे (ज्येष्ठ)" }
      ]
    },
    {
      id: "respondent_category",
      titleEn: "Which profile best describes your daily routine?",
      titleHi: "आपकी दैनिक दिनचर्या का सबसे सटीक विवरण क्या है?",
      titleMr: "आपल्या दैनंदिन दिनक्रमाचे सर्वात योग्य वर्णन कोणते?",
      type: "radio",
      options: [
        { value: "student", labelEn: "Student (School, College, Degree, IT)", labelHi: "विद्यार्थी (स्कूल, कॉलेज, डिग्री)", labelMr: "विद्यार्थी (शाळा, महाविद्यालय, पदवी)" },
        { value: "working_adult", labelEn: "Working Adult (Factory/MIDC, Office, Shop, Self-employed)", labelHi: "कामकाजी / श्रमिक (MIDC कारखाना, दुकान, स्वरोजगार)", labelMr: "कामगार / कर्मचारी (MIDC कारखाना, दुकान, स्वयंरोजगार)" },
        { value: "homemaker_parent", labelEn: "Homemaker / Parent managing the home", labelHi: "गृहिणी / अभिभावक (घर संभालने वाले)", labelMr: "गृहिणी / पालक (घर सांभाळणारे)" }
      ]
    },
    {
      id: "access_dimension",
      titleEn: "Do you have regular smartphone and internet access at home?",
      titleHi: "क्या आपके घर पर स्मार्टफोन और नियमित इंटरनेट उपलब्ध है?",
      titleMr: "आपल्या घरी स्मार्टफोन आणि नियमित इंटरनेट उपलब्ध आहे का?",
      type: "radio",
      options: [
        { value: "full", points: 15, labelEn: "Yes, I have my own smartphone with daily internet", labelHi: "हाँ, मेरा अपना स्मार्टफोन है और दैनिक इंटरनेट है", labelMr: "होय, माझा स्वतःचा स्मार्टफोन आणि दररोज इंटरनेट आहे" },
        { value: "shared", points: 10, labelEn: "I share a family member's phone when needed", labelHi: "मैं परिवार के किसी सदस्य का फोन जरूरत पड़ने पर इस्तेमाल करता हूँ", labelMr: "मी गरजेनुसार कुटुंबातील सदस्याचा फोन वापरतो" },
        { value: "limited", points: 4, labelEn: "Very limited access / only simple keypad phone", labelHi: "बहुत सीमित पहुंच / केवल साधारण कीपैड फोन", labelMr: "अतिशय मर्यादित वापर / फक्त साधा कीपॅड फोन" }
      ]
    },
    {
      id: "smartphone_skill",
      titleEn: "Can you independently manage your smartphone settings and storage?",
      titleHi: "क्या आप अपने फोन की सेटिंग्स, ऐप डाउनलोड और स्टोरेज स्वयं संभाल सकते हैं?",
      titleMr: "तुम्ही फोनच्या सेटिंग्स, ॲप डाउनलोड आणि मेमरी स्वतः हाताळू शकता का?",
      type: "radio",
      options: [
        { value: "yes", points: 14, labelEn: "Yes, I can install apps, adjust language/font size, and clear junk files", labelHi: "हाँ, मैं ऐप डाउनलोड कर सकता हूँ और स्टोरेज खाली कर सकता हूँ", labelMr: "होय, मी ॲप डाउनलोड करू शकतो आणि मेमरी साफ करू शकतो" },
        { value: "help", points: 7, labelEn: "I can do simple tasks but need family help when phone is full", labelHi: "सरल काम कर लेता हूँ, लेकिन फोन भरने पर मदद चाहिए", labelMr: "साधी कामे जमतात, पण फोन भरल्यावर मदतीची गरज लागते" },
        { value: "no", points: 0, labelEn: "No, someone else configures my phone for me", labelHi: "नहीं, कोई दूसरा ही मेरे लिए सेटिंग्स करता है", labelMr: "नाही, इतर कोणीतरी माझ्यासाठी फोन सेट करतो" }
      ]
    },
    {
      id: "search_skill",
      titleEn: "Can you search for local Boisar updates (bus/train timings) and verify if news is true?",
      titleHi: "क्या आप इंटरनेट पर जानकारी (बस/ट्रेन समय) खोजकर सही-गलत की जांच कर सकते हैं?",
      titleMr: "तुम्ही स्थानिक माहिती (बस/लोकल वेळापत्रक) शोधून ती खरी आहे की नाही हे तपासू शकता का?",
      type: "radio",
      options: [
        { value: "yes", points: 14, labelEn: "Yes, I use search/voice and check if WhatsApp forwards are authentic", labelHi: "हाँ, मैं सर्च करता हूँ और फॉरवर्ड संदेशों की पुष्टि करता हूँ", labelMr: "होय, मी शोध घेतो आणि फॉरवर्ड मेसेज खरे आहेत का ते पडताळतो" },
        { value: "search_only", points: 8, labelEn: "I can search, but I find it hard to know if news is real or fake", labelHi: "सर्च कर लेता हूँ, पर खबर असली है या नकली समझना कठिन है", labelMr: "शोध घेता येतो, पण बातमी खरी आहे की खोटी ते ओळखणे कठीण वाटते" },
        { value: "no", points: 0, labelEn: "No, I rarely use internet search", labelHi: "नहीं, मैं शायद ही कभी सर्च का उपयोग करता हूँ", labelMr: "नाही, मी इंटरनेटवर क्वचितच शोध घेतो" }
      ]
    },
    {
      id: "email_skill",
      titleEn: "Can you write an email and attach a document (PDF, photo, or resume)?",
      titleHi: "क्या आप ईमेल लिखकर कोई दस्तावेज या फोटो अटैच करके भेज सकते हैं?",
      titleMr: "तुम्ही ईमेल लिहून कागदपत्र किंवा फोटो जोडून (Attach) पाठवू शकता का?",
      type: "radio",
      options: [
        { value: "yes", points: 14, labelEn: "Yes, I comfortably compose emails and attach files independently", labelHi: "हाँ, मैं आसानी से ईमेल लिख सकता हूँ और फाइल अटैच कर सकता हूँ", labelMr: "होय, मी सहजरीत्या ईमेल लिहू शकतो आणि फाइल जोडू शकतो" },
        { value: "read_only", points: 6, labelEn: "I can open and read emails, but attaching files is confusing", labelHi: "ईमेल पढ़ लेता हूँ, लेकिन फाइल अटैच करना कठिन लगता है", labelMr: "ईमेल वाचता येतो, पण फाइल जोडणे अवघड वाटते" },
        { value: "no", points: 0, labelEn: "No, I have never sent an email with attachment", labelHi: "नहीं, मैंने कभी ईमेल अटैचमेंट नहीं भेजी", labelMr: "नाही, मी कधीही ईमेलवरून फाइल पाठवली नाही" }
      ]
    },
    {
      id: "payment_skill",
      titleEn: "When paying via UPI (Google Pay, PhonePe, Paytm), do you know when to enter your PIN?",
      titleHi: "UPI भुगतान करते समय क्या आपको पता है कि गुप्त PIN कब दर्ज करना चाहिए?",
      titleMr: "UPI पेमेंट करताना गुप्त PIN कधी टाकायचा हे आपल्याला ठाऊक आहे का?",
      type: "radio",
      options: [
        { value: "yes", points: 15, labelEn: "Yes: UPI PIN is ONLY entered to SEND money, never to RECEIVE money", labelHi: "हाँ: UPI PIN केवल पैसे भेजने पर दर्ज होता है, प्राप्त करने पर कभी नहीं", labelMr: "होय: UPI PIN फक्त पैसे पाठवताना टाकावा लागतो, पैसे स्वीकारताना कधीच नाही" },
        { value: "unsure", points: 6, labelEn: "I scan QR codes, but get confused if a buyer asks me to enter PIN to get cash", labelHi: "QR स्कैन करता हूँ, पर कोई पैसे देने के लिए PIN मांगे तो संशय होता है", labelMr: "QR स्कॅन करतो, पण कोणी पैसे देण्यासाठी PIN मागितल्यास गोंधळ होतो" },
        { value: "no", points: 0, labelEn: "I do not use UPI because of fear of online fraud", labelHi: "धोखाधड़ी के डर से मैं UPI का उपयोग नहीं करता", labelMr: "फसवणुकीच्या भीतीमुळे मी UPI वापरत नाही" }
      ]
    },
    {
      id: "egov_skill",
      titleEn: "Have you accessed government portals online (Aaple Sarkar, DigiLocker, Ration, Aadhaar)?",
      titleHi: "क्या आपने ऑनलाइन सरकारी सेवाओं (आपले सरकार, डिजिलॉकर, आधार आदि) का उपयोग किया है?",
      titleMr: "तुम्ही ऑनलाइन शासकीय सेवा (आपले सरकार, डिजीलॉकर, रेशन, आधार) वापरल्या आहेत का?",
      type: "radio",
      options: [
        { value: "yes", points: 14, labelEn: "Yes, I have applied for certificates or downloaded documents online", labelHi: "हाँ, मैंने प्रमाणपत्र के लिए आवेदन किया है या ऑनलाइन दस्तावेज निकाले हैं", labelMr: "होय, मी दाखल्यांसाठी अर्ज केला आहे किंवा कागदपत्रे डाउनलोड केली आहेत" },
        { value: "helped", points: 7, labelEn: "I needed to go to a cyber café or ask an agent to do it for me", labelHi: "मुझे साइबर कैफे या किसी एजेंट से करवाना पड़ा", labelMr: "मला सायबर कॅफे किंवा एजंटकडून करून घ्यावे लागले" },
        { value: "no", points: 0, labelEn: "No, online government forms are too complicated / confusing", labelHi: "नहीं, ऑनलाइन सरकारी फॉर्म बहुत जटिल लगते हैं", labelMr: "नाही, ऑनलाइन शासकीय अर्ज खूप किचकट वाटतात" }
      ]
    },
    {
      id: "cyber_safety",
      titleEn: "You receive an SMS: 'Your power bill is pending, electricity will be disconnected tonight. Call this number or download this APK'. What do you do?",
      titleHi: "आपको SMS मिला: 'बिजली बिल बाकी है, आज रात कनेक्शन कटेगा। इस नंबर पर कॉल करें या ऐप डाउनलोड करें।' आप क्या करेंगे?",
      titleMr: "तुम्हाला SMS आला: 'तुमचे वीज बिल बाकी आहे, आज रात्री वीज पुरवठा खंडित होईल. या नंबरवर कॉल करा किंवा ॲप डाउनलोड करा.' तुम्ही काय कराल?",
      type: "radio",
      options: [
        { value: "safe", points: 14, labelEn: "Delete & ignore. Verify only on official Mahavitaran/MSEDCL bill or counter. Never download unknown APK.", labelHi: "हटा दें। केवल आधिकारिक महावितरण बिल/कार्यालय से जांचें। कभी अनजान ऐप न डालें।", labelMr: "डिलीट करा. केवळ अधिकृत महावितरण कार्यालय/ॲपवर पडताळा. अनोळखी ॲप कधीही डाऊनलोड करू नका." },
        { value: "call", points: 4, labelEn: "Call the phone number in the SMS to ask if it is genuine", labelHi: "SMS में दिए नंबर पर कॉल करके पूछूंगा कि क्या यह सच है", labelMr: "मेसेजमधील नंबरवर फोन करून विचारणा करेन की हे खरे आहे का" },
        { value: "panic", points: 0, labelEn: "Panick and download the link immediately to prevent disconnection", labelHi: "घबराकर तुरंत लिंक डाउनलोड करूँगा ताकि लाइट न कटे", labelMr: "घाबरून लगेच लिंक डाउनलोड करेन जेणेकरून वीज खंडित होऊ नये" }
      ]
    },
    {
      id: "digital_impact",
      titleEn: "How much do digital services help your education, job, payments, or household?",
      titleHi: "डिजिटल सेवाएं आपकी पढ़ाई, नौकरी, दुकान या घर के खर्चों में कितनी मददगार हैं?",
      titleMr: "डिजिटल सेवा आपल्या शिक्षणात, नोकरीत, पेमेंटमध्ये किंवा दैनंदिन जीवनात किती उपयुक्त ठरतात?",
      type: "radio",
      options: [
        { value: "5", points: 0, labelEn: "5 – Extremely High Impact (saves significant time and money)", labelHi: "5 – अत्यधिक उपयोगी (बहुत समय और पैसे की बचत)", labelMr: "५ – अत्यंत उपयुक्त (वेळ आणि पैशांची मोठी बचत)" },
        { value: "4", points: 0, labelEn: "4 – Substantial Impact (regular weekly benefit)", labelHi: "4 – काफी उपयोगी (साप्ताहिक लाभ मिलता है)", labelMr: "४ – मोठा फायदा (नियमित उपयोग)" },
        { value: "3", points: 0, labelEn: "3 – Moderate Impact (mostly WhatsApp/entertainment)", labelHi: "3 – मध्यम (मुख्यतः मैसेज और वीडियो हेतु)", labelMr: "३ – मध्यम (मुख्यतः मेसेज आणि करमणूक)" },
        { value: "2", points: 0, labelEn: "2 – Low Impact (still prefer cash and physical visits)", labelHi: "2 – कम (अभी भी नकद और प्रत्यक्ष जाना पसंद है)", labelMr: "२ – कमी (अजूनही रोख रक्कम आणि प्रत्यक्ष जाणे पसंत)" },
        { value: "1", points: 0, labelEn: "1 – No Real Impact / Causes anxiety", labelHi: "1 – कोई लाभ नहीं / चिंता होती है", labelMr: "१ – काहीही फायदा नाही / भीती वाटते" }
      ]
    }
  ],

  start() {
    this.currentStep = 0;
    this.answers = {};
    const inputCode = document.getElementById("retake-code-input");
    if (inputCode && inputCode.value.trim()) {
      this.anonymousId = inputCode.value.trim().toUpperCase();
      this.previousScore = localStorage.getItem(`dlb_score_${this.anonymousId}`);
    } else {
      this.anonymousId = `DLB-${Math.floor(1000 + Math.random() * 9000)}`;
      this.previousScore = null;
    }

    document.getElementById("self-check-intro").classList.add("hidden");
    document.getElementById("self-check-results").classList.add("hidden");
    document.getElementById("self-check-quiz").classList.remove("hidden");
    this.renderStep();
  },

  renderStep() {
    const q = this.questions[this.currentStep];
    const total = this.questions.length;
    const lang = window.I18N ? window.I18N.currentLang : "en";

    // Update Progress
    const progressPct = Math.round(((this.currentStep + 1) / total) * 100);
    document.getElementById("quiz-progress-bar").style.width = `${progressPct}%`;
    document.getElementById("quiz-step-count").textContent = `Question ${this.currentStep + 1} of ${total}`;

    // Titles
    const title = lang === "hi" ? q.titleHi : (lang === "mr" ? q.titleMr : q.titleEn);
    document.getElementById("quiz-question-title").textContent = title;

    // Render options
    const container = document.getElementById("quiz-options-container");
    container.innerHTML = "";

    q.options.forEach((opt, index) => {
      const labelText = lang === "hi" ? opt.labelHi : (lang === "mr" ? opt.labelMr : opt.labelEn);
      const isChecked = this.answers[q.id] === opt.value;

      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = `option-card ${isChecked ? 'selected' : ''}`;
      btn.innerHTML = `
        <div class="option-radio-dot"></div>
        <div class="option-text">${labelText}</div>
      `;

      btn.onclick = () => {
        this.selectOption(q.id, opt.value, opt.points || 0);
      };

      container.appendChild(btn);
    });

    // Back button visibility
    const prevBtn = document.getElementById("quiz-prev-btn");
    if (this.currentStep === 0) {
      prevBtn.classList.add("hidden");
    } else {
      prevBtn.classList.remove("hidden");
    }

    // Next button state
    const nextBtn = document.getElementById("quiz-next-btn");
    nextBtn.disabled = !this.answers[q.id];
    nextBtn.textContent = (this.currentStep === total - 1) ? (lang === "hi" ? "स्कोर देखें" : (lang === "mr" ? "निकाल पहा" : "Compute My Score")) : (lang === "hi" ? "अगला प्रश्न →" : (lang === "mr" ? "पुढील प्रश्न →" : "Next Question →"));
  },

  selectOption(qId, val, pts) {
    this.answers[qId] = val;
    this.answers[`${qId}_pts`] = pts;
    this.renderStep();
  },

  nextStep() {
    if (!this.answers[this.questions[this.currentStep].id]) {
      alert("Please select an option to proceed.");
      return;
    }

    if (this.currentStep < this.questions.length - 1) {
      this.currentStep++;
      this.renderStep();
    } else {
      this.calculateResults();
    }
  },

  prevStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
      this.renderStep();
    }
  },

  calculateResults() {
    // Score calculation
    let totalScore = 0;
    totalScore += (this.answers["access_dimension_pts"] || 0);
    totalScore += (this.answers["smartphone_skill_pts"] || 0);
    totalScore += (this.answers["search_skill_pts"] || 0);
    totalScore += (this.answers["email_skill_pts"] || 0);
    totalScore += (this.answers["payment_skill_pts"] || 0);
    totalScore += (this.answers["egov_skill_pts"] || 0);
    totalScore += (this.answers["cyber_safety_pts"] || 0);

    // Normalize up to 100
    totalScore = Math.min(100, Math.max(0, Math.round(totalScore)));

    // Categorization
    let category = "Emerging";
    let categoryColor = "#e76f51";
    let categoryDescEn = "Emerging (0–49): Beginning digital journey. High reliance on others for forms and emails. Focus on basic settings and safety.";
    let categoryDescHi = "उभरती साक्षरता (0–49): शुरुआती स्तर। दूसरों पर निर्भरता अधिक। स्मार्टफोन सेटिंग्स और धोखाधड़ी से बचाव सीखें।";
    let categoryDescMr = "विकसनशील (०–४९): प्राथमिक टप्पा. इतरांवर अवलंबित्व अधिक. फोन सेटिंग्स आणि सुरक्षा नियमांवर लक्ष द्या.";

    if (totalScore >= 85) {
      category = "Strong";
      categoryColor = "#2a9d8f";
      categoryDescEn = "Strong (85–100): Confident independent user! You can mentor peers and navigate e-services with ease.";
      categoryDescHi = "प्रगत (85–100): अत्यधिक सक्षम व आत्मविश्वासी उपयोगकर्ता! आप दूसरों को भी मार्गदर्शन दे सकते हैं।";
      categoryDescMr = "सक्षम / प्रगत (८५–१००): अत्यंत आत्मविश्वासी वापरकर्ता! तुम्ही इतरांनाही मार्गदर्शन करू शकता.";
    } else if (totalScore >= 70) {
      category = "Functional";
      categoryColor = "#1d6fa5";
      categoryDescEn = "Functional (70–84): Comfortable with daily tasks, UPI, and search. Ready to master advanced e-governance and document handling.";
      categoryDescHi = "कार्यक्षम (70–84): दैनिक कार्य व UPI में सहज। सरकारी सेवाओं और ईमेल अटैचमेंट में प्रवीणता लाएं।";
      categoryDescMr = "कार्यक्षम (७०–८४): दैनंदिन कामे व UPI सहज वापरता येते. आता शासकीय सेवा व अधिकृत अर्जांवर प्रभुत्व मिळवा.";
    } else if (totalScore >= 50) {
      category = "Basic";
      categoryColor = "#f4a261";
      categoryDescEn = "Basic (50–69): Uses apps for messaging and payments, but struggles with email attachments, forms, or verifying links.";
      categoryDescHi = "मूलभूत (50–69): व्हाट्सएप व भुगतान में उपयोग, पर ईमेल अटैचमेंट व सरकारी फॉर्म में कठिनाई।";
      categoryDescMr = "मूलभूत (५०–६९): मेसेज व पेमेंट्स करता येतात, पण ईमेल फाइल जोडणे व ऑनलाइन फॉर्म भरताना अडचणी येतात.";
    }

    // Determine Weakest Skill for Tailored Guidance
    const skills = [
      { name: "Email with Attachment", pts: this.answers["email_skill_pts"] || 0, guide: "G-EMAIL", workshop: "Session 3: Practical Email & Document Attachment" },
      { name: "Government e-Services", pts: this.answers["egov_skill_pts"] || 0, guide: "G-EGOV", workshop: "Session 5: Accessing Government Services & DigiLocker" },
      { name: "Cyber-Safety Awareness", pts: this.answers["cyber_safety_pts"] || 0, guide: "G-CYBER", workshop: "Session 6: Cyber-Safety Clinic & Scam Defense" },
      { name: "Safe UPI Payments", pts: this.answers["payment_skill_pts"] || 0, guide: "G-UPI", workshop: "Session 4: Safe UPI & Mobile Banking Best Practices" },
      { name: "Smartphone Settings", pts: this.answers["smartphone_skill_pts"] || 0, guide: "G-SMART", workshop: "Session 1: Smartphone Essentials & Settings" }
    ];

    skills.sort((a, b) => a.pts - b.pts);
    const weakest = skills[0];

    // Store in LocalStorage
    localStorage.setItem(`dlb_score_${this.anonymousId}`, totalScore);
    localStorage.setItem("dlb_latest_id", this.anonymousId);

    // Save anonymously to study dataset (FR-12)
    if (window.BOISAR_STUDY_DATA) {
      const record = {
        respondent_id: this.anonymousId,
        age_group: this.answers["age_group"] || "21-30",
        respondent_category: this.answers["respondent_category"] || "working_adult",
        smartphone_access: this.answers["access_dimension"] === "full" || this.answers["access_dimension"] === "shared",
        internet_frequency: "Daily",
        uses_phone_independently: this.answers["access_dimension"] === "full",
        used_upi: (this.answers["payment_skill_pts"] || 0) > 0,
        used_egov: (this.answers["egov_skill_pts"] || 0) > 0,
        used_educational: true,
        smartphone_skill: (this.answers["smartphone_skill_pts"] || 0) >= 10,
        search_skill: (this.answers["search_skill_pts"] || 0) >= 10,
        email_skill: (this.answers["email_skill_pts"] || 0) >= 10,
        payment_skill: (this.answers["payment_skill_pts"] || 0) >= 10,
        egov_skill: (this.answers["egov_skill_pts"] || 0) >= 10,
        cyber_safety: (this.answers["cyber_safety_pts"] || 0) >= 10,
        digital_literacy_score: totalScore,
        digital_impact_index: parseFloat(this.answers["digital_impact"] || "3.5"),
        primary_barrier: (this.answers["cyber_safety_pts"] || 0) < 10 ? "Fear of fraud / scams" : "Need help with online forms",
        submitted_at: new Date().toISOString()
      };
      window.BOISAR_STUDY_DATA.addRespondent(record);
    }

    // Display Results Screen
    document.getElementById("self-check-quiz").classList.add("hidden");
    document.getElementById("self-check-results").classList.remove("hidden");

    document.getElementById("res-score-number").textContent = totalScore;
    document.getElementById("res-category-badge").textContent = category;
    document.getElementById("res-category-badge").style.backgroundColor = categoryColor;

    const lang = window.I18N ? window.I18N.currentLang : "en";
    const descText = lang === "hi" ? categoryDescHi : (lang === "mr" ? categoryDescMr : categoryDescEn);
    document.getElementById("res-category-desc").textContent = descText;

    // Show Respondent ID
    document.getElementById("res-respondent-id").textContent = this.anonymousId;

    // Show Re-measurement comparison if available
    const retakeBanner = document.getElementById("res-comparison-banner");
    if (this.previousScore !== null) {
      retakeBanner.classList.remove("hidden");
      const diff = totalScore - parseInt(this.previousScore, 10);
      const diffSign = diff >= 0 ? `+${diff}` : `${diff}`;
      document.getElementById("res-previous-score-text").textContent = `Previous Score: ${this.previousScore} / 100 | Current: ${totalScore} / 100 (${diffSign} Points)`;
    } else {
      retakeBanner.classList.add("hidden");
    }

    // Weakest Area Recommendation (FR-10)
    document.getElementById("res-weakest-title").textContent = `Priority Focus: ${weakest.name}`;
    document.getElementById("res-recommended-workshop").textContent = weakest.workshop;

    // Refresh charts if on insights
    if (window.renderAllCharts) {
      window.renderAllCharts();
    }
  },

  reset() {
    this.currentStep = 0;
    this.answers = {};
    document.getElementById("self-check-quiz").classList.add("hidden");
    document.getElementById("self-check-results").classList.add("hidden");
    document.getElementById("self-check-intro").classList.remove("hidden");
  }
};

window.SelfCheckEngine = SelfCheckEngine;
