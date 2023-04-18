function recept() {
  let r = receptMd.split('<a href').slice(1).map(x => '<a href' + x);
  r = r.map(x => ({
    orgHtml: x,
    html: x,
    text: $(x).text().trim().toLowerCase()
  }));
  recept.search = () => {
    $('.receptlist').html(r.
      filter(x => x.text.includes(searchRecept.toLowerCase()))
      .map(x => x.html)
    );
  }
  return /*html*/`<div class="receptlist not-lpage">
    ${r.map(x => x.html)}
  </div>`;
}