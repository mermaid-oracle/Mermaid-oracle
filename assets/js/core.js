/* ============================================
Mermaid Oracle / core.js
全ページ共通の軽量ユーティリティ

- ページ遷移時のフェード演出
- 日付フォーマット
- 簡易な乱数 / DOMヘルパー
============================================ */

(function () {
'use strict';

// -- 名前空間 --
// 各ページの専用JSから window.MermaidOracle.* を呼び出して使う
var MO = window.MermaidOracle = window.MermaidOracle || {};

/* ------------------------------------------------
 * ページ遷移：data-transition 属性つきリンクで
 * フェードアウトしてから移動する
 *
 * 使い方（HTML側）:
 * <a href="oracle.html" data-transition>海へ潜る</a>
 * ------------------------------------------------ */
function initPageTransitions() {
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[data-transition]');
    if (!a) return;

    var href = a.getAttribute('href');
    if (!href || href.charAt(0) === '#') return;

    // 外部リンク・別タブは通常遷移
    if (a.target === '_blank' || /^(https?:)?\/\//.test(href)) return;

    e.preventDefault();
    document.body.classList.add('is-leaving');

    // CSS側で .is-leaving に対しフェードアウトを定義してもよい。
    // ここでは透明度をスクリプトで直接当て、約400ms後に遷移する。
    document.body.style.transition = 'opacity 0.45s ease';
    document.body.style.opacity = '0';

    setTimeout(function () {
      window.location.href = href;
    }, 450);
  });
}

/* ------------------------------------------------
 * 日付フォーマット
 * formatDateJa(new Date()) => “2026年5月6日（水）”
 * ------------------------------------------------ */
var WEEK_JA = ['日', '月', '火', '水', '木', '金', '土'];

function formatDateJa(date) {
  var d = date instanceof Date ? date : new Date();

  return d.getFullYear() + '年'
    + (d.getMonth() + 1) + '月'
    + d.getDate() + '日（'
    + WEEK_JA[d.getDay()] + '）';
}

/* ------------------------------------------------
 * 乱数ヘルパー
 * ------------------------------------------------ */
function randInt(maxExclusive) {
  return Math.floor(Math.random() * maxExclusive);
}

function pick(arr) {
  if (!arr || !arr.length) return null;
  return arr[randInt(arr.length)];
}

/* ------------------------------------------------
 * DOM ショートハンド
 * ------------------------------------------------ */
function $(selector, root) {
  return (root || document).querySelector(selector);
}

function $$(selector, root) {
  return Array.prototype.slice.call(
    (root || document).querySelectorAll(selector)
  );
}

/* ------------------------------------------------
 * フラッシュメッセージ表示（保存通知など）
 * showFlash('#saveFlash', 1800)
 * ------------------------------------------------ */
function showFlash(selector, durationMs) {
  var el = typeof selector === 'string' ? $(selector) : selector;
  if (!el) return;

  el.classList.add('show');

  setTimeout(function () {
    el.classList.remove('show');
  }, durationMs || 1800);
}

/* ------------------------------------------------
 * localStorage 安全ラッパ
 * ------------------------------------------------ */
function storageGet(key, fallback) {
  try {
    var raw = localStorage.getItem(key);
    return raw == null ? fallback : JSON.parse(raw);
  } catch (e) {
    return fallback;
  }
}

function storageSet(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (e) {
    return false;
  }
}

/* ------------------------------------------------
 * 公開API
 * ------------------------------------------------ */
MO.formatDateJa = formatDateJa;
MO.randInt = randInt;
MO.pick = pick;
MO.$ = $;
MO.$$ = $$;
MO.showFlash = showFlash;
MO.storageGet = storageGet;
MO.storageSet = storageSet;

/* ------------------------------------------------
 * 起動
 * ------------------------------------------------ */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPageTransitions);
} else {
  initPageTransitions();
}

})();
