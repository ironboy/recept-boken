function prepRecept(x) {
  receptDetails = {};
  let dom = $('<div>' + marked.parse(x) + '</div>');
  dom.find('*').removeAttr('id');
  let titles = [...dom.find('h2')].map(x => $(x).text()).sort();
  let domHtml = dom.html();
  html = '';
  for (let title of titles) {
    let slug = kebabify(title);
    receptDetails[slug] = {
      name: title,
      rawHtml: domHtml
        .split(`<h2>${title}</h2>`)[1].split('<h2')[0],
      html: '',
      // code that is too slow to run right away (if many recipes)
      // so save it in a function and run just before first display
      // in receptdetaljer.js
      beforeShow() {
        this.html = prepReceptDetail(this.rawHtml);
        this.quantities1 = getQuantities(this.html, 2);
        this.quantities2 = getQuantities(this.html, 4);
        return true;
      }
    };
    let makros = receptDetails[slug].makros = fastCalc(receptDetails[slug].rawHtml);
    let x = nChart({ makrokomponenter: makros }, 'in-recept', false);
    let [chart, , info] = x;
    let joiner = '&nbsp;'.repeat(3) + '|' + '&nbsp;'.repeat(3);
    html += /*html*/`
      <a href="#receptdetaljer/${slug}">
        <div class="recept-in-list">
          <img onerror="imageOnError(this)" onload="showImageOnLoad(this)" src="/images/resized/${slug}-w500.jpg">
          <div class="textbased">
            <h3>${title}</h3>
            <div class="recept-in-list-info">${loremGenerator(1)}</div>
            <div class="chart-in-recept-list">
              ${chart}
              <p class="sum-in-recept">
                ${info.map(({ n, p }) => `${n[0].toUpperCase() + n.slice(1)}
                ${numFormatter(makros[n].per100g, 0)}${makros[n].enhet}`).join(joiner)}
                ${joiner} <b>${numFormatter(makros.energi.per100g, 0)} kcal</b>
              </p>
            </div>
          </div>
        </div>  
      </a>
    `;
  }
  return html;
}