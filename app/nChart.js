function nChart({ makrokomponenter: m }) {
  const energyFrom = ['protein:4', 'kolhydrater:4', 'fibrer:2', 'fett:9', 'alkohol:7']
    .map(x => x.split(':'))
    .map(([n, x]) => ({
      n,
      e: +x * m[n].per100g,
      p: Math.round(+x * 100 * m[n].per100g / m.energi.per100g)
    }))
    .filter(x => x.p >= 1);
  const sorted = [...energyFrom].sort((a, b) => a.p > b.p ? -1 : 1);
  const sum = () => energyFrom.reduce((a, c) => a + c.p, 0);
  sorted[0].p += (100 - sum());
  return [
    /*html*/`<div class="nChart">
      <div class="dia">
        ${energyFrom.map(({ n, p }) => /*html*/`
          <div class="${n}" style = "width:${p}%"></div>
        `)}
      </div>
    </div>`, energyFrom.map(x => x.n)
  ];
}