
---

## 📄 2. `PROJECT_STRUCTURE.md` — техническая документация для разработчиков

```markdown
# 📐 Структура проекта Astro Site

Техническая документация для разработчиков, которые продолжат развивать проект. Описывает назначение каждого файла, ключевые модули, переменные состояния и правила расширения.

**Версия:** 3.1.0
**Последнее обновление:** 2026-10-22

---

## 🗂 Файловая структура

### Корень проекта

| Файл | Назначение | Строк |
|---|---|---|
| `index.html` | Единственная HTML-страница. Содержит форму, вкладки, модальные окна, PWA-теги. Все скрипты и стили подключаются с CDN. | ~180 |
| `app.js` | Вся клиентская логика: инициализация Swiss Ephemeris, расчёты, отрисовка SVG, интеграции (ИИ, PDF, PWA). | ~1300 |
| `style.css` | Все стили: темы (тёмная/светлая), iOS-дизайн, таблицы, модальные окна, кастомизация Intro.js. | ~500 |
| `manifest.json` | PWA-манифест: название, иконка, цвет темы, режим отображения. | ~25 |
| `sw.js` | Service Worker: кэширование файлов для офлайн-режима. Версия кэша `astro-v4`. | ~40 |
| `README.md` | Главное описание для GitHub (этот файл — `PROJECT_STRUCTURE.md`). | ~300 |
| `CHANGELOG.md` | История всех версий по SemVer. | ~200 |
| `RELEASE_NOTES.md` | Заметки к текущему релизу. | ~100 |
| `PROJECT_STRUCTURE.md` | Техническая документация (вы читаете её). | ~400 |
| `ANNOUNCEMENT.md` | Публичный анонс релиза с планами. | ~150 |
| `LICENSE` | Полный текст AGPL-3.0. | ~660 |

### Папка `ephe/` (не в Git, добавлена в `.gitignore`)

| Файл | Размер | Назначение |
|---|---|---|
| `sepl_18.se1` | ~473 КБ | Позиции планет (JPL DE441) |
| `semo_18.se1` | ~1.3 МБ | Позиции Луны (JPL DE441) |

**Без этих файлов** сайт работает на встроенной эфемериде Moshier (точность суб-угловой секунды).

### Папка `.github/workflows/`

| Файл | Назначение |
|---|---|
| `deploy.yml` | GitHub Actions: авто-деплой на GitHub Pages при пуше в `main` |

---

## 🧩 Ключевые модули в `app.js`

Файл организован блоками с комментариями-разделителями `// ---------- Название ----------`.

### 1. Константы (строки ~5–120)

| Переменная | Тип | Что содержит |
|---|---|---|
| `PLANET_IDS` | `Array<{name,id,fallback}>` | 10 планет с ID Swiss Ephemeris |
| `ASPECTS_SETTINGS` | `Object` | Настройки мажорных аспектов для AstroChart |
| `SIGNS` | `Array<string>` | 12 знаков Зодиака на русском |
| `ELEMENTS` | `Object` | Стихии знаков |
| `PLANET_RU` | `Object` | Русские названия планет |
| `PLANET_IN_SIGN` | `Object<Object<string>>` | Интерпретации «планета в знаке» (Вронский) |
| `PLANET_IN_HOUSE` | `Object<Array>` | Интерпретации «планета в доме» |
| `TRANSIT_THEMES` | `Object` | Темы транзитов внешних планет |
| `ASPECT_RULES` | `Object` | Орбисы и метки аспектов |
| `HOUSE_QUESTIONS` | `Object` | Значения 12 домов (для хорара) |
| `HOUSE_RULERS` | `Object` | Управители знаков |

### 2. Состояние приложения (строки ~122–130)

| Переменная | Тип | Назначение |
|---|---|---|
| `swe` | `SwissEph` | Экземпляр Swiss Ephemeris |
| `engineInitPromise` | `Promise` | Кэш инициализации движка |
| `jplLoaded` | `boolean` | Флаг загрузки `.se1` файлов |
| `jplLoadPromise` | `Promise` | Кэш загрузки JPL |
| `currentMode` | `string` | Текущий режим (`natal`, `transit` и т.д.) |
| `currentChartData` | `Object` | Последняя рассчитанная карта |
| `lastState` | `Object` | Полное состояние для ИИ-разбора |
| `citiesDatabase` | `Array` | Кэш базы городов |
| `acgMap` | `Map` | Экземпляр MapLibre GL |

### 3. DOM-элементы (строки ~132–148)

Все кэшируются в переменные при загрузке: `form`, `statusEl`, `submitBtn`, `chartContainer`, `acgContainer`, `chartTitle`, `interpretationEl`, `partnerSection`, `eventSection`, `horarySection`, `tabs`, `historyList`, `cityList`.

### 4. Инициализация движка

```javascript
async function initEngine()           // Создаёт SwissEph, вызывает initSwissEph()
async function loadJPL()              // Загружает .se1 файлы в виртуальную ФС WASM