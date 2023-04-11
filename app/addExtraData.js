function addExtraData(x, extraData) {
  for (arr of extraData) {
    let [name, newSlug, basedOnSlug, src, newMakros] = arr;
    let entry = x[newSlug] = JSON.parse(JSON.stringify(x[basedOnSlug]));
    let makro = entry.makrokomponenter;
    entry.namn = name;
    let fatFactor = (newMakros.fett || makro.fett.per100g) / makro.fett.per100g;
    for (let d in entry.fett) {
      let re = Math.round(entry.fett[d].per100g * fatFactor * 10) / 10;
      entry.fett[d].per100g = isNaN(re) ? '-' : re;
    }
    let carbFactor = (newMakros.kolhydrater || makro.kolhydrater.per100g) / makro.kolhydrater.per100g;
    for (let d in entry.kolhydrater) {
      let re = Math.round(entry.kolhydrater[d].per100g * carbFactor * 10) / 10;
      entry.kolhydrater[d].per100g = isNaN(re) ? '-' : re;
    }
    for (let i in newMakros) {
      makro[i].per100g = newMakros[i];
    }
    entry.src = src + ' + Livsmedelsverket.';
  }
}