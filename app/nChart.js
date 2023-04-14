function nChart({ makrokomponenter: m }, classNames = '', sort = true) {
  const energyFrom = ['protein:4', 'fett:9', 'kolhydrater:4', 'fibrer:2', 'alkohol:7']
    .map(x => x.split(':'))
    .map(([n, x]) => ({
      n,
      e: +x * m[n].per100g,
      p: Math.round(+x * 100 * m[n].per100g / m.energi.per100g)
    }))
    .filter(x => x.p >= 1);
  sort && energyFrom.sort((a, b) => a.p > b.p ? -1 : 1);
  const sum = () => energyFrom.reduce((a, c) => a + c.p, 0);
  energyFrom[0] && (energyFrom[0].p += (100 - sum()));
  let displayPercent = energyFrom.map(x => ({ ...x }));
  if (displayPercent.slice(-1)[0].p === 1) {
    displayPercent.slice(-1)[0].p = 2;
    displayPercent.slice(-2)[0].p--;
  }
  return [
    /*html*/`<div class="nChart ${classNames}">
      <div class="dia">
        ${displayPercent.map(({ n, p }) => /*html*/`
          <div class="${n}" style = "width:${p}%"></div>
        `)}
      </div>
      <div class="e-line">
          <span>${m.energi.per100g}<br>kcal</span>
          <img src="/images/ui/e-line.png">
      </div>
      <div class="hori-line">
        <img src="/images/ui/hori-arrow-line.png">
        <span>
        ${energyFrom.length === 0 ? 'Ingen ' : ''}
        ${energyFrom.length === 1 ? 'Bara ' : ''}
        ${energyFrom.map(x => x.n[0].toUpperCase() + x.n.slice(1)).join(', ')} <small>
        (</small>energi <small>%)</small></span>
      </div>
      <div class="vert-line">
        <img src="/images/ui/vert-arrow-line.png">
        <span>Energitäthet</span>
      </div>
    </div>`, energyFrom.map(x => x.n), energyFrom
  ];
}