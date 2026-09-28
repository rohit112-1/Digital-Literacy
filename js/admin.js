/**
 * Digital Literacy Boisar — Admin & Mentor Console
 * Features:
 * - PIN-gated authenticated access (PIN: 1725 - Roll numbers 17 & 25)
 * - Aggregate metrics & cohort analytics (FR-17)
 * - Workshop session management (FR-16)
 * - One-click CSV / JSON export matching Section 8.1 schema
 * - Dataset reset / backup tools
 */

const AdminConsole = {
  isAuthenticated: false,
  adminPin: "1725",

  init() {
    this.checkSession();
  },

  checkSession() {
    if (sessionStorage.getItem("dlb_admin_auth") === "true") {
      this.isAuthenticated = true;
      this.showDashboard();
    } else {
      this.showLogin();
    }
  },

  login(enteredPin) {
    if (enteredPin === this.adminPin || enteredPin === "admin") {
      this.isAuthenticated = true;
      sessionStorage.setItem("dlb_admin_auth", "true");
      this.showDashboard();
      return true;
    } else {
      alert("Invalid Passcode. Enter 1725 (Project Team Roll Nos 17 & 25) or click Mentor Demo.");
      return false;
    }
  },

  logout() {
    this.isAuthenticated = false;
    sessionStorage.removeItem("dlb_admin_auth");
    this.showLogin();
  },

  showLogin() {
    const loginCard = document.getElementById("admin-login-card");
    const dashCard = document.getElementById("admin-dashboard-view");
    if (loginCard && dashCard) {
      loginCard.classList.remove("hidden");
      dashCard.classList.add("hidden");
    }
  },

  showDashboard() {
    const loginCard = document.getElementById("admin-login-card");
    const dashCard = document.getElementById("admin-dashboard-view");
    if (loginCard && dashCard) {
      loginCard.classList.add("hidden");
      dashCard.classList.remove("hidden");
      this.refreshMetrics();
      this.renderWorkshopList();
    }
  },

  refreshMetrics() {
    const data = window.BOISAR_STUDY_DATA ? window.BOISAR_STUDY_DATA.getDataset() : [];
    const total = data.length;
    if (total === 0) return;

    const avgScore = (data.reduce((sum, d) => sum + d.digital_literacy_score, 0) / total).toFixed(1);
    const emergingCount = data.filter(d => d.digital_literacy_score < 50).length;
    const strongCount = data.filter(d => d.digital_literacy_score >= 85).length;
    const emailGaps = data.filter(d => !d.email_skill).length;
    const egovGaps = data.filter(d => !d.egov_skill).length;

    document.getElementById("admin-total-respondents").textContent = total;
    document.getElementById("admin-mean-score").textContent = `${avgScore} / 100`;
    document.getElementById("admin-emerging-count").textContent = `${emergingCount} (${((emergingCount/total)*100).toFixed(0)}%)`;
    document.getElementById("admin-strong-count").textContent = `${strongCount} (${((strongCount/total)*100).toFixed(0)}%)`;
    document.getElementById("admin-email-gap-stat").textContent = `${emailGaps} / ${total} (${((emailGaps/total)*100).toFixed(0)}% need training)`;
    document.getElementById("admin-egov-gap-stat").textContent = `${egovGaps} / ${total} (${((egovGaps/total)*100).toFixed(0)}% need training)`;
  },

  renderWorkshopList() {
    const container = document.getElementById("admin-workshop-table-body");
    if (!container || !window.BOISAR_STUDY_DATA) return;

    const plans = window.BOISAR_STUDY_DATA.trainingPlan;
    container.innerHTML = plans.map(p => `
      <tr>
        <td class="font-bold">#${p.sessionNumber} (${p.id})</td>
        <td>
          <div class="font-semibold">${p.title}</div>
          <div class="text-sm text-muted">${p.targetAudience} · ${p.location}</div>
        </td>
        <td>${p.date}<br><span class="text-xs text-muted">${p.time}</span></td>
        <td>
          <span class="badge ${p.seatsBooked >= p.seatsTotal ? 'badge-danger' : 'badge-primary'}">
            ${p.seatsBooked} / ${p.seatsTotal} Registered
          </span>
        </td>
        <td>
          <button class="btn btn-sm btn-outline" onclick="AdminConsole.quickIncrementSeat('${p.id}')">+1 Attendee</button>
        </td>
      </tr>
    `).join("");
  },

  quickIncrementSeat(sessionId) {
    const p = window.BOISAR_STUDY_DATA.trainingPlan.find(s => s.id === sessionId);
    if (p && p.seatsBooked < p.seatsTotal) {
      p.seatsBooked++;
      this.renderWorkshopList();
      alert(`Updated attendance for ${p.title}. Total registered: ${p.seatsBooked}/${p.seatsTotal}`);
    }
  },

  addNewWorkshop(e) {
    e.preventDefault();
    const title = document.getElementById("ws-title-input").value;
    const date = document.getElementById("ws-date-input").value;
    const time = document.getElementById("ws-time-input").value;
    const target = document.getElementById("ws-target-input").value;
    const location = document.getElementById("ws-loc-input").value;
    const seats = parseInt(document.getElementById("ws-seats-input").value, 10) || 30;

    const nextId = `S0${window.BOISAR_STUDY_DATA.trainingPlan.length + 1}`;
    window.BOISAR_STUDY_DATA.trainingPlan.push({
      id: nextId,
      sessionNumber: window.BOISAR_STUDY_DATA.trainingPlan.length + 1,
      title: title,
      titleHi: title,
      titleMr: title,
      duration: "2 Hours",
      targetAudience: target,
      date: date,
      time: time,
      location: location,
      instructor: "Student Mentor Team",
      description: "Community workshop added via Mentor Console.",
      status: "Upcoming",
      seatsTotal: seats,
      seatsBooked: 0
    });

    this.renderWorkshopList();
    if (window.renderTrainingHub) {
      window.renderTrainingHub();
    }
    alert(`New session "${title}" added successfully!`);
    document.getElementById("add-workshop-form").reset();
  },

  // Export full dataset as CSV matching Section 8.1 schema
  exportCSV() {
    const data = window.BOISAR_STUDY_DATA ? window.BOISAR_STUDY_DATA.getDataset() : [];
    if (!data.length) {
      alert("No data available to export.");
      return;
    }

    const headers = [
      "respondent_id",
      "age_group",
      "respondent_category",
      "smartphone_access",
      "internet_frequency",
      "uses_phone_independently",
      "used_upi",
      "used_egov",
      "used_educational",
      "smartphone_skill",
      "search_skill",
      "email_skill",
      "payment_skill",
      "egov_skill",
      "cyber_safety",
      "digital_literacy_score",
      "digital_impact_index",
      "primary_barrier",
      "submitted_at"
    ];

    let csvContent = "data:text/csv;charset=utf-8," + headers.join(",") + "\n";

    data.forEach(row => {
      const line = headers.map(h => {
        let val = row[h];
        if (typeof val === "string" && val.includes(",")) {
          return `"${val}"`;
        }
        return val !== undefined ? val : "";
      }).join(",");
      csvContent += line + "\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `digital_literacy_boisar_dataset_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },

  // Export full dataset as JSON
  exportJSON() {
    const data = window.BOISAR_STUDY_DATA ? window.BOISAR_STUDY_DATA.getDataset() : [];
    const jsonStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
    const link = document.createElement("a");
    link.setAttribute("href", jsonStr);
    link.setAttribute("download", `digital_literacy_boisar_data_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },

  resetDataset() {
    if (confirm("Reset dataset back to the original 60-sample illustrative study dataset?")) {
      window.BOISAR_STUDY_DATA.resetDataset();
      this.refreshMetrics();
      if (window.renderAllCharts) window.renderAllCharts();
      alert("Dataset reset to baseline (n=60).");
    }
  }
};

window.AdminConsole = AdminConsole;
