// ===============
// Header show on scroll
// ===============
const header = document.getElementById("header");
const showAfter = 140;

window.addEventListener(
  "scroll",
  () => {
    if (window.scrollY > showAfter) header.classList.add("show");
    else header.classList.remove("show");
  },
  { passive: true },
);

// ===============
// i18n (EN/MN) — toggle in HEADER only
// Applies to header labels + welcome text
// ===============
const i18n = {
  en: {
    brand: "Cryo Mongolia",
    "nav.home": "Home",
    "nav.services": "Services",
    "nav.booking": "Booking",
    "nav.reviews": "Reviews",
    "nav.contact": "Contact",
    "cta.book": "Book Now",
    "hero.welcome": "Welcome to Cryo Mongolia",
    "services.title": "Services",
    "services.desc":
      "Choose the therapy that matches your goal — recovery, wellness, or performance.",
    "tag.recovery": "Recovery",
    "tag.relief": "Relief",
    "tag.wellness": "Wellness",
    "tag.performance": "Performance",
    "tag.popular": "Popular",
    "svc.wbc": "Whole Body Cryotherapy",
    "svc.wbc.d": "Fast cold-air session for recovery and soreness support.",
    "svc.wbc.t": "⏱ 3–5 min",
    "svc.loc": "Localized Cryotherapy",
    "svc.loc.d": "Targeted cold therapy for specific areas.",
    "svc.loc.t": "⏱ 10 min",
    "svc.red": "Red Light Therapy",
    "svc.red.d": "Calming session used for skin and recovery routines.",
    "svc.red.t": "⏱ 10–20 min",
    "svc.comp": "Compression Boots",
    "svc.comp.d": "Rhythmic compression to support circulation and recovery.",
    "svc.comp.t": "⏱ 20–30 min",
    "svc.iv": "IV / Wellness Support",
    "svc.iv.d": "Optional add-ons based on your routine (customize later).",
    "svc.iv.t": "⏱ 30–45 min",
    "svc.combo": "Combo Packages",
    "svc.combo.d": "Stack therapies for better results and better value.",
    "svc.combo.t": "⏱ 40–60 min",

    "booking.title": "Appointment Booking",
    "booking.desc":
      "Simple 3-step flow: Select date & time → Choose service → Confirm.",
    "step.1": "Step 1",
    "step.1d": "Pick date & time",
    "step.2": "Step 2",
    "step.2d": "Choose service",
    "step.3": "Step 3",
    "step.3d": "Confirm booking",
    "booking.date": "Date",
    "booking.time": "Available time",
    "booking.service": "Service",
    "booking.therapist": "Therapist",
    "booking.name": "Name",
    "booking.phone": "Phone",
    "booking.email": "Email",
    "booking.pay": "Payment option",
    "pay.spa": "Pay at spa",
    "pay.deposit": "Online deposit",
    "booking.summary": "Summary",
    "booking.confirm": "Confirm Booking",
    "select": "Select a service",
    "whole": "Whole Body Cryotherapy",
    "localized": "Localized Cryotherapy",
    "red": "Red Light Therapy",
    "compression": "Compression Boots",
    "combo": "Combo Package",

    "reviews.title": "Reviews",
    "reviews.desc": "Real experiences. Short, believable proof points.",
    "r.1": "“Clean, modern studio. Booking took less than a minute.”",
    "r.1a": "— Client",
    "r.2": "“Felt refreshed right after the session. Staff were professional.”",
    "r.2a": "— Client",
    "r.3": "“Perfect after gym days. Fast, clean, and consistent.”",
    "r.3a": "— Client",

    "contact.title": "Contact",
    "contact.desc": "Find us easily. Call, message, or book online.",
    "contact.name": "Cryo Mongolia",
    "contact.open": "Open 09:00–21:00",
    "contact.addr": "📍 Ulaanbaatar — your address",
    "contact.call": "Call",
  },
  mn: {
    brand: "Cryo Mongolia",
    "nav.home": "Нүүр",
    "nav.services": "Үйлчилгээ",
    "nav.booking": "Цаг захиалга",
    "nav.reviews": "Сэтгэгдэл",
    "nav.contact": "Холбоо барих",
    "cta.book": "Цаг авах",
    "hero.welcome": "Cryo Mongolia-д тавтай морил",
    "services.title": "Үйлчилгээ",
    "services.desc":
      "Өөрийн зорилгодоо тааруулж эмчилгээгээ сонго — сэргэлт, эрүүл мэнд, гүйцэтгэл.",
    "tag.recovery": "Сэргэлт",
    "tag.relief": "Намдаалт",
    "tag.wellness": "Эрүүл мэнд",
    "tag.performance": "Гүйцэтгэл",
    "tag.popular": "Эрэлттэй",
    "svc.wbc": "Бүх биеийн крио",
    "svc.wbc.d":
      "Сэргэлт, булчингийн ядаргаа дэмжих богино хүйтэн агаарын сешн.",
    "svc.wbc.t": "⏱ 3–5 мин",
    "svc.loc": "Хэсэгчилсэн крио",
    "svc.loc.d": "Тодорхой хэсэгт чиглэсэн хүйтэн эмчилгээ.",
    "svc.loc.t": "⏱ 10 мин",
    "svc.red": "Улаан гэрлийн эмчилгээ",
    "svc.red.d": "Арьс ба сэргэлтийн routine-д тохирох тайвшруулах сешн.",
    "svc.red.t": "⏱ 10–20 мин",
    "svc.comp": "Компрессор гутал",
    "svc.comp.d": "Цусны эргэлт, сэргэлтийг дэмжих хэмнэлтэй шахалт.",
    "svc.comp.t": "⏱ 20–30 мин",
    "svc.iv": "Дэмжих үйлчилгээ",
    "svc.iv.d": "Routine-дээ тааруулж нэмэлтээр тохируулна (дараа сайжруулна).",
    "svc.iv.t": "⏱ 30–45 мин",
    "svc.combo": "Комбо багц",
    "svc.combo.d": "Үр дүнг сайжруулахын тулд үйлчилгээ хослуулсан багц.",
    "svc.combo.t": "⏱ 40–60 мин",

    "booking.title": "Цаг захиалга",
    "booking.desc":
      "3 алхам: Өдөр/цаг сонгох → Үйлчилгээ сонгох → Баталгаажуулах.",
    "step.1": "Алхам 1",
    "step.1d": "Өдөр, цаг сонго",
    "step.2": "Алхам 2",
    "step.2d": "Үйлчилгээ сонго",
    "step.3": "Алхам 3",
    "step.3d": "Баталгаажуулах",
    "booking.date": "Огноо",
    "booking.time": "Боломжит цаг",
    "booking.service": "Үйлчилгээ",
    "booking.therapist": "Мэргэжилтэн",
    "booking.name": "Нэр",
    "booking.phone": "Утас",
    "booking.email": "Имэйл",
    "booking.pay": "Төлбөрийн сонголт",
    "pay.spa": "Газар дээр төлөх",
    "pay.deposit": "Онлайнаар урьдчилгаа",
    "booking.summary": "Товч",
    "booking.confirm": "Цаг баталгаажуулах",
    "select": "Үйлчилгээ сонго",
    "whole": "Бүх биеийн крио",
    "localized": "Хэсэгчилсэн крио",
    "red": "Улаан гэрлийн эмчилгээ",
    "compression": "Компрессор гутал",
    "combo": "Комбо багц",

    "reviews.title": "Сэтгэгдэл",
    "reviews.desc": "Бодит туршлага. Богино, үнэмшилтэй.",
    "r.1": "“Цэвэрхэн, орчин үеийн. Захиалга 1 минут хүрэхгүй болсон.”",
    "r.1a": "— Үйлчлүүлэгч",
    "r.2": "“Сешний дараа шууд сэргээд гоё болсон. Ажилтнууд мундаг.”",
    "r.2a": "— Үйлчлүүлэгч",
    "r.3": "“Фитнесийн дараа яг тохирдог. Түргэн, цэвэр, тогтвортой.”",
    "r.3a": "— Үйлчлүүлэгч",

    "contact.title": "Холбоо барих",
    "contact.desc": "Хаяг, цаг, газрын зураг. Дуудлага/мессеж/онлайн захиалга.",
    "contact.name": "Cryo Mongolia",
    "contact.open": "09:00–21:00 ажиллана",
    "contact.addr": "📍 Улаанбаатар — таны хаяг",
    "contact.call": "Залгах",
  },
};

const btnEN = document.getElementById("btnEN");
const btnMN = document.getElementById("btnMN");

function applyLang(lang) {
  document.documentElement.setAttribute("data-lang", lang);

  btnEN.classList.toggle("active", lang === "en");
  btnMN.classList.toggle("active", lang === "mn");

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    const val = i18n?.[lang]?.[key];
    if (val) el.textContent = val;
  });

  localStorage.setItem("lang", lang);
}

btnEN.addEventListener("click", () => applyLang("en"));
btnMN.addEventListener("click", () => applyLang("mn"));

// Load saved language
applyLang(localStorage.getItem("lang") || "en");
const video = document.getElementById("heroVideo");

document.addEventListener(
  "click",
  () => {
    video.muted = false;
    video.play();
  },
  { once: true },
);