function getQuantities(html, tdN) {
  let dom = $('<div>' + html + '</div>');
  dom = dom.find('table').first();
  return [...dom.find('td:nth-child(' + tdN + ')')]
    .map(x => $(x).text())
    .map(x => eval(x))
}