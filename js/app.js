/**
 * Digital Literacy Boisar — Main Application Controller
 * Handles tab routing, navigation, modals, workshop sign-ups, and guides.
 */

document.addEventListener("DOMContentLoaded", () => {
  // Initialize Localization
  if (window.I18N) {
    window.I18N.init();
  }

  // Setup tab routing
  setupNavigation();

  // Initialize Training Hub
  renderTrainingHub();

  // Initialize Charts when insights view is active or on first load
  setTimeout(() => {
    if (window.renderAllCharts) {
      window.renderAllCharts();
    }
  }, 200);

  // Filter change listeners
  const catSelect = document.getElementById("filter-category");
  const ageSelect = document.getElementById("filter-age");
  if (catSelect) {
    catSelect.addEventListener("change", () => {
      if (window.renderAllCharts) window.renderAllCharts();
    });
  }
  if (ageSelect) {
    ageSelect.addEventListener("change", () => {
      if (window.renderAllCharts) window.renderAllCharts();
    });
  }

  // Check URL hash for direct deep links
  handleHashChange();
  window.addEventListener("hashchange", handleHashChange);
});

// Tab navigation system
function switchTab(tabId) {
  const sections = ["home", "insights", "selfcheck", "training", "about", "admin"];
  
  sections.forEach(sec => {
    const secEl = document.getElementById(`section-${sec}`);
    const navBtn = document.getElementById(`nav-${sec}`);
    if (secEl) {
      if (sec === tabId) {
        secEl.classList.remove("hidden");
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        secEl.classList.add("hidden");
      }
    }
    if (navBtn) {
      if (sec === tabId) {
        navBtn.classList.add("active");
      } else {
        navBtn.classList.remove("active");
      }
    }
  });

  // Re-trigger charts on insights tab switch
  if (tabId === "insights" && window.renderAllCharts) {
    setTimeout(window.renderAllCharts, 100);
  }

  // Check admin session if admin tab
  if (tabId === "admin" && window.AdminConsole) {
    window.AdminConsole.checkSession();
  }
}

function setupNavigation() {
  document.querySelectorAll("[data-nav-target]").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const target = btn.getAttribute("data-nav-target");
      window.location.hash = target;
      switchTab(target);
    });
  });

  // Mobile menu toggle
  const menuToggle = document.getElementById("mobile-menu-toggle");
  const navLinks = document.getElementById("nav-links");
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");
    });

    navLinks.querySelectorAll("button").forEach(btn => {
      btn.addEventListener("click", () => {
        navLinks.classList.remove("open");
      });
    });
  }
}

function handleHashChange() {
  const hash = window.location.hash.replace("#", "");
  const validTabs = ["home", "insights", "selfcheck", "training", "about", "admin"];
  if (validTabs.includes(hash)) {
    switchTab(hash);
  } else {
    switchTab("home");
  }
}

// Render Training Hub & 7-Session Syllabus
function renderTrainingHub() {
  const container = document.getElementById("training-sessions-grid");
  if (!container || !window.BOISAR_STUDY_DATA) return;

  const currentLang = window.I18N ? window.I18N.currentLang : "en";
  const sessions = window.BOISAR_STUDY_DATA.trainingPlan;

  container.innerHTML = sessions.map(s => {
    const title = currentLang === "hi" ? s.titleHi : (currentLang === "mr" ? s.titleMr : s.title);
    const isFull = s.seatsBooked >= s.seatsTotal;

    return `
      <div class="card session-card">
        <div class="session-badge-row">
          <span class="badge badge-accent">Session ${s.sessionNumber}</span>
          <span class="session-duration">⏱ ${s.duration}</span>
        </div>
        <h3 class="session-title">${title}</h3>
        <p class="session-desc">${s.description}</p>
        
        <div class="session-meta">
          <div><strong>📅 Date:</strong> ${s.date} (${s.time})</div>
          <div><strong>📍 Venue:</strong> ${s.location}</div>
          <div><strong>👥 Target:</strong> ${s.targetAudience}</div>
          <div><strong>👨‍🏫 Lead:</strong> ${s.instructor}</div>
        </div>

        <div class="session-footer">
          <div class="seat-progress">
            <div class="text-xs text-muted mb-1">Seats: ${s.seatsBooked} / ${s.seatsTotal} Booked</div>
            <div class="progress-bar-bg">
              <div class="progress-bar-fill" style="width: ${(s.seatsBooked / s.seatsTotal) * 100}%; background: ${isFull ? '#e76f51' : '#2a9d8f'}"></div>
            </div>
          </div>
          <button class="btn btn-sm ${isFull ? 'btn-disabled' : 'btn-primary'}" 
                  onclick="openWorkshopModal('${s.id}')" ${isFull ? 'disabled' : ''}>
            ${isFull ? 'Batch Full' : 'Free Registration'}
          </button>
        </div>
      </div>
    `;
  }).join("");

  renderGuidesList();
}

// Render Guides Section
function renderGuidesList() {
  const container = document.getElementById("guides-cards-grid");
  if (!container || !window.BOISAR_STUDY_DATA) return;

  const currentLang = window.I18N ? window.I18N.currentLang : "en";
  const guides = window.BOISAR_STUDY_DATA.guides;

  container.innerHTML = guides.map(g => {
    const title = currentLang === "hi" ? g.titleHi : (currentLang === "mr" ? g.titleMr : g.title);
    return `
      <div class="card guide-card">
        <div class="guide-icon">📖</div>
        <div class="guide-content">
          <div class="guide-tag-row">
            <span class="badge badge-primary">${g.version}</span>
            <span class="text-xs text-muted">${g.pages} · EN / HI / MR</span>
          </div>
          <h4 class="guide-title">${title}</h4>
          <p class="guide-summary">${g.summary}</p>
          <div class="guide-actions">
            <button class="btn btn-sm btn-outline" onclick="openGuidePreview('${g.id}')">View Guide Online</button>
            <button class="btn btn-sm btn-secondary" onclick="simulateDownload('${g.filename}')">Download PDF</button>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

// Workshop Registration Modal
let activeSessionId = null;

function openWorkshopModal(sessionId) {
  activeSessionId = sessionId;
  const s = window.BOISAR_STUDY_DATA.trainingPlan.find(item => item.id === sessionId);
  if (!s) return;

  const modal = document.getElementById("workshop-reg-modal");
  document.getElementById("modal-session-title").textContent = `Session ${s.sessionNumber}: ${s.title}`;
  document.getElementById("modal-session-details").textContent = `${s.date} at ${s.time} | ${s.location}`;
  modal.classList.remove("hidden");
}

function closeWorkshopModal() {
  const modal = document.getElementById("workshop-reg-modal");
  if (modal) modal.classList.add("hidden");
  activeSessionId = null;
}

function submitWorkshopReg(e) {
  e.preventDefault();
  const name = document.getElementById("reg-name").value.trim();
  const role = document.getElementById("reg-role").value;
  const needMentor = document.getElementById("reg-mentor-checkbox").checked;

  if (activeSessionId) {
    const s = window.BOISAR_STUDY_DATA.trainingPlan.find(item => item.id === activeSessionId);
    if (s && s.seatsBooked < s.seatsTotal) {
      s.seatsBooked++;
    }
  }

  closeWorkshopModal();
  renderTrainingHub();
  if (window.AdminConsole && window.AdminConsole.isAuthenticated) {
    window.AdminConsole.renderWorkshopList();
  }

  const token = `TK-${Math.floor(10000 + Math.random() * 90000)}`;
  alert(`Registration Confirmed!\nYour Entry Token: ${token}\nAssigned Mentor: ${needMentor ? 'Yes (Student Volunteer)' : 'Group Lab'}\nPlease arrive 10 minutes prior to session time at Theem College.`);
  document.getElementById("reg-form").reset();
}

// Guide Preview Modal
function openGuidePreview(guideId) {
  const modal = document.getElementById("guide-preview-modal");
  const titleEl = document.getElementById("guide-modal-title");
  const bodyEl = document.getElementById("guide-modal-content");

  if (guideId === "G-CYBER") {
    titleEl.textContent = "Cyber-Safety & Scam Avoidance Checklist";
    bodyEl.innerHTML = `
      <div class="guide-preview-sheet">
        <div class="guide-sheet-header">
          <h3>THEEM COLLEGE IT DEPT · COMMUNITY CYBER-SAFETY BULLETIN</h3>
          <p class="text-sm">Emergency Reporting: National Cyber Crime Helpline <strong>1930</strong> or cybercrime.gov.in</p>
        </div>
        <hr class="my-3">
        <h4>1. Electricity Bill / Power Cut Scams (Top Fraud in Boisar)</h4>
        <p><strong>The Scam:</strong> SMS warns: <em>"Dear customer your power will be disconnected at 9:30 PM tonight because your bill is unpaid. Call 98765-XXXXX."</em></p>
        <p><strong>The Reality:</strong> Electricity boards (MSEDCL / Mahavitaran) NEVER send personal 10-digit mobile numbers or demand app installation. Pay only via official Mahavitaran app or authorized bill counters.</p>
        
        <h4>2. The Golden Rule of UPI</h4>
        <p><strong>UPI PIN is required ONLY to SEND money out of your bank account.</strong> You never need to enter your PIN to receive money, lottery prizes, or cashback.</p>

        <h4>3. Suspicious APK Downloads</h4>
        <p>Never install apps from WhatsApp or SMS links ending in <code>.apk</code>. Only install apps from the Google Play Store or Apple App Store.</p>

        <div class="mt-4 p-3 bg-light rounded text-center">
          <button class="btn btn-sm btn-primary" onclick="window.print()">Print This Guide</button>
        </div>
      </div>
    `;
  } else if (guideId === "G-UPI") {
    titleEl.textContent = "Safe UPI & Mobile Payments Handbook";
    bodyEl.innerHTML = `
      <div class="guide-preview-sheet">
        <div class="guide-sheet-header">
          <h3>SAFE DIGITAL PAYMENTS HANDBOOK FOR RESIDENTS & VENDORS</h3>
          <p class="text-sm">Palghar District Community Engagement Program</p>
        </div>
        <hr class="my-3">
        <h4>Step 1: Check the Display Name Before Entering PIN</h4>
        <p>Whenever scanning a QR code at a Boisar shop or vegetable vendor, confirm the receiver's name on your screen before entering your 4 or 6-digit UPI PIN.</p>
        
        <h4>Step 2: Never Share Screen Via Any App</h4>
        <p>Never download apps like AnyDesk, TeamViewer, or QuickSupport on the request of a caller claiming to be a bank official or courier representative.</p>

        <h4>Step 3: What to Do if Money is Deducted Wrongly</h4>
        <p>1. Open transaction history in GPay/PhonePe and tap <em>"Raise a Dispute / Contact Support"</em>.</p>
        <p>2. Note down the 12-digit UTR number.</p>
        <p>3. If unauthorized debit occurs, immediately call <strong>1930</strong> within the "golden hour" to freeze the transfer.</p>
        <div class="mt-4 p-3 bg-light rounded text-center">
          <button class="btn btn-sm btn-primary" onclick="window.print()">Print This Guide</button>
        </div>
      </div>
    `;
  } else {
    titleEl.textContent = "Aaple Sarkar & DigiLocker Step-by-Step Guide";
    bodyEl.innerHTML = `
      <div class="guide-preview-sheet">
        <div class="guide-sheet-header">
          <h3>E-GOVERNANCE GUIDE: AAPLE SARKAR & DIGILOCKER</h3>
          <p class="text-sm">Assisted E-Service Desk, Theem College Campus, Boisar</p>
        </div>
        <hr class="my-3">
        <h4>1. Documents Readily Available in DigiLocker</h4>
        <p>• Aadhaar Card, Driving Licence, Vehicle RC Book, Class 10 & 12 Marksheets, Ration Card.</p>
        <p>• Verified DigiLocker documents are legally equivalent to original physical documents under Rule 9A of the IT Rules, 2016.</p>

        <h4>2. How to Access Aaple Sarkar (aaplesarkar.mahaonline.gov.in)</h4>
        <p>• Create citizen profile with Aadhaar number and OTP.</p>
        <p>• Apply for Income Certificate, Domicile Certificate, Caste Certificate, or Non-Creamy Layer.</p>
        <p>• Track application status using the Application Token ID without paying middleman commissions.</p>
        
        <h4>3. Need Assistance?</h4>
        <p>Visit our Assisted E-Service Desk at Theem College Room 204. Student volunteers will assist you free of charge.</p>
        <div class="mt-4 p-3 bg-light rounded text-center">
          <button class="btn btn-sm btn-primary" onclick="window.print()">Print This Guide</button>
        </div>
      </div>
    `;
  }

  modal.classList.remove("hidden");
}

function closeGuideModal() {
  const modal = document.getElementById("guide-preview-modal");
  if (modal) modal.classList.add("hidden");
}

function simulateDownload(filename) {
  alert(`Download Initiated: ${filename}\nA printable version is also viewable by clicking "View Guide Online" and using Print.`);
}

window.switchTab = switchTab;
window.openWorkshopModal = openWorkshopModal;
window.closeWorkshopModal = closeWorkshopModal;
window.submitWorkshopReg = submitWorkshopReg;
window.openGuidePreview = openGuidePreview;
window.closeGuideModal = closeGuideModal;
window.simulateDownload = simulateDownload;
window.renderTrainingHub = renderTrainingHub;
