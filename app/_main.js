let debug = location.protocol !== 'https';
let startTime = Date.now(), loadCounter = 0, _cl = 48;
let ndataObj, ndata, receptMd, receptDetails, search = '';

const scripts = [
  '*jquery', '*marked', '*pako', 'recept', 'start',
  'menu', 'navigate', 'addEvent', 'pack', 'unpack',
  'livsmedelslista', 'livsmedelsdetaljer', 'printEtikett',
  'receptdetaljer', 'prepRecept', 'prepReceptDetail',
  'calcNutrients', 'reCalculator', 'getQuantities', 'kebabify',
  'fuzzyFraction', 'addExtraData', 'numFormatter', 'callLogger'
];

Array.prototype.toString = function () { return this.join(''); };
!debug && (console.log = () => { });
!debug && (console.table = () => { });
const niceLog = (...a) => {
  let l = a.reduce((a, c) => a + (c + '').length, a.length - 1);
  a[a.length - 3] && (a[a.length - 3] += ' '.repeat(_cl - l));
  return a;
};

console.log(...niceLog('RECEPT:  Booting up... :)', '', '© ironboy 2023'));
console.log(...niceLog('-'.repeat(_cl)));
scripts.map(x => {
  let startTime = Date.now();
  let folder = '/app', src;
  x[0] === '*' && (x = x.slice(1)) && (folder = '/libs');
  let s = document.createElement('script');
  s.src = src = `${folder}/${x}.js`;
  s.onload = () => {
    console.log(...niceLog('Loaded', src, 'time', Date.now() - startTime, 'ms'));
    ++loadCounter === scripts.length && callLogger() && start();
  }
  document.body.append(s);
});