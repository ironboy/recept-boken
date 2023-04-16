const version = '1.2';

async function _main() {
  console.log('App version', version);
  const loader = async () => {
    const loadText = async x => await (await fetch(x)).text();
    const loadJson = async x => await (await fetch(x)).json();
    let { scripts, styles } = await loadJson('/json/scripts-and-styles.json');
    let orgScripts = scripts.filter(x => x[0] !== '*');
    scripts = scripts.map(x => (x[0] === '*' ?
      (x = x.slice(1)) && '/libs/' : '/app/') + x + '.js');
    styles = styles.map(x => '/css/' + x + '.css');
    let all = [...scripts, ...styles].map(x => loadText(x));
    all = await Promise.all(all);
    let l = scripts.length;
    scripts = all.slice(0, l).join('\n\n') + `
      callLogger(${JSON.stringify(orgScripts)}); 
      start();
    `;
    styles = all.slice(l).join('\n\n');
    scripts = btoa(unescape(encodeURIComponent(scripts)));
    styles = btoa(unescape(encodeURIComponent(styles)));
    Object.keys(localStorage).forEach(x =>
      (x => x.indexOf('scripts') === 0
        || x.indexOf('styles') === 0)
      && delete localStorage[x]);
    localStorage['scripts' + version] = scripts;
    localStorage['styles' + version] = styles;
    return [scripts, styles];
  }
  const loadFromLocalStorage = () => {
    const [scripts, styles] = [
      localStorage['scripts' + version],
      localStorage['styles' + version]
    ];
    if (scripts && styles) { return [scripts, styles]; }
  }
  window.startTime = Date.now();
  const [scripts, styles] = loadFromLocalStorage() || await loader();
  const scriptEl = document.createElement('script');
  scriptEl.src = 'data:text/javascript;base64,' + scripts;
  document.body.append(scriptEl);
  const styleEl = document.createElement('link');
  styleEl.setAttribute('rel', 'stylesheet');
  styleEl.setAttribute('href', 'data:text/css;base64,' + styles);
  document.head.append(styleEl);
}

_main();