function recept() {
  let r = receptMd.split('<a href').slice(1).map(x => '<a href' + x);
  r = r.map(x => ({ orgHtml: x, html: x, text: $(x).text().trim() }));
  recept.search = () => {

  }
  return /*html*/`<div class="receptlist not-lpage">
    ${r.map(r => r.html)}
  </div>`;
}