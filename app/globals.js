let debug = location.protocol !== 'https';
let loadCounter = 0, _cl = 48;
let ndataObj, ndata, receptMd, receptDetails, niceLog, search = '';

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