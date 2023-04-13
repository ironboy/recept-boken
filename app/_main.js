let debug = location.protocol !== 'https';
let startTime = Date.now(), loadCounter = 0, _cl = 48;
let ndataObj, ndata, receptMd, receptDetails, search = '';

const scripts = [
  '*jquery', '*marked', '*pako', 'recept', 'start',
  'menu', 'navigate', 'addEvent', 'pack', 'unpack',
  'livsmedelslista', 'livsmedelsdetaljer', 'printEtikett',
  'receptdetaljer', 'prepRecept', 'prepReceptDetail',
  'calcNutrients', 'reCalculator', 'getQuantities', 'kebabify',
  'fuzzyFraction', 'addExtraData', 'numFormatter', 'callLogger',
  'nChart', 'nChartAnimate'
];

const styles = [
  'fonts', 'common', 'nav', 'main', 'table', 'details',
  'details-images', 'charts', 'print'
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

const toLoad = [...scripts, ...styles.map(x => x + '.css')];
toLoad.map(x => {
  let startTime = Date.now();
  let folder = '/app';
  x[0] === '*' && (x = x.slice(1)) && (folder = '/libs');
  let css = x.slice(-4) === '.css';
  folder = css ? '/styles' : folder;
  let s = document.createElement(css ? 'link' : 'script');
  css && (s.setAttribute('rel', 'stylesheet'));
  let src = `${folder}/${x}${css ? '' : '.js'}`;
  s.setAttribute(css ? 'href' : 'src', src);
  s.onload = () => {
    console.log(...niceLog('Loaded', src, 'time', Date.now() - startTime, 'ms'));
    ++loadCounter === toLoad.length && callLogger() && start();
  }
  document[css ? 'head' : 'body'].append(s);
});