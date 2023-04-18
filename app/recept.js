function recept() {
  let els;
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