function receptdetaljer() {
  let slug = location.hash.split('/').pop();
  let show = receptDetails[slug];
  if (!show) {
    return `<h2>404: Kan ej hitta detta recept!</h2>`;
  }
  show.beforeShow && show.beforeShow() && delete show.beforeShow;
  let name = show.name.replace(/,/, '---first-comma---');
  name = name.split('---first-comma---');
  name.length > 1 && (name[1] = '<small>' + name[1] + '</small>');
  name = name.join('<br>');

  addEvent('.printEtikett', 'click', printEtikett);

  return [/*html*/`
    <div class="recept-details">
      <h1>${name}</h1>
      ${show.html}
      <br><br>
      <div class="printEtikett">Skriv ut etiketter</div>
    </div>
  `, () => reCalculator(show)];
}