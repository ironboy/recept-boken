let debug = location.protocol !== 'https';
let startTime, loadCounter = 0, _cl = 48;
let ndataObj, ndata, receptMd, receptDetails, niceLog, search = '';

async function _main() {
  Array.prototype.toString = function () { return this.join(''); };
  !debug && (console.log = () => { });
  !debug && (console.table = () => { });
  niceLog = (...a) => {
    let l = a.reduce((a, c) => a + (c + '').length, a.length - 1);
    try {
      a[a.length - 3] && (a[a.length - 3] += ' '.repeat(_cl - l));
    } catch (e) { }
    return a;
  };

  console.log(...niceLog('RECEPT:  Booting up... :)', '', '© ironboy 2023'));
  console.log(...niceLog('-'.repeat(_cl)));

  let { scripts, styles } = await (await
    fetch('/json/scripts-and-styles.json')).json();
  startTime = Date.now();
  window.scripts = scripts;
  const toLoad = [...scripts, ...styles.map(x => x + '.css')];
  toLoad.map(x => {
    let startTime = Date.now();
    let folder = '/app';
    x[0] === '*' && (x = x.slice(1)) && (folder = '/libs');
    let css = x.slice(-4) === '.css';
    folder = css ? '/css' : folder;
    let s = document.createElement(css ? 'link' : 'script');
    css && (s.setAttribute('rel', 'stylesheet'));
    let src = `${folder}/${x}${css ? '' : '.js'}`;
    s.setAttribute(css ? 'href' : 'src', src);
    s.onload = () => {
      console.log(...niceLog(((loadCounter + 1) + '')
        .padStart(2, '0') + '. Loaded',
        src, 'time', Date.now() - startTime, 'ms'));
      ++loadCounter === toLoad.length && callLogger() && start();
    }
    document[css ? 'head' : 'body'].append(s);
  });
}

_main();