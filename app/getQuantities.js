function getQuantities(html, tdN, doEval = true) {
  let dom = typeof html === 'string' ? $('<div>' + html + '</div>') : html;
  dom = dom.find('table').first();
  return [...dom.find('td:nth-child(' + tdN + ')')]
    .map(x => $(x).text())
    .map(x => doEval ? eval(x) : x)
}