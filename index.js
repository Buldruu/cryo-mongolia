// ── NAV ──
window.addEventListener("scroll", () => {
  document.getElementById("navbar").classList.toggle("scrolled", scrollY > 60);
});

// ── PARTICLES ──
const pc = document.getElementById("particles");
for (let i = 0; i < 30; i++) {
  const p = document.createElement("div");
  p.className = "particle";
  p.style.cssText = `left:${Math.random() * 100}%;width:${Math.random() * 3 + 1}px;height:${Math.random() * 3 + 1}px;animation-duration:${8 + Math.random() * 12}s;animation-delay:${Math.random() * 8}s;`;
  pc.appendChild(p);
}

// ── REVEAL ──
document
  .querySelectorAll(".reveal")
  .forEach((r) =>
    new IntersectionObserver(
      ([e]) => e.isIntersecting && r.classList.add("visible"),
      { threshold: 0.1 },
    ).observe(r),
  );

// ── COUNTERS ──
function animateCounters() {
  document.querySelectorAll(".stat-num[data-target]").forEach((el) => {
    const target = +el.dataset.target;
    const unit = el.querySelector(".stat-unit")?.outerHTML || "";
    let cur = 0;
    const step = target / 60;
    const t = setInterval(() => {
      cur = Math.min(cur + step, target);
      el.innerHTML = Math.floor(cur) + unit;
      if (cur >= target) clearInterval(t);
    }, 20);
  });
}
new IntersectionObserver(
  ([e]) => {
    if (e.isIntersecting) {
      animateCounters();
    }
  },
  { threshold: 0.3 },
).observe(document.querySelector(".stats"));

// ── TREATMENTS ──
function filterTreatments(cat, btn) {
  document
    .querySelectorAll(".tab-btn")
    .forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
  document
    .querySelectorAll(".treatment-card")
    .forEach((c) =>
      c.classList.toggle("active-card", cat === "all" || c.dataset.cat === cat),
    );
}

// ── MOBILE MENU ──
function toggleMenu() {
  document.getElementById("mobileMenu").classList.toggle("open");
}

// ════════════════════════════════════════
//  BOOKING SYSTEM
// ════════════════════════════════════════
const TIMES = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
];
const WD = ["Ням", "Дав", "Мяг", "Лха", "Пүр", "Баа", "Бям"];
const MONTHS = [
  "1-р сар",
  "2-р сар",
  "3-р сар",
  "4-р сар",
  "5-р сар",
  "6-р сар",
  "7-р сар",
  "8-р сар",
  "9-р сар",
  "10-р сар",
  "11-р сар",
  "12-р сар",
];

const bookedMap = {}; // dateKey -> [booked times]
function getBooked(key) {
  if (!bookedMap[key]) {
    const arr = [];
    const n = 2 + Math.floor(Math.random() * 3);
    while (arr.length < n) {
      const t = TIMES[Math.floor(Math.random() * TIMES.length)];
      if (!arr.includes(t)) arr.push(t);
    }
    bookedMap[key] = arr;
  }
  return bookedMap[key];
}

let bk = { dateKey: "", time: "", bank: "", bankName: "" };
let dateOffset = 0; // index of first visible date (0 = tomorrow)
const DATE_SHOW = 7;
let qrInterval = null;

function dateFromOffset(n) {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + n + 1); // +1 = start from tomorrow
  return d;
}
function fmtKey(d) {
  return d.toISOString().split("T")[0];
}

// Build date tabs
function buildDateTabs() {
  const tabs = document.getElementById("dateTabs");
  tabs.innerHTML = "";
  for (let i = 0; i < DATE_SHOW; i++) {
    const d = dateFromOffset(dateOffset + i);
    const key = fmtKey(d);
    const tab = document.createElement("div");
    tab.className = "date-tab" + (key === bk.dateKey ? " selected" : "");
    tab.innerHTML =
      `<div class="dt-wd">${WD[d.getDay()]}</div>` +
      `<div class="dt-d">${d.getDate()}</div>` +
      `<div class="dt-m">${d.getMonth() + 1}-р</div>`;
    tab.onclick = () => pickDate(key, tab);
    tabs.appendChild(tab);
  }
  document.getElementById("datePrevBtn").disabled = dateOffset === 0;
}

function shiftDates(dir) {
  dateOffset = Math.max(0, dateOffset + dir * DATE_SHOW);
  buildDateTabs();
}

function pickDate(key, el) {
  bk.dateKey = key;
  bk.time = "";
  document
    .querySelectorAll(".date-tab")
    .forEach((t) => t.classList.remove("selected"));
  el.classList.add("selected");
  buildTimeGrid();
}

function buildTimeGrid() {
  const grid = document.getElementById("timeGrid");
  grid.innerHTML = "";
  const booked = bk.dateKey ? getBooked(bk.dateKey) : [];
  TIMES.forEach((t) => {
    const s = document.createElement("div");
    const b = booked.includes(t);
    s.className =
      "time-slot" + (b ? " booked" : "") + (t === bk.time ? " selected" : "");
    s.textContent = t;
    if (!b) s.onclick = () => pickTime(t, s);
    grid.appendChild(s);
  });
}

function pickTime(t, el) {
  bk.time = t;
  document
    .querySelectorAll(".time-slot")
    .forEach((s) => s.classList.remove("selected"));
  el.classList.add("selected");
}

// ── Step nav ──
function setStepDots(active) {
  [1, 2, 3].forEach((i) => {
    const dot = document.getElementById("dot" + i);
    const line = document.getElementById("line" + i);
    dot.className =
      "step-dot" + (i < active ? " done" : i === active ? " active" : "");
    if (line) line.className = "step-line" + (i < active ? " done" : "");
  });
}

function showPanel(id) {
  ["step1", "step2", "step2b", "step3"].forEach((p) => {
    const el = document.getElementById(p);
    if (el) el.classList.remove("active");
  });
  document.getElementById(id).classList.add("active");
}

function goStepNum(n) {
  setStepDots(n);
  showPanel("step" + n);
}

function goStep2() {
  const name = document.getElementById("b_name").value.trim();
  const phone = document.getElementById("b_phone").value.trim();
  if (!name) {
    alert("Нэрээ оруулна уу.");
    return;
  }
  if (!phone) {
    alert("Утасны дугаараа оруулна уу.");
    return;
  }
  if (!bk.dateKey) {
    alert("Огноо сонгоно уу.");
    return;
  }
  if (!bk.time) {
    alert("Цаг сонгоно уу.");
    return;
  }

  // Fill summary
  const d = new Date(bk.dateKey);
  const dateLabel = `${d.getFullYear()}.${d.getMonth() + 1}.${d.getDate()} (${WD[d.getDay()]})`;
  document.getElementById("sum_date").textContent = dateLabel;
  document.getElementById("sum_time").textContent = bk.time;

  setStepDots(2);
  showPanel("step2");
}

function selectBank(el, id, name) {
  document
    .querySelectorAll(".bank-btn")
    .forEach((b) => b.classList.remove("selected"));
  el.classList.add("selected");
  bk.bank = id;
  bk.bankName = name;
}

function showQR() {
  if (!bk.bank) {
    alert("Банкаа сонгоно уу.");
    return;
  }
  // Mark slot as booked
  if (!bookedMap[bk.dateKey]) bookedMap[bk.dateKey] = [];
  if (!bookedMap[bk.dateKey].includes(bk.time))
    bookedMap[bk.dateKey].push(bk.time);

  document.getElementById("qrBankName").textContent =
    bk.bankName.toUpperCase() + " — QPAY";
  setStepDots(2);
  showPanel("step2b");
  startTimer();

  // Simulate payment in 6s
  setTimeout(() => {
    if (document.getElementById("step2b").classList.contains("active"))
      doConfirm();
  }, 6000);
}

function startTimer() {
  if (qrInterval) clearInterval(qrInterval);
  let s = 599;
  const el = document.getElementById("qrTimer");
  el.textContent = "09:59";
  qrInterval = setInterval(() => {
    if (--s <= 0) {
      clearInterval(qrInterval);
      el.textContent = "00:00";
      return;
    }
    el.textContent =
      String(Math.floor(s / 60)).padStart(2, "0") +
      ":" +
      String(s % 60).padStart(2, "0");
  }, 1000);
}

function doConfirm() {
  if (qrInterval) clearInterval(qrInterval);
  const ref = "CRYO-" + (1000 + Math.floor(Math.random() * 9000));
  document.getElementById("bookingRef").textContent = ref;
  const name = document.getElementById("b_name").value;
  const phone = document.getElementById("b_phone").value;
  const d = new Date(bk.dateKey);
  const dl = `${d.getFullYear()}.${d.getMonth() + 1}.${d.getDate()} (${WD[d.getDay()]})`;
  document.getElementById("confirmDetails").innerHTML =
    `👤 <b style="color:var(--frost)">${name}</b> &nbsp;·&nbsp; ${phone}<br>` +
    `📅 ${dl} &nbsp;⏰ ${bk.time}<br>` +
    `<span style="color:var(--accent);font-size:12px;">✓ ₮100,000 — ${bk.bankName}</span>`;
  setStepDots(3);
  showPanel("step3");
}

// ── Modal ──
function openModal() {
  bk = { dateKey: "", time: "", bank: "", bankName: "" };
  dateOffset = 0;
  buildDateTabs();
  buildTimeGrid();
  document
    .querySelectorAll(".bank-btn")
    .forEach((b) => b.classList.remove("selected"));
  document.getElementById("b_name").value = "";
  document.getElementById("b_phone").value = "";
  setStepDots(1);
  showPanel("step1");
  document.getElementById("modalOverlay").classList.add("open");
}
function closeModal() {
  if (qrInterval) clearInterval(qrInterval);
  document.getElementById("modalOverlay").classList.remove("open");
}
function closeModalOnBg(e) {
  if (e.target === document.getElementById("modalOverlay")) closeModal();
}
