/**
 * Digital Literacy Boisar — Project Dataset & Analytics Store
 * Prepared for: Theem College of Arts, Commerce & Science — Dept. of Information Technology
 * Project Team: Rohit Kumar Prasad (Roll No. 17) · Sunny Singh (Roll No. 25)
 * Mentor: Prof. Sarvesh K Kasar
 *
 * This file contains the 60-respondent illustrative academic dataset mirroring the PRD figures A1-A7,
 * along with baseline statistics, the 7-session training plan, and helper methods.
 */

const BOISAR_STUDY_DATA = {
  metadata: {
    title: "Digital Literacy Impact Assessment Using Data Science: A Study of Boisar, Palghar District",
    institution: "Theem College of Arts, Commerce & Science — Dept. of Information Technology",
    sampleSize: 60,
    meanLiteracyScore: 67.3,
    correlationR: 0.73,
    topBarrier: "Fear of fraud / scams (48.3%)",
    smartphoneAccessRate: 93.3,
    academicYear: "2026-2027",
    disclaimer: "Current dashboard figures are derived from an illustrative academic dataset (n=60) collected for research purposes at Theem College of Arts, Commerce & Science, Boisar."
  },

  // 7-Session Training Plan (from Appendix F)
  trainingPlan: [
    {
      id: "S01",
      sessionNumber: 1,
      title: "Smartphone Essentials & Operating Settings",
      titleHi: "स्मार्टफोन मूल बातें और आवश्यक सेटिंग्स",
      titleMr: "स्मार्टफोन मूलभूत गोष्टी आणि आवश्यक सेटिंग्स",
      duration: "2 Hours",
      targetAudience: "Homemakers & Beginners",
      date: "2026-10-03",
      time: "10:30 AM - 12:30 PM",
      location: "Tech Lab 2, Theem College Campus, Boisar",
      instructor: "Sunny Singh (Roll No. 25) & Student Mentors",
      description: "App permissions, notifications, storage cleanup, text size adjustment, and Marathi/Hindi keyboard setup.",
      status: "Upcoming",
      seatsTotal: 25,
      seatsBooked: 14
    },
    {
      id: "S02",
      sessionNumber: 2,
      title: "Internet Search, Fact-Checking & Spotting Misinformation",
      titleHi: "इंटरनेट खोज, तथ्य-जांच और भ्रामक संदेशों की पहचान",
      titleMr: "इंटरनेट शोध, तथ्य-तपासणी आणि चुकीच्या माहितीची ओळख",
      duration: "2 Hours",
      targetAudience: "Students & General Public",
      date: "2026-10-10",
      time: "10:30 AM - 12:30 PM",
      location: "Seminar Hall, Theem College Campus, Boisar",
      instructor: "Rohit Kumar Prasad (Roll No. 17)",
      description: "Evaluating reliable sources, fact-checking WhatsApp forwards, reverse image lookup, and voice search.",
      status: "Upcoming",
      seatsTotal: 30,
      seatsBooked: 19
    },
    {
      id: "S03",
      sessionNumber: 3,
      title: "Practical Email & Document Attachment for Job/School",
      titleHi: "व्यावहारिक ईमेल और जॉब/स्कूल के लिए दस्तावेज़ संलग्न करना",
      titleMr: "व्यावहारिक ईमेल आणि नोकरी/शाळेसाठी कागदपत्रे जोडणे",
      duration: "2.5 Hours",
      targetAudience: "Factory Workers (MIDC) & Youth",
      date: "2026-10-17",
      time: "02:00 PM - 04:30 PM",
      location: "Computer Center 1, Theem College",
      instructor: "Prof. Sarvesh K Kasar & Student Mentors",
      description: "Creating professional email addresses, writing formal emails, attaching PDFs/images, and downloading salary slips or certificates.",
      status: "Upcoming",
      seatsTotal: 25,
      seatsBooked: 22
    },
    {
      id: "S04",
      sessionNumber: 4,
      title: "Safe UPI, QR Codes & Mobile Banking Best Practices",
      titleHi: "सुरक्षित UPI, क्यूआर कोड और मोबाइल बैंकिंग सावधानियां",
      titleMr: "सुरक्षित UPI, क्यूआर कोड आणि मोबाईल बँकिंग सराव",
      duration: "2 Hours",
      targetAudience: "All Residents & Small Vendors",
      date: "2026-10-24",
      time: "11:00 AM - 01:00 PM",
      location: "Auditorium, Theem College Campus",
      instructor: "Digital Literacy Student Council",
      description: "Understanding that UPI PIN is only for sending money, spotting fake QR codes, checking transaction records, and 1930 cyber fraud helpline reporting.",
      status: "Upcoming",
      seatsTotal: 35,
      seatsBooked: 28
    },
    {
      id: "S05",
      sessionNumber: 5,
      title: "Accessing Government e-Services (Aaple Sarkar & DigiLocker)",
      titleHi: "सरकारी ई-सेवाएं (आपले सरकार, डिजिलॉकर और आधार)",
      titleMr: "शासकीय ई-सेवा (आपले सरकार, डिजीलॉकर आणि आधार सेवा)",
      duration: "3 Hours",
      targetAudience: "Homemakers & Working Adults",
      date: "2026-10-31",
      time: "10:00 AM - 01:00 PM",
      location: "Tech Lab 3, Theem College Campus",
      instructor: "Assisted e-Desk Student Volunteers",
      description: "Hands-on guided walkthrough of Aaple Sarkar portal, issuing certificates, linking Aadhaar, and managing DigiLocker documents securely.",
      status: "Upcoming",
      seatsTotal: 30,
      seatsBooked: 18
    },
    {
      id: "S06",
      sessionNumber: 6,
      title: "Cyber-Safety Clinic & Scam Defense Workshop",
      titleHi: "साइबर सुरक्षा क्लिनिक और ऑनलाइन धोखाधड़ी से बचाव",
      titleMr: "सायबर सुरक्षा क्लिनिक आणि ऑनलाइन फसवणूक प्रतिबंध",
      duration: "2 Hours",
      targetAudience: "All Community Members",
      date: "2026-11-07",
      time: "11:00 AM - 01:00 PM",
      location: "Seminar Hall, Theem College",
      instructor: "Cyber Cell Representative & IT Dept Faculty",
      description: "Live breakdown of lottery scams, electricity bill fraud, impersonation calls, social media privacy controls, and two-factor authentication.",
      status: "Upcoming",
      seatsTotal: 40,
      seatsBooked: 31
    },
    {
      id: "S07",
      sessionNumber: 7,
      title: "Practical Review, Skill Verification & Re-Assessment Certification",
      titleHi: "व्यावहारिक समीक्षा, कौशल सत्यापन और पुनः मूल्यांकन प्रमाणपत्र",
      titleMr: "प्रात्यक्षिक आढावा, कौशल्य पडताळणी आणि पुनर्-मूल्यांकन प्रमाणपत्र",
      duration: "2.5 Hours",
      targetAudience: "Trained Participants",
      date: "2026-11-14",
      time: "10:30 AM - 01:00 PM",
      location: "Main Tech Center, Theem College",
      instructor: "Prof. Sarvesh K Kasar & Rohit Kumar Prasad",
      description: "Hands-on task challenge, retaking the Digital Self-Check to measure skill progression, and receiving the Digital Literacy Community Badge.",
      status: "Upcoming",
      seatsTotal: 35,
      seatsBooked: 15
    }
  ],

  // Downloadable & Printable Guides Metadata
  guides: [
    {
      id: "G-CYBER",
      title: "Cyber-Safety & Scam Avoidance Checklist",
      titleHi: "साइबर सुरक्षा और ऑनलाइन धोखाधड़ी से बचाव चेकलिस्ट",
      titleMr: "सायबर सुरक्षा आणि फसवणूक प्रतिबंध चेकलिस्ट",
      version: "v1.2 (Sept 2026)",
      pages: "4 Pages",
      filename: "cyber-safety-boisar-v1.2.pdf",
      languages: ["English", "हिंदी", "मराठी"],
      summary: "Concrete practical rules for spotting fake electricity bill SMS, phishing links, and understanding that OTPs must never be shared.",
      tags: ["High Priority", "Anti-Fraud", "Mobile Security"]
    },
    {
      id: "G-UPI",
      title: "Safe UPI & Mobile Payments Handbook",
      titleHi: "सुरक्षित UPI और मोबाइल भुगतान मार्गदर्शिका",
      titleMr: "सुरक्षित UPI आणि मोबाईल पेमेंट मार्गदर्शक",
      version: "v1.1 (Sept 2026)",
      pages: "3 Pages",
      filename: "safe-upi-payments-v1.1.pdf",
      languages: ["English", "हिंदी", "मराठी"],
      summary: "Rule #1: PIN is entered ONLY to SEND money. Verifying receiver names on PhonePe/GooglePay/Paytm and filing payment dispute tickets.",
      tags: ["Digital Payments", "MIDC Workers", "Daily Life"]
    },
    {
      id: "G-EGOV",
      title: "Aaple Sarkar & DigiLocker Step-by-Step Guide",
      titleHi: "आपले सरकार और डिजिलॉकर चरण-दर-चरण मार्गदर्शिका",
      titleMr: "आपले सरकार आणि डिजीलॉकर सविस्तर मार्गदर्शक",
      version: "v1.0 (Sept 2026)",
      pages: "5 Pages",
      filename: "aaple-sarkar-digilocker-v1.0.pdf",
      languages: ["English", "हिंदी", "मराठी"],
      summary: "Navigating Maharashtra state government services online, uploading passport photos under 50KB, and downloading verified marksheets.",
      tags: ["E-Governance", "Documents", "Forms"]
    }
  ],

  // 60-Respondent Illustrative Micro-Dataset mirroring the PRD distributions
  // Split: 20 Students, 20 Working Adults, 20 Homemakers/Parents
  generateSampleDataset() {
    const records = [];

    // Helper to push record
    let idCounter = 101;
    const addRecord = (ageGroup, category, smartHome, regInternet, phoneIndep, upiAccess, egovAccess, eduAccess,
                       sPhoneSkill, searchSkill, emailSkill, paymentSkill, egovSkill, cyberSkill,
                       litScore, impactIndex, barrier) => {
      records.push({
        respondent_id: `DLB-${idCounter++}`,
        age_group: ageGroup,
        respondent_category: category,
        smartphone_access: smartHome,
        internet_frequency: regInternet ? "Daily" : "Occasionally",
        uses_phone_independently: phoneIndep,
        used_upi: upiAccess,
        used_egov: egovAccess,
        used_educational: eduAccess,
        smartphone_skill: sPhoneSkill,
        search_skill: searchSkill,
        email_skill: emailSkill,
        payment_skill: paymentSkill,
        egov_skill: egovSkill,
        cyber_safety: cyberSkill,
        digital_literacy_score: litScore,
        digital_impact_index: impactIndex,
        primary_barrier: barrier,
        submitted_at: "2026-09-15T10:00:00Z"
      });
    };

    // Category 1: 20 Students (mostly 15-20, high skills, but weak on e-gov / verification)
    // 18 in 15-20, 2 in 21-30
    for (let i = 0; i < 18; i++) {
      const email = i < 12; // 66% of students have email
      const egov = i < 9;   // 50%
      const cyber = i < 12; // 66%
      const score = Math.round(68 + (i % 6) * 5 + (i % 3) * 2);
      const impact = +(3.2 + (score / 100) * 1.5 + (i % 3) * 0.1).toFixed(2);
      addRecord("15-20", "student", true, true, true, true, egov, true,
                true, true, email, true, egov, cyber,
                score, Math.min(4.8, impact), i % 3 === 0 ? "Fear of fraud / scams" : "Need help with online forms");
    }
    for (let i = 0; i < 2; i++) {
      addRecord("21-30", "student", true, true, true, true, true, true,
                true, true, true, true, true, true,
                88 + i * 4, 4.3 + i * 0.2, "Limited time for training");
    }

    // Category 2: 20 Working Adults (MIDC factory workers, 10 in 21-30, 6 in 31-40, 3 in 41-50, 1 in 51+)
    // Strong in UPI (85%), weak in Email (40%) and Govt forms (50%)
    for (let i = 0; i < 10; i++) {
      const email = i < 4; // low email
      const egov = i < 5;
      const cyber = i < 6;
      const score = Math.round(52 + i * 3.5);
      const impact = +(2.4 + (score / 100) * 1.6).toFixed(2);
      addRecord("21-30", "working_adult", true, true, true, true, egov, i < 6,
                true, true, email, true, egov, cyber,
                score, impact, i % 2 === 0 ? "Fear of fraud / scams" : "Language / terminology");
    }
    for (let i = 0; i < 6; i++) {
      const email = i < 2;
      const egov = i < 3;
      const score = Math.round(50 + i * 4);
      const impact = +(2.3 + (score / 100) * 1.5).toFixed(2);
      addRecord("31-40", "working_adult", true, true, true, true, egov, i < 3,
                true, true, email, true, egov, i % 2 === 0,
                score, impact, "Need help with online forms");
    }
    for (let i = 0; i < 3; i++) {
      const score = Math.round(48 + i * 5);
      addRecord("41-50", "working_adult", true, i < 2, true, true, false, false,
                true, i < 2, false, true, false, false,
                score, +(2.2 + i * 0.3).toFixed(2), "Low confidence");
    }
    addRecord("51+", "working_adult", true, false, false, true, false, false,
              true, false, false, true, false, false,
              42, 2.3, "Language / terminology");

    // Category 3: 20 Homemakers / Parents (1 in 21-30, 7 in 31-40, 8 in 41-50, 4 in 51+)
    // High fear of fraud (70%), dependent on others for forms, low email (20%)
    addRecord("21-30", "homemaker_parent", true, true, true, true, true, true,
              true, true, true, true, true, true,
              76, 3.6, "Need help with online forms");

    for (let i = 0; i < 7; i++) {
      const smart = true;
      const search = i < 5;
      const email = i < 1;
      const pay = i < 4;
      const egov = i < 3;
      const cyber = i < 3;
      const score = Math.round(44 + i * 3.5);
      const impact = +(2.2 + (score / 100) * 1.4).toFixed(2);
      addRecord("31-40", "homemaker_parent", smart, i < 5, i < 5, pay, egov, i < 3,
                true, search, email, pay, egov, cyber,
                score, impact, i % 2 === 0 ? "Fear of fraud / scams" : "Low confidence");
    }
    for (let i = 0; i < 8; i++) {
      const email = i < 1;
      const pay = i < 4;
      const egov = i < 3;
      const score = Math.round(38 + i * 3.8);
      const impact = +(2.0 + (score / 100) * 1.3).toFixed(2);
      addRecord("41-50", "homemaker_parent", i < 7, i < 6, i < 6, pay, egov, false,
                i < 7, i < 5, email, pay, egov, false,
                score, impact, i % 2 === 0 ? "Fear of fraud / scams" : "Lack of nearby guidance");
    }
    for (let i = 0; i < 4; i++) {
      const score = Math.round(34 + i * 4);
      addRecord("51+", "homemaker_parent", i < 3, i < 2, false, false, false, false,
                i < 3, false, false, false, false, false,
                score, +(1.9 + i * 0.2).toFixed(2), "Language / terminology");
    }

    return records;
  },

  // Retrieve current dataset (persisted in localStorage if modified via self-check)
  getDataset() {
    const stored = localStorage.getItem("dlb_dataset");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length >= 60) {
          return parsed;
        }
      } catch (e) {
        console.warn("Could not parse stored dataset, reverting to base.", e);
      }
    }
    const base = this.generateSampleDataset();
    localStorage.setItem("dlb_dataset", JSON.stringify(base));
    return base;
  },

  // Save new anonymous respondent to dataset
  addRespondent(record) {
    const data = this.getDataset();
    data.push(record);
    localStorage.setItem("dlb_dataset", JSON.stringify(data));
    return data;
  },

  // Reset to original 60-sample illustrative dataset
  resetDataset() {
    const base = this.generateSampleDataset();
    localStorage.setItem("dlb_dataset", JSON.stringify(base));
    return base;
  }
};

window.BOISAR_STUDY_DATA = BOISAR_STUDY_DATA;
