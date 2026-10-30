(function () {
// Reparto anual de semanas entre ocho fracciones.
// Reproduce las reglas publicadas por Octavo:
//  - 52 semanas; la menos deseada por los ocho se queda para mantenimiento.
//  - Cada fracción ordena las semanas de la que más quiere a la que menos.
//  - Se reparte por rondas. La primera ronda sigue un orden que rota un puesto cada año.
//  - En las siguientes elige primero quien peor lleva el reparto (suma de puestos obtenidos).

const DAY = 86400000;
const MONTHS = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
const MONTHS_LONG = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

// Generador pseudoaleatorio con semilla: el mismo año da siempre el mismo reparto.
function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6D2B79F5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Domingo de Pascua (algoritmo de Meeus)
function easter(y) {
  const a = y % 19, b = Math.floor(y / 100), c = y % 100;
  const d = Math.floor(b / 4), e = b % 4, f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3), h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4), k = c % 4, l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31), day = ((h + l - 7 * m + 114) % 31) + 1;
  return Date.UTC(y, month - 1, day);
}

// Semanas de sábado a sábado, el cambio habitual en casas de vacaciones.
function weeksOf(year) {
  let start = Date.UTC(year, 0, 1);
  while (new Date(start).getUTCDay() !== 6) start += DAY;
  return Array.from({ length: 52 }, (_, i) => {
    const from = start + i * 7 * DAY;
    return { i, from, to: from + 7 * DAY };
  });
}

function contains(w, t) { return t >= w.from && t < w.to; }

// Lo que vale cada semana según el perfil. Valores entre 0 y 1.
function scorer(year, profile) {
  const ea = easter(year);
  const holidays = [
    ea - 3 * DAY, Date.UTC(year, 4, 1), Date.UTC(year, 7, 15), Date.UTC(year, 9, 12),
    Date.UTC(year, 10, 1), Date.UTC(year, 11, 6), Date.UTC(year, 11, 8), Date.UTC(year, 11, 25)
  ];
  return w => {
    const mid = new Date(w.from + 3 * DAY);
    const m = mid.getUTCMonth(), d = mid.getUTCDate();
    const summer = m === 7 ? 1 : m === 6 ? (d > 10 ? 0.95 : 0.8) : (m === 5 && d > 15) || (m === 8 && d < 15) ? 0.55 : m === 5 || m === 8 ? 0.35 : 0.08;
    const winter = m === 0 || m === 1 ? 0.9 : m === 2 ? 0.7 : m === 11 ? 0.85 : 0.1;
    const holiday = holidays.some(t => contains(w, t)) ? 1 : 0;
    if (profile === 'verano') return summer * 0.85 + holiday * 0.15;
    if (profile === 'invierno') return winter * 0.75 + holiday * 0.25;
    return holiday * 0.7 + summer * 0.3; // puentes
  };
}

function ranking(weeks, score, noise, random) {
  return weeks
    .map(w => ({ i: w.i, s: score(w) + (random() - 0.5) * noise }))
    .sort((a, b) => b.s - a.s)
    .map(x => x.i);
}

/**
 * @param {object} o
 * @param {number} o.year
 * @param {number} o.shares   octavos tuyos (1 a 4)
 * @param {string} o.profile  'verano' | 'puentes' | 'invierno'
 * @returns {{ weeks, owner:number[], maint:number, yours:number[], picks:{i:number,f:number}[], firstSeat:number }}
 */
function allocate({ year = 2027, shares = 1, profile = 'verano' } = {}) {
  const weeks = weeksOf(year);
  const random = rng(year * 31 + 7);
  const othersProfiles = ['verano', 'verano', 'puentes', 'verano', 'invierno', 'puentes', 'verano'];

  // Fracciones 0..shares-1 son tuyas y comparten tu orden de preferencias.
  const mine = ranking(weeks, scorer(year, profile), 0.12, rng(year + shares * 101));
  const lists = Array.from({ length: 8 }, (_, f) =>
    f < shares ? mine : ranking(weeks, scorer(year, othersProfiles[f - 1] || 'verano'), 0.35, random)
  );

  // Mantenimiento: la semana con peor puesto medio entre las ocho listas.
  const avgRank = weeks.map(w => lists.reduce((s, l) => s + l.indexOf(w.i), 0));
  const maint = avgRank.indexOf(Math.max(...avgRank));

  const owner = new Array(52).fill(-1);
  const taken = new Set([maint]);
  const regret = new Array(8).fill(0);
  const offset = (year - 2027) % 8;
  const firstOrder = Array.from({ length: 8 }, (_, n) => (n + 8 - offset) % 8);
  const picks = [];

  let round = 0;
  while (taken.size < 52) {
    const order = round === 0
      ? firstOrder
      : [...firstOrder].sort((a, b) => regret[b] - regret[a] || firstOrder.indexOf(a) - firstOrder.indexOf(b));
    for (const f of order) {
      if (taken.size >= 52) break;
      const list = lists[f];
      const pos = list.findIndex(i => !taken.has(i));
      const i = list[pos];
      taken.add(i);
      owner[i] = f;
      regret[f] += pos;
      picks.push({ i, f });
    }
    round++;
  }

  const yours = owner.map((f, i) => (f >= 0 && f < shares ? i : -1)).filter(i => i >= 0);
  // Puesto con el que abre tu primera fracción en la primera ronda (1 = eliges primero).
  const firstSeat = Math.min(...Array.from({ length: shares }, (_, f) => firstOrder.indexOf(f))) + 1;
  return { weeks, owner, maint, yours, picks, firstSeat };
}

function shortDate(t) {
  const d = new Date(t);
  return `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]}`;
}

function rangeLabel(w) {
  const a = new Date(w.from), b = new Date(w.to);
  const sameMonth = a.getUTCMonth() === b.getUTCMonth();
  return sameMonth
    ? `Del ${a.getUTCDate()} al ${b.getUTCDate()} de ${MONTHS_LONG[b.getUTCMonth()]}`
    : `Del ${a.getUTCDate()} de ${MONTHS_LONG[a.getUTCMonth()]} al ${b.getUTCDate()} de ${MONTHS_LONG[b.getUTCMonth()]}`;
}

function monthOf(t) { return MONTHS[new Date(t).getUTCMonth()]; }

window.OCTAVO = window.OCTAVO || {};
OCTAVO.alloc = { allocate, weeksOf, shortDate, rangeLabel, monthOf };
})();
