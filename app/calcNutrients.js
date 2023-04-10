function calcNutrients(keys, quantities) {
  let sum = {};
  for (let key of keys) {
    let quantity = quantities.shift();
    let show = ndataObj[key];
    for (let key2 in show) {
      let part = show[key2];
      if (typeof part === 'string') { continue; }
      sum[key2] = sum[key2] || {};
      for (let key3 in part) {
        if (key3.includes('avfall')) { continue; }
        let part2 = part[key3];
        sum[key2][key3] = sum[key2][key3] || {};
        for (let key4 in part2) {
          if (key4 === 'enhet' || key4 === 'RDI') {
            sum[key2][key3][key4] = part2[key4];
            continue;
          }
          sum[key2][key3][key4] = sum[key2][key3][key4] || 0;
          let add = part2[key4] * (quantity / 100);
          sum[key2][key3][key4] += isNaN(add) ? 0 : add;
          if (key === keys[keys.length - 1]) {
            sum[key2][key3][key4] =
              Math.round(sum[key2][key3][key4] * 10) / 10;
          }
        }
      }
    }
  }
  sum.namn = 'Näring per portion';
  return livsmedelsdetaljer(sum, 'Per portion', true);
}