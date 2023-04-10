function reCalculator(show) {
  $('h3:contains("Ingredienser")').append(/*html*/`
    till <span class="portionNo">1 portion</span>
    <span class="portionChange">+</span>
    <span class="portionChange">-</span>
  `);
  let portionNo = +($('a:contains("initial portions to show")').attr('href') || 4);
  $('.portionChange').on('click', function () {
    let me = $(this), add = me.text() === '+' ? 1 : -1;
    (add < 0 && portionNo > 1 || add > 0 && portionNo < 50)
      && (portionNo += add);
    $('.portionNo').text(portionNo + ' portion' + (portionNo > 1 ? 'er' : ''));
    for (let i = 1; i <= 2; i++) {
      let q = show['quantities' + i].map(x => x * portionNo), qCopy = [...q];
      $('table').first().find('td:nth-child(' + i * 2 + ')').each(function () {
        let me = $(this);
        let tr = me.parent();
        let transform = i === 1 ? fuzzyFraction : x => isNaN(x) ? '' : numFormatter(x, 0) + ' g';
        me.html(transform(q.shift()));
        if (i === 1 && !$('.plurals').length) {
          $('table').first().find('td:nth-child(3)').each(function () {
            let me = $(this);
            let text = me.text()
              .split('(').join('<span class="plurals">')
              .split(')').join('</span>');
            me.html(text);
          });
          $('.plurals').each(function () {
            let me = $(this);
            if (me.text().includes('/')) {
              let texts = me.text().split('/');
              me.replaceWith(
                `<span class="singulars">${texts[0]}</span>` +
                `<span class="plurals">${texts[1]}</span>`
              );
            }
          });
        }
        if (i === 1) {
          let num = qCopy.shift();
          tr.find('.plurals')[num > 1 ? 'show' : 'hide']();
          tr.find('.singulars')[num <= 1 ? 'show' : 'hide']();
        }
      });
    }
  });
  $('.portionChange').click();
}