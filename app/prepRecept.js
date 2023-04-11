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
      html: '',
      // code that is too slow to run right away (if many recipes)
      // so save it in a function and run just before first display
      // in receptdetaljer.js
      beforeShow() {
        this.html = prepReceptDetail(domHtml
          .split(`<h2>${this.name}</h2>`)[1].split('<h2')[0]);
        this.quantities1 = getQuantities(this.html, 2);
        this.quantities2 = getQuantities(this.html, 4);
        return true;
      }
    };
    html += /*html*/`
      <a href="#receptdetaljer/${slug}">
        <div class="recept-in-list">
          <img onload="showImageOnLoad(this)" src="/images/resized/${slug}-w200.jpg">
          <h3>${title}</h3>
        </div>  
      </a>
    `;
  }
  return html;
}