/* ============================================
Mermaid Oracle / oracle.js
1枚引き / 3枚引き 両対応
============================================ */

(function () {
'use strict';

var MO = window.MermaidOracle;

if (!MO || !MO.cards) {
  console.error('[oracle.js] oracle-data.js が読み込まれていません');
  return;
}

var $ = MO.$;

// 直前のカードID（重複防止）
var usedIds = [];

/* ------------------------------------------------
 * 起動
 * ------------------------------------------------ */
document.addEventListener('DOMContentLoaded', function () {

  // ── タブ切替 ──
  var tab1    = $('#tab1');
  var tab3    = $('#tab3');
  var mode1   = $('#mode1');
  var mode3   = $('#mode3');

  if (tab1 && tab3) {
    tab1.addEventListener('click', function () {
      tab1.classList.add('active');
      tab3.classList.remove('active');
      mode1.style.display = '';
      mode3.style.display = 'none';
    });

    tab3.addEventListener('click', function () {
      tab3.classList.add('active');
      tab1.classList.remove('active');
      mode3.style.display = '';
      mode1.style.display = 'none';
    });
  }

  // ── 1枚引き ──
  var stage    = $('#cardStage');
  var drawBtn  = $('#drawBtn');
  var redrawBtn = $('#redrawBtn');

  if (stage && drawBtn) {
    drawBtn.addEventListener('click', function () {
      drawOne(stage);
    });

    if (redrawBtn) {
      redrawBtn.addEventListener('click', function () {
        resetStage(stage);
        setTimeout(function () { drawOne(stage); }, 350);
      });
    }
  }

  // ── 3枚引き ──
  var drawBtn3   = $('#drawBtn3');
  var redrawBtn3 = $('#redrawBtn3');

  if (drawBtn3) {
    drawBtn3.addEventListener('click', function () {
      drawTriple();
    });
  }

  if (redrawBtn3) {
    redrawBtn3.addEventListener('click', function () {
      resetTriple();
      setTimeout(function () { drawTriple(); }, 350);
    });
  }

});

/* ================================================
 * 1枚引き
 * ================================================ */
function pickCard(exclude) {
  var cards = MO.cards;
  if (cards.length <= 1) return cards[0];
  var card;
  do { card = MO.pick(cards); }
  while (exclude && exclude.indexOf(card.id) !== -1);
  return card;
}

function drawOne(stage) {
  usedIds = [];
  var card = pickCard();
  usedIds.push(card.id);

  stage.innerHTML = renderCardHtml(card);

  var drawBtn   = $('#drawBtn');
  var redrawBtn = $('#redrawBtn');
  var resultBox = $('#resultBox');
  var actions   = $('#actions');

  if (drawBtn)   drawBtn.style.display   = 'none';
  if (redrawBtn) redrawBtn.style.display = '';
  if (actions)   actions.classList.add('drawn');

  handleImgError(stage);

  var cardEl = stage.querySelector('.card-3d');
  setTimeout(function () {
    if (cardEl) cardEl.classList.add('flipped');
  }, 400);

  if (resultBox) {
    resultBox.classList.remove('show');
    resultBox.innerHTML = renderResultHtml(card);
    setTimeout(function () {
      resultBox.classList.add('show');
    }, 1200);
  }
}

function resetStage(stage) {
  var resultBox = $('#resultBox');
  if (resultBox) resultBox.classList.remove('show');
  var cardEl = stage.querySelector('.card-3d');
  if (cardEl) cardEl.classList.remove('flipped');
}

/* ================================================
 * 3枚引き
 * ================================================ */
var POSITIONS = ['過去', '現在', '未来'];

function drawTriple() {
  usedIds = [];
  var cards = [];

  for (var i = 0; i < 3; i++) {
    var card = pickCard(usedIds);
    usedIds.push(card.id);
    cards.push(card);
  }

  // ステージ表示
  var tripleStage = $('#tripleStage');
  if (tripleStage) tripleStage.classList.add('show');

  // 各スロットにカードを配置
  for (var j = 0; j < 3; j++) {
    (function(index, card) {
      var wrap = $('#tripleCard' + index);
      if (!wrap) return;

      wrap.innerHTML = renderCardHtml(card);
      handleImgError(wrap);

      // 順番にめくる
      var cardEl = wrap.querySelector('.card-3d');
      var delay  = 400 + index * 500;

      setTimeout(function () {
        if (cardEl) cardEl.classList.add('flipped');
      }, delay);
    })(j, cards[j]);
  }

  // ボタン切替
  var drawBtn3   = $('#drawBtn3');
  var redrawBtn3 = $('#redrawBtn3');
  if (drawBtn3)   drawBtn3.style.display   = 'none';
  if (redrawBtn3) redrawBtn3.style.display = '';

  // メッセージ表示
  var tripleResult = $('#tripleResult');
  if (tripleResult) {
    tripleResult.classList.remove('show');
    tripleResult.innerHTML = renderTripleResultHtml(cards);

    setTimeout(function () {
      tripleResult.classList.add('show');
    }, 400 + 3 * 500 + 600);
  }
}

function resetTriple() {
  var tripleResult = $('#tripleResult');
  if (tripleResult) tripleResult.classList.remove('show');

  for (var i = 0; i < 3; i++) {
    var wrap = $('#tripleCard' + i);
    if (!wrap) continue;
    var cardEl = wrap.querySelector('.card-3d');
    if (cardEl) cardEl.classList.remove('flipped');
  }
}

/* ================================================
 * HTML組み立て（共通）
 * ================================================ */
function renderCardHtml(card) {
  return ''
    + '<div class="card-3d">'
    +   '<div class="card-face card-face-back">'
    +     '<div class="card-back-pattern">'
    +       '<span class="card-back-gem">✦</span>'
    +       '<span class="card-back-label">Mermaid Oracle</span>'
    +     '</div>'
    +   '</div>'
    +   '<div class="card-face card-face-front" style="--card-accent:' + escapeHtml(card.accent) + '">'
    +     '<img src="' + escapeHtml(card.image) + '" alt="' + escapeHtml(card.name) + '">'
    +     '<div class="card-front-overlay">'
    +       '<span class="card-no">No. ' + escapeHtml(card.no) + '</span>'
    +       '<span class="card-name">' + escapeHtml(card.name) + '</span>'
    +     '</div>'
    +   '</div>'
    + '</div>';
}

function renderResultHtml(card) {
  var msg = String(card.message || '')
    .split('\n').map(escapeHtml).join('<br>');

  return ''
    + '<div class="oracle-message">'
    +   '<p class="oracle-chapter">' + escapeHtml(card.chapterRoman) + '. ' + escapeHtml(card.chapterJa) + '</p>'
    +   '<p class="oracle-name">'    + escapeHtml(card.name) + '</p>'
    +   '<p class="oracle-msg">'     + msg + '</p>'
    + '</div>';
}

function renderTripleResultHtml(cards) {
  var html = '';
  for (var i = 0; i < cards.length; i++) {
    var card = cards[i];
    var msg  = String(card.message || '')
      .split('\n').map(escapeHtml).join('<br>');

    html += ''
      + '<div class="triple-card-msg">'
      +   '<p class="triple-pos-label">' + escapeHtml(POSITIONS[i]) + '</p>'
      +   '<p class="triple-card-name">' + escapeHtml(card.name) + '</p>'
      +   '<p class="triple-card-text">' + msg + '</p>'
      + '</div>';
  }
  return html;
}

function handleImgError(container) {
  var img = container.querySelector('.card-face-front img');
  if (!img) return;
  img.addEventListener('error', function () {
    var face = container.querySelector('.card-face-front');
    if (face) {
      face.classList.add('no-image');
      if (img.parentNode) img.parentNode.removeChild(img);
    }
  });
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
