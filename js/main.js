import { PROPERTIES, FAQ } from './data.js';
import { allocate, shortDate, rangeLabel, monthOf } from './allocation.js';

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const eur = n => new Intl.NumberFormat('es-ES', { maximumFractionDigits: 0 }).format(n) + ' €';
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const WORDS = ['', 'un octavo', 'dos octavos', 'tres octavos', 'cuatro octavos'];

/* ---------- Cabecera ---------- */
function header() {
  const head = $('[data-header]');
  const toggle = $('[data-nav-toggle]');
  const nav = $('#nav');
  const onScroll = () => head.classList.toggle('is-scrolled', scrollY > 8);
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const close = () => { nav.classList.remove('is-open'); toggle.setAttribute('aria-expanded', 'false'); };
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
  });
  $$('a', nav).forEach(a => a.addEventListener('click', close));
  addEventListener('keydown', e => e.key === 'Escape' && close());

  // Marca la sección visible en el menú
  const links = new Map($$('a', nav).map(a => [a.hash.slice(1), a]));
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      const a = links.get(e.target.id);
      if (a && e.isIntersecting) {
        links.forEach(l => l.removeAttribute('aria-current'));
        a.setAttribute('aria-current', 'true');
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  links.forEach((_, id) => { const s = document.getElementById(id); if (s) io.observe(s); });
}

/* ---------- Hero: el año repartido ---------- */
function heroYear() {
  const strip = $('[data-strip]');
  const label = $('[data-hero-shares]');
  const cells = Array.from({ length: 52 }, () => strip.appendChild(document.createElement('li')));
  let timers = [];

  const paint = (k, animate) => {
    timers.forEach(clearTimeout);
    timers = [];
    const r = allocate({ year: 2027, shares: k, profile: 'verano' });
    label.textContent = WORDS[k];
    cells.forEach((c, i) => {
      c.className = i === r.maint ? 'is-maint' : '';
      c.title = `Semana del ${shortDate(r.weeks[i].from)}`;
    });
    if (!animate || reduceMotion) {
      r.yours.forEach(i => cells[i].classList.add('is-yours'));
      return;
    }
    // Un único momento animado: las semanas caen en el orden real del reparto.
    strip.classList.add('is-pending');
    requestAnimationFrame(() => strip.classList.remove('is-pending'));
    r.picks.forEach((p, n) => {
      if (p.f < k) timers.push(setTimeout(() => cells[p.i].classList.add('is-yours'), 300 + n * 22));
    });
  };

  $$('[data-hero-k]').forEach(b => b.addEventListener('click', () => {
    $$('[data-hero-k]').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
    paint(Number(b.dataset.heroK), false);
  }));
  paint(1, true);
}

/* ---------- Viviendas ---------- */
function homes() {
  const box = $('[data-homes]');
  box.innerHTML = PROPERTIES.map(p => {
    const bar = Array.from({ length: 8 }, (_, i) => `<i class="${i < p.taken ? 'on' : ''}"></i>`).join('');
    const full = p.taken >= 8;
    return `
      <article class="home" aria-labelledby="h-${p.id}">
        <div class="home-media">
          <img src="${p.cover}" alt="${p.title} en ${p.town}" loading="lazy" width="1200" height="800">
          <img src="assets/img/${p.prefix}-02.jpg" alt="" loading="lazy" width="600" height="400">
          <img src="assets/img/${p.prefix}-03.jpg" alt="" loading="lazy" width="600" height="400">
        </div>
        <div class="home-body">
          <div>
            <p class="home-place">${p.town}, ${p.province}</p>
            <h3 class="home-title" id="h-${p.id}">${p.title}</h3>
          </div>
          <p class="home-summary">${p.summary}</p>
          <dl class="home-specs">
            <div><dt>Dormitorios</dt><dd>${p.rooms} dormitorios</dd></div>
            <div><dt>Baños</dt><dd>${p.baths} ${p.baths > 1 ? 'baños' : 'baño'}</dd></div>
            <div><dt>Superficie</dt><dd>${p.m2label}</dd></div>
          </dl>
          <div class="home-price">
            <span class="num">${eur(p.share)}</span>
            <small>por octavo, con impuestos y muebles. Casa de ${eur(p.total)}.</small>
          </div>
          <div class="eighths">
            <span class="eighths-bar" aria-hidden="true">${bar}</span>
            <span>${full ? 'Los ocho octavos están comprometidos' : `${8 - p.taken} de 8 octavos libres`}</span>
          </div>
          <div class="home-actions">
            ${full
              ? `<a class="btn btn-solid" href="#contacto" data-topic="lista" data-msg="Lista de espera de ${p.title} (${p.town})">Entrar en la lista de espera</a>
                 <a class="btn btn-line" href="#contacto" data-topic="lista" data-msg="Avisadme de casas nuevas en ${p.zone}">Avisarme de casas en ${p.zone}</a>`
              : `<a class="btn btn-solid" href="#contacto" data-topic="comprar" data-msg="Quiero reservar un octavo de ${p.title} (${p.town})">Reservar un octavo</a>`}
          </div>
        </div>
      </article>`;
  }).join('');
}

/* ---------- Calendario ---------- */
function calendar() {
  const form = $('[data-cal-form]');
  const grid = $('[data-cal-grid]');
  const list = $('[data-cal-list]');
  const foot = $('[data-cal-foot]');
  const yearLabel = $('[data-cal-year]');

  const render = () => {
    const k = Number(form.k.value);
    const year = Number(form.year.value);
    const r = allocate({ year, shares: k, profile: form.pref.value });

    let html = '';
    r.weeks.forEach((w, i) => {
      if (i % 13 === 0) html += `<span class="cal-q">${monthOf(w.from)} a ${monthOf(r.weeks[Math.min(i + 12, 51)].to - 86400000)}</span>`;
      const cls = i === r.maint ? 'is-maint' : r.owner[i] < k ? 'is-yours' : '';
      const who = i === r.maint ? 'mantenimiento' : r.owner[i] < k ? 'tuya' : 'de otro copropietario';
      html += `<div class="cal-cell ${cls}" aria-label="${rangeLabel(w)}, ${who}"><b>${new Date(w.from).getUTCDate()}</b>${monthOf(w.from)}</div>`;
    });
    grid.innerHTML = html;

    yearLabel.textContent = year;
    list.innerHTML = r.yours
      .map(i => `<li>${rangeLabel(r.weeks[i])}<span>7 noches</span></li>`)
      .join('');
    const n = r.yours.length;
    foot.textContent = `${n} semanas y ${n * 7} noches. En la primera ronda de ${year} eliges en el puesto ${r.firstSeat} de 8, y ese orden rota cada año.`;
  };

  form.addEventListener('change', render);
  render();
}

/* ---------- Calculadora ---------- */
// Calibrada con los ejemplos publicados por Octavo (180.000, 350.000 y 450.000 €):
// costes de la operación = ITP + 5,5 % + 9.643 € fijos; margen de Octavo 10 %.
// Da exacto en la casa tipo (350.000 € con ITP 8 %: 406.893 € y 55.948 € por octavo)
// y se desvía menos de un 1 % en los otros dos ejemplos.
// Pendiente de validar con la fórmula exacta del equipo.
function calculator() {
  const form = $('[data-calc]');
  const out = n => $(`[data-out="${n}"]`);
  const res = n => $(`[data-res="${n}"]`);

  const fill = input => {
    const p = (input.value - input.min) / (input.max - input.min) * 100;
    input.style.setProperty('--fill', p + '%');
  };

  const render = () => {
    const price = Number(form.price.value);
    const itp = Number(form.itp.value);
    const k = Number(form.k.value);
    const maxRent = 6 * k;
    if (Number(form.rent.max) !== maxRent) {
      form.rent.max = maxRent;
      if (Number(form.rent.value) > maxRent) form.rent.value = maxRent;
    }
    const rent = Number(form.rent.value);
    const week = Number(form.week.value);

    const whole = Math.round(price * (1 + itp + 0.055) + 9643);
    const share = Math.round(whole * 1.10 / 8);

    out('price').textContent = eur(price);
    out('rent').textContent = `${rent} de ${maxRent}`;
    out('week').textContent = eur(week);
    res('share').textContent = eur(share * k);
    res('whole').textContent = eur(whole);
    res('weeks').textContent = `${maxRent}${rent ? `, ${maxRent - rent} para ti` : ''}`;
    res('income').textContent = eur(Math.round(rent * week * 0.65 / 10) * 10);

    $('[data-calc-cta]').dataset.msg = `Busco ${WORDS[k]} en una casa de unos ${eur(price)}.`;
    $$('input[type="range"]', form).forEach(fill);
  };

  form.addEventListener('input', render);
  form.addEventListener('change', render);
  $('[data-calc-cta]').dataset.topic = 'comprar';
  render();
}

/* ---------- Preguntas ---------- */
function faq() {
  const tabs = $('[data-faq-tabs]');
  const list = $('[data-faq-list]');

  const show = n => {
    $$('button', tabs).forEach((b, i) => b.setAttribute('aria-selected', String(i === n)));
    list.innerHTML = FAQ[n].items.map((it, i) => `
      <details ${i === 0 ? 'open' : ''}>
        <summary>${it.q}</summary>
        <div class="faq-answer">${it.a.map(p => `<p>${p}</p>`).join('')}</div>
      </details>`).join('');
    list.setAttribute('aria-labelledby', `faq-tab-${n}`);
  };

  tabs.innerHTML = FAQ.map((c, i) =>
    `<button type="button" role="tab" id="faq-tab-${i}" aria-controls="faq-panel" aria-selected="false">${c.cat}</button>`
  ).join('');
  list.id = 'faq-panel';
  list.setAttribute('role', 'tabpanel');

  $$('button', tabs).forEach((b, i) => {
    b.addEventListener('click', () => show(i));
    b.addEventListener('keydown', e => {
      if (!['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp'].includes(e.key)) return;
      e.preventDefault();
      const n = (i + (e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : FAQ.length - 1)) % FAQ.length;
      show(n);
      $$('button', tabs)[n].focus();
    });
  });
  show(0);
}

/* ---------- Contacto ---------- */
function contact() {
  const form = $('[data-form]');
  const select = $('[data-topic-select]');
  const status = $('[data-form-status]');

  // Los botones de toda la página rellenan el formulario con el tema y un mensaje.
  document.addEventListener('click', e => {
    const a = e.target.closest('[data-topic]');
    if (!a) return;
    select.value = a.dataset.topic;
    if (a.dataset.msg) form.mensaje.value = a.dataset.msg;
    setTimeout(() => form.nombre.focus({ preventScroll: true }), 500);
  });

  form.addEventListener('submit', async e => {
    e.preventDefault();
    status.classList.remove('is-error');
    if (!form.checkValidity()) { form.reportValidity(); return; }

    const local = ['localhost', '127.0.0.1'].includes(location.hostname);
    if (local) {
      status.textContent = 'En local el formulario no envía nada. Publicado en Netlify, llega al panel de formularios.';
      return;
    }
    const btn = $('button[type="submit"]', form);
    btn.disabled = true;
    status.textContent = 'Enviando…';
    try {
      const body = new URLSearchParams(new FormData(form)).toString();
      const r = await fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body });
      if (!r.ok) throw new Error(r.status);
      form.reset();
      status.textContent = 'Recibido. Te escribimos en menos de 24 horas laborables.';
    } catch {
      status.classList.add('is-error');
      status.textContent = 'No se ha podido enviar. Escríbenos a info@mioctavo.com o llama al 685 046 871.';
    } finally {
      btn.disabled = false;
    }
  });
}

header();
heroYear();
homes();
calendar();
calculator();
faq();
contact();
$$('[data-year]').forEach(el => (el.textContent = new Date().getFullYear()));
