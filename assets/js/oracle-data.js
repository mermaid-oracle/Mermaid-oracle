/* ============================================
Mermaid Oracle / oracle-data.js
44枚の Mermaid Oracle Cards データ
============================================ */

(function () {
'use strict';

var MO = window.MermaidOracle = window.MermaidOracle || {};

// 章の定義
var CHAPTERS = {
  self:   { roman: 'Ⅰ', en: 'Self',    ja: 'マーメイドの章',     accent: 'var(--teal)' },
  flow:   { roman: 'Ⅱ', en: 'Flow',    ja: '海の仲間たちの章',   accent: 'var(--teal-lt)' },
  energy: { roman: 'Ⅲ', en: 'Energy',  ja: '月と深海の章',       accent: 'var(--lav)' },
  soul:   { roman: 'Ⅳ', en: 'Soul',    ja: 'レムリアと神秘の章', accent: 'var(--gold)' }
};

// 0埋め
function pad2(n) {
  return n < 10 ? '0' + n : '' + n;
}

// 44枚のカードデータ
var RAW_CARDS = [

  // ── Ⅰ マーメイドの章（1〜12）─────────────────────────
  {
    no: 1,
    chapter: 'self',
    name: 'Deep Sea Mermaid',
    message: '深いところで、あなたの本当の声が\n静かに輝きはじめています。'
  },
  {
    no: 2,
    chapter: 'self',
    name: 'Singing Mermaid',
    message: 'あなたの声は、誰かの心に\nやさしい光を届けています。'
  },
  {
    no: 3,
    chapter: 'self',
    name: 'Sleeping Mermaid',
    message: '今は静かに休むとき。\n夢の中で、あなたは癒されています。'
  },
  {
    no: 4,
    chapter: 'self',
    name: 'Golden Tail',
    message: 'あなたの価値は、内側から輝いています。\nその光は、周りの人をも照らします。'
  },
  {
    no: 5,
    chapter: 'self',
    name: 'Pearl Heart',
    message: 'あなたの内側には、純粋な光があります。\nその光は、誰かの癒しにもなります。'
  },
  {
    no: 6,
    chapter: 'self',
    name: 'Moonlit Mermaid',
    message: '月は、あなたの心を優しく照らします。\nその光のもとで、あなたは本来の輝きを思い出します。'
  },
  {
    no: 7,
    chapter: 'self',
    name: 'Silent Tears',
    message: 'その涙は、あなたを弱くするものではありません。\n静かな涙は、心を浄化し、新しい光を招きます。'
  },
  {
    no: 8,
    chapter: 'self',
    name: 'Ocean Embrace',
    message: 'すべてを包み込む海のように、\nあなたもまた、愛され守られています。\n安心して、流れに身をゆだねてください。'
  },
  {
    no: 9,
    chapter: 'self',
    name: 'Mirror of Water',
    message: '水面は、あなたの本当の姿を映し出します。\n恐れずに、自分自身を見つめてください。\nそこには、純粋で美しい真実があります。'
  },
  {
    no: 10,
    chapter: 'self',
    name: 'Sacred Voice',
    message: 'あなたの声は、魂の深いところからの\nメッセージです。その声は、誰かの心を癒し、\n新しい道を開く光となります。'
  },
  {
    no: 11,
    chapter: 'self',
    name: 'The Awakening',
    message: 'あなたの魂は、今、目覚めようとしています。\n新しい自分を受け入れ、未来の扉を開いてください。'
  },
  {
    no: 12,
    chapter: 'self',
    name: 'Return to the Sea',
    message: 'あなたの旅は、ひとつの輪を描き、\n再び海へと帰ります。\nあなたは海そのものであり、永遠に自由です。'
  },

  // ── Ⅱ 海の仲間たちの章（13〜22）──────────────────────
  {
    no: 13,
    chapter: 'flow',
    name: 'Dolphin',
    message: 'イルカは、喜びと調和の象徴です。\nあなたに遊び心と信頼を思い出させ、\n人生を軽やかに楽しむことを教えてくれます。'
  },
  {
    no: 14,
    chapter: 'flow',
    name: 'Whale Song',
    message: 'クジラの歌は、深い叡智と愛のメロディ。\nあなたの心を癒し、魂の奥深くに響きます。\nその音に身をゆだね、宇宙のリズムとひとつになりましょう。'
  },
  {
    no: 15,
    chapter: 'flow',
    name: 'Jellyfish',
    message: 'クラゲは、優雅さと流れに身を任せる象徴です。\nあなたに柔軟性と受容の力を思い出させ、\n変化の中でも美しく輝くことを教えてくれます。'
  },
  {
    no: 16,
    chapter: 'flow',
    name: 'Sea Turtle',
    message: 'ウミガメは、長い旅と地球の叡智の象徴です。\nあなたに忍耐力と安定をもたらし、\n人生の道を静かに見守り、導いてくれます。'
  },
  {
    no: 17,
    chapter: 'flow',
    name: 'Manta Ray',
    message: 'マンタは、自由と優雅さの象徴です。\nあなたの心を解き放ち、視野を広げ、\n人生を大きく舞い飛ぶように生きることを教えてくれます。'
  },
  {
    no: 18,
    chapter: 'flow',
    name: 'Seahorse',
    message: 'タツノオトシゴは、忍耐と献身の象徴です。\nあなたの優しさと努力は、静かに実を結びます。\n信じて続けることで、愛と幸せを育むことができるでしょう。'
  },
  {
    no: 19,
    chapter: 'flow',
    name: 'School of Fish',
    message: '魚の群れは、調和と一体感の象徴です。\nあなたは大きな流れの一部であり、\n共に進むことで、より大きな未来を創り出せます。'
  },
  {
    no: 20,
    chapter: 'flow',
    name: 'Coral Garden',
    message: '珊瑚の庭は、生命と調和の象徴です。\nあなたの内なる美しさが花開き、\n豊かさと喜びに満ちた未来が広がります。'
  },
  {
    no: 21,
    chapter: 'flow',
    name: 'Shell Whisper',
    message: '貝殻は、海の記憶をそっと語りかけます。\n静けさに耳を澄ませば、\n心に必要なメッセージが届くでしょう。'
  },
  {
    no: 22,
    chapter: 'flow',
    name: 'Starfish',
    message: 'ヒトデは、再生と回復の象徴です。\nどんな状況でも適応し、\n新しい可能性を見つける力を教えてくれます。'
  },

  // ── Ⅲ 月と深海の章（23〜33）──────────────────────────
  {
    no: 23,
    chapter: 'energy',
    name: 'Full Moon',
    message: '満月は、完成と達成の象徴です。\nあなたの努力は実を結び、\n心が満たされる時が訪れています。'
  },
  {
    no: 24,
    chapter: 'energy',
    name: 'New Moon',
    message: '新月は、新しい始まりの象徴です。\n未知の可能性が広がるこの時に、\n願いを心に描き、未来への一歩を踏み出しましょう。'
  },
  {
    no: 25,
    chapter: 'energy',
    name: 'Moon Tide',
    message: '月の引力は、海のリズムを導きます。\n感情や流れに身を任せることで、\n必要なものが自然とあなたのもとへ運ばれてきます。'
  },
  {
    no: 26,
    chapter: 'energy',
    name: 'Deep Current',
    message: '深海の流れは、静かな力強さの象徴です。\n目に見えないものでも、その影響は確かに存在し、\nあなたを望む未来へと導いてくれます。'
  },
  {
    no: 27,
    chapter: 'energy',
    name: 'Ocean Light',
    message: '海の光は、希望と導きの象徴です。\nどんな深い場所にも光は届き、\nあなたの可能性を照らし出してくれます。'
  },
  {
    no: 28,
    chapter: 'energy',
    name: 'Sea Foam',
    message: '海の泡は、浄化と再生の象徴です。\n心のモヤを手放し、軽やかな未来へと\n進むためのサインを送っています。'
  },
  {
    no: 29,
    chapter: 'energy',
    name: 'Blue Abyss',
    message: '蒼い深淵は、未知と可能性の象徴です。\n恐れを手放し、深い知恵と直感に\n身をゆだねることで、新たな真実に出会えます。'
  },
  {
    no: 30,
    chapter: 'energy',
    name: 'The Wave',
    message: '波は、変化とエネルギーの象徴です。\n流れに身をまかせることで、\n人生にリズムと調和がもたらされます。'
  },
  {
    no: 31,
    chapter: 'energy',
    name: 'Underwater Aurora',
    message: '海底オーロラは、魂の共鳴と高次の導きを象徴します。\n直感を信じ、流れに身を委ねることで、\n宇宙のリズムと調和し、真実の道が照らされます。'
  },
  {
    no: 32,
    chapter: 'energy',
    name: 'Sacred Rain',
    message: '聖なる雨は、浄化と祝福の象徴です。\nすべてを洗い流し、魂を癒し、\n新たな恵みとインスピレーションをもたらします。'
  },
  {
    no: 33,
    chapter: 'energy',
    name: 'Rainbow Tide',
    message: '虹の潮流は、祝福と調和の象徴です。\nすべてがひとつにつながり、流れは愛へと還ります。\n希望の光が、あなたの未来を優しく照らします。'
  },

  // ── Ⅳ レムリアと神秘の章（34〜44）───────────────────
  {
    no: 34,
    chapter: 'soul',
    name: 'Lemurian Gate',
    message: 'レムリアの門は、古代の叡智とつながる入口です。\n内なる記憶を呼び覚まし、魂のルーツに還ることで、\n新たな使命と光の道が開かれます。'
  },
  {
    no: 35,
    chapter: 'soul',
    name: 'Temple of the Sea',
    message: '海底神殿は、古代の叡智と神聖なエネルギーが宿る場所です。\n内なる神殿とつながることで、\n魂の記憶が呼び覚まされ、真実の道が示されます。'
  },
  {
    no: 36,
    chapter: 'soul',
    name: 'Ancient Memory',
    message: 'わたしたちは、光の中で約束をしました。\n「また、必ず会いましょう」と。\n魂は離れても、その歌は今も響き続け、\nやがて時が満ちたとき、\n再び笑顔で巡り会うことを知っています。\n愛は永遠であり、わたしたちはひとつです。'
  },
  {
    no: 37,
    chapter: 'soul',
    name: 'Crystal Water',
    message: 'この水晶は、太古の叡智と魂の記憶を静かに宿しています。\nレムリアンシードとして、あなたの過去世の記録や\nアカシックの情報にアクセスする扉を開きます。\n澄み渡るその光は、忘れていた真実を思い出させ、\n魂の本質へと導いてくれるでしょう。'
  },
  {
    no: 38,
    chapter: 'soul',
    name: 'The Oracle',
    message: '神託は、あなたの魂が求める真実を映し出します。\n静けさの中で叡智を受け取り、\n迷いを手放すことで、道が明らかになります。'
  },
  {
    no: 39,
    chapter: 'soul',
    name: 'Sacred Pearl',
    message: '聖なる真珠は、魂の純粋さと光の記憶を象徴します。\nあなたの内なる真実が輝き、\n願いが美しく現実へと結実していきます。'
  },
  {
    no: 40,
    chapter: 'soul',
    name: 'Sea of Healing',
    message: 'この海は、すべてを優しく包み込み、\n心と魂の傷を静かに癒してくれます。\n深い悲しみも、古い痛みも、愛の波にゆだねることで、\nやがて光に変わり、新たな力となって巡り始めます。\nあなたは、海とひとつ。\nその癒しのエネルギーを、どうぞ受け取ってください。'
  },
  {
    no: 41,
    chapter: 'soul',
    name: 'Lemurian Blue',
    message: 'レムリアの青い石は、あなたの内側に眠る\n神聖なエネルギーの源です。\n魂の奥深くにある記憶と静かにつながることで、\n本来の輝きと調和が目覚め始めます。'
  },
  {
    no: 42,
    chapter: 'soul',
    name: 'Divine Feminine',
    message: 'あなたの内なる愛、優しさ、直感、創造性は、\n宇宙とつながる神聖な力です。\n自分らしく輝くことで、調和と癒しの光が広がっていきます。\nあなたの存在そのものが、美しさと祝福なのです。'
  },
  {
    no: 43,
    chapter: 'soul',
    name: 'Light Beneath',
    message: 'あなたの魂の奥底には、いつも光が輝いています。\nどんなに深い場所にいても、その光が消えることはありません。\nその光は、希望と愛、そして本来のあなた自身。\n静かに思い出すことで、進むべき道が優しく照らされていきます。'
  },
  {
    no: 44,
    chapter: 'soul',
    name: 'Mana',
    message: 'すべてのものに、\n静かに流れている光。\n\n海にも、\n星にも、\nあなたの魂にも、\nマナは静かに息づいています。\n\nあなたは、\n愛と調和の流れの中にいます。\n\nその光を、\n思い出してください。'
  }
];

// カード配列を組み立てる
var cards = RAW_CARDS.map(function (raw) {
  var chap = CHAPTERS[raw.chapter];
  return {
    id:          raw.no,
    no:          pad2(raw.no),
    chapter:     raw.chapter,
    chapterRoman: chap.roman,
    chapterJa:   chap.ja,
    chapterEn:   chap.en,
    accent:      chap.accent,
    name:        raw.name,
    message:     raw.message,
    image:       'assets/cards/' + raw.no + '.png'
  };
});

// 公開
MO.cards = cards;
MO.chapters = CHAPTERS;

})();
