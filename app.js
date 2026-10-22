import SwissEph from 'https://cdn.jsdelivr.net/gh/prolaxu/swisseph-wasm@main/src/swisseph.js';

// ---------- Константы ----------
const PLANET_IDS = [
  { name: 'Sun', id: 'SE_SUN', fallback: 0 }, { name: 'Moon', id: 'SE_MOON', fallback: 1 },
  { name: 'Mercury', id: 'SE_MERCURY', fallback: 2 }, { name: 'Venus', id: 'SE_VENUS', fallback: 3 },
  { name: 'Mars', id: 'SE_MARS', fallback: 4 }, { name: 'Jupiter', id: 'SE_JUPITER', fallback: 5 },
  { name: 'Saturn', id: 'SE_SATURN', fallback: 6 }, { name: 'Uranus', id: 'SE_URANUS', fallback: 7 },
  { name: 'Neptune', id: 'SE_NEPTUNE', fallback: 8 }, { name: 'Pluto', id: 'SE_PLUTO', fallback: 9 },
];

const ASPECTS_SETTINGS = {
  conjunction: { degree: 0, orbit: 8, color: '#FFD700' },
  opposition:  { degree: 180, orbit: 8, color: '#FF6B6B' },
  trine:       { degree: 120, orbit: 8, color: '#4ECDC4' },
  square:      { degree: 90, orbit: 6, color: '#FF6B6B' },
  sextile:     { degree: 60, orbit: 4, color: '#4ECDC4' },
};

const SIGNS = ['Овен','Телец','Близнецы','Рак','Лев','Дева','Весы','Скорпион','Стрелец','Козерог','Водолей','Рыбы'];
const ELEMENTS = {
  Овен:'Огонь',Лев:'Огонь',Стрелец:'Огонь',Телец:'Земля',Дева:'Земля',Козерог:'Земля',
  Близнецы:'Воздух',Весы:'Воздух',Водолей:'Воздух',Рак:'Вода',Скорпион:'Вода',Рыбы:'Вода',
};
const PLANET_RU = {
  Sun:'Солнце',Moon:'Луна',Mercury:'Меркурий',Venus:'Венера',
  Mars:'Марс',Jupiter:'Юпитер',Saturn:'Сатурн',Uranus:'Уран',Neptune:'Нептун',Pluto:'Плутон',
};

const PLANET_IN_SIGN = {
  Sun: { Овен:'Яркая воля.',Телец:'Устойчивость.',Близнецы:'Любознательность.',Рак:'Эмоциональная глубина.',Лев:'Творческая самоподача.',Дева:'Аналитичность.',Весы:'Дипломатичность.',Скорпион:'Трансформация.',Стрелец:'Оптимизм.',Козерог:'Целеустремлённость.',Водолей:'Оригинальность.',Рыбы:'Интуиция.' },
  Moon: { Овен:'Импульсивность.',Телец:'Стабильность.',Близнецы:'Эмоции через общение.',Рак:'Чувствительность.',Лев:'Признание.',Дева:'Порядок.',Весы:'Гармония.',Скорпион:'Глубина.',Стрелец:'Свобода.',Козерог:'Структура.',Водолей:'Независимость.',Рыбы:'Эмпатия.' },
  Mercury: { Овен:'Быстрое мышление.',Телец:'Основательное.',Близнецы:'Гибкий ум.',Рак:'Эмоциональное.',Лев:'Уверенная речь.',Дева:'Точный ум.',Весы:'Взвешенное.',Скорпион:'Проницательное.',Стрелец:'Широкое.',Козерог:'Структурное.',Водолей:'Нестандартное.',Рыбы:'Интуитивное.' },
  Venus: { Овен:'Страстность.',Телец:'Чувственность.',Близнецы:'Лёгкость.',Рак:'Привязанность.',Лев:'Щедрость.',Дева:'Практическая забота.',Весы:'Гармония.',Скорпион:'Страсть.',Стрелец:'Свобода.',Козерог:'Верность.',Водолей:'Дружба.',Рыбы:'Романтика.' },
  Mars: { Овен:'Смелость.',Телец:'Упорство.',Близнецы:'Многозадачность.',Рак:'Защита.',Лев:'Творчество.',Дева:'Методичность.',Весы:'Дипломатия.',Скорпион:'Стратегия.',Стрелец:'Энтузиазм.',Козерог:'Дисциплина.',Водолей:'Нестандартность.',Рыбы:'Интуиция.' },
  Jupiter: { Овен:'Инициатива.',Телец:'Расширение.',Близнецы:'Знания.',Рак:'Забота.',Лев:'Творчество.',Дева:'Служение.',Весы:'Партнёрство.',Скорпион:'Трансформация.',Стрелец:'Философия.',Козерог:'Структура.',Водолей:'Инновации.',Рыбы:'Духовность.' },
  Saturn: { Овен:'Терпение.',Телец:'Ресурсы.',Близнецы:'Концентрация.',Рак:'Зрелость.',Лев:'Дисциплина.',Дева:'Точность.',Весы:'Ответственность.',Скорпион:'Трансформация.',Стрелец:'Вера.',Козерог:'Структура.',Водолей:'Свобода.',Рыбы:'Принятие.' },
  Uranus: { Овен:'Прорывы.',Телец:'Ценности.',Близнецы:'Общение.',Рак:'Семья.',Лев:'Творчество.',Дева:'Работа.',Весы:'Партнёрство.',Скорпион:'Трансформация.',Стрелец:'Мировоззрение.',Козерог:'Структуры.',Водолей:'Коллективы.',Рыбы:'Духовность.' },
  Neptune: { Овен:'Иллюзии.',Телец:'Материя.',Близнецы:'Слово.',Рак:'Эмоции.',Лев:'Творчество.',Дева:'Здоровье.',Весы:'Идеализация.',Скорпион:'Мистика.',Стрелец:'Религия.',Козерог:'Структура.',Водолей:'Коллектив.',Рыбы:'Растворение.' },
  Pluto: { Овен:'Действие.',Телец:'Ресурсы.',Близнецы:'Мышление.',Рак:'Семья.',Лев:'Творчество.',Дева:'Работа.',Весы:'Партнёрство.',Скорпион:'Глубина.',Стрелец:'Убеждения.',Козерог:'Карьера.',Водолей:'Коллективы.',Рыбы:'Духовность.' },
};

const PLANET_IN_HOUSE = {
  Sun: ['личность','ценности','общение','дом','творчество','работа','партнёрство','кризисы','путешествия','карьера','друзья','уединение'],
  Moon: ['«Я»','финансы','контакты','семья','дети','здоровье','брак','кризисы','путешествия','карьера','друзья','уединение'],
  Mercury: ['самовыражение','финансы','общение','семья','творчество','работа','партнёрство','исследование','учёба','карьера','друзья','скрытое'],
  Venus: ['привлекательность','финансы','общение','семья','творчество','работа','партнёрство','страсть','путешествия','карьера','дружба','уединение'],
  Mars: ['энергия','финансы','общение','дом','творчество','работа','партнёрство','кризисы','путешествия','карьера','друзья','скрытая энергия'],
  Jupiter: ['рост','финансы','обучение','семья','творчество','работа','партнёрство','трансформация','путешествия','карьера','друзья','духовность'],
  Saturn: ['ограничение','дисциплина','общение','обязанности','дисциплина','работа','ответственность','кризисы','мировоззрение','карьера','друзья','духовность'],
  Uranus: ['перемены','перемены','общение','семья','творчество','работа','партнёрство','кризисы','мировоззрение','карьера','друзья','духовность'],
  Neptune: ['иллюзии','иллюзии','общение','семья','творчество','работа','партнёрство','иллюзии','духовность','карьера','друзья','мистика'],
  Pluto: ['трансформация','трансформация','общение','семья','творчество','работа','партнёрство','трансформация','мировоззрение','карьера','друзья','духовность'],
};

const TRANSIT_THEMES = { Jupiter:'рост',Saturn:'проверка',Uranus:'перемены',Neptune:'иллюзии',Pluto:'трансформация' };
const ASPECT_RULES = { conjunction:{ orb:6, label:'соединение' }, opposition:{ orb:6, label:'оппозиция' }, trine:{ orb:5, label:'трин' }, square:{ orb:5, label:'квадрат' }, sextile:{ orb:4, label:'секстиль' } };
const HOUSE_QUESTIONS = { 1:'личность',2:'деньги',3:'общение',4:'дом',5:'творчество',6:'работа',7:'партнёрство',8:'кризисы',9:'путешествия',10:'карьера',11:'друзья',12:'уединение' };
const HOUSE_RULERS = { Овен:'Mars',Телец:'Venus',Близнецы:'Mercury',Рак:'Moon',Лев:'Sun',Дева:'Mercury',Весы:'Venus',Скорпион:'Mars',Стрелец:'Jupiter',Козерог:'Saturn',Водолей:'Saturn',Рыбы:'Jupiter' };

// ---------- Состояние ----------
let swe = null, engineInitPromise = null, jplLoaded = false, jplLoadPromise = null;
let currentMode = 'natal', currentChartData = null, lastState = null;
let citiesDatabase = null, citiesLoadPromise = null;

// ---------- DOM ----------
const form = document.getElementById('birth-form');
const statusEl = document.getElementById('status');
const submitBtn = document.getElementById('submit-btn');
const chartContainer = document.getElementById('chart-container');
const chartTitle = document.getElementById('chart-title');
const interpretationEl = document.getElementById('interpretation');
const partnerSection = document.getElementById('partner-section');
const eventSection = document.getElementById('event-section');
const horarySection = document.getElementById('horary-section');
const eventHint = document.getElementById('event-hint');
const tabs = document.querySelectorAll('.tab');
const historyList = document.getElementById('history-list');
const cityList = document.getElementById('city-list');

// ---------- Тема ----------
const themeToggle = document.getElementById('theme-toggle');
const savedTheme = localStorage.getItem('astro_theme');
const initialTheme = (savedTheme === 'light' || savedTheme === 'dark') ? savedTheme : 'dark';
document.documentElement.dataset.theme = initialTheme;
themeToggle.textContent = initialTheme === 'light' ? '☀️' : '🌙';
themeToggle.addEventListener('click', () => {
  const next = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
  document.documentElement.dataset.theme = next;
  themeToggle.textContent = next === 'light' ? '☀️' : '🌙';
  localStorage.setItem('astro_theme', next);
});

// ---------- Часовые пояса ----------
function populateTimezones(sel) {
  if (!sel || sel.options.length > 1) return;
  const zones = (window.moment?.tz?.names?.() ?? []);
  if (!zones.length) return;
  const def = moment.tz.guess();
  const frag = document.createDocumentFragment();
  for (const z of zones) {
    const o = document.createElement('option');
    o.value = z; o.textContent = z; if (z === def) o.selected = true;
    frag.appendChild(o);
  }
  sel.appendChild(frag);
}
populateTimezones(document.getElementById('birth-timezone'));
populateTimezones(document.getElementById('partner-timezone'));

// ---------- Города ----------
async function loadCities() {
  if (citiesDatabase) return citiesDatabase;
  if (citiesLoadPromise) return citiesLoadPromise;
  citiesLoadPromise = (async () => {
    setStatus('Загрузка базы городов (~2 МБ, один раз)…');
    try {
      const res = await fetch('https://cdn.jsdelivr.net/npm/cities.json@1.1.29/cities.json');
      citiesDatabase = await res.json();
      setStatus('База городов готова.');
      return citiesDatabase;
    } catch (e) { setStatus('Не удалось загрузить базу городов.', true); citiesDatabase = []; return []; }
  })();
  return citiesLoadPromise;
}
async function fillCityDatalist(query) {
  if (!query || query.length < 2) { cityList.innerHTML = ''; return; }
  const db = await loadCities();
  const q = query.toLowerCase();
  cityList.innerHTML = db.filter((c) => c.name?.toLowerCase().includes(q)).slice(0, 20)
    .map((c) => `<option value="${c.name} (${c.country})"></option>`).join('');
}
document.getElementById('birth-city').addEventListener('input', (e) => fillCityDatalist(e.target.value));
document.getElementById('partner-city').addEventListener('input', (e) => fillCityDatalist(e.target.value));

async function autofillCity(cityId, latId, lonId, tzId) {
  const q = document.getElementById(cityId).value.toLowerCase().split('(')[0].trim();
  if (!q) return;
  const db = await loadCities();
  const found = db.find((c) => c.name?.toLowerCase() === q) || db.find((c) => c.name?.toLowerCase().includes(q));
  if (!found) return;
  document.getElementById(latId).value = Number(found.lat).toFixed(4);
  document.getElementById(lonId).value = Number(found.lng).toFixed(4);
  try {
    if (typeof tzlookup === 'function') {
      const zone = tzlookup(Number(found.lat), Number(found.lng));
      const sel = document.getElementById(tzId);
      const opt = Array.from(sel.options).find((o) => o.value === zone);
      if (opt) opt.selected = true;
    }
  } catch (_) {}
  setStatus(`Координаты «${found.name}» подставлены.`);
}
document.getElementById('birth-city').addEventListener('change', () => autofillCity('birth-city', 'birth-lat', 'birth-lon', 'birth-timezone'));
document.getElementById('partner-city').addEventListener('change', () => autofillCity('partner-city', 'partner-lat', 'partner-lon', 'partner-timezone'));

// ---------- Переключение режимов ----------
tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    tabs.forEach((t) => t.classList.remove('active'));
    tab.classList.add('active');
    currentMode = tab.dataset.mode;
    partnerSection.classList.toggle('hidden', !['synastry','composite'].includes(currentMode));
    eventSection.classList.toggle('hidden', !['transit','solar','progression','directions','monthly'].includes(currentMode));
    horarySection.classList.toggle('hidden', currentMode !== 'horary');
    interpretationEl.classList.add('hidden');
    const titles = { natal:'Натальная карта', transit:'Транзитная карта', solar:'Солярная карта', synastry:'Синастрия', progression:'Прогрессии', composite:'Композитная карта', directions:'Символические дирекции', horary:'Хорарная карта', monthly:'Транзиты на месяц' };
    chartTitle.textContent = titles[currentMode];
    const hints = { transit:'Транзиты на указанную дату (UTC).', solar:'Момент возвращения Солнца.', progression:'1 день = 1 год.', directions:'1° = 1 год.', monthly:'Транзиты на 30 дней.' };
    if (hints[currentMode]) eventHint.textContent = hints[currentMode];
  });
});

// ---------- Инициализация движка и JPL ----------
async function initEngine() {
  if (engineInitPromise) return engineInitPromise;
  engineInitPromise = (async () => {
    swe = new SwissEph();
    if (typeof swe.initSwissEph !== 'function') throw new Error('Не найден initSwissEph.');
    await swe.initSwissEph();
    console.log('[swisseph] базовый движок инициализирован (Moshier)');
    loadJPL().catch((e) => console.error('[swisseph] Фоновая ошибка JPL:', e));
    return swe;
  })();
  return engineInitPromise;
}

async function loadJPL() {
  if (jplLoaded || jplLoadPromise) return jplLoadPromise;
  jplLoadPromise = (async () => {
    try {
      setStatus('Загрузка файлов Swiss Ephemeris (JPL)…');
      const files = ['sepl_18.se1', 'semo_18.se1'];
      
      const fs = (swe.SweModule && swe.SweModule.FS) || swe.FS || (swe.Module && swe.Module.FS);
      if (!fs || typeof fs.writeFile !== 'function') {
        throw new Error('Не найден FS API для записи файлов');
      }

      for (const filename of files) {
        const res = await fetch(`ephe/${filename}`);
        if (!res.ok) throw new Error(`HTTP ${res.status} при загрузке ${filename}`);
        const data = new Uint8Array(await res.arrayBuffer());
        fs.writeFile(`/${filename}`, data);
        console.log(`[swisseph] Файл ${filename} записан в память (${(data.length / 1024).toFixed(1)} КБ)`);
      }
      
      if (typeof swe.set_ephe_path === 'function') swe.set_ephe_path('/');
      else if (typeof swe.swe_set_ephe_path === 'function') swe.swe_set_ephe_path('/');
      
      jplLoaded = true;
      console.log('[swisseph] ✅ Точность JPL успешно активирована');
      setStatus('Точность JPL активирована.');
    } catch (e) {
      console.warn('[swisseph] ❌ Ошибка загрузки JPL:', e.message);
      setStatus('Ошибка JPL, используется Moshier.', true);
      jplLoaded = false;
    }
  })();
  return jplLoadPromise;
}

// ---------- Утилиты ----------
function setStatus(msg, isError = false) { statusEl.textContent = msg; statusEl.classList.toggle('error', isError); }
function localToUTC(y, m, d, h, min, tz) {
  const local = moment.tz({ year:y, month:m-1, day:d, hour:h, minute:min }, tz);
  if (!local.isValid()) throw new Error('Некорректная дата/пояс');
  const u = local.clone().utc();
  return { year:u.year(), month:u.month()+1, day:u.date(), hour:u.hour(), minute:u.minute() };
}
function readDate(dateId, timeId, tzId) {
  const dStr = document.getElementById(dateId).value, tStr = document.getElementById(timeId).value, tz = document.getElementById(tzId).value;
  if (!dStr || !tStr || !tz) throw new Error('Заполните дату, время и часовой пояс.');
  const [year, month, day] = dStr.split('-').map(Number);
  const [hour, minute] = tStr.split(':').map(Number);
  return { year, month, day, hour, minute, tz };
}
function isArrayLike(v) { return v && (Array.isArray(v) || (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView(v))); }
function extractLongitude(pos) {
  if (pos == null) return NaN;
  if (typeof pos === 'number') return Number.isFinite(pos) ? pos : NaN;
  if (isArrayLike(pos)) { const a = Array.from(pos); return a.length ? Number(a[0]) : NaN; }
  if (typeof pos === 'object') {
    for (const k of ['longitude','lon','xx','data','result','value']) {
      const v = pos[k]; if (typeof v === 'number' && Number.isFinite(v)) return v;
      if (isArrayLike(v)) { const a = Array.from(v); if (a.length && Number.isFinite(Number(a[0]))) return Number(a[0]); }
    }
  }
  return NaN;
}
async function calcPlanetLongitude(jd, pc, flag) {
  let pos = swe.calc_ut(jd, pc, flag);
  if (pos && typeof pos.then === 'function') pos = await pos;
  return extractLongitude(pos);
}

// ---------- Расчёт карты ----------
async function calculateChartData(utc, lat, lon) {
  await initEngine(); await loadJPL();
  const jd = swe.julday(utc.year, utc.month, utc.day, utc.hour + utc.minute / 60);
  const flag = jplLoaded ? (swe.SEFLG_SWIEPH ?? 2) : (swe.SEFLG_MOSEPH ?? 4);
  console.log(`[swisseph] Расчёт на JD=${jd.toFixed(4)}, движок: ${jplLoaded ? 'JPL' : 'Moshier'}`);

  const planets = {};
  for (const { name, id, fallback } of PLANET_IDS) {
    const pc = swe[id] !== undefined ? swe[id] : fallback;
    const lonDeg = await calcPlanetLongitude(jd, pc, flag);
    planets[name] = [Number.isFinite(lonDeg) ? lonDeg : 0];
  }
  let houses = null;
  try {
    const houseSys = document.getElementById('house-system')?.value || 'P';
    houses = swe.houses(jd, lat, lon, houseSys);
    if (houses && typeof houses.then === 'function') houses = await houses;
  } catch (e) { console.warn('[houses]', e); }

  let cusps = null;
  if (houses && houses.cusps) {
    const raw = houses.cusps, arr = Array.isArray(raw) ? raw : Array.from(raw);
    if (arr.length >= 13) { const slice = arr.slice(1, 13).map(Number); if (slice.every(Number.isFinite)) cusps = slice; }
    else if (arr.length === 12) { const slice = arr.slice(0, 12).map(Number); if (slice.every(Number.isFinite)) cusps = slice; }
  }
  if (!cusps) cusps = [0,30,60,90,120,150,180,210,240,270,300,330];
  return { planets, cusps, jd };
}

// ---------- Соляр ----------
function findSolarReturnJD(natalSunLon, approxYear, month, day) {
  const target = ((natalSunLon % 360) + 360) % 360;
  const flag = jplLoaded ? (swe.SEFLG_SWIEPH ?? 2) : (swe.SEFLG_MOSEPH ?? 4);
  let jd = swe.julday(approxYear, month, day, 12);
  for (let i = 0; i < 10; i++) {
    let pos = swe.calc_ut(jd, 0, flag); if (pos && typeof pos.then === 'function') pos = pos;
    const lon = extractLongitude(pos); let diff = target - lon;
    while (diff > 180) diff -= 360; while (diff <= -180) diff += 360;
    if (Math.abs(diff) < 1e-7) break; jd += diff / 0.9856;
  }
  return jd;
}
async function calculateSolarReturn(natal, approxYear, month, day, lat, lon) {
  const jd = findSolarReturnJD(natal.planets.Sun[0], approxYear, month, day);
  const date = new Date((jd - 2440587.5) * 86400000);
  const utc = { year:date.getUTCFullYear(), month:date.getUTCMonth()+1, day:date.getUTCDate(), hour:date.getUTCHours(), minute:date.getUTCMinutes() };
  const data = await calculateChartData(utc, lat, lon);
  return { ...data, moment: date };
}

// ---------- Прогрессии ----------
async function calculateSecondaryProgression(natal, targetY, targetM, targetD, lat, lon, birthUTC) {
  await initEngine();
  const birth = new Date(Date.UTC(birthUTC.year, birthUTC.month - 1, birthUTC.day));
  const target = new Date(Date.UTC(targetY, targetM - 1, targetD));
  const ageYears = ((target - birth) / 86400000) / 365.2422;
  const natalJD = swe.julday(birthUTC.year, birthUTC.month, birthUTC.day, birthUTC.hour + birthUTC.minute / 60);
  const progJD = natalJD + ageYears;
  const date = new Date((progJD - 2440587.5) * 86400000);
  const utc = { year:date.getUTCFullYear(), month:date.getUTCMonth()+1, day:date.getUTCDate(), hour:date.getUTCHours(), minute:date.getUTCMinutes() };
  const data = await calculateChartData(utc, lat, lon);
  return { ...data, moment: date, ageYears };
}

// ---------- Дирекции ----------
function calculateSymbolicDirections(natal, targetY, targetM, targetD, birthUTC) {
  const birth = new Date(Date.UTC(birthUTC.year, birthUTC.month - 1, birthUTC.day));
  const target = new Date(Date.UTC(targetY, targetM - 1, targetD));
  const ageYears = ((target - birth) / 86400000) / 365.2422;
  const directed = {};
  for (const [name, [lon]] of Object.entries(natal.planets)) directed[name] = [((lon + ageYears) % 360 + 360) % 360];
  return { planets: directed, cusps: natal.cusps, ageYears, jd: natal.jd + ageYears };
}

// ---------- Композит ----------
function midpointLongitude(a, b) { let diff = b - a; while (diff > 180) diff -= 360; while (diff <= -180) diff += 360; return ((a + diff / 2) % 360 + 360) % 360; }
function calculateComposite(A, B) {
  const planets = {}; for (const name of Object.keys(A.planets)) planets[name] = [midpointLongitude(A.planets[name][0], B.planets[name][0])];
  const cusps = A.cusps.map((c, i) => midpointLongitude(c, B.cusps[i]));
  return { planets, cusps, jd: (A.jd + B.jd) / 2 };
}

// ---------- Геометрия и Аспекты ----------
function signOf(lon) { return SIGNS[Math.floor((((lon % 360) + 360) % 360) / 30)]; }
function houseOf(lon, cusps) {
  for (let i = 0; i < 12; i++) { const s = cusps[i], e = cusps[(i + 1) % 12]; if (s <= e ? (lon >= s && lon < e) : (lon >= s || lon < e)) return i + 1; }
  return null;
}
function angleDiff(a, b) { const d = Math.abs(a - b) % 360; return d > 180 ? 360 - d : d; }
function findAspects(A, B, rules) {
  const out = []; const targets = { conjunction:0, opposition:180, trine:120, square:90, sextile:60 };
  for (const [a, [la]] of Object.entries(A)) {
    for (const [b, [lb]] of Object.entries(B)) {
      const diff = angleDiff(la, lb);
      for (const [asp, rule] of Object.entries(rules)) {
        if (Math.abs(diff - targets[asp]) <= rule.orb) { out.push({ a, b, asp, orbit: Math.abs(diff - targets[asp]).toFixed(2) }); break; }
      }
    }
  }
  return out;
}

// ---------- ИИ-Генерация ----------
function generateAIPrompt(mode, data) {
  const lines = [];
  lines.push(`Представь, что ты — профессиональный астролог-исследователь, владеющий методами классической западной астрологии (Вронский, Лилли, Фроули). Напиши максимально подробный, глубокий и структурированный разбор астрологической карты.`);
  lines.push(`\nРежим расчёта: ${mode.toUpperCase()}.`);
  
  lines.push(`\nДанные карты (планеты в знаках и домах):`);
  for (const [p, [lon]] of Object.entries(data.planets)) {
    lines.push(`- ${PLANET_RU[p]}: ${signOf(lon)} (${Math.floor((((lon % 360) + 360) % 360) % 30)}°), ${houseOf(lon, data.cusps)}-й дом.`);
  }
  lines.push(`\nАсцендент: ${signOf(data.cusps[0])}.`);
  const aspects = findAspects(data.planets, data.planets, ASPECT_RULES).filter(x => x.a !== x.b);
  if (aspects.length) {
    lines.push(`\nКлючевые аспекты:`);
    aspects.slice(0, 15).forEach(a => lines.push(`- ${PLANET_RU[a.a]} ${ASPECT_RULES[a.asp].label} ${PLANET_RU[a.b]} (орбис ${a.orbit}°)`));
  }
  
  lines.push(`\nТвоя задача: интерпретировать эти данные с точки зрения психологии, событийности и кармических задач. Опиши сильные стороны, слабые места, потенциал для роста. Разбей текст на главы: 1. Общая характеристика личности. 2. Эмоциональная сфера. 3. Кармические узлы и задачи. 4. Профессиональная реализация. 5. Отношения и партнёрство.`);
  return lines.join('\n');
}

// ---------- Модальное окно ИИ ----------
document.getElementById('ai-analysis').addEventListener('click', async () => {
  if (!lastState) return setStatus('Сначала постройте карту.', true);
  const prompt = generateAIPrompt(lastState.mode, lastState.chart);
  
  document.getElementById('ai-prompt-text').value = prompt;
  document.getElementById('ai-modal').classList.remove('hidden');
  
  try {
    await navigator.clipboard.writeText(prompt);
    setStatus('Промпт скопирован. Вставьте его в ChatGPT.');
  } catch (_) {
    setStatus('Скопируйте промпт из окна вручную.');
  }
});

document.getElementById('ai-copy-again').addEventListener('click', async () => {
  const txt = document.getElementById('ai-prompt-text').value;
  try {
    await navigator.clipboard.writeText(txt);
    setStatus('Скопировано.');
  } catch (_) { alert('Не удалось скопировать. Выделите текст вручную.'); }
});

document.getElementById('ai-open-chatgpt').addEventListener('click', () => {
  window.open('https://chatgpt.com/', '_blank');
});

document.getElementById('ai-close').addEventListener('click', () => {
  document.getElementById('ai-modal').classList.add('hidden');
});

// ---------- Интерпретации на сайте (Краткие) ----------
function interpretNatal(planets, cusps) {
  const lines = [];
  const sun = planets.Sun[0], moon = planets.Moon[0], asc = cusps[0];
  const sunH = houseOf(sun, cusps), moonH = houseOf(moon, cusps);
  lines.push(`☀️ Солнце в ${signOf(sun)} (${ELEMENTS[signOf(sun)]}). ${PLANET_IN_SIGN.Sun[signOf(sun)]} В ${sunH}-м доме — акцент на: ${PLANET_IN_HOUSE.Sun[sunH - 1]}.`);
  lines.push(`🌙 Луна в ${signOf(moon)} (${ELEMENTS[signOf(moon)]}). ${PLANET_IN_SIGN.Moon[signOf(moon)]} В ${moonH}-м доме — эмоциональная сфера: ${PLANET_IN_HOUSE.Moon[moonH - 1]}.`);
  lines.push(`⬆️ Асцендент в ${signOf(asc)} (${ELEMENTS[signOf(asc)]}) — стиль самоподачи.`);
  for (const [name, [lon]] of Object.entries(planets)) {
    if (name === 'Sun' || name === 'Moon') continue;
    lines.push(`• ${PLANET_RU[name]} в ${signOf(lon)}: ${PLANET_IN_SIGN[name]?.[signOf(lon)]} В ${houseOf(lon, cusps)}-м доме — ${PLANET_IN_HOUSE[name]?.[houseOf(lon, cusps) - 1]}.`);
  }
  return lines;
}

function interpretTransit(natal, transit) { return ['Транзиты рассчитаны. Нажмите "🤖 ИИ-разбор" для глубокого анализа.']; }
function interpretSolar(natal, solar) { return ['Соляр рассчитан. Нажмите "🤖 ИИ-разбор" для глубокого анализа.']; }
function interpretSynastry(A, B, cuspsA, cuspsB) { return ['Синастрия рассчитана. Нажмите "🤖 ИИ-разбор" для глубокого анализа.']; }
function interpretProgression(natal, prog) { return ['Прогрессии рассчитаны. Нажмите "🤖 ИИ-разбор" для глубокого анализа.']; }
function interpretDirections(natal, dir) { return ['Дирекции рассчитаны. Нажмите "🤖 ИИ-разбор" для глубокого анализа.']; }
function interpretComposite(c) { return ['Композит рассчитан. Нажмите "🤖 ИИ-разбор" для глубокого анализа.']; }
function rulerOfHouse(cusps, house) { return HOUSE_RULERS[signOf(cusps[house - 1])]; }
function judgeHorary(planets, cusps, questionHouse) { return [`Хорар на ${questionHouse}-й дом рассчитан. Нажмите "🤖 ИИ-разбор" для суждения по Лилли.`]; }

async function monthlyTransits(natal, startDate, days, lat, lon) {
  const events = []; const start = new Date(startDate); const outer = ['Jupiter','Saturn','Uranus','Neptune','Pluto'];
  for (let d = 0; d < days; d += 5) {
    const day = new Date(start.getTime() + d * 86400000);
    const utc = { year:day.getUTCFullYear(), month:day.getUTCMonth()+1, day:day.getUTCDate(), hour:12, minute:0 };
    const tr = await calculateChartData(utc, lat, lon);
    for (const p of outer) { const h = houseOf(tr.planets[p][0], natal.cusps); if (h) events.push({ date: day.toISOString().slice(0,10), planet: p, house: h, sign: signOf(tr.planets[p][0]), theme: TRANSIT_THEMES[p] }); }
  }
  const seen = new Set();
  return events.filter((e) => { const key = `${e.planet}-${e.house}`; if (seen.has(key)) return false; seen.add(key); return true; }).slice(0, 12);
}

// ---------- Отрисовка ----------
function createChart() {
  chartContainer.innerHTML = ''; const paper = document.createElement('div');
  paper.id = 'astrochart-paper'; paper.style.width = '100%'; paper.style.maxWidth = '720px'; chartContainer.appendChild(paper);
  return new astrochart.Chart('astrochart-paper', 720, 720, { MARGIN: 100, SYMBOL_SCALE: 1.2, COLOR_BACKGROUND: 'transparent', COLOR_FOREGROUND: '#e6e8ef', COLOR_LINE: '#8b90a5', ASPECTS: ASPECTS_SETTINGS });
}
function renderSingle(data) { const c = createChart(); const radix = c.radix(data); if (radix?.aspects) radix.aspects(); currentChartData = data; }
function renderBiWheel(base, overlay) {
  const c = createChart(); let radix;
  try { radix = c.radix(base); if (radix?.aspects) radix.aspects(); } catch (e) { return false; }
  let ok = false;
  for (const m of ['transit','synastry']) {
    if (radix && typeof radix[m] === 'function') { try { const o = radix[m](overlay); if (o?.aspects) o.aspects(); ok = true; break; } catch (_) {} }
    if (typeof c[m] === 'function') { try { const o = c[m](overlay); if (o?.aspects) o.aspects(); ok = true; break; } catch (_) {} }
  }
  currentChartData = base; return ok;
}
function showInterpretation(title, lines) { interpretationEl.innerHTML = `<h3>${title}</h3><ul>${lines.map((l) => `<li>${l}</li>`).join('')}</ul>`; interpretationEl.classList.remove('hidden'); }

// ---------- История ----------
function loadHistory() { try { return JSON.parse(localStorage.getItem('astro_history') || '[]'); } catch { return []; } }
function saveHistory(entry) { const h = loadHistory(); h.unshift(entry); localStorage.setItem('astro_history', JSON.stringify(h.slice(0, 10))); renderHistory(); }
function renderHistory() {
  historyList.innerHTML = loadHistory().map((e, i) => `<li><button type="button" class="history-item" data-i="${i}">${e.label} <span class="history-date">${e.date}</span></button></li>`).join('');
  historyList.querySelectorAll('.history-item').forEach((btn) => {
    btn.addEventListener('click', () => {
      const e = loadHistory()[Number(btn.dataset.i)]; if (!e) return;
      document.getElementById('birth-date').value = e.birthDate; document.getElementById('birth-time').value = e.birthTime;
      document.getElementById('birth-timezone').value = e.birthTz; document.getElementById('birth-lat').value = e.birthLat;
      document.getElementById('birth-lon').value = e.birthLon;
    });
  });
}

// ---------- Экспорт ----------
document.getElementById('download-svg').addEventListener('click', () => {
  const svg = chartContainer.querySelector('svg'); if (!svg) return setStatus('Сначала постройте карту.', true);
  const clone = svg.cloneNode(true); const styles = document.querySelector('style');
  if (styles) { const s = document.createElementNS('http://www.w3.org/2000/svg', 'style'); s.textContent = styles.textContent; clone.insertBefore(s, clone.firstChild); }
  const blob = new Blob([clone.outerHTML], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob); const a = document.createElement('a');
  a.href = url; a.download = `astro-${currentMode}-${Date.now()}.svg`; a.click(); URL.revokeObjectURL(url); setStatus('SVG скачан.');
});
document.getElementById('copy-link').addEventListener('click', async () => {
  const params = new URLSearchParams({ mode: currentMode, date: document.getElementById('birth-date').value, time: document.getElementById('birth-time').value, tz: document.getElementById('birth-timezone').value, lat: document.getElementById('birth-lat').value, lon: document.getElementById('birth-lon').value });
  const url = `${location.origin}${location.pathname}?${params}`;
  try { await navigator.clipboard.writeText(url); setStatus('Ссылка скопирована.'); } catch { prompt('Скопируйте ссылку:', url); }
});
async function loadCyrillicFont() {
  const res = await fetch('https://cdn.jsdelivr.net/npm/roboto-font@0.1.0/fonts/Roboto/roboto-regular-webfont.ttf');
  const buf = await res.arrayBuffer(); let bin = ''; const bytes = new Uint8Array(buf);
  for (let i = 0; i < bytes.byteLength; i++) bin += String.fromCharCode(bytes[i]);
  return btoa(bin);
}
document.getElementById('export-pdf').addEventListener('click', async () => {
  const svg = chartContainer.querySelector('svg'); if (!svg) return setStatus('Сначала постройте карту.', true);
  setStatus('Подготовка PDF…');
  try {
    const b64 = await loadCyrillicFont(); const { jsPDF } = window.jspdf; const doc = new jsPDF({ orientation:'portrait', unit:'pt', format:'a4' });
    doc.addFileToVFS('Roboto-Regular.ttf', b64); doc.addFont('Roboto-Regular.ttf', 'Roboto', 'normal'); doc.setFont('Roboto');
    const m = 40; doc.setFontSize(16); doc.text('Астрологическая карта', m, m); doc.setFontSize(10); doc.text(`Режим: ${currentMode}`, m, m + 20); doc.text(`Дата: ${new Date().toLocaleString('ru-RU')}`, m, m + 34);
    const clone = svg.cloneNode(true); const st = document.createElementNS('http://www.w3.org/2000/svg', 'style'); st.textContent = `text{font-family:'Roboto',sans-serif !important;}`; clone.insertBefore(st, clone.firstChild);
    const w = doc.internal.pageSize.getWidth() - m * 2; await doc.svg(clone, { x: m, y: m + 60, width: w, height: w });
    doc.save(`astro-${currentMode}-${Date.now()}.pdf`); setStatus('PDF экспортирован.');
  } catch (e) { console.error(e); setStatus('Ошибка PDF.', true); }
});
document.getElementById('export-json').addEventListener('click', () => { if (!lastState) return setStatus('Сначала постройте карту.', true); const blob = new Blob([JSON.stringify(lastState, null, 2)], { type: 'application/json' }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = `astro-${lastState.mode}.json`; a.click(); URL.revokeObjectURL(url); setStatus('JSON экспортирован.'); });
document.getElementById('import-json').addEventListener('click', () => document.getElementById('import-json-file').click());
document.getElementById('import-json-file').addEventListener('change', (e) => { const f = e.target.files[0]; if (!f) return; const reader = new FileReader(); reader.onload = (ev) => { try { const data = JSON.parse(ev.target.result); if (data.birth) { document.getElementById('birth-date').value = data.birth.date || ''; document.getElementById('birth-time').value = data.birth.time || ''; document.getElementById('birth-timezone').value = data.birth.tz || ''; document.getElementById('birth-lat').value = data.birth.lat || ''; document.getElementById('birth-lon').value = data.birth.lon || ''; } setStatus('JSON импортирован.'); } catch (err) { alert('Ошибка JSON'); } }; reader.readAsText(f); });

// ---------- Восстановление из query ----------
function restoreFromQuery() {
  const p = new URLSearchParams(location.search); if (!p.has('date')) return;
  document.getElementById('birth-date').value = p.get('date') || ''; document.getElementById('birth-time').value = p.get('time') || '';
  if (p.get('tz')) document.getElementById('birth-timezone').value = p.get('tz');
  document.getElementById('birth-lat').value = p.get('lat') || ''; document.getElementById('birth-lon').value = p.get('lon') || '';
  const mode = p.get('mode'); if (mode) { const tab = Array.from(tabs).find((t) => t.dataset.mode === mode); if (tab) tab.click(); }
}

// ---------- Основной обработчик ----------
form.addEventListener('submit', async (e) => {
  e.preventDefault(); submitBtn.disabled = true; setStatus('Инициализация…');
  try {
    await initEngine();
    const b = readDate('birth-date', 'birth-time', 'birth-timezone');
    const utcB = localToUTC(b.year, b.month, b.day, b.hour, b.minute, b.tz);
    const latB = Number(document.getElementById('birth-lat').value); const lonB = Number(document.getElementById('birth-lon').value);
    setStatus('Расчёт основной карты…');
    const natal = await calculateChartData(utcB, latB, lonB);
    lastState = { mode: currentMode, birth: { date: document.getElementById('birth-date').value, time: document.getElementById('birth-time').value, tz: b.tz, lat: latB, lon: lonB }, chart: natal };
    saveHistory({ label: `${currentMode} · ${b.year}-${String(b.month).padStart(2,'0')}-${String(b.day).padStart(2,'0')}`, date: new Date().toLocaleString('ru-RU'), birthDate: document.getElementById('birth-date').value, birthTime: document.getElementById('birth-time').value, birthTz: b.tz, birthLat: latB, birthLon: lonB });

    if (currentMode === 'natal') { renderSingle(natal); showInterpretation('Интерпретация натальной карты', interpretNatal(natal.planets, natal.cusps)); setStatus('Готово.'); }
    else if (currentMode === 'transit') {
      const [y,m,d] = document.getElementById('event-date').value.split('-').map(Number); const [h,mi] = document.getElementById('event-time').value.split(':').map(Number);
      const tr = await calculateChartData({ year:y, month:m, day:d, hour:h, minute:mi }, latB, lonB);
      const ok = renderBiWheel(natal, tr); if (!ok) renderSingle(natal); showInterpretation('Интерпретация транзитов', interpretTransit(natal, tr)); setStatus(ok ? 'Готово.' : 'Карта.');
    }
    else if (currentMode === 'solar') {
      const [y,m,d] = document.getElementById('event-date').value.split('-').map(Number);
      const s = await calculateSolarReturn(natal, y, m, d, latB, lonB); renderSingle(s); chartTitle.textContent = `Соляр · ${s.moment.toISOString().slice(0,16).replace('T',' ')} UTC`; showInterpretation('Интерпретация соляра', interpretSolar(natal, s)); setStatus('Готово.');
    }
    else if (currentMode === 'synastry') {
      const p = readDate('partner-date', 'partner-time', 'partner-timezone'); const utcP = localToUTC(p.year, p.month, p.day, p.hour, p.minute, p.tz);
      const partner = await calculateChartData(utcP, Number(document.getElementById('partner-lat').value), Number(document.getElementById('partner-lon').value));
      const ok = renderBiWheel(natal, partner); if (!ok) renderSingle(natal); showInterpretation('Интерпретация синастрии', interpretSynastry(natal.planets, partner.planets, natal.cusps, partner.cusps)); setStatus(ok ? 'Готово.' : 'Карта A.');
    }
    else if (currentMode === 'progression') {
      const [y,m,d] = document.getElementById('event-date').value.split('-').map(Number);
      const prog = await calculateSecondaryProgression(natal, y, m, d, latB, lonB, utcB); renderSingle(prog); chartTitle.textContent = `Прогрессии (≈${prog.ageYears.toFixed(1)} лет)`; showInterpretation('Прогрессии', interpretProgression(natal, prog)); setStatus('Готово.');
    }
    else if (currentMode === 'composite') {
      const p = readDate('partner-date', 'partner-time', 'partner-timezone'); const utcP = localToUTC(p.year, p.month, p.day, p.hour, p.minute, p.tz);
      const partner = await calculateChartData(utcP, Number(document.getElementById('partner-lat').value), Number(document.getElementById('partner-lon').value));
      const c = calculateComposite(natal, partner); renderSingle(c); showInterpretation('Композит', interpretComposite(c)); setStatus('Готово.');
    }
    else if (currentMode === 'directions') {
      const [y,m,d] = document.getElementById('event-date').value.split('-').map(Number);
      const dir = calculateSymbolicDirections(natal, y, m, d, utcB); renderSingle(dir); chartTitle.textContent = `Дирекции (≈${dir.ageYears.toFixed(1)} лет)`; showInterpretation('Дирекции', interpretDirections(natal, dir)); setStatus('Готово.');
    }
    else if (currentMode === 'horary') {
      const now = new Date(); const utcH = { year:now.getUTCFullYear(), month:now.getUTCMonth()+1, day:now.getUTCDate(), hour:now.getUTCHours(), minute:now.getUTCMinutes() };
      const hChart = await calculateChartData(utcH, latB, lonB); renderSingle(hChart);
      const lines = [`Вопрос: «${document.getElementById('horary-question').value}»`, ...judgeHorary(hChart.planets, hChart.cusps, Number(document.getElementById('horary-house').value))]; showInterpretation('Хорар', lines); setStatus('Готово.');
    }
    else if (currentMode === 'monthly') {
      const list = await monthlyTransits(natal, document.getElementById('event-date').value, 30, latB, lonB); renderSingle(natal);
      showInterpretation('Транзиты на месяц', list.map((t) => `${t.date}: ${PLANET_RU[t.planet]} в ${t.house}-м доме (${t.sign}) — ${t.theme}.`)); setStatus('Готово.');
    }
  } catch (err) { console.error('[fatal]', err); setStatus(err.message || 'Ошибка.', true); } finally { submitBtn.disabled = false; }
});

// ---------- Инициализация ----------
renderHistory(); restoreFromQuery();