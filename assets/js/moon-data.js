/* ============================================
Mermaid Oracle / moon-data.js
月相データと月のメッセージ

- 月齢計算：2000年1月6日 18:14 UTC を基準新月とし、
  朔望月 29.530589 日で経過日数から月相を求める。
- 8つの月相に分類：新月 / 三日月 / 上弦 / 十三夜 /
  満月 / 居待月 / 下弦 / 有明月
============================================ */

(function () {
'use strict';

var MO = window.MermaidOracle = window.MermaidOracle || {};

// 朔望月の長さ（日）
var SYNODIC_MONTH = 29.530589;

// 基準新月：2000年1月6日 18:14 UTC
var BASE_NEW_MOON = new Date(Date.UTC(2000, 0, 6, 18, 14, 0));

// 8つの月相定義
var PHASES = [
  {
    key: 'new',
    symbol: '🌑',
    ja: '新月',
    en: 'New Moon',
    start: 0,
    end: 1.84,
    color: 'var(--lav)',
    messages: [
      '新月は、種を蒔く夜。\n声に出さない願いを、心の奥に静かに置いて。',
      '何も持たない静けさ。\nそこからすべてが始まる。',
      '新しいページを開く前に、\n古いページを閉じる勇気を。'
    ],
    intentions: [
      '新しく始めたいことを、3つだけ書き出してみて。',
      '今夜、自分にどんな約束をする？'
    ],
    releases: [
      '何を始めるためのスペースを、\nあなたは作りたい？',
      '新しい光のために、\n手放す古い灯りはある？'
    ]
  },
  {
    key: 'waxingCrescent',
    symbol: '🌒',
    ja: '三日月',
    en: 'Waxing Crescent',
    start: 1.84,
    end: 5.53,
    color: 'var(--teal-lt)',
    messages: [
      'まだ細く、けれど確かな光。\nあなたの一歩も、ちゃんと光になっている。',
      '芽吹きの時。\n急がず、ただ伸びていけばいい。',
      '小さな進歩を祝う夜。'
    ],
    intentions: [
      '新月で蒔いた種に、今日できる小さな水やりは？',
      '今週、ひとつだけ動かすとしたら？'
    ],
    releases: [
      '「まだ早い」という思い込みを、\nそっと脇に置いてみて。',
      '焦りという霧を、\n月の光で照らしてみて。'
    ]
  },
  {
    key: 'firstQuarter',
    symbol: '🌓',
    ja: '上弦の月',
    en: 'First Quarter',
    start: 5.53,
    end: 9.22,
    color: 'var(--teal)',
    messages: [
      '半分の光と半分の影。\nどちらもあなたの一部。',
      '決断の時。\n海はあなたの選択を信じている。',
      '上弦の月は、勢いのとき。\n波に乗って。'
    ],
    intentions: [
      '今、決めるべきことは何？',
      '今日、勇気を出して始めることは？'
    ],
    releases: [
      '「どっちつかず」の状態を手放す覚悟は？',
      '進むことを邪魔しているものは何？'
    ]
  },
  {
    key: 'waxingGibbous',
    symbol: '🌔',
    ja: '十三夜',
    en: 'Waxing Gibbous',
    start: 9.22,
    end: 12.91,
    color: 'var(--gold-lt)',
    messages: [
      'もう少しで満ちる月。\n仕上げの時間を、丁寧に。',
      '完成へ向かう静かな高鳴り。\n息を整えて。',
      '満月の前の、もっとも美しい焦らし。'
    ],
    intentions: [
      '満月までに整えたいことは？',
      '今、最後のひと押しが必要なものは？'
    ],
    releases: [
      '「もう少し」と先延ばししていることは？',
      '完璧主義をそっと緩める許可を。'
    ]
  },
  {
    key: 'full',
    symbol: '🌕',
    ja: '満月',
    en: 'Full Moon',
    start: 12.91,
    end: 16.61,
    color: 'var(--gold)',
    messages: [
      '満月の夜。\nあなたの中の光が、もっとも明るく満ちている。',
      '受け取る夜。\nこれまでの努力が、静かに花ひらく。',
      '満ちた月は、すべてを照らす。\nあなたの影もまた、美しい。'
    ],
    intentions: [
      '今、心からの感謝を捧げる相手は？',
      '満ちている今の感覚を、言葉にしてみて。'
    ],
    releases: [
      '満月は、手放しの始まり。\n何を解き放つ？',
      '抱えすぎたものを、月に預ける夜。'
    ]
  },
  {
    key: 'waningGibbous',
    symbol: '🌖',
    ja: '居待月',
    en: 'Waning Gibbous',
    start: 16.61,
    end: 20.30,
    color: 'var(--lav-lt)',
    messages: [
      '満ちた光が、ゆっくりと欠け始める。\nそれは終わりではなく、循環。',
      '感謝の時間。\nここまで運んでくれた波に、お礼を。',
      '欠けていく月は、与え続けている。'
    ],
    intentions: [
      '今、誰に「ありがとう」を伝えたい？',
      '何を分かち合いたい？'
    ],
    releases: [
      '満たされた喜びの中で、\nもう必要ないものは？',
      '抱きしめすぎているものを、\n少しだけ手放す。'
    ]
  },
  {
    key: 'lastQuarter',
    symbol: '🌗',
    ja: '下弦の月',
    en: 'Last Quarter',
    start: 20.30,
    end: 23.99,
    color: 'var(--teal)',
    messages: [
      '下弦の月。\n手放すことが、新しい始まりへの道。',
      '振り返りの時間。\nここまでの航海を、静かに讃えて。',
      '欠けていく光のなかに、\n本当に大切なものが残る。'
    ],
    intentions: [
      '次のサイクルまでに、\n整理しておきたいことは？',
      '心の中で許しておきたい人は？'
    ],
    releases: [
      '今、本当に手放す時の感情は？',
      '心の中に残しているわだかまりは？'
    ]
  },
  {
    key: 'waningCrescent',
    symbol: '🌘',
    ja: '有明月',
    en: 'Waning Crescent',
    start: 23.99,
    end: 29.53,
    color: 'var(--lav)',
    messages: [
      '夜明け前の月。\n静かな深呼吸の時間。',
      'もうすぐ新月。\n器を空にして、次を迎える準備を。',
      '消えゆく光は、消えるのではなく、\n次の光に変わる。'
    ],
    intentions: [
      '次の新月で、何を新しく始める？',
      '今夜、自分に与える静寂は？'
    ],
    releases: [
      '心の器を、空にしてあげる夜。',
      '新しい月のために、\nどんな古いものを送り出す？'
    ]
  }
];

/* ------------------------------------------------
 * 月齢を求める（0〜29.53の小数）
 * ------------------------------------------------ */
function getMoonAge(date) {
  var d = date instanceof Date ? date : new Date();
  var diffMs = d.getTime() - BASE_NEW_MOON.getTime();
  var diffDays = diffMs / (1000 * 60 * 60 * 24);
  var age = diffDays % SYNODIC_MONTH;

  if (age < 0) age += SYNODIC_MONTH;

  return age;
}

/* ------------------------------------------------
 * 月相オブジェクトを取得
 * ------------------------------------------------ */
function getPhase(date) {
  var age = getMoonAge(date);

  for (var i = 0; i < PHASES.length; i++) {
    if (age >= PHASES[i].start && age < PHASES[i].end) {
      return Object.assign({}, PHASES[i], {
        age: age,
        ageStr: age.toFixed(1)
      });
    }
  }

  return Object.assign({}, PHASES[0], {
    age: age,
    ageStr: age.toFixed(1)
  });
}

/* ------------------------------------------------
 * その日の月のメッセージ・ワークを日替わりで取得
 * ------------------------------------------------ */
function dailyIndex(date, length) {
  var d = date instanceof Date ? date : new Date();
  var seed = d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();

  return seed % length;
}

function getDailyContent(date) {
  var d = date instanceof Date ? date : new Date();
  var phase = getPhase(d);

  return {
    phase: phase,
    message: phase.messages[dailyIndex(d, phase.messages.length)],
    intention: phase.intentions[dailyIndex(d, phase.intentions.length)],
    release: phase.releases[dailyIndex(d, phase.releases.length)]
  };
}

/* ------------------------------------------------
 * 公開
 * ------------------------------------------------ */
MO.moon = {
  PHASES: PHASES,
  SYNODIC_MONTH: SYNODIC_MONTH,
  getMoonAge: getMoonAge,
  getPhase: getPhase,
  getDailyContent: getDailyContent
};

})();
