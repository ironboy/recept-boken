function prepRecept(x) {
  receptDetails = {};
  let content;
  let dom = $('<div>' + marked.parse(x) + '</div>');
  dom.find('*').removeAttr('id');
  let titles = [...dom.find('h2')].map(x => $(x).text()).sort();
  let domHtml = dom.html();
  html = '';
  for (let title of titles) {
    let slug = kebabify(title);
    content = receptDetails[slug] = {
      name: title,
      rawHtml: domHtml
        .split(`<h2>${title}</h2>`)[1].split('<h2')[0],
      html: '',
      // code that is too slow to run right away (if many recipes)
      // so save it in a function and run just before first display
      // in receptdetaljer.js
      beforeShow() {
        this.html = prepReceptDetail(this.rawHtml, this);
        this.quantities1 = getQuantities(this.html, 2);
        this.quantities2 = getQuantities(this.html, 4);
        return true;
      }
    };
    Object.assign(content, fastCalc(content.rawHtml));
    let makros = content.makros;
    let x = nChart({ makrokomponenter: makros }, 'in-recept', false);
    let [chart, , info] = x;
    let joiner = '&nbsp;'.repeat(3) + '|' + '&nbsp;'.repeat(3);
    html += /*html*/`
      <a href="#receptdetaljer/${slug}">
        <div class="recept-in-list">
          <img onerror="imageOnError(this)" onload="showImageOnLoad(this)" src="/images/resized/${slug}-w500.jpg">
          <div class="textbased">
            <h3>${nameStyler(title)}</h3>
            <div class="recept-in-list-info">${loremGenerator(1)}</div>
            <div class="chart-in-recept-list">
              ${chart}
              <p class="sum-in-recept">
                <span>
                  ${info.slice(0, 3).map(({ n }) => `${n[0].toUpperCase() + n.slice(1)}
                  ${numFormatter(makros[n].per100g, 0)}${makros[n].enhet}`).join(joiner)}
                </span>
                <span class="big">${joiner}</span>
                <span class="small"><br></span>
                <span>
                  ${info.slice(3).map(({ n }) => `${n[0].toUpperCase() + n.slice(1)}
                  ${numFormatter(makros[n].per100g, 0)}${makros[n].enhet}`).join(joiner)}
                  ${joiner} ${numFormatter(makros.energi.per100g, 0)} kcal
                  ${joiner} Pris: ${numFormatter(content.pricePerPortion, 0)} kr
                </span>
              </p>
            </div>
          </div>
        </div>  
      </a>
    `;
  }
  return html;
}