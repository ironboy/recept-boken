function getQuantities(html, tdN, doEval = true) {
  let dom = $('<div>' + html + '</div>');
  dom = dom.find('table').first();
  return [...dom.find('td:nth-child(' + tdN + ')')]
    .map(x => $(x).text())
    .map(x => doEval ? eval(x) : x)
}