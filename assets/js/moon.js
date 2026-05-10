/* ============================================
Mermaid Oracle / moon.js
月の手帳ページのロジック

- CSS月描画の月相クラス適用
- 月相と今日のメッセージ表示
- 「今日の意図」「手放すこと」を localStorage に保存
- 過去ログの一覧表示と削除
============================================ */

(function () {
'use strict';

var MO = window.MermaidOracle;

if (!MO || !MO.moon) {
  console.error('[moon.js] moon-data.js が読み込まれていません');
  return;
}

var $ = MO.$;
var $$ = MO.$$;
var STORAGE_KEY = 'mermaidOracle.moonDiary';

/* ------------------------------------------------
 * 起動
 * ------------------------------------------------ */
document.addEventListener('DOMContentLoaded', function () {
  renderToday();
  renderHistory();

  var saveBtn = $('#saveBtn');
  if (saveBtn) {
    saveBtn.addEventListener('click', saveEntry);
  }
});


/* ------------------------------------------------
 * SVGで月相を描画
 * ------------------------------------------------ */
function renderMoonSvg(phaseKey, age) {
  var base   = $('#moonBase');
  var shadow = $('#moonShadowGroup');
  var svg    = $('#moonSvg');

  if (!shadow) return;

  // 新月は暗い球
  if (base) {
    base.setAttribute('fill',
      phaseKey === 'new' ? 'url(#moonNew)' : 'url(#moonLight)'
    );
  }

  // 各月相の影SVGパス
  var cx = 70, cy = 70, r = 62;
  var shadowColor = 'rgba(6,18,32,0.94)';
  var html = '';

  switch (phaseKey) {
    case 'new':
      // 全面暗い
      html = '<circle cx="70" cy="70" r="62" fill="' + shadowColor + '"/>';
      break;

    case 'waxingCrescent':
      // 右1/4だけ光る→左3/4に影
      html = '<path d="M70,8 A62,62 0 1,0 70,132 A38,62 0 0,1 70,8 Z" fill="' + shadowColor + '"/>';
      break;

    case 'firstQuarter':
      // 左半分に影
      html = '<rect x="8" y="8" width="62" height="124" fill="' + shadowColor + '"/>';
      break;

    case 'waxingGibbous':
      // 左1/4に影
      html = '<path d="M70,8 A62,62 0 0,0 70,132 A22,62 0 0,1 70,8 Z" fill="' + shadowColor + '"/>';
      break;

    case 'full':
      // 影なし
      html = '';
      break;

    case 'waningGibbous':
      // 右1/4に影
      html = '<path d="M70,8 A62,62 0 0,1 70,132 A22,62 0 0,0 70,8 Z" fill="' + shadowColor + '"/>';
      break;

    case 'lastQuarter':
      // 右半分に影
      html = '<rect x="70" y="8" width="62" height="124" fill="' + shadowColor + '"/>';
      break;

    case 'waningCrescent':
      // 左1/4だけ光る→右3/4に影
      html = '<path d="M70,8 A62,62 0 1,1 70,132 A38,62 0 0,0 70,8 Z" fill="' + shadowColor + '"/>';
      break;

    default:
      html = '';
  }

  shadow.innerHTML = html;

  // 満月グロー
  if (svg) {
    svg.style.filter = phaseKey === 'full'
      ? 'drop-shadow(0 0 28px rgba(255,240,160,0.8)) drop-shadow(0 0 56px rgba(240,220,120,0.4))'
      : phaseKey === 'new'
        ? 'drop-shadow(0 0 12px rgba(80,120,180,0.3))'
        : 'drop-shadow(0 0 18px rgba(240,220,140,0.45))';
  }
}

/* ------------------------------------------------
 * 今日の月の表示
 * ------------------------------------------------ */
function renderToday() {
  var today = new Date();
  var content = MO.moon.getDailyContent(today);
  var phase = content.phase;

  // 日付
  var dateEl = $('#todayDate');
  if (dateEl) dateEl.textContent = MO.formatDateJa(today);

  // SVG月描画：月相に応じた影を描画
  var canvas = $('#moonCanvas');
  if (canvas) {
    var classes = canvas.className.split(' ').filter(function(c) {
      return c.indexOf('moon-phase-') === -1;
    });
    canvas.className = classes.join(' ') + ' moon-phase-' + phase.key;
  }
  renderMoonSvg(phase.key, phase.age);

  // 月相名
  var nameEl = $('#phaseName');
  if (nameEl) nameEl.textContent = phase.ja;

  var enEl = $('#phaseEn');
  if (enEl) enEl.textContent = phase.en;

  var ageEl = $('#phaseAge');
  if (ageEl) ageEl.textContent = '月齢 ' + phase.ageStr;

  // メッセージ
  var msgEl = $('#moonMessage');
  if (msgEl) msgEl.innerHTML = nl2brEscaped(content.message);

  // ワークのプロンプト
  var intPromptEl = $('#intentionPrompt');
  if (intPromptEl) intPromptEl.innerHTML = nl2brEscaped(content.intention);

  var relPromptEl = $('#releasePrompt');
  if (relPromptEl) relPromptEl.innerHTML = nl2brEscaped(content.release);

  // ムーンサイクル進行バー
  renderCycleBar(phase);
}

/* ------------------------------------------------
 * ムーンサイクルの進行バー
 * ------------------------------------------------ */
function renderCycleBar(currentPhase) {
  var bar = $('#cycleBar');
  if (!bar) return;

  var phases = MO.moon.PHASES;
  var html = '';

  for (var i = 0; i < phases.length; i++) {
    var p = phases[i];
    var isCurrent = p.key === currentPhase.key;

    html += ''
      + '<div class="cycle-step' + (isCurrent ? ' current' : '') + '" title="' + escapeHtml(p.ja) + '">'
      +   '<span class="cycle-symbol">' + escapeHtml(p.symbol) + '</span>'
      +   '<span class="cycle-label">' + escapeHtml(p.ja) + '</span>'
      + '</div>';
  }

  bar.innerHTML = html;
}

/* ------------------------------------------------
 * 記録の保存
 * ------------------------------------------------ */
function saveEntry() {
  var intentionEl = $('#intentionInput');
  var releaseEl   = $('#releaseInput');

  var intention = intentionEl ? intentionEl.value.trim() : '';
  var release   = releaseEl   ? releaseEl.value.trim()   : '';

  var flashEl = $('#saveFlash');

  if (!intention && !release) {
    if (flashEl) flashEl.textContent = '今日の言葉を、ひとつだけでも書いてみて';
    MO.showFlash('#saveFlash');
    return;
  }

  var today = new Date();
  var phase = MO.moon.getPhase(today);
  var dateKey = today.getFullYear() + '-'
    + String(today.getMonth() + 1).padStart(2, '0') + '-'
    + String(today.getDate()).padStart(2, '0');

  var entries = MO.storageGet(STORAGE_KEY, []);
  if (!Array.isArray(entries)) entries = [];

  // 同日エントリは上書き
  entries = entries.filter(function (e) { return e.date !== dateKey; });

  entries.unshift({
    date:        dateKey,
    dateLabel:   MO.formatDateJa(today),
    phaseKey:    phase.key,
    phaseSymbol: phase.symbol,
    phaseJa:     phase.ja,
    intention:   intention,
    release:     release,
    savedAt:     today.toISOString()
  });

  if (entries.length > 60) entries = entries.slice(0, 60);

  var ok = MO.storageSet(STORAGE_KEY, entries);

  if (ok) {
    if (flashEl) flashEl.textContent = '🐚 海に、今日の言葉を預けました';
    MO.showFlash('#saveFlash', 2200);
  } else {
    if (flashEl) flashEl.textContent = '保存できませんでした';
    MO.showFlash('#saveFlash', 2200);
  }

  renderHistory();
}

/* ------------------------------------------------
 * 過去ログの表示
 * ------------------------------------------------ */
function renderHistory() {
  var listEl  = $('#historyList');
  var emptyEl = $('#historyEmpty');

  if (!listEl) return;

  var entries = MO.storageGet(STORAGE_KEY, []);

  if (!Array.isArray(entries) || entries.length === 0) {
    listEl.innerHTML = '';
    if (emptyEl) emptyEl.style.display = '';
    return;
  }

  if (emptyEl) emptyEl.style.display = 'none';

  var html = entries.map(function (e) {
    var intentionHtml = e.intention
      ? '<div class="hist-block"><span class="hist-label">今日の意図</span><p>' + nl2brEscaped(e.intention) + '</p></div>'
      : '';
    var releaseHtml = e.release
      ? '<div class="hist-block"><span class="hist-label">手放すこと</span><p>' + nl2brEscaped(e.release) + '</p></div>'
      : '';

    return ''
      + '<article class="hist-entry" data-date="' + escapeHtml(e.date) + '">'
      +   '<header class="hist-head">'
      +     '<span class="hist-symbol">' + escapeHtml(e.phaseSymbol || '🌑') + '</span>'
      +     '<div class="hist-meta">'
      +       '<span class="hist-date">'  + escapeHtml(e.dateLabel || e.date) + '</span>'
      +       '<span class="hist-phase">' + escapeHtml(e.phaseJa || '') + '</span>'
      +     '</div>'
      +     '<button class="hist-del" type="button" aria-label="この記録を削除">×</button>'
      +   '</header>'
      +   intentionHtml
      +   releaseHtml
      + '</article>';
  }).join('');

  listEl.innerHTML = html;

  $$('.hist-del', listEl).forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      var entry = e.target.closest('.hist-entry');
      if (!entry) return;
      deleteEntry(entry.getAttribute('data-date'));
    });
  });
}

/* ------------------------------------------------
 * 過去ログを1件削除
 * ------------------------------------------------ */
function deleteEntry(dateKey) {
  if (!dateKey) return;
  if (!window.confirm('この日の記録を、海に還しますか？')) return;

  var entries = MO.storageGet(STORAGE_KEY, []);
  if (!Array.isArray(entries)) return;

  entries = entries.filter(function (e) { return e.date !== dateKey; });
  MO.storageSet(STORAGE_KEY, entries);
  renderHistory();
}

/* ------------------------------------------------
 * ユーティリティ
 * ------------------------------------------------ */
function nl2brEscaped(value) {
  return String(value == null ? '' : value)
    .split('\n').map(escapeHtml).join('<br>');
}

function escapeHtml(value) {
  return String(value == null ? '' : value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

})();
