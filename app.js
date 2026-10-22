import SwissEph from 'https://cdn.jsdelivr.net/gh/prolaxu/swisseph-wasm@main/src/swisseph.js';

// ---------- Константы ----------
const PLANET_IDS = [
  { name: 'Sun', id: 'SE_SUN', fallback: 0 },
  { name: 'Moon', id: 'SE_MOON', fallback: 1 },
  { name: 'Mercury', id: 'SE_MERCURY', fallback: 2 },
  { name: 'Venus', id: 'SE_VENUS', fallback: 3 },
  { name: 'Mars', id: 'SE_MARS', fallback: 4 },
  { name: 'Jupiter', id: 'SE_JUPITER', fallback: 5 },
  { name: 'Saturn', id: 'SE_SATURN', fallback: 6 },
  { name: 'Uranus', id: 'SE_URANUS', fallback: 7 },
  { name: 'Neptune', id: 'SE_NEPTUNE', fallback: 8 },
  { name: 'Pluto', id: 'SE_PLUTO', fallback: 9 },
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
  Овен:'Огонь',Лев:'Огонь',Стрелец:'Огонь',
  Телец:'Земля',Дева:'Земля',Козерог:'Земля',
  Близнецы:'Воздух',Весы:'Воздух',Водолей:'Воздух',
  Рак:'Вода',Скорпион:'Вода',Рыбы:'Вода',
};
const PLANET_RU = {
  Sun:'Солнце',Moon:'Луна',Mercury:'Меркурий',Venus:'Венера',
  Mars:'Марс',Jupiter:'Юпитер',Saturn:'Сатурн',Uranus:'Уран',
  Neptune:'Нептун',Pluto:'Плутон',
};

// ---------- Вронский: планета в знаке ----------
const PLANET_IN_SIGN = {
  Sun: { Овен:'Яркая воля, инициатива, лидерство.',Телец:'Устойчивость, практичность, ценность материального.',Близнецы:'Любознательность, подвижность ума.',Рак:'Эмоциональная глубина, забота, привязанность к дому.',Лев:'Творческая самоподача, великодушие, потребность в признании.',Дева:'Аналитичность, точность, служение через пользу.',Весы:'Дипломатичность, эстетика, поиск гармонии.',Скорпион:'Страстность, глубина, трансформация.',Стрелец:'Оптимизм, поиск смысла, расширение.',Козерог:'Целеустремлённость, структура, ответственность.',Водолей:'Оригинальность, свобода, гуманизм.',Рыбы:'Чувствительность, интуиция, духовность.' },
  Moon: { Овен:'Эмоциональная импульсивность, потребность в действии.',Телец:'Потребность в стабильности и комфорте.',Близнецы:'Эмоции через общение, потребность в информации.',Рак:'Глубокая чувствительность, потребность в защите.',Лев:'Потребность в признании и творческом самовыражении.',Дева:'Потребность в порядке, анализе, полезности.',Весы:'Потребность в гармонии и партнёрстве.',Скорпион:'Эмоциональная глубина, потребность в близости.',Стрелец:'Потребность в свободе и смысле.',Козерог:'Потребность в структуре и достижениях.',Водолей:'Потребность в независимости и дружбе.',Рыбы:'Эмпатия, потребность в уединении, духовность.' },
  Mercury: { Овен:'Быстрое, прямое мышление; речь импульсивна.',Телец:'Медленное, основательное мышление.',Близнецы:'Быстрый, гибкий, любознательный ум.',Рак:'Эмоциональное мышление, цепкая память.',Лев:'Уверенная, выразительная речь.',Дева:'Точный, аналитический ум.',Весы:'Взвешенное мышление, дипломатичная речь.',Скорпион:'Глубокое, проницательное мышление.',Стрелец:'Широкое мышление, вдохновляющая речь.',Козерог:'Структурное, серьёзное мышление.',Водолей:'Оригинальное, нестандартное мышление.',Рыбы:'Интуитивное, образное мышление.' },
  Venus: { Овен:'Любовь-завоевание, страстность.',Телец:'Любовь-стабильность, чувственность.',Близнецы:'Любовь-общение, лёгкость.',Рак:'Любовь-забота, глубокая привязанность.',Лев:'Любовь-восхищение, щедрость.',Дева:'Любовь-служение, практическая забота.',Весы:'Любовь-гармония, партнёрство.',Скорпион:'Любовь-страсть, глубина, трансформация.',Стрелец:'Любовь-приключение, свобода.',Козерог:'Любовь-ответственность, верность.',Водолей:'Любовь-дружба, свобода.',Рыбы:'Любовь-растворение, романтика.' },
  Mars: { Овен:'Прямое действие, инициатива, смелость.',Телец:'Упорство, выносливость.',Близнецы:'Действие через слово, многозадачность.',Рак:'Действие через защиту, эмоциональная мотивация.',Лев:'Действие через творчество, лидерство.',Дева:'Методичность, точность.',Весы:'Действие через партнёрство, дипломатию.',Скорпион:'Стратегия, скрытая сила.',Стрелец:'Энтузиазм, риск.',Козерог:'Дисциплина, долгосрочные усилия.',Водолей:'Нестандартные методы.',Рыбы:'Интуитивное действие, вдохновение.' },
  Jupiter: { Овен:'Рост через инициативу, смелые начинания.',Телец:'Материальное расширение.',Близнецы:'Рост через знания и общение.',Рак:'Рост через заботу и семью.',Лев:'Рост через творчество и великодушие.',Дева:'Рост через служение и практическую пользу.',Весы:'Рост через партнёрство и справедливость.',Скорпион:'Рост через трансформацию.',Стрелец:'Расширение горизонтов, философия.',Козерог:'Рост через структуру и ответственность.',Водолей:'Рост через инновации и коллектив.',Рыбы:'Духовный рост, сострадание.' },
  Saturn: { Овен:'Уроки терпения в действии.',Телец:'Уроки управления ресурсами.',Близнецы:'Уроки концентрации и глубины.',Рак:'Уроки эмоциональной зрелости.',Лев:'Уроки творческой дисциплины.',Дева:'Уроки точности и служения.',Весы:'Уроки ответственности в партнёрстве.',Скорпион:'Уроки трансформации и контроля.',Стрелец:'Уроки веры и дисциплины в расширении.',Козерог:'Уроки структуры, карьеры, зрелости.',Водолей:'Уроки свободы и ответственности.',Рыбы:'Уроки принятия, границ, духовной дисциплины.' },
  Uranus: { Овен:'Прорывы через инициативу.',Телец:'Перемены в ценностях и материальной сфере.',Близнецы:'Революция в общении.',Рак:'Перемены в семье и эмоциональной сфере.',Лев:'Творческие прорывы.',Дева:'Инновации в работе и здоровье.',Весы:'Перемены в партнёрстве.',Скорпион:'Глубинные трансформации, кризисы обновления.',Стрелец:'Прорывы в мировоззрении.',Козерог:'Перемены в структурах и власти.',Водолей:'Революция в коллективах и технологиях.',Рыбы:'Духовные прорывы.' },
  Neptune: { Овен:'Вдохновенное действие, иллюзии.',Телец:'Иллюзии в материальном.',Близнецы:'Туман в общении, вдохновенное слово.',Рак:'Эмоциональные иллюзии, духовная связь с домом.',Лев:'Творческие иллюзии, вдохновение.',Дева:'Иллюзии в здоровье и работе.',Весы:'Идеализация партнёрства.',Скорпион:'Глубинные иллюзии, мистика.',Стрелец:'Религиозные искания.',Козерог:'Иллюзии в структуре и карьере.',Водолей:'Коллективные иллюзии, духовные движения.',Рыбы:'Мистика, растворение, высшая интуиция.' },
  Pluto: { Овен:'Трансформация через действие.',Телец:'Трансформация ценностей и ресурсов.',Близнецы:'Трансформация мышления и общения.',Рак:'Трансформация семьи и корней.',Лев:'Трансформация творчества и самовыражения.',Дева:'Трансформация работы и здоровья.',Весы:'Трансформация партнёрства и справедливости.',Скорпион:'Глубокая трансформация, власть, кризисы.',Стрелец:'Трансформация убеждений и веры.',Козерог:'Трансформация структур и карьеры.',Водолей:'Трансформация коллективов и технологий.',Рыбы:'Духовная трансформация, мистика.' },
};

// ---------- Вронский: планета в доме ----------
const PLANET_IN_HOUSE = {
  Sun: ['личность, внешнее «Я»','ценности, деньги, безопасность','общение, ближнее окружение, обучение','дом, семья, корни','творчество, романтика, дети','работа, здоровье, рутина','партнёрство, брак, союзы','кризисы, трансформация, чужие ресурсы','мировоззрение, путешествия, высшее образование','карьера, репутация, цель','друзья, коллективы, будущее','уединение, подсознание, духовность'],
  Moon: ['эмоциональное «Я», внешность','эмоциональная безопасность, финансы','эмоциональные контакты','дом, семья','творчество, дети','работа, здоровье','партнёрство','кризисы','путешествия','карьера','друзья','уединение'],
  Mercury: ['самовыражение','финансовое мышление','общение','семейные разговоры','творческое мышление','рабочие идеи','партнёрское общение','исследование','учёба, путешествия','деловое общение','дружеские связи','скрытое мышление'],
  Venus: ['привлекательность','финансы','общение','семья','творчество','работа','партнёрство','страсть','путешествия','карьера','дружба','уединение'],
  Mars: ['энергия','финансы','общение','дом','творчество','работа','партнёрство','кризисы','путешествия','карьера','друзья','скрытая энергия'],
  Jupiter: ['рост личности','финансовый рост','обучение','семейное расширение','творческий рост','рабочий рост','партнёрский рост','трансформация','путешествия','карьерный рост','дружеский рост','духовный рост'],
  Saturn: ['самоограничение','финансовая дисциплина','дисциплина общения','семейные обязанности','творческая дисциплина','рабочая дисциплина','партнёрская ответственность','кризисная дисциплина','дисциплина мировоззрения','карьерная дисциплина','дружеская ответственность','духовная дисциплина'],
  Uranus: ['перемены в «Я»','финансовые перемены','перемены в общении','семейные перемены','творческие перемены','рабочие перемены','партнёрские перемены','кризисные перемены','перемены в мировоззрении','карьерные перемены','дружеские перемены','духовные перемены'],
  Neptune: ['иллюзии о себе','финансовые иллюзии','туман в общении','семейные иллюзии','творческие иллюзии','иллюзии в работе','иллюзии в партнёрстве','кризисные иллюзии','духовные искания','карьерные иллюзии','дружеские иллюзии','мистика, уединение'],
  Pluto: ['трансформация «Я»','финансовая трансформация','трансформация общения','семейная трансформация','творческая трансформация','рабочая трансформация','партнёрская трансформация','глубокая трансформация','трансформация мировоззрения','карьерная трансформация','трансформация дружбы','духовная трансформация'],
};

const TRANSIT_THEMES = {
  Jupiter:'рост, возможности, расширение',Saturn:'проверка, структура, ответственность',
  Uranus:'перемены, свобода, внезапность',Neptune:'растворение границ, мечты, иллюзии',
  Pluto:'трансформация, кризис, глубокая перестройка',
};

const ASPECT_RULES = {
  conjunction:{ orb:6, label:'соединение', nature:'слияние' },
  opposition: { orb:6, label:'оппозиция', nature:'противостояние' },
  trine:      { orb:5, label:'трин', nature:'гармония' },
  square:     { orb:5, label:'квадрат', nature:'напряжение' },
  sextile:    { orb:4, label:'секстиль', nature:'возможности' },
};

const HOUSE_QUESTIONS = {
  1:'личность, здоровье, внешность',2:'деньги, ресурсы, ценности',
  3:'общение, поездки, обучение',4:'дом, семья, недвижимость',
  5:'дети, творчество, романтика',6:'работа (наёмная), здоровье',
  7:'партнёрство, брак, контракты',8:'кризисы, чужие деньги, трансформация',
  9:'путешествия, высшее образование',10:'карьера, репутация, успех',
  11:'друзья, коллективы, планы',12:'тайны, враги, уединение',
};

const HOUSE_RULERS = {
  Овен:'Mars',Телец:'Venus',Близнецы:'Mercury',Рак:'Moon',Лев:'Sun',Дева:'Mercury',
  Весы:'Venus',Скорпион:'Mars',Стрелец:'Jupiter',Козерог:'Saturn',Водолей:'Saturn',Рыбы:'Jupiter',
};

// ---------- Состояние ----------
let swe = null;
let engineInitPromise = null;
let jplLoaded = false;
let jplLoadPromise = null;
let currentMode = 'natal';
let currentChartData = null;
let lastState = null;
let citiesDatabase = null;
let citiesLoadPromise = null;

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
    o.value = z; o.textContent = z;
    if (z === def) o.selected = true;
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
    } catch (e) {
      console.warn('[cities]', e);
      setStatus('Не удалось загрузить базу городов.', true);
      citiesDatabase = [];
      return [];
    }
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
    const titles = {
      natal:'Натальная карта', transit:'Транзитная карта', solar:'Солярная карта',
      synastry:'Синастрия', progression:'Прогрессии', composite:'Композитная карта',
      directions:'Символические дирекции', horary:'Хорарная карта', monthly:'Транзиты на месяц',
    };
    chartTitle.textContent = titles[currentMode];
    const hints = {
      transit:'Транзиты рассчитываются на указанную дату (UTC).',
      solar:'Будет найден точный момент возвращения Солнца в натальную долготу.',
      progression:'Вторичные прогрессии: 1 день = 1 год.',
      directions:'Символические дирекции: 1° = 1 год.',
      monthly:'Список важных транзитов на 30 дней с указанной даты.',
    };
    if (hints[currentMode]) eventHint.textContent = hints[currentMode];
  });
});

// ---------- Инициализация движка и JPL ----------
async function initEngine() {
  if (engineInitPromise) return engineInitPromise;
  engineInitPromise = (async () => {
    swe = new SwissEph();
    if (typeof swe.initSwissEph !== 'function') throw new Error('Не найден метод initSwissEph.');
    await swe.initSwissEph();
    console.log('[swisseph] базовый движок инициализирован (Moshier)');
    loadJPL().catch(() => {});
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
      for (const filename of files) {
        const res = await fetch(`ephe/${filename}`);
        if (!res.ok) throw new Error(`HTTP ${res.status} ${filename}`);
        const data = new Uint8Array(await res.arrayBuffer());
        if (typeof swe.FS_createDataFile === 'function') {
          swe.FS_createDataFile('/', filename, data, true, true);
        } else if (swe.FS && typeof swe.FS.writeFile === 'function') {
          swe.FS.writeFile(filename, data);
        }
      }
      if (typeof swe.set_ephe_path === 'function') {
        swe.set_ephe_path('/');
      }
      jplLoaded = true;
      console.log('[swisseph] Файлы JPL успешно загружены в память');
      setStatus('Точность JPL активирована.');
    } catch (e) {
      console.warn('[swisseph] Ошибка загрузки JPL:', e);
      setStatus('Не удалось загрузить JPL-эфемериды. Используется Moshier.', true);
    }
  })();
  return jplLoadPromise;
}

// ---------- Утилиты ----------
function setStatus(msg, isError = false) {
  statusEl.textContent = msg;
  statusEl.classList.toggle('error', isError);
  console.log('[status]', isError ? 'ERROR:' : 'OK:', msg);
}
function localToUTC(y, m, d, h, min, tz) {
  const local = moment.tz({ year:y, month:m-1, day:d, hour:h, minute:min }, tz);
  if (!local.isValid()) throw new Error(`Некорректная дата/пояс: ${tz}`);
  const u = local.clone().utc();
  return { year:u.year(), month:u.month()+1, day:u.date(), hour:u.hour(), minute:u.minute() };
}
function readDate(dateId, timeId, tzId) {
  const dStr = document.getElementById(dateId).value;
  const tStr = document.getElementById(timeId).value;
  const tz = document.getElementById(tzId).value;
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
      const v = pos[k];
      if (typeof v === 'number' && Number.isFinite(v)) return v;
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
  await initEngine();
  await loadJPL();
  const jd = swe.julday(utc.year, utc.month, utc.day, utc.hour + utc.minute / 60);
  const flag = jplLoaded ? (swe.SEFLG_SWIEPH ?? 2) : (swe.SEFLG_MOSEPH ?? 4);

  const planets = {};
  for (const { name, id, fallback } of PLANET_IDS) {
    const pc = swe[id] !== undefined ? swe[id] : fallback;
    const lonDeg = await calcPlanetLongitude(jd, pc, flag);
    planets[name] = [Number.isFinite(lonDeg) ? lonDeg : 0];
  }
  let houses = null;
  try {
    houses = swe.houses(jd, lat, lon, 'P');
    if (houses && typeof houses.then === 'function') houses = await houses;
  } catch (e) { console.warn('[houses]', e); }

  let cusps = null;
  if (houses && houses.cusps) {
    const raw = houses.cusps;
    const arr = Array.isArray(raw) ? raw : Array.from(raw);
    if (arr.length >= 13) {
      const slice = arr.slice(1, 13).map(Number);
      if (slice.every(Number.isFinite)) cusps = slice;
    } else if (arr.length === 12) {
      const slice = arr.slice(0, 12).map(Number);
      if (slice.every(Number.isFinite)) cusps = slice;
    }
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
    let pos = swe.calc_ut(jd, 0, flag);
    if (pos && typeof pos.then === 'function') pos = pos;
    const lon = extractLongitude(pos);
    let diff = target - lon;
    while (diff > 180) diff -= 360;
    while (diff <= -180) diff += 360;
    if (Math.abs(diff) < 1e-7) break;
    jd += diff / 0.9856;
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
  for (const [name, [lon]] of Object.entries(natal.planets)) {
    directed[name] = [((lon + ageYears) % 360 + 360) % 360];
  }
  return { planets: directed, cusps: natal.cusps, ageYears, jd: natal.jd + ageYears };
}

// ---------- Композит ----------
function midpointLongitude(a, b) {
  let diff = b - a;
  while (diff > 180) diff -= 360;
  while (diff <= -180) diff += 360;
  return ((a + diff / 2) % 360 + 360) % 360;
}
function calculateComposite(A, B) {
  const planets = {};
  for (const name of Object.keys(A.planets)) {
    planets[name] = [midpointLongitude(A.planets[name][0], B.planets[name][0])];
  }
  const cusps = A.cusps.map((c, i) => midpointLongitude(c, B.cusps[i]));
  return { planets, cusps, jd: (A.jd + B.jd) / 2 };
}

// ---------- Геометрия ----------
function signOf(lon) { return SIGNS[Math.floor((((lon % 360) + 360) % 360) / 30)]; }
function houseOf(lon, cusps) {
  for (let i = 0; i < 12; i++) {
    const s = cusps[i], e = cusps[(i + 1) % 12];
    if (s <= e ? (lon >= s && lon < e) : (lon >= s || lon < e)) return i + 1;
  }
  return null;
}
function angleDiff(a, b) { const d = Math.abs(a - b) % 360; return d > 180 ? 360 - d : d; }
function findAspects(A, B, rules) {
  const out = [];
  const targets = { conjunction:0, opposition:180, trine:120, square:90, sextile:60 };
  for (const [a, [la]] of Object.entries(A)) {
    for (const [b, [lb]] of Object.entries(B)) {
      const diff = angleDiff(la, lb);
      for (const [asp, rule] of Object.entries(rules)) {
        if (Math.abs(diff - targets[asp]) <= rule.orb) {
          out.push({ a, b, asp, orbit: Math.abs(diff - targets[asp]).toFixed(2) });
          break;
        }
      }
    }
  }
  return out;
}

// ---------- Интерпретации ----------
function interpretNatal(planets, cusps) {
  const lines = [];
  const sun = planets.Sun[0], moon = planets.Moon[0], asc = cusps[0];
  const sunSign = signOf(sun), moonSign = signOf(moon), ascSign = signOf(asc);
  const sunH = houseOf(sun, cusps), moonH = houseOf(moon, cusps);
  lines.push(`☀️ Солнце в ${sunSign} (${ELEMENTS[sunSign]}). ${PLANET_IN_SIGN.Sun[sunSign]}`);
  lines.push(`   В ${sunH}-м доме — акцент на: ${PLANET_IN_HOUSE.Sun[sunH - 1]}.`);
  lines.push(`🌙 Луна в ${moonSign} (${ELEMENTS[moonSign]}). ${PLANET_IN_SIGN.Moon[moonSign]}`);
  lines.push(`   В ${moonH}-м доме — эмоциональная сфера: ${PLANET_IN_HOUSE.Moon[moonH - 1]}.`);
  lines.push(`⬆️ Асцендент в ${ascSign} (${ELEMENTS[ascSign]}) — стиль самоподачи.`);
  for (const [name, [lon]] of Object.entries(planets)) {
    if (name === 'Sun' || name === 'Moon') continue;
    const s = signOf(lon), h = houseOf(lon, cusps);
    const t = PLANET_IN_SIGN[name]?.[s];
    const ht = h ? PLANET_IN_HOUSE[name]?.[h - 1] : '';
    if (t) lines.push(`• ${PLANET_RU[name]} в ${s}: ${t}${ht ? ` В ${h}-м доме — ${ht}.` : ''}`);
  }
  const aspects = findAspects(planets, planets, ASPECT_RULES)
    .filter((x) => x.a !== x.b && (['Sun','Moon'].includes(x.a) || ['Sun','Moon'].includes(x.b)))
    .slice(0, 5);
  for (const a of aspects) {
    lines.push(`• ${PLANET_RU[a.a]} — ${PLANET_RU[a.b]}: ${ASPECT_RULES[a.asp].label} (орбис ${a.orbit}°) — ${ASPECT_RULES[a.asp].nature}.`);
  }
  return lines;
}

function interpretTransit(natal, transit) {
  const lines = [];
  const outer = ['Jupiter','Saturn','Uranus','Neptune','Pluto'];
  for (const p of outer) {
    const lon = transit.planets[p][0];
    const h = houseOf(lon, natal.cusps);
    if (h) lines.push(`${PLANET_RU[p]} (${signOf(lon)}) в ${h}-м натальном доме — тема: ${PLANET_IN_HOUSE.Sun[h - 1]}. Характер: ${TRANSIT_THEMES[p]}.`);
  }
  const points = { Sun: natal.planets.Sun[0], Moon: natal.planets.Moon[0], Asc: natal.cusps[0] };
  const tMap = {}, nMap = {};
  for (const p of outer) tMap[p] = [transit.planets[p][0]];
  for (const [k, v] of Object.entries(points)) nMap[k] = [v];
  const rules = { conjunction:{orb:3},opposition:{orb:3},trine:{orb:3},square:{orb:3},sextile:{orb:2} };
  const cross = findAspects(tMap, nMap, rules).slice(0, 6);
  for (const a of cross) {
    const nn = a.b === 'Asc' ? 'Асценденту' : `натальной ${PLANET_RU[a.b]}`;
    lines.push(`🔮 Транзитный ${PLANET_RU[a.a]} ${a.asp} к ${nn} (орбис ${a.orbit}°) — ${TRANSIT_THEMES[a.a]}.`);
  }
  if (!cross.length) lines.push('Внешние планеты сейчас не образуют точных аспектов к личным точкам.');
  return lines;
}

function interpretSolar(natal, solar) {
  const lines = [];
  const solarAsc = solar.cusps[0], solarSun = solar.planets.Sun[0];
  const sunH = houseOf(solarSun, solar.cusps);
  const sunNatH = houseOf(solarSun, natal.cusps);
  lines.push(`☀️ Солнечный соляр на ${solar.moment.toISOString().slice(0, 16).replace('T', ' ')} UTC.`);
  lines.push(`⬆️ Асцендент соляра в ${signOf(solarAsc)} — тон года: ${PLANET_IN_SIGN.Sun[signOf(solarAsc)]}`);
  lines.push(`☀️ Солнце соляра в ${sunH}-м доме — акцент года: ${PLANET_IN_HOUSE.Sun[sunH - 1]}.`);
  if (sunNatH) lines.push(`🎯 Солнце соляра в ${sunNatH}-м натальном доме — активирует: ${PLANET_IN_HOUSE.Sun[sunNatH - 1]}.`);
  for (const p of ['Jupiter','Saturn','Mars','Venus','Moon']) {
    const h = houseOf(solar.planets[p][0], natal.cusps);
    if (h) lines.push(`${PLANET_RU[p]} соляра в ${h}-м натальном доме — ${PLANET_IN_HOUSE.Sun[h - 1]}.`);
  }
  const aspects = findAspects(solar.planets, solar.planets, ASPECT_RULES)
    .filter((x) => x.a !== x.b && (['Sun','Moon'].includes(x.a) || ['Sun','Moon'].includes(x.b)))
    .slice(0, 5);
  for (const a of aspects) lines.push(`• ${PLANET_RU[a.a]} — ${PLANET_RU[a.b]}: ${ASPECT_RULES[a.asp].label} (орбис ${a.orbit}°).`);
  if (!aspects.length) lines.push('• Мажорных аспектов между светилами в соляре нет.');
  return lines;
}

function interpretSynastry(A, B, cuspsA, cuspsB) {
  const aspects = findAspects(A, B, ASPECT_RULES);
  const lines = [];
  const keyPairs = [['Sun','Moon'],['Moon','Sun'],['Venus','Mars'],['Mars','Venus'],['Sun','Venus'],['Venus','Sun'],['Moon','Venus'],['Venus','Moon']];
  for (const [a, b] of keyPairs) {
    const f = aspects.find((x) => x.a === a && x.b === b);
    if (f) lines.push(`🔹 ${PLANET_RU[a]} — ${PLANET_RU[b]}: ${ASPECT_RULES[f.asp].label} (орбис ${f.orbit}°) — ${ASPECT_RULES[f.asp].nature}.`);
  }
  const lum = aspects.filter((x) => ['Sun','Moon'].includes(x.a) || ['Sun','Moon'].includes(x.b));
  for (const a of lum.slice(0, 6)) {
    lines.push(`• ${PLANET_RU[a.a]} и ${PLANET_RU[a.b]}: ${ASPECT_RULES[a.asp].label}.`);
  }
  for (const [name, [lon]] of Object.entries(A)) {
    const h = houseOf(lon, cuspsB);
    if (h) lines.push(`${PLANET_RU[name]} A в ${h}-м доме B — активирует ${PLANET_IN_HOUSE.Sun[h - 1]}.`);
  }
  if (!lines.length) lines.push('Явных мажорных аспектов не обнаружено.');
  return lines;
}

function interpretProgression(natal, prog) {
  const lines = [];
  const sun = prog.planets.Sun[0], moon = prog.planets.Moon[0];
  lines.push(`Прогрессивное Солнце: ${signOf(sun)} — ${PLANET_IN_SIGN.Sun[signOf(sun)]}`);
  lines.push(`Прогрессивная Луна: ${signOf(moon)} — ${PLANET_IN_SIGN.Moon[signOf(moon)]}`);
  const hS = houseOf(sun, natal.cusps), hM = houseOf(moon, natal.cusps);
  if (hS) lines.push(`Прогрессивное Солнце в ${hS}-м натальном доме — ${PLANET_IN_HOUSE.Sun[hS - 1]}.`);
  if (hM) lines.push(`Прогрессивная Луна в ${hM}-м натальном доме — ${PLANET_IN_HOUSE.Moon[hM - 1]}.`);
  const rules = { conjunction:{orb:3},opposition:{orb:3},trine:{orb:3},square:{orb:3},sextile:{orb:2} };
  const cross = findAspects(prog.planets, natal.planets, rules).slice(0, 5);
  for (const a of cross) lines.push(`• Прогрессивный ${PLANET_RU[a.a]} ${a.asp} к натальному ${PLANET_RU[a.b]} (орбис ${a.orbit}°).`);
  return lines;
}

function interpretDirections(natal, dir) {
  const lines = [];
  lines.push(`Дирекции на возраст ≈ ${dir.ageYears.toFixed(1)} лет (1° = 1 год).`);
  lines.push(`Дирекционное Солнце: ${signOf(dir.planets.Sun[0])}.`);
  lines.push(`Дирекционная Луна: ${signOf(dir.planets.Moon[0])}.`);
  const rules = { conjunction:{orb:3},opposition:{orb:3},trine:{orb:3},square:{orb:3},sextile:{orb:2} };
  const cross = findAspects(dir.planets, natal.planets, rules).slice(0, 5);
  for (const a of cross) lines.push(`• Дирекционный ${PLANET_RU[a.a]} ${a.asp} к натальному ${PLANET_RU[a.b]} (орбис ${a.orbit}°).`);
  if (!cross.length) lines.push('Точных аспектов дирекционных планет к натальным нет.');
  return lines;
}

function interpretComposite(c) {
  const s = signOf(c.planets.Sun[0]), m = signOf(c.planets.Moon[0]), a = signOf(c.cusps[0]);
  return [
    `Солнце композита в ${s} — цель пары: ${PLANET_IN_SIGN.Sun[s]}`,
    `Луна композита в ${m} — эмоциональный фон: ${PLANET_IN_SIGN.Moon[m]}`,
    `Асцендент композита в ${a} — восприятие пары.`,
  ];
}

// ---------- Хорар ----------
function rulerOfHouse(cusps, house) {
  return HOUSE_RULERS[signOf(cusps[house - 1])];
}
function judgeHorary(planets, cusps, questionHouse) {
  const lines = [];
  const lord1 = rulerOfHouse(cusps, 1);
  const lordQ = rulerOfHouse(cusps, questionHouse);
  const moon = planets.Moon[0];
  lines.push(`Вопрос относится к ${questionHouse}-му дому: ${HOUSE_QUESTIONS[questionHouse]}.`);
  lines.push(`Кверент: ${PLANET_RU[lord1]} (${signOf(planets[lord1][0])}, ${houseOf(planets[lord1][0], cusps)}-й дом) и Луна (${signOf(moon)}, ${houseOf(moon, cusps)}-й дом).`);
  lines.push(`Квезит: ${PLANET_RU[lordQ]} (${signOf(planets[lordQ][0])}, ${houseOf(planets[lordQ][0], cusps)}-й дом).`);
  const a = findAspects({ [lord1]: planets[lord1] }, { [lordQ]: planets[lordQ] }, ASPECT_RULES);
  if (a.length) {
    lines.push(`Аспект между сигнификаторами: ${a[0].asp} (орбис ${a[0].orbit}°) — развитие событий будет.`);
  } else {
    lines.push(`Точного аспекта между ${lord1} и ${lordQ} нет — прямой развязки не ожидается.`);
  }
  lines.push('⚠️ Учебный разбор. Для профессионального суждения нужны рецепция, достоинства, сожжение, лунные узлы.');
  return lines;
}

// ---------- Транзиты месяца ----------
async function monthlyTransits(natal, startDate, days, lat, lon) {
  const events = [];
  const start = new Date(startDate);
  const outer = ['Jupiter','Saturn','Uranus','Neptune','Pluto'];
  for (let d = 0; d < days; d += 5) {
    const day = new Date(start.getTime() + d * 86400000);
    const utc = { year:day.getUTCFullYear(), month:day.getUTCMonth()+1, day:day.getUTCDate(), hour:12, minute:0 };
    const tr = await calculateChartData(utc, lat, lon);
    for (const p of outer) {
      const lonP = tr.planets[p][0];
      const h = houseOf(lonP, natal.cusps);
      if (h) events.push({ date: day.toISOString().slice(0,10), planet: p, house: h, sign: signOf(lonP), theme: TRANSIT_THEMES[p] });
    }
  }
  const seen = new Set();
  return events.filter((e) => {
    const key = `${e.planet}-${e.house}`;
    if (seen.has(key)) return false;
    seen.add(key); return true;
  }).slice(0, 12);
}

// ---------- JSON ----------
function exportChart(state) {
  const payload = { version: 1, createdAt: new Date().toISOString(), ...state };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `astro-${state.mode}-${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);
}
function importChart(file, onLoad) {
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result);
      if (!data.birth) throw new Error('Нет поля birth');
      onLoad(data);
    } catch (err) { alert('Не удалось прочитать JSON: ' + err.message); }
  };
  reader.readAsText(file);
}

// ---------- Отрисовка ----------
function createChart() {
  chartContainer.innerHTML = '';
  const paper = document.createElement('div');
  paper.id = 'astrochart-paper';
  paper.style.width = '100%';
  paper.style.maxWidth = '720px';
  chartContainer.appendChild(paper);
  return new astrochart.Chart('astrochart-paper', 720, 720, {
    MARGIN: 100, SYMBOL_SCALE: 1.2,
    COLOR_BACKGROUND: 'transparent', COLOR_FOREGROUND: '#e6e8ef', COLOR_LINE: '#8b90a5',
    ASPECTS: ASPECTS_SETTINGS,
  });
}
function renderSingle(data) {
  const c = createChart();
  const radix = c.radix(data);
  if (radix && typeof radix.aspects === 'function') radix.aspects();
  currentChartData = data;
}
function renderBiWheel(base, overlay) {
  const c = createChart();
  let radix;
  try {
    radix = c.radix(base);
    if (radix && typeof radix.aspects === 'function') radix.aspects();
  } catch (e) { return false; }
  let ok = false;
  for (const m of ['transit','synastry']) {
    if (radix && typeof radix[m] === 'function') {
      try { const o = radix[m](overlay); if (o?.aspects) o.aspects(); ok = true; break; } catch (_) {}
    }
    if (typeof c[m] === 'function') {
      try { const o = c[m](overlay); if (o?.aspects) o.aspects(); ok = true; break; } catch (_) {}
    }
  }
  currentChartData = base;
  return ok;
}
function showInterpretation(title, lines) {
  interpretationEl.innerHTML = `<h3>${title}</h3><ul>${lines.map((l) => `<li>${l}</li>`).join('')}</ul>`;
  interpretationEl.classList.remove('hidden');
}

// ---------- История ----------
function loadHistory() { try { return JSON.parse(localStorage.getItem('astro_history') || '[]'); } catch { return []; } }
function saveHistory(entry) {
  const h = loadHistory(); h.unshift(entry);
  localStorage.setItem('astro_history', JSON.stringify(h.slice(0, 10)));
  renderHistory();
}
function renderHistory() {
  historyList.innerHTML = loadHistory().map((e, i) => `
    <li><button type="button" class="history-item" data-i="${i}">${e.label} <span class="history-date">${e.date}</span></button></li>
  `).join('');
  historyList.querySelectorAll('.history-item').forEach((btn) => {
    btn.addEventListener('click', () => {
      const e = loadHistory()[Number(btn.dataset.i)];
      if (!e) return;
      document.getElementById('birth-date').value = e.birthDate;
      document.getElementById('birth-time').value = e.birthTime;
      document.getElementById('birth-timezone').value = e.birthTz;
      document.getElementById('birth-lat').value = e.birthLat;
      document.getElementById('birth-lon').value = e.birthLon;
    });
  });
}

// ---------- Кнопки экспорта ----------
document.getElementById('download-svg').addEventListener('click', () => {
  const svg = chartContainer.querySelector('svg');
  if (!svg) return setStatus('Сначала постройте карту.', true);
  const clone = svg.cloneNode(true);
  const styles = document.querySelector('style');
  if (styles) {
    const s = document.createElementNS('http://www.w3.org/2000/svg', 'style');
    s.textContent = styles.textContent;
    clone.insertBefore(s, clone.firstChild);
  }
  const blob = new Blob([clone.outerHTML], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = `astro-${currentMode}-${Date.now()}.svg`;
  a.click(); URL.revokeObjectURL(url);
  setStatus('SVG скачан.');
});

document.getElementById('copy-link').addEventListener('click', async () => {
  const params = new URLSearchParams({
    mode: currentMode,
    date: document.getElementById('birth-date').value,
    time: document.getElementById('birth-time').value,
    tz: document.getElementById('birth-timezone').value,
    lat: document.getElementById('birth-lat').value,
    lon: document.getElementById('birth-lon').value,
  });
  const url = `${location.origin}${location.pathname}?${params}`;
  try { await navigator.clipboard.writeText(url); setStatus('Ссылка скопирована.'); }
  catch { prompt('Скопируйте ссылку:', url); }
});

async function loadCyrillicFont() {
  const res = await fetch('https://cdn.jsdelivr.net/npm/roboto-font@0.1.0/fonts/Roboto/roboto-regular-webfont.ttf');
  const buf = await res.arrayBuffer();
  let bin = '';
  const bytes = new Uint8Array(buf);
  for (let i = 0; i < bytes.byteLength; i++) bin += String.fromCharCode(bytes[i]);
  return btoa(bin);
}
document.getElementById('export-pdf').addEventListener('click', async () => {
  const svg = chartContainer.querySelector('svg');
  if (!svg) return setStatus('Сначала постройте карту.', true);
  setStatus('Подготовка PDF…');
  try {
    const b64 = await loadCyrillicFont();
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation:'portrait', unit:'pt', format:'a4' });
    doc.addFileToVFS('Roboto-Regular.ttf', b64);
    doc.addFont('Roboto-Regular.ttf', 'Roboto', 'normal');
    doc.setFont('Roboto');
    const m = 40;
    doc.setFontSize(16); doc.text('Астрологическая карта', m, m);
    doc.setFontSize(10); doc.text(`Режим: ${currentMode}`, m, m + 20);
    doc.text(`Дата: ${new Date().toLocaleString('ru-RU')}`, m, m + 34);
    const clone = svg.cloneNode(true);
    const st = document.createElementNS('http://www.w3.org/2000/svg', 'style');
    st.textContent = `text{font-family:'Roboto',sans-serif !important;}`;
    clone.insertBefore(st, clone.firstChild);
    const w = doc.internal.pageSize.getWidth() - m * 2;
    await doc.svg(clone, { x: m, y: m + 60, width: w, height: w });
    doc.save(`astro-${currentMode}-${Date.now()}.pdf`);
    setStatus('PDF экспортирован.');
  } catch (e) { console.error(e); setStatus('Ошибка PDF.', true); }
});

document.getElementById('export-json').addEventListener('click', () => {
  if (!lastState) return setStatus('Сначала постройте карту.', true);
  exportChart(lastState);
  setStatus('JSON экспортирован.');
});
document.getElementById('import-json').addEventListener('click', () => document.getElementById('import-json-file').click());
document.getElementById('import-json-file').addEventListener('change', (e) => {
  const f = e.target.files[0]; if (!f) return;
  importChart(f, (data) => {
    if (data.birth) {
      document.getElementById('birth-date').value = data.birth.date || '';
      document.getElementById('birth-time').value = data.birth.time || '';
      document.getElementById('birth-timezone').value = data.birth.tz || '';
      document.getElementById('birth-lat').value = data.birth.lat || '';
      document.getElementById('birth-lon').value = data.birth.lon || '';
    }
    setStatus('JSON импортирован.');
  });
});

// ---------- Восстановление из query ----------
function restoreFromQuery() {
  const p = new URLSearchParams(location.search);
  if (!p.has('date')) return;
  document.getElementById('birth-date').value = p.get('date') || '';
  document.getElementById('birth-time').value = p.get('time') || '';
  if (p.get('tz')) document.getElementById('birth-timezone').value = p.get('tz');
  document.getElementById('birth-lat').value = p.get('lat') || '';
  document.getElementById('birth-lon').value = p.get('lon') || '';
  const mode = p.get('mode');
  if (mode) {
    const tab = Array.from(tabs).find((t) => t.dataset.mode === mode);
    if (tab) tab.click();
  }
}

// ---------- Основной обработчик ----------
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  submitBtn.disabled = true;
  setStatus('Инициализация…');
  try {
    await initEngine();
    const b = readDate('birth-date', 'birth-time', 'birth-timezone');
    const utcB = localToUTC(b.year, b.month, b.day, b.hour, b.minute, b.tz);
    const latB = Number(document.getElementById('birth-lat').value);
    const lonB = Number(document.getElementById('birth-lon').value);

    setStatus('Расчёт основной карты…');
    const natal = await calculateChartData(utcB, latB, lonB);

    lastState = {
      mode: currentMode,
      birth: { date: document.getElementById('birth-date').value, time: document.getElementById('birth-time').value, tz: b.tz, lat: latB, lon: lonB },
      chart: natal,
    };

    saveHistory({
      label: `${currentMode} · ${b.year}-${String(b.month).padStart(2,'0')}-${String(b.day).padStart(2,'0')}`,
      date: new Date().toLocaleString('ru-RU'),
      birthDate: document.getElementById('birth-date').value,
      birthTime: document.getElementById('birth-time').value,
      birthTz: b.tz, birthLat: latB, birthLon: lonB,
    });

    if (currentMode === 'natal') {
      renderSingle(natal);
      showInterpretation('Интерпретация натальной карты', interpretNatal(natal.planets, natal.cusps));
      setStatus('Готово. Натальная карта.');
    }
    else if (currentMode === 'transit') {
      const evD = document.getElementById('event-date').value, evT = document.getElementById('event-time').value;
      if (!evD || !evT) throw new Error('Укажите дату и время события.');
      const [y,m,d] = evD.split('-').map(Number);
      const [h,mi] = evT.split(':').map(Number);
      const tr = await calculateChartData({ year:y, month:m, day:d, hour:h, minute:mi }, latB, lonB);
      const ok = renderBiWheel(natal, tr);
      if (!ok) renderSingle(natal);
      showInterpretation('Интерпретация транзитов', interpretTransit(natal, tr));
      setStatus(ok ? 'Готово: транзитное би-колесо.' : 'Карта + интерпретация.', !ok);
    }
    else if (currentMode === 'solar') {
      const evD = document.getElementById('event-date').value;
      if (!evD) throw new Error('Укажите дату соляра.');
      const [y,m,d] = evD.split('-').map(Number);
      const s = await calculateSolarReturn(natal, y, m, d, latB, lonB);
      renderSingle(s);
      chartTitle.textContent = `Соляр · ${s.moment.toISOString().slice(0,16).replace('T',' ')} UTC`;
      showInterpretation('Интерпретация соляра', interpretSolar(natal, s));
      setStatus('Готово. Соляр.');
    }
    else if (currentMode === 'synastry') {
      const p = readDate('partner-date', 'partner-time', 'partner-timezone');
      const utcP = localToUTC(p.year, p.month, p.day, p.hour, p.minute, p.tz);
      const latP = Number(document.getElementById('partner-lat').value), lonP = Number(document.getElementById('partner-lon').value);
      const partner = await calculateChartData(utcP, latP, lonP);
      const ok = renderBiWheel(natal, partner);
      if (!ok) renderSingle(natal);
      showInterpretation('Интерпретация синастрии', interpretSynastry(natal.planets, partner.planets, natal.cusps, partner.cusps));
      setStatus(ok ? 'Готово: би-колесо.' : 'Карта A + интерпретация.', !ok);
    }
    else if (currentMode === 'progression') {
      const evD = document.getElementById('event-date').value;
      if (!evD) throw new Error('Укажите дату события.');
      const [y,m,d] = evD.split('-').map(Number);
      const prog = await calculateSecondaryProgression(natal, y, m, d, latB, lonB, utcB);
      renderSingle(prog);
      chartTitle.textContent = `Прогрессии · ${prog.moment.toISOString().slice(0,10)} (≈${prog.ageYears.toFixed(1)} лет)`;
      showInterpretation('Интерпретация прогрессий', interpretProgression(natal, prog));
      setStatus('Готово. Прогрессии.');
    }
    else if (currentMode === 'composite') {
      const p = readDate('partner-date', 'partner-time', 'partner-timezone');
      const utcP = localToUTC(p.year, p.month, p.day, p.hour, p.minute, p.tz);
      const partner = await calculateChartData(utcP, Number(document.getElementById('partner-lat').value), Number(document.getElementById('partner-lon').value));
      const c = calculateComposite(natal, partner);
      renderSingle(c);
      showInterpretation('Интерпретация композита', interpretComposite(c));
      setStatus('Готово. Композит.');
    }
    else if (currentMode === 'directions') {
      const evD = document.getElementById('event-date').value;
      if (!evD) throw new Error('Укажите дату события.');
      const [y,m,d] = evD.split('-').map(Number);
      const dir = calculateSymbolicDirections(natal, y, m, d, utcB);
      renderSingle(dir);
      chartTitle.textContent = `Дирекции · ≈${dir.ageYears.toFixed(1)} лет (1° = 1 год)`;
      showInterpretation('Интерпретация дирекций', interpretDirections(natal, dir));
      setStatus('Готово. Дирекции.');
    }
    else if (currentMode === 'horary') {
      const now = new Date();
      const utcH = { year:now.getUTCFullYear(), month:now.getUTCMonth()+1, day:now.getUTCDate(), hour:now.getUTCHours(), minute:now.getUTCMinutes() };
      const hChart = await calculateChartData(utcH, latB, lonB);
      renderSingle(hChart);
      const houseQ = Number(document.getElementById('horary-house').value);
      const question = document.getElementById('horary-question').value || '(вопрос не сформулирован)';
      const lines = [`Вопрос: «${question}»`, ...judgeHorary(hChart.planets, hChart.cusps, houseQ)];
      showInterpretation('Хорарный разбор', lines);
      setStatus('Готово. Хорар.');
    }
    else if (currentMode === 'monthly') {
      const evD = document.getElementById('event-date').value || new Date().toISOString().slice(0,10);
      const list = await monthlyTransits(natal, evD, 30, latB, lonB);
      renderSingle(natal);
      if (!list.length) {
        showInterpretation('Транзиты на месяц', ['Нет значимых транзитов внешних планет по домам.']);
      } else {
        showInterpretation('Транзиты на месяц', list.map((t) => `${t.date}: ${PLANET_RU[t.planet]} в ${t.house}-м доме (${t.sign}) — ${t.theme}.`));
      }
      setStatus('Готово. Транзиты на месяц.');
    }
  } catch (err) {
    console.error('[fatal]', err);
    setStatus(err.message || 'Ошибка. Подробности в консоли.', true);
  } finally {
    submitBtn.disabled = false;
  }
});

// ---------- Инициализация ----------
renderHistory();
restoreFromQuery();