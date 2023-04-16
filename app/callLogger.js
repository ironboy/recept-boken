let callLog = {};
function callLogger(scripts) {
  window.showCalls = (initial) => {
    if (!debug) { return; }
    let s = Object.entries(callLog).map(([key, val]) => (
      [key, { ...val, totalTime: Math.round(val.totalTime) }]))
      .sort((a, b) => a[1].totalTime > b[1].totalTime ? -1 : 1);
    console.table(Object.fromEntries(s));
    let x = `Call showCalls() to show this table again...${initial ? '\n\n' : ''}`;
    initial && console.log(x);
    return x;
  }
  scripts.forEach(script => {
    if (script === 'callLogger') { return; }
    let func = window[script];
    window[script] = (...args) => {
      let startTime = performance.now();
      let result = func(...args);
      let then = (result && result.then) || (f => f());
      then.call(result, () => {
        callLog[script] = callLog[script] ||
          { loc: (func + '').split('\n').length, called: 0, totalTime: 0 };
        callLog[script].called++;
        callLog[script].totalTime += performance.now() - startTime;
      });
      return result;
    }
  });
  return true;
}