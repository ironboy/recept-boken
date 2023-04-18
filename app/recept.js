function recept() {
  let els;
  let r = receptMd
    .split('<a href')
    .slice(1)
    .map(x => '<a href' + x)
    .map((x, index) => ({
      index,
      text: $(x).find('.textbased').text().trim().toLowerCase()
    }));
  recept.search = () => {
    let s = searchRecept.toLowerCase();
    let reg = new RegExp('(' + s + ')', 'gi');
    $('.receptlist>a').hide();
    els.forEach(({ el, text }) => {
      text = text.replace(reg, '<span class="searched">$1</span>');
      el.html() !== text && el.html(text);
      text.includes('<span') && el.parents('.receptlist>a').show();
    })
  }
  return [
      /*html*/`<div class="receptlist not-lpage">${receptMd}</div>`,
    () => {
      els = [...$('.receptlist *').filter(function () {
        return $(this).children().length === 0 && $(this).text();
      })].map(x => ({ el: $(x), text: $(x).text() }));
    }
  ];
}