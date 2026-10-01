// Run with: node checks.cjs. Browser scripts run unchanged; network calls are blocked.
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { join } = require('node:path');
const vm = require('node:vm');

function element(value = '', attributes = {}) {
  const events = {}, classes = new Set();
  return {
    value, textContent: '', hidden: true, disabled: false, ...attributes,
    addEventListener(type, callback) { (events[type] ||= []).push(callback); },
    emit(type, event = {}) { return Promise.all((events[type] || []).map(callback => callback(event))); },
    getAttribute(name) { return this[name] ?? null; },
    setAttribute(name, value) { this[name] = value; },
    classList: {
      add(...names) { names.forEach(name => classes.add(name)); },
      remove(...names) { names.forEach(name => classes.delete(name)); },
      contains(name) { return classes.has(name); },
      toggle(name, force) { if (force) classes.add(name); else classes.delete(name); }
    },
    scrollIntoView(options) { this.scroll = options; },
  };
}

function services({ hash = '', reduced = false, fetch, setTimeout } = {}) {
  const ids = Object.fromEntries([
    'service-type', 'scope-factor', 'hours-range', 'hours-number', 'estimate-total',
    'estimate-range', 'result-service', 'result-rate', 'result-urgency', 'result-scope',
    'estimate-formula', 'cost-form', 'customer-name', 'company-name', 'customer-email',
    'problem-description', 'website-field', 'form-request', 'submit-request',
    'request-status', 'request-document', 'request-preview', 'request-download', 'year',
    'services-panel', 'calculator-panel',
  ].map(id => [id, element()]));
  ids['service-type'].value = 'Market & Business Analysis';
  ids['scope-factor'].value = '1.1';
  ids['scope-factor'].selectedOptions = [{ textContent: 'Some unknowns | 10% buffer' }];
  ids['hours-number'].value = ids['hours-range'].value = '32';
  ids['hours-range'].max = '240';
  ids['cost-form'].reportValidity = () => true;
  const toggles = ['services', 'calculator'].map(id => {
    const toggle = element('', { 'data-mobile-accordion': id + '-panel', 'aria-expanded': 'false' });
    ids[id] = { id, contains: node => node === toggle, querySelector: () => toggle };
    return toggle;
  });
  const document = element();
  Object.assign(document, {
    querySelector(selector) {
      if (selector.includes('classification')) return { value: '50' };
      if (selector.includes('urgency')) return { value: '1' };
      return ids[selector.slice(1)] || null;
    },
    querySelectorAll: selector => selector === '[data-mobile-accordion]' ? toggles : [],
    getElementById: id => ids[id] || null,
  });
  const window = element();
  Object.assign(window, {
    location: { hash, href: 'https://example.test/services.html' + hash },
    matchMedia: query => ({ matches: query.includes('reduced-motion') ? reduced : true, addEventListener() {} }),
    smartCaptcha: { getResponse: () => 'fake-token', reset() {} },
  });
  const context = vm.createContext({
    document, window, console, URL, Intl, AbortController,
    setTimeout: setTimeout || global.setTimeout, clearTimeout: global.clearTimeout,
    fetch: fetch || (() => { throw new Error('Network blocked by checks'); }),
  });
  vm.runInContext(readFileSync(join(__dirname, 'services.js'), 'utf8'), context);
  return { context, ids, toggles, document, window };
}

function i18n(search = '?lang=en', storage = new Map()) {
  const document = {
    documentElement: {}, body: {}, querySelectorAll: () => [],
    createTreeWalker: () => ({ nextNode: () => false }),
  };
  const window = { location: { search, href: 'https://example.test/' + search }, dispatchEvent() {} };
  vm.runInNewContext(readFileSync(join(__dirname, 'i18n.js'), 'utf8'), {
    document, window, NodeFilter: { SHOW_TEXT: 4 }, URL, URLSearchParams, Intl,
    localStorage: { getItem: key => storage.get(key), setItem: (key, value) => storage.set(key, value) },
    MutationObserver: class { observe() {} }, history: { replaceState() {} },
    CustomEvent: class {}, queueMicrotask,
  });
  return window.siteI18n;
}

test('typing 12 over 32 preserves intermediate input and ends at a $660 estimate', async () => {
  const { ids } = services();
  ids['hours-number'].value = '1';
  await ids['hours-number'].emit('input');
  assert.equal(String(ids['hours-number'].value), '1');
  ids['hours-number'].value += '2';
  await ids['hours-number'].emit('input');
  assert.equal(String(ids['hours-number'].value), '12');
  assert.equal(String(ids['hours-range'].value), '12');
  assert.equal(ids['estimate-total'].textContent, '$660');
  ids['hours-number'].value = '';
  await ids['hours-number'].emit('input');
  assert.equal(ids['hours-number'].value, '');
});

test('blur and change normalize hours to the supported 4..240 range', async () => {
  const { ids } = services();
  ids['hours-number'].value = '1';
  await ids['hours-number'].emit('blur');
  assert.equal(String(ids['hours-number'].value), '4');
  ids['hours-number'].value = '300';
  await ids['hours-number'].emit('change');
  assert.equal(String(ids['hours-number'].value), '240');
  assert.equal(String(ids['hours-range'].value), '240');
  assert.equal(ids['estimate-total'].textContent, '$13,200');
  ids['hours-range'].value = '120';
  await ids['hours-range'].emit('input');
  assert.equal(String(ids['hours-number'].value), '120');
  assert.equal(ids['estimate-total'].textContent, '$6,600');
});

test('English translation preserves dollar grouping and chart task counts', () => {
  const language = i18n();
  assert.equal(language.t('$1,760'), '$1,760');
  assert.equal(language.t('1,033'), '1,033');
  assert.equal(language.t('Planning range: $1,584-$1,936'), 'Planning range: $1,584-$1,936');
});

test('money and decimal factors round-trip between Russian and English', () => {
  const language = i18n();
  language.setLanguage('ru', false);
  const rubles = language.t('$1,760');
  assert.equal(rubles, '88\u00a0000 ₽');
  assert.equal(language.t('1.25x'), '1,25x');
  language.setLanguage('en', false);
  assert.equal(language.t(rubles), '$1,760');
  assert.equal(language.t('1,25x'), '1.25x');
  assert.equal(language.t('12 ч × 2 500 ₽ × 1,00 × 1,10'), '12 hours x $50 x 1.00 x 1.10');
});

test('an explicit language query persists for subsequent query-less navigation', () => {
  const storage = new Map();
  assert.equal(i18n('?lang=en', storage).language, 'en');
  assert.equal(i18n('', storage).language, 'en');
  assert.equal(i18n('?lang=ru', storage).language, 'ru');
  assert.equal(i18n('', storage).language, 'ru');
});

test('phone anchor clicks and direct hashes reveal their accordion without cancelling navigation', async () => {
  for (const hash of ['#services', '#calculator']) {
    const direct = services({ hash });
    const index = hash === '#services' ? 0 : 1;
    assert.equal(direct.toggles[index].getAttribute('aria-expanded'), 'true');
    assert.equal(direct.ids[hash.slice(1) + '-panel'].classList.contains('is-mobile-collapsed'), false);
    const clicked = services();
    let prevented = false;
    await clicked.document.emit('click', {
      target: { closest: () => ({ hash, getAttribute: () => hash }) },
      preventDefault() { prevented = true; },
    });
    assert.equal(clicked.toggles[index].getAttribute('aria-expanded'), 'true');
    assert.equal(prevented, false);
    clicked.window.location.hash = hash;
    await clicked.window.emit('hashchange');
    assert.equal(clicked.toggles[index].getAttribute('aria-expanded'), 'true');
  }
});

test('PDF preview respects reduced motion', async () => {
  const { context, ids } = services({ reduced: true });
  context.createRequestPdf = async () => ({ blob: new Blob(), filename: 'preview.pdf' });
  await ids['cost-form'].emit('submit', { preventDefault() {} });
  assert.equal(ids['request-document'].hidden, false);
  assert.equal(ids['request-document'].scroll.behavior, 'auto');
});

test('a stalled submission times out, restores controls, and offers an explicit retry', async () => {
  const fixture = services({
    setTimeout: callback => global.setTimeout(callback, 5),
    fetch: (url, options) => new Promise((resolve, reject) => {
      options.signal?.addEventListener('abort', () => reject(new DOMException('Aborted', 'AbortError')));
      global.setTimeout(() => reject(new Error('The request had no timeout.')), 25);
    }),
  });
  await fixture.ids['submit-request'].emit('click');
  assert.match(fixture.ids['request-status'].textContent, /timed out.*try again/i);
  assert.equal(fixture.ids['submit-request'].disabled, false);
  assert.equal(fixture.ids['form-request'].disabled, false);
});

function homepage({ hash = '', charts = false, width = 800, reduced = true } = {}) {
  const panels = ['mobile-comments', 'mobile-domains', 'mobile-skills'].map((id, index) =>
    element('', { id, hidden: index !== 0 }));
  const tabs = panels.map((panel, index) => element('', {
    'data-mobile-analytics-tab': panel.id, 'aria-pressed': String(index === 0),
  }));
  const ids = Object.fromEntries(['sankeyChart', 'histogramChart', 'domainChart', 'capabilityChart']
    .map(id => [id, { id, clientWidth: width }]));
  const document = element();
  Object.assign(document, {
    querySelectorAll: selector => selector === '[data-mobile-analytics-tab]' ? tabs : panels,
    getElementById: id => ids[id],
  });
  let currentHash = hash;
  const window = element();
  Object.assign(window, {
    location: {
      get hash() { return currentHash; },
      set hash(value) { currentHash = value.startsWith('#') ? value : '#' + value; },
    },
    matchMedia: () => ({ matches: reduced }),
  });
  const outputs = [], instances = new Map();
  const context = { window, document, siteI18n: { t: value => value } };
  if (charts) context.echarts = {
    getInstanceByDom: dom => instances.get(dom.id),
    init(dom) {
      const chart = { setOption: option => outputs.push(option), resize() {} };
      instances.set(dom.id, chart);
      return chart;
    },
    graphic: { LinearGradient: class {} },
  };
  const inline = [...readFileSync(join(__dirname, 'index.html'), 'utf8').matchAll(/<script>([\s\S]*?)<\/script>/g)].at(-1)[1];
  vm.runInNewContext(inline, context);
  return { tabs, panels, window, document, outputs, ids };
}

test('mobile analytics remain usable when the chart CDN is unavailable', async () => {
  const page = homepage();
  await page.document.emit('DOMContentLoaded');
  await page.window.emit('resize');
  await page.tabs[1].emit('click');
  assert.equal(page.window.location.hash, '#mobile-domains');
  assert.equal(page.panels[1].hidden, false);
  assert.equal(page.panels[0].hidden, true);
  assert.equal(page.tabs[1].getAttribute('aria-pressed'), 'true');
});

test('mobile analytics restore direct and Back hashes while preserving unrelated #bio', async () => {
  const page = homepage({ hash: '#mobile-skills' });
  assert.equal(page.panels[2].hidden, false);
  assert.equal(page.panels[0].hidden, true);
  page.window.location.hash = '#mobile-comments';
  await page.window.emit('hashchange');
  assert.equal(page.panels[0].hidden, false);
  assert.equal(page.panels[2].hidden, true);
  page.window.location.hash = '#bio';
  await page.window.emit('hashchange');
  assert.equal(page.window.location.hash, '#bio');
  assert.equal(page.panels[0].hidden, false);
  await page.tabs[2].emit('click');
  page.window.location.hash = '';
  await page.window.emit('hashchange');
  assert.equal(page.panels[0].hidden, false);
  assert.equal(page.panels[2].hidden, true);
});

test('all desktop charts honor reduced motion and rerender on language changes', async () => {
  const page = homepage({ charts: true });
  await page.document.emit('DOMContentLoaded');
  assert.equal(page.outputs.length, 4);
  page.outputs.forEach(option => {
    assert.equal(option.animation, false);
    assert.equal(option.aria.enabled, true);
  });
  await page.window.emit('languageChanged');
  assert.equal(page.outputs.length, 8);
});

test('desktop charts wait for visible containers before initialization', async () => {
  const page = homepage({ charts: true, width: 0 });
  await page.document.emit('DOMContentLoaded');
  assert.equal(page.outputs.length, 0);
  Object.values(page.ids).forEach(dom => { dom.clientWidth = 800; });
  await page.window.emit('resize');
  assert.equal(page.outputs.length, 4);
});
