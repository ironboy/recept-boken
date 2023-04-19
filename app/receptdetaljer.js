function receptdetaljer() {
  let slug = location.hash.split('/').pop();
  let show = receptDetails[slug];
  if (!show) {
    return `<h2>404: Kan ej hitta detta recept!</h2>`;
  }
  show.beforeShow && show.beforeShow() && delete show.beforeShow;
  let name = nameStyler(show.name);

  addEvent('.printEtikett', 'click', printEtikett);

  return [/*html*/`
    <div class="recept-details not-lpage">
      <img class="visible" onerror="imageOnError(this)" onload="showImageOnLoad(this)" src="/images/resized/${slug}-w2000.jpg">
      <h1><span>${name}</span></h1>
      ${show.html}
      <br><br>
      <h2><div class="printEtikett">Skriv ut etiketter</div></h2>
    </div>
  `, () => {
    priceCalcScale();
    reCalculator(show);
  }];
}