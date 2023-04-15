function fastCalc(html) {
  let dom = $('<div>' + html + '</div>');
  let nslugs = getQuantities(dom, 2, false);
  let quantities = getQuantities(dom, 5);
  let pricesPerPortion = getQuantities(dom, 6).map((x, i) =>
    x * quantities[i] / 1000
  );
  let pricePerPortion = pricesPerPortion.reduce((a, c) => a + c, 0);
  let data = nslugs.map((x, i) => ({ slug: x, quantity: quantities[i] }));
  data = data
    .filter(x => ndataObj[x.slug])
    .map(x => ({ ...x, makros: ndataObj[x.slug].makrokomponenter }));
  let sum = {};
  Object.keys(data[0].makros).forEach(x => sum[x] = { per100g: 0, enhet: 'g' });
  for (let { quantity, makros } of data) {
    for (let key in sum) {
      sum[key].per100g += makros[key].per100g * quantity / 100;
    }
  }
  return { makros: sum, pricesPerPortion, pricePerPortion };
}