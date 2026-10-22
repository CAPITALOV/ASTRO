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
let acgMap = null;

// ---------- DOM ----------
const form = document.getElementById('birth-form');
const statusEl = document.getElementById('status');
const submitBtn = document.getElementById('submit-btn');
const chartContainer = document.getElementById('chart-container');
const acgContainer = document.getElementById('acg-container');
const chartTitle = document.getElementById('chart-title');
const interpretationEl = document.getElementById('interpretation');
const partnerSection = document.getElementById('partner-section');
const eventSection = document.getElementById('event-section');
const horarySection = document.getElementById('horary-section');
const eventHint = document.getElementById('event-hint');
const tabs = document.querySelectorAll('.tab');
const historyList = document.getElementById('history-list');
const cityList = document.getElementById('city-list');

// ---------- Тема и Цвет ----------
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

const accentColorInput = document.getElementById('accent-color');
const savedAccent = localStorage.getItem('astro_accent');
if (savedAccent) {
  document.documentElement.style.setProperty('--accent', savedAccent);
  accentColorInput.value = savedAccent;
}
accentColorInput.addEventListener('input', (e) => {
  document.documentElement.style.setProperty('--accent', e.target.value);
  localStorage.setItem('astro_accent', e.target.value);
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
    setStatus('Загрузка базы городов…');
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
    partnerSection.classList.toggle('hidden', !['synastry','composite','davison'].includes(currentMode));
    eventSection.classList.toggle('hidden', !['transit','solar','progression','directions','monthly','profection','firdaria'].includes(currentMode));
    horarySection.classList.toggle('hidden', currentMode !== 'horary');
    interpretationEl.classList.add('hidden');
    const titles = {
      natal:'Натальная карта', transit:'Транзиты', solar:'Соляр', synastry:'Синастрия',
      progression:'Прогрессии', composite:'Композит', directions:'Дирекции', horary:'Хорар',
      monthly:'Транзиты месяца', profection:'Профекции', firdaria:'Фирдарии',
      davison:'Карта Дэвисона', acg:'Астрокатрография',
      retro:'Ретро-календарь', moon:'Лунный календарь'
    };
    chartTitle.textContent = titles[currentMode] || 'Карта';
    const hints = {
      transit:'Транзиты на дату.', solar:'Возвращение Солнца.', progression:'1 день = 1 год.',
      directions:'1° = 1 год.', monthly:'30 дней.', profection:'Годовая профекция.',
      firdaria:'Планетные периоды.', acg:'Линии планет на карте мира.',
      retro:'Ретро-периоды 8 планет на год.', moon:'Фазы Луны и рекомендации на 30 дней.'
    };
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
    console.log('[swisseph] базовый движок инициализирован');
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
      if (!fs || typeof fs.writeFile !== 'function') throw new Error('Не найден FS API');
      for (const filename of files) {
        const res = await fetch(`ephe/${filename}`);
        if (!res.ok) throw new Error(`HTTP ${res.status} ${filename}`);
        const data = new Uint8Array(await res.arrayBuffer());
        fs.writeFile(`/${filename}`, data);
      }
      if (typeof swe.set_ephe_path === 'function') swe.set_ephe_path('/');
      jplLoaded = true;
      setStatus('Точность JPL активирована.');
    } catch (e) { setStatus('Ошибка JPL, используется Moshier.', true); jplLoaded = false; }
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
function extractSpeed(pos) {
  if (pos == null) return NaN;
  if (isArrayLike(pos)) { const a = Array.from(pos); return a.length > 3 ? Number(a[3]) : NaN; }
  if (typeof pos === 'object') {
    for (const k of ['speed_longitude','speed_lon','speed','dsun','xx']) {
      const v = pos[k];
      if (typeof v === 'number' && Number.isFinite(v)) return v;
      if (isArrayLike(v)) { const a = Array.from(v); if (a.length > 3 && Number.isFinite(Number(a[3]))) return Number(a[3]); }
    }
  }
  return NaN;
}
async function calcPlanetLongitude(jd, pc, flag) {
  let pos = swe.calc_ut(jd, pc, flag);
  if (pos && typeof pos.then === 'function') pos = await pos;
  return extractLongitude(pos);
}
async function calcPlanetSpeed(jd, pc, flag) {
  let pos = swe.calc_ut(jd, pc, flag);
  if (pos && typeof pos.then === 'function') pos = await pos;
  return extractSpeed(pos);
}

// ---------- Расчёт карты ----------
async function calculateChartData(utc, lat, lon) {
  await initEngine(); await loadJPL();
  const jd = swe.julday(utc.year, utc.month, utc.day, utc.hour + utc.minute / 60);
  return calculateChartFromJD(jd, lat, lon);
}

async function calculateChartFromJD(jd, lat, lon) {
  let flag = jplLoaded ? (swe.SEFLG_SWIEPH ?? 2) : (swe.SEFLG_MOSEPH ?? 4);
  const zodiacSys = document.getElementById('zodiac-system')?.value || 'T';
  if (zodiacSys === 'S') {
    try { if (swe.set_sid_mode) swe.set_sid_mode(1); } catch(_) {}
    flag |= (swe.SEFLG_SIDEREAL ?? 65536);
  }
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
  let jd = swe.julday(approxYear, month, day, 12);
  for (let i = 0; i < 10; i++) {
    let pos = swe.calc_ut(jd, 0, swe.SEFLG_MOSEPH ?? 4);
    const lon = extractLongitude(pos); let diff = target - lon;
    while (diff > 180) diff -= 360; while (diff <= -180) diff += 360;
    if (Math.abs(diff) < 1e-7) break; jd += diff / 0.9856;
  }
  return jd;
}
async function calculateSolarReturn(natal, approxYear, month, day, lat, lon) {
  const jd = findSolarReturnJD(natal.planets.Sun[0], approxYear, month, day);
  const date = new Date((jd - 2440587.5) * 86400000);
  const data = await calculateChartFromJD(jd, lat, lon);
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
  const data = await calculateChartFromJD(progJD, lat, lon);
  return { ...data, ageYears };
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

// ---------- Композит и Дэвисон ----------
function midpointLongitude(a, b) { let diff = b - a; while (diff > 180) diff -= 360; while (diff <= -180) diff += 360; return ((a + diff / 2) % 360 + 360) % 360; }
function calculateComposite(A, B) {
  const planets = {}; for (const name of Object.keys(A.planets)) planets[name] = [midpointLongitude(A.planets[name][0], B.planets[name][0])];
  const cusps = A.cusps.map((c, i) => midpointLongitude(c, B.cusps[i]));
  return { planets, cusps, jd: (A.jd + B.jd) / 2 };
}
async function calculateDavison(A, B, latA, lonA, latB, lonB) {
  const jdD = (A.jd + B.jd) / 2;
  const latD = (latA + latB) / 2;
  const lonD = (lonA + lonB) / 2;
  const data = await calculateChartFromJD(jdD, latD, lonD);
  return { ...data, jd: jdD };
}

// ---------- Транзиты месяца ----------
async function monthlyTransits(natal, startDate, days, lat, lon) {
  const events = [];
  const start = new Date(startDate);
  const outer = ['Jupiter','Saturn','Uranus','Neptune','Pluto'];
  for (let d = 0; d < days; d += 5) {
    const day = new Date(start.getTime() + d * 86400000);
    const utc = { year: day.getUTCFullYear(), month: day.getUTCMonth() + 1, day: day.getUTCDate(), hour: 12, minute: 0 };
    const tr = await calculateChartData(utc, lat, lon);
    for (const p of outer) {
      const h = houseOf(tr.planets[p][0], natal.cusps);
      if (h) events.push({ date: day.toISOString().slice(0, 10), planet: p, house: h, sign: signOf(tr.planets[p][0]), theme: TRANSIT_THEMES[p] });
    }
  }
  const seen = new Set();
  return events.filter((e) => {
    const key = `${e.planet}-${e.house}`;
    if (seen.has(key)) return false;
    seen.add(key); return true;
  }).slice(0, 12);
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

document.getElementById('ai-analysis').addEventListener('click', async () => {
  if (!lastState) return setStatus('Сначала постройте карту.', true);
  const prompt = generateAIPrompt(lastState.mode, lastState.chart);
  document.getElementById('ai-prompt-text').value = prompt;
  document.getElementById('ai-modal').classList.remove('hidden');
  try { await navigator.clipboard.writeText(prompt); setStatus('Промпт скопирован.'); } catch (_) { setStatus('Скопируйте вручную.'); }
});
document.getElementById('ai-copy-again').addEventListener('click', async () => {
  const txt = document.getElementById('ai-prompt-text').value;
  try { await navigator.clipboard.writeText(txt); setStatus('Скопировано.'); } catch (_) { alert('Выделите текст вручную.'); }
});
document.getElementById('ai-open-chatgpt').addEventListener('click', () => window.open('https://chatgpt.com/', '_blank'));
document.getElementById('ai-close').addEventListener('click', () => document.getElementById('ai-modal').classList.add('hidden'));

// ---------- Интерпретации ----------
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

function interpretToday(natal, transit, todayStr) {
  const lines = [`📅 Гороскоп на ${todayStr}:`];
  const sunLon = transit.planets.Sun[0], moonLon = transit.planets.Moon[0];
  const sunH = houseOf(sunLon, natal.cusps), moonH = houseOf(moonLon, natal.cusps);
  lines.push(`Транзитное Солнце в ${signOf(sunLon)} в ${sunH}-м натальном доме — фокус на: ${PLANET_IN_HOUSE.Sun[sunH - 1]}.`);
  lines.push(`Транзитная Луна в ${signOf(moonLon)} в ${moonH}-м натальном доме — эмоциональный фон: ${PLANET_IN_HOUSE.Moon[moonH - 1]}.`);
  return lines;
}

function interpretProfection(natal, age) {
  const houseNum = (age % 12) + 1;
  const ruler = HOUSE_RULERS[signOf(natal.cusps[houseNum - 1])];
  const lordHouse = houseOf(natal.planets[ruler][0], natal.cusps);
  return [
    `📖 Профекция на ${age} лет:`,
    `Год управляется ${houseNum}-м домом (${HOUSE_QUESTIONS[houseNum]}).`,
    `Управитель года: ${PLANET_RU[ruler]} в ${signOf(natal.planets[ruler][0])} (${lordHouse}-й дом).`,
    `Фокус на сфере: ${PLANET_IN_HOUSE.Sun[houseNum - 1]}.`
  ];
}

function interpretFirdaria(natal, age) {
  const seq = [
    { p: 'Saturn', years: 11 }, { p: 'Jupiter', years: 12 }, { p: 'Mars', years: 7 },
    { p: 'Sun', years: 10 }, { p: 'Venus', years: 8 }, { p: 'Mercury', years: 13 }, { p: 'Moon', years: 9 },
    { p: 'NorthNode', years: 3 }, { p: 'SouthNode', years: 2 }
  ];
  let currentAge = 0;
  const lines = [`⏳ Фирдарии на ${age} лет:`];
  for (let cycle = 0; cycle < 2; cycle++) {
    for (const item of seq) {
      if (age >= currentAge && age < currentAge + item.years) {
        const yearsIn = age - currentAge;
        if (item.p === 'NorthNode' || item.p === 'SouthNode') {
          lines.push(`Период ${item.p === 'NorthNode' ? 'Северного Узла' : 'Южного Узла'} (${item.years} лет). Год ${yearsIn + 1}.`);
        } else {
          const planetRu = PLANET_RU[item.p];
          const house = houseOf(natal.planets[item.p][0], natal.cusps);
          lines.push(`Главный период: ${planetRu} (${item.years} лет). Год ${yearsIn + 1}. Сфера: ${PLANET_IN_HOUSE.Sun[house - 1]}.`);
          const subseq = ['Saturn','Jupiter','Mars','Sun','Venus','Mercury','Moon'];
          const subLen = item.years / 7;
          const subIndex = Math.floor(yearsIn / subLen);
          lines.push(`Подпериод: ${PLANET_RU[subseq[subIndex]]}.`);
        }
        return lines;
      }
      currentAge += item.years;
    }
  }
  return lines;
}

// ---------- Астрокатрография (ACG) ----------
async function calculateAcgLines(natalData) {
  await initEngine();
  const jd = natalData.jd;
  const lines = [];
  const colors = {
    Sun: '#FFD700', Moon: '#C0C0C0', Mercury: '#87CEEB', Venus: '#FF69B4',
    Mars: '#FF4500', Jupiter: '#FFA500', Saturn: '#8B4513',
    Uranus: '#00CED1', Neptune: '#4169E1', Pluto: '#800080'
  };
  let gst = 0;
  try {
    const gstResult = swe.sidtime(jd);
    gst = typeof gstResult === 'number' ? gstResult : (gstResult?.data?.[0] ?? 0);
  } catch (_) { gst = 0; }

  for (const { name, id, fallback } of PLANET_IDS) {
    const pc = swe[id] !== undefined ? swe[id] : fallback;
    const flagEq = (jplLoaded ? (swe.SEFLG_SWIEPH ?? 2) : (swe.SEFLG_MOSEPH ?? 4)) | (swe.SEFLG_EQUATORIAL ?? 2048);
    let pos = swe.calc_ut(jd, pc, flagEq);
    if (pos && typeof pos.then === 'function') pos = await pos;
    let ra, dec;
    if (Array.isArray(pos) || (pos && typeof pos.length === 'number')) { ra = Number(pos[0]); dec = Number(pos[1]); }
    else if (pos && typeof pos === 'object') { ra = Number(pos.longitude ?? pos.xx?.[0] ?? 0); dec = Number(pos.latitude ?? pos.xx?.[1] ?? 0); }
    else { continue; }
    if (!Number.isFinite(ra) || !Number.isFinite(dec)) continue;
    const color = colors[name] || '#FFFFFF';
    let mcLon = ((ra - gst) % 360 + 360) % 360;
    let icLon = ((mcLon + 180) % 360 + 360) % 360;
    lines.push({ type: 'Feature', properties: { planet: name, line: 'MC', color }, geometry: { type: 'LineString', coordinates: [[mcLon, 85], [mcLon, -85]] } });
    lines.push({ type: 'Feature', properties: { planet: name, line: 'IC', color }, geometry: { type: 'LineString', coordinates: [[icLon, 85], [icLon, -85]] } });
    const decRad = dec * Math.PI / 180;
    const tanDec = Math.tan(decRad);
    const ascPoints = [], dscPoints = [];
    for (let lat = -80; lat <= 80; lat += 5) {
      const latRad = lat * Math.PI / 180;
      const cosH = -Math.tan(latRad) * tanDec;
      if (Math.abs(cosH) > 1) continue;
      const H = Math.acos(cosH) * 180 / Math.PI;
      ascPoints.push([((ra - H - gst) % 360 + 360) % 360, lat]);
      dscPoints.push([((ra + H - gst) % 360 + 360) % 360, lat]);
    }
    if (ascPoints.length > 1) lines.push({ type: 'Feature', properties: { planet: name, line: 'ASC', color }, geometry: { type: 'LineString', coordinates: ascPoints } });
    if (dscPoints.length > 1) lines.push({ type: 'Feature', properties: { planet: name, line: 'DSC', color }, geometry: { type: 'LineString', coordinates: dscPoints } });
  }
  return lines;
}

function isWebglSupported() {
  try {
    const canvas = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (canvas.getContext('webgl2') || canvas.getContext('webgl')));
  } catch (e) {
    return false;
  }
}

function initAcgMap() {
  if (acgMap) return;

  if (!isWebglSupported()) {
    const container = document.getElementById('acg-container');
    container.innerHTML = `
      <div style="padding: 24px; text-align: center; color: var(--text-secondary); font-size: 14px; line-height: 1.5;">
        <p><b>Карта мира недоступна.</b></p>
        <p>Ваш браузер не поддерживает WebGL или аппаратное ускорение отключено.</p>
        <p>Включите аппаратное ускорение в настройках браузера (<code>chrome://gpu</code>) или откройте сайт в другом браузере.</p>
      </div>
    `;
    console.warn('[acg-map] WebGL не поддерживается — карта мира отключена');
    return;
  }

  acgMap = new maplibregl.Map({
    container: 'acg-container',
    style: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
    center: [0, 20], zoom: 1.8, attributionControl: false
  });
  acgMap.on('error', (e) => console.warn('[acg-map]', e));
}

async function renderAcg(natalData) {
  acgContainer.classList.remove('hidden');
  initAcgMap();
  if (!acgMap) {
    setStatus('Карта мира недоступна: WebGL отключён в браузере.', true);
    return;
  }
  await new Promise(resolve => setTimeout(resolve, 100));
  if (acgMap) acgMap.resize();
  const lines = await calculateAcgLines(natalData);
  const draw = () => {
    if (acgMap.getSource('acg-lines')) {
      acgMap.getSource('acg-lines').setData({ type: 'FeatureCollection', features: lines });
      return;
    }
    acgMap.addSource('acg-lines', { type: 'geojson', data: { type: 'FeatureCollection', features: lines } });
    acgMap.addLayer({
      id: 'acg-lines-layer', type: 'line', source: 'acg-lines',
      layout: { 'line-join': 'round', 'line-cap': 'round' },
      paint: { 'line-color': ['get', 'color'], 'line-width': 1.8, 'line-opacity': 0.85, 'line-dasharray': [2, 1] }
    });
  };
  if (acgMap.loaded()) draw(); else acgMap.once('load', draw);
  showInterpretation('Астрокатрография', [
    'На карте показаны линии планет:',
    '• MC (зенит) и IC (надир) — вертикальные меридианы.',
    '• ASC (восход) и DSC (закат) — кривые, зависящие от широты.',
    'Нажмите «🤖 ИИ-разбор» для интерпретации линий.'
  ]);
}

// ---------- Ретро-календарь ----------
async function renderRetroCalendar() {
  await initEngine(); await loadJPL();
  setStatus('Расчёт ретро-периодов (может занять несколько секунд)…');

  const now = new Date();
  const startJd = swe.julday(now.getUTCFullYear(), now.getUTCMonth() + 1, now.getUTCDate(), 0);
  const endJd = startJd + 365;

  const planets = [
    { name: 'Mercury', id: swe.SE_MERCURY ?? 2, step: 1 },
    { name: 'Venus',   id: swe.SE_VENUS ?? 3,   step: 1 },
    { name: 'Mars',    id: swe.SE_MARS ?? 4,    step: 2 },
    { name: 'Jupiter', id: swe.SE_JUPITER ?? 5, step: 3 },
    { name: 'Saturn',  id: swe.SE_SATURN ?? 6,  step: 3 },
    { name: 'Uranus',  id: swe.SE_URANUS ?? 7,  step: 5 },
    { name: 'Neptune', id: swe.SE_NEPTUNE ?? 8, step: 5 },
    { name: 'Pluto',   id: swe.SE_PLUTO ?? 9,   step: 5 },
  ];

  const flag = (swe.SEFLG_SWIEPH ?? 2) | (swe.SEFLG_SPEED ?? 256);
  let html = '<table class="data-table"><thead><tr><th>Планета</th><th>Начало</th><th>Конец</th><th style="text-align:right;">Дней</th></tr></thead><tbody>';

  for (const p of planets) {
    const periods = [];
    let inRetro = false, start = null;
    for (let jd = startJd; jd <= endJd; jd += p.step) {
      const speed = await calcPlanetSpeed(jd, p.id, flag);
      const isRetro = Number.isFinite(speed) && speed < 0;
      if (isRetro && !inRetro) { start = jd; inRetro = true; }
      else if (!isRetro && inRetro) { periods.push({ start, end: jd }); inRetro = false; }
    }
    if (inRetro) periods.push({ start, end: endJd });

    if (!periods.length) {
      html += `<tr><td>${PLANET_RU[p.name]}</td><td colspan="3" style="color:var(--text-secondary);">Нет ретро-периодов</td></tr>`;
      continue;
    }
    for (const per of periods) {
      const sd = new Date((per.start - 2440587.5) * 86400000);
      const ed = new Date((per.end - 2440587.5) * 86400000);
      const days = Math.round(per.end - per.start);
      const isCurrent = now >= sd && now <= ed;
      const rowStyle = isCurrent ? 'style="background: rgba(255,159,10,0.15);"' : '';
      html += `<tr ${rowStyle}><td>${PLANET_RU[p.name]}${isCurrent ? ' 🔴' : ''}</td><td>${sd.toLocaleDateString('ru-RU')}</td><td>${ed.toLocaleDateString('ru-RU')}</td><td style="text-align:right;">${days}</td></tr>`;
    }
  }
  html += '</tbody></table>';

  chartContainer.innerHTML = html;
  chartTitle.textContent = 'Ретро-календарь на год';
  interpretationEl.classList.add('hidden');
  setStatus('Готово. Красным — текущий ретро-период.');
}

// ---------- Лунный календарь ----------
async function renderLunarCalendar() {
  await initEngine(); await loadJPL();
  setStatus('Расчёт лунного календаря…');

  const now = new Date();
  const startJd = swe.julday(now.getUTCFullYear(), now.getUTCMonth() + 1, now.getUTCDate(), 12);
  const moonId = swe.SE_MOON ?? 1;
  const sunId = swe.SE_SUN ?? 0;
  const flag = (swe.SEFLG_SWIEPH ?? 2);

  const advice = {
    'Овен': 'Активные действия, спорт',
    'Телец': 'Финансы, покупки, сад',
    'Близнецы': 'Общение, учёба, документы',
    'Рак': 'Дом, семья, отдых',
    'Лев': 'Творчество, романтика',
    'Дева': 'Порядок, аналитика, здоровье',
    'Весы': 'Договоры, красота, свидания',
    'Скорпион': 'Трансформация, исследования',
    'Стрелец': 'Путешествия, обучение',
    'Козерог': 'Карьера, планирование, цели',
    'Водолей': 'Новаторство, друзья, техника',
    'Рыбы': 'Отдых, духовность, медитация'
  };

  let html = '<table class="data-table"><thead><tr><th>Дата</th><th style="text-align:center;">Фаза</th><th>Знак Луны</th><th>Рекомендация</th></tr></thead><tbody>';

  for (let d = 0; d < 30; d++) {
    const jd = startJd + d;
    const date = new Date((jd - 2440587.5) * 86400000);
    const moonLon = await calcPlanetLongitude(jd, moonId, flag);
    const sunLon = await calcPlanetLongitude(jd, sunId, flag);
    const phase = ((moonLon - sunLon) % 360 + 360) % 360;

    let sym, phaseName;
    if (phase < 22.5 || phase >= 337.5) { sym = '🌑'; phaseName = 'Новолуние'; }
    else if (phase < 67.5)  { sym = '🌒'; phaseName = 'Растущий серп'; }
    else if (phase < 112.5) { sym = '🌓'; phaseName = '1-я четверть'; }
    else if (phase < 157.5) { sym = '🌔'; phaseName = 'Растущая'; }
    else if (phase < 202.5) { sym = '🌕'; phaseName = 'Полнолуние'; }
    else if (phase < 247.5) { sym = '🌖'; phaseName = 'Убывающая'; }
    else if (phase < 292.5) { sym = '🌗'; phaseName = '3-я четверть'; }
    else { sym = '🌘'; phaseName = 'Убывающий серп'; }

    const sign = signOf(moonLon);
    const isFull = sym === '🌕';
    const isNew = sym === '🌑';
    const rowStyle = isFull ? 'style="background: rgba(212,160,23,0.15);"' : (isNew ? 'style="background: rgba(120,120,128,0.15);"' : '');

    html += `<tr ${rowStyle}><td>${date.toLocaleDateString('ru-RU', { day: '2-digit', month: 'short' })}</td><td style="text-align:center;font-size:18px;">${sym}</td><td>${sign} <span style="color:var(--text-secondary);font-size:11px;">(${phaseName})</span></td><td style="color:var(--text-secondary);">${advice[sign]}</td></tr>`;
  }
  html += '</tbody></table>';

  chartContainer.innerHTML = html;
  chartTitle.textContent = 'Лунный календарь на 30 дней';
  interpretationEl.classList.add('hidden');
  setStatus('Готово. 🌕 — полнолуние, 🌑 — новолуние.');
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
  const svg = chartContainer.querySelector('svg'); if (!svg) return setStatus('Сначала карта.', true);
  const clone = svg.cloneNode(true); const styles = document.querySelector('style');
  if (styles) { const s = document.createElementNS('http://www.w3.org/2000/svg', 'style'); s.textContent = styles.textContent; clone.insertBefore(s, clone.firstChild); }
  const blob = new Blob([clone.outerHTML], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob); const a = document.createElement('a');
  a.href = url; a.download = `astro-${currentMode}-${Date.now()}.svg`; a.click(); URL.revokeObjectURL(url); setStatus('SVG скачан.');
});
document.getElementById('copy-link').addEventListener('click', async () => {
  const params = new URLSearchParams({ mode: currentMode, date: document.getElementById('birth-date').value, time: document.getElementById('birth-time').value, tz: document.getElementById('birth-timezone').value, lat: document.getElementById('birth-lat').value, lon: document.getElementById('birth-lon').value });
  const url = `${location.origin}${location.pathname}?${params}`;
  try { await navigator.clipboard.writeText(url); setStatus('Ссылка скопирована.'); } catch { prompt('Скопируйте:', url); }
});
async function loadCyrillicFont() {
  const res = await fetch('https://cdn.jsdelivr.net/npm/roboto-font@0.1.0/fonts/Roboto/roboto-regular-webfont.ttf');
  const buf = await res.arrayBuffer(); let bin = ''; const bytes = new Uint8Array(buf);
  for (let i = 0; i < bytes.byteLength; i++) bin += String.fromCharCode(bytes[i]);
  return btoa(bin);
}
document.getElementById('export-pdf').addEventListener('click', async () => {
  const svg = chartContainer.querySelector('svg'); if (!svg) return setStatus('Сначала карта.', true);
  setStatus('PDF…');
  try {
    const b64 = await loadCyrillicFont(); const { jsPDF } = window.jspdf; const doc = new jsPDF({ orientation:'portrait', unit:'pt', format:'a4' });
    doc.addFileToVFS('Roboto-Regular.ttf', b64); doc.addFont('Roboto-Regular.ttf', 'Roboto', 'normal'); doc.setFont('Roboto');
    const m = 40; doc.setFontSize(16); doc.text('Астрологическая карта', m, m);
    const clone = svg.cloneNode(true); const st = document.createElementNS('http://www.w3.org/2000/svg', 'style'); st.textContent = `text{font-family:'Roboto',sans-serif !important;}`; clone.insertBefore(st, clone.firstChild);
    const w = doc.internal.pageSize.getWidth() - m * 2; await doc.svg(clone, { x: m, y: m + 60, width: w, height: w });
    doc.save(`astro-${currentMode}-${Date.now()}.pdf`); setStatus('PDF сохранён.');
  } catch (e) { console.error(e); setStatus('Ошибка PDF.', true); }
});
document.getElementById('export-json').addEventListener('click', () => { if (!lastState) return setStatus('Сначала карта.', true); const blob = new Blob([JSON.stringify(lastState, null, 2)], { type: 'application/json' }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = `astro-${lastState.mode}.json`; a.click(); URL.revokeObjectURL(url); setStatus('JSON.'); });
document.getElementById('import-json').addEventListener('click', () => document.getElementById('import-json-file').click());
document.getElementById('import-json-file').addEventListener('change', (e) => { const f = e.target.files[0]; if (!f) return; const reader = new FileReader(); reader.onload = (ev) => { try { const data = JSON.parse(ev.target.result); if (data.birth) { document.getElementById('birth-date').value = data.birth.date || ''; document.getElementById('birth-time').value = data.birth.time || ''; document.getElementById('birth-timezone').value = data.birth.tz || ''; document.getElementById('birth-lat').value = data.birth.lat || ''; document.getElementById('birth-lon').value = data.birth.lon || ''; } setStatus('JSON импортирован.'); } catch (err) { alert('Ошибка JSON'); } }; reader.readAsText(f); });

// Кнопка "На сегодня"
document.getElementById('today-horoscope').addEventListener('click', async () => {
  if (!lastState) return setStatus('Сначала постройте натальную карту.', true);
  const b = lastState.birth;
  const natal = await calculateChartData(localToUTC(b.year || new Date(b.date).getFullYear(), new Date(b.date).getMonth() + 1, new Date(b.date).getDate(), 12, 0, b.tz), b.lat, b.lon);
  const now = new Date();
  const utcNow = { year: now.getUTCFullYear(), month: now.getUTCMonth() + 1, day: now.getUTCDate(), hour: 12, minute: 0 };
  const transit = await calculateChartData(utcNow, b.lat, b.lon);
  const dateStr = now.toLocaleDateString('ru-RU');
  const lines = interpretToday(natal, transit, dateStr);
  showInterpretation('Гороскоп на сегодня', lines);
});

// ---------- Луна без курса ----------
async function checkMoonVoidOfCourse() {
  const widget = document.getElementById('moon-voc');
  const textEl = document.getElementById('moon-voc-text');
  if (!widget || !textEl) return;

  widget.style.display = 'flex';
  widget.querySelector('.status-dot').style.background = '#30d158';
  textEl.textContent = '🌙 Луна в движении';

  try {
    const now = new Date();
    const jd = swe.julday(now.getUTCFullYear(), now.getUTCMonth() + 1, now.getUTCDate(), now.getUTCHours() + now.getUTCMinutes() / 60);
    const flag = (swe.SEFLG_SWIEPH ?? 2) | (swe.SEFLG_SPEED ?? 256);
    const moonId = swe.SE_MOON ?? 1;
    const moonLon = await calcPlanetLongitude(jd, moonId, flag);
    if (!Number.isFinite(moonLon)) return;
    const moonSign = Math.floor(moonLon / 30);

    let lastAspectJd = null, nextIngressJd = null;
    const aspectAngles = [0, 60, 90, 120, 180];
    const planets = [swe.SE_SUN ?? 0, swe.SE_MERCURY ?? 2, swe.SE_VENUS ?? 3, swe.SE_MARS ?? 4, swe.SE_JUPITER ?? 5, swe.SE_SATURN ?? 6];

    for (let step = 0; step < 60; step++) {
      const currentJd = jd + step / 24;
      const currentLon = await calcPlanetLongitude(currentJd, moonId, flag);
      if (!Number.isFinite(currentLon)) continue;
      if (Math.floor(currentLon / 30) !== moonSign) { nextIngressJd = currentJd; break; }
      for (const planet of planets) {
        const planetLon = await calcPlanetLongitude(currentJd, planet, (swe.SEFLG_SWIEPH ?? 2));
        if (!Number.isFinite(planetLon)) continue;
        let diff = Math.abs(currentLon - planetLon) % 360;
        if (diff > 180) diff = 360 - diff;
        for (const angle of aspectAngles) {
          if (Math.abs(diff - angle) < 0.5) { lastAspectJd = currentJd; break; }
        }
        if (lastAspectJd) break;
      }
      if (lastAspectJd && nextIngressJd) break;
    }

    if (lastAspectJd && nextIngressJd && lastAspectJd < jd && jd < nextIngressJd) {
      const endDate = new Date((nextIngressJd - 2440587.5) * 86400000);
      textEl.textContent = `🌙 Луна без курса до ${endDate.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}`;
      widget.querySelector('.status-dot').style.background = '#ff453a';
    }
  } catch (e) { console.error('[moon-voc]', e); }
}

// ---------- Ретроградный Меркурий ----------
async function checkMercuryRetrograde() {
  const widget = document.getElementById('mercury-retro');
  const textEl = document.getElementById('mercury-retro-text');
  if (!widget || !textEl) return;

  widget.style.display = 'flex';
  widget.querySelector('.status-dot').style.background = '#30d158';
  textEl.textContent = '☿ Меркурий директный';

  try {
    const now = new Date();
    const jd = swe.julday(now.getUTCFullYear(), now.getUTCMonth() + 1, now.getUTCDate(), now.getUTCHours() + now.getUTCMinutes() / 60);
    const flag = (swe.SEFLG_SWIEPH ?? 2) | (swe.SEFLG_SPEED ?? 256);
    const mercuryId = swe.SE_MERCURY ?? 2;
    const speed = await calcPlanetSpeed(jd, mercuryId, flag);

    if (Number.isFinite(speed) && speed < 0) {
      let endJd = jd;
      for (let step = 1; step < 30; step++) {
        const futureJd = jd + step;
        const futureSpeed = await calcPlanetSpeed(futureJd, mercuryId, flag);
        if (futureSpeed > 0) { endJd = futureJd; break; }
      }
      const endDate = new Date((endJd - 2440587.5) * 86400000);
      textEl.textContent = `☿ Меркурий ретро до ${endDate.toLocaleDateString('ru-RU')}`;
      widget.querySelector('.status-dot').style.background = '#ff9f0a';
    }
  } catch (e) { console.error('[mercury-retro]', e); }
}

// ---------- Туториал ----------
function startTutorial() {
  if (typeof introJs === 'undefined') return;
  introJs().setOptions({
    steps: [
      { intro: '<h3>Добро пожаловать! 🔮</h3><p style="margin:8px 0 0;">Короткий тур (30 сек) покажет, как рассчитать карту.</p>' },
      { element: document.querySelector('#tour-modes'), intro: '🎯 <b>15 методов.</b> Начните с «Натальной».', position: 'bottom' },
      { element: document.querySelector('#birth-form'), intro: '📝 <b>Данные рождения.</b> Начните с города.', position: 'right' },
      { element: document.querySelector('#house-system'), intro: '🏠 <b>Система домов.</b> Плацидус — популярный.', position: 'right' },
      { element: document.querySelector('#submit-btn'), intro: '🚀 <b>Рассчитать.</b> Нажмите для построения карты.', position: 'top' },
      { element: document.querySelector('#tour-toolbar'), intro: '📤 <b>Экспорт</b> в SVG, PDF, JSON.', position: 'bottom' },
      { element: document.querySelector('#ai-analysis'), intro: '🤖 <b>ИИ-разбор.</b> Копирует промпт для ChatGPT.', position: 'bottom' },
      { element: document.querySelector('#interpretation'), intro: '📖 <b>Интерпретация</b> по Вронскому.', position: 'top' },
    ],
    showProgress: true, showBullets: false, exitOnOverlayClick: false,
    nextLabel: 'Далее →', prevLabel: '← Назад', doneLabel: 'Готово!', skipLabel: 'Пропустить',
    tooltipClass: 'custom-tooltip', highlightClass: 'custom-highlight',
  }).oncomplete(() => localStorage.setItem('astro_tutorial_done', '1'))
    .onexit(() => localStorage.setItem('astro_tutorial_done', '1'))
    .start();
}
document.getElementById('tutorial-btn').addEventListener('click', startTutorial);
if (!localStorage.getItem('astro_tutorial_done')) setTimeout(startTutorial, 1000);

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
  e.preventDefault(); submitBtn.disabled = true; setStatus('Расчёт…');
  try {
    await initEngine();
    const b = readDate('birth-date', 'birth-time', 'birth-timezone');
    const utcB = localToUTC(b.year, b.month, b.day, b.hour, b.minute, b.tz);
    const latB = Number(document.getElementById('birth-lat').value); const lonB = Number(document.getElementById('birth-lon').value);

    if (currentMode === 'retro') {
      chartContainer.classList.remove('hidden');
      acgContainer.classList.add('hidden');
      await renderRetroCalendar();
      submitBtn.disabled = false;
      return;
    }
    if (currentMode === 'moon') {
      chartContainer.classList.remove('hidden');
      acgContainer.classList.add('hidden');
      await renderLunarCalendar();
      submitBtn.disabled = false;
      return;
    }

    const natal = await calculateChartData(utcB, latB, lonB);
    lastState = { mode: currentMode, birth: { date: document.getElementById('birth-date').value, time: document.getElementById('birth-time').value, tz: b.tz, lat: latB, lon: lonB }, chart: natal };
    saveHistory({ label: `${currentMode} · ${b.year}-${String(b.month).padStart(2,'0')}-${String(b.day).padStart(2,'0')}`, date: new Date().toLocaleString('ru-RU'), birthDate: document.getElementById('birth-date').value, birthTime: document.getElementById('birth-time').value, birthTz: b.tz, birthLat: latB, birthLon: lonB });

    acgContainer.classList.add('hidden');
    chartContainer.classList.remove('hidden');

    if (currentMode === 'natal') { renderSingle(natal); showInterpretation('Натальная карта', interpretNatal(natal.planets, natal.cusps)); setStatus('Готово.'); }
    else if (currentMode === 'transit') {
      const [y,m,d] = document.getElementById('event-date').value.split('-').map(Number); const [h,mi] = document.getElementById('event-time').value.split(':').map(Number);
      const tr = await calculateChartData({ year:y, month:m, day:d, hour:h, minute:mi }, latB, lonB);
      const ok = renderBiWheel(natal, tr); if (!ok) renderSingle(natal);
      showInterpretation('Транзиты', ['Нажмите 🤖 ИИ-разбор.']); setStatus(ok ? 'Готово.' : 'Карта.');
    }
    else if (currentMode === 'solar') {
      const [y,m,d] = document.getElementById('event-date').value.split('-').map(Number);
      const s = await calculateSolarReturn(natal, y, m, d, latB, lonB); renderSingle(s);
      chartTitle.textContent = `Соляр · ${s.moment.toISOString().slice(0,16).replace('T',' ')}`; showInterpretation('Соляр', ['Нажмите 🤖 ИИ-разбор.']); setStatus('Готово.');
    }
    else if (currentMode === 'synastry') {
      const p = readDate('partner-date', 'partner-time', 'partner-timezone'); const utcP = localToUTC(p.year, p.month, p.day, p.hour, p.minute, p.tz);
      const partner = await calculateChartData(utcP, Number(document.getElementById('partner-lat').value), Number(document.getElementById('partner-lon').value));
      const ok = renderBiWheel(natal, partner); if (!ok) renderSingle(natal);
      showInterpretation('Синастрия', ['Нажмите 🤖 ИИ-разбор.']); setStatus(ok ? 'Готово.' : 'Карта.');
    }
    else if (currentMode === 'progression') {
      const [y,m,d] = document.getElementById('event-date').value.split('-').map(Number);
      const prog = await calculateSecondaryProgression(natal, y, m, d, latB, lonB, utcB); renderSingle(prog);
      chartTitle.textContent = `Прогрессии (${prog.ageYears.toFixed(1)} лет)`; showInterpretation('Прогрессии', ['Нажмите 🤖 ИИ-разбор.']); setStatus('Готово.');
    }
    else if (currentMode === 'composite') {
      const p = readDate('partner-date', 'partner-time', 'partner-timezone'); const utcP = localToUTC(p.year, p.month, p.day, p.hour, p.minute, p.tz);
      const partner = await calculateChartData(utcP, Number(document.getElementById('partner-lat').value), Number(document.getElementById('partner-lon').value));
      const c = calculateComposite(natal, partner); renderSingle(c); showInterpretation('Композит', ['Нажмите 🤖 ИИ-разбор.']); setStatus('Готово.');
    }
    else if (currentMode === 'davison') {
      const p = readDate('partner-date', 'partner-time', 'partner-timezone'); const utcP = localToUTC(p.year, p.month, p.day, p.hour, p.minute, p.tz);
      const partner = await calculateChartData(utcP, Number(document.getElementById('partner-lat').value), Number(document.getElementById('partner-lon').value));
      const dav = await calculateDavison(natal, partner, latB, lonB, Number(document.getElementById('partner-lat').value), Number(document.getElementById('partner-lon').value));
      renderSingle(dav);
      chartTitle.textContent = `Карта Дэвисона`;
      showInterpretation('Карта Дэвисона', ['Нажмите 🤖 ИИ-разбор.']); setStatus('Готово.');
    }
    else if (currentMode === 'directions') {
      const [y,m,d] = document.getElementById('event-date').value.split('-').map(Number);
      const dir = calculateSymbolicDirections(natal, y, m, d, utcB); renderSingle(dir);
      chartTitle.textContent = `Дирекции (${dir.ageYears.toFixed(1)} лет)`; showInterpretation('Дирекции', ['Нажмите 🤖 ИИ-разбор.']); setStatus('Готово.');
    }
    else if (currentMode === 'horary') {
      const now = new Date(); const utcH = { year:now.getUTCFullYear(), month:now.getUTCMonth()+1, day:now.getUTCDate(), hour:now.getUTCHours(), minute:now.getUTCMinutes() };
      const hChart = await calculateChartData(utcH, latB, lonB); renderSingle(hChart);
      const lines = [`Вопрос: «${document.getElementById('horary-question').value}»`]; showInterpretation('Хорар', lines); setStatus('Готово.');
    }
    else if (currentMode === 'monthly') {
      const evD = document.getElementById('event-date').value;
      const list = await monthlyTransits(natal, evD, 30, latB, lonB); renderSingle(natal);
      showInterpretation('Транзиты месяца', list.map(t => `${t.date}: ${PLANET_RU[t.planet]} в ${t.house}-м доме.`)); setStatus('Готово.');
    }
    else if (currentMode === 'profection') {
      const currentYear = new Date().getFullYear();
      const birthYear = new Date(document.getElementById('birth-date').value).getFullYear();
      renderSingle(natal); showInterpretation('Профекции', interpretProfection(natal, currentYear - birthYear)); setStatus('Готово.');
    }
    else if (currentMode === 'firdaria') {
      const currentYear = new Date().getFullYear();
      const birthYear = new Date(document.getElementById('birth-date').value).getFullYear();
      renderSingle(natal); showInterpretation('Фирдарии', interpretFirdaria(natal, currentYear - birthYear)); setStatus('Готово.');
    }
    else if (currentMode === 'acg') {
      chartContainer.classList.add('hidden');
      await renderAcg(natal); setStatus('Астрокатрография построена.');
    }
  } catch (err) { console.error(err); setStatus(err.message || 'Ошибка.', true); } finally { submitBtn.disabled = false; }
});

// ---------- Инициализация ----------
(async () => {
  await initEngine();
  await checkMercuryRetrograde();
  await checkMoonVoidOfCourse();
  setInterval(() => { checkMercuryRetrograde(); checkMoonVoidOfCourse(); }, 3600000);
})();
renderHistory(); restoreFromQuery();