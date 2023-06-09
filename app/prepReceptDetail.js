function prepReceptDetail(x, data) {
  let dom = $('<div>' + x + '</div>');
  let ingredientKeys = [];
  dom.find('table').addClass('ingredients');
  dom.find('th:nth-child(6), td:nth-child(6)').remove();
  let names = [...$(dom).find('td:first-child')].map(x => $(x).text());

  let prisSnackEl1 = dom.find('h3:contains("Priser")');
  let prisSnackEl2 = dom.find('h3:contains("Priser") + p');
  let prisSnack = prisSnackEl2.html();
  prisSnackEl1.add(prisSnackEl2).remove();

  dom.find('h3:contains("Gör så här")').replaceWith(/*html*/`
    <hr>
      <h3 class="price-per-portion-h3">Pris per portion
        ${!prisSnack ? '' : `<small class="prisSnack">${('<br><br>' + prisSnack
      .replace(/(\.|,)/g, '$1<br>').replace(/ kr/g, '&nbsp;kr'))
      .split('<br>').slice(0, -1).slice(-3).join('<br>')
      }</small>`}
      </h3>
      <p class="price-per-portion">
        ${data.pricesPerPortion.map((x, i) => `<span title="${names[i]}">
          ${numFormatter(x, 2)}
        </span>`).join(' + ')} = 
        <b>${numFormatter(data.pricePerPortion, 0)}&nbsp;kr</b>
      </p>
    <hr>
    <h2>Gör så här</h2>
  `);
  addEvent('.price-per-portion span', 'mouseenter', function () {
    $(`td:contains("${$(this).attr('title')}") a`).addClass('green');
    $(this).addClass('green');
  });
  addEvent('.price-per-portion span', 'mouseleave', function () {
    $('.green').removeClass('green');
  });
  dom.find('td:nth-child(2)').each(function () {
    let me = $(this);
    let td = me.prev();
    td.wrapInner('<a href="#livsmedelsdetaljer/' + me.text().trim() + '"/>');
    ingredientKeys.push(me.text().trim());
    me.remove();
  });
  dom.find('th:nth-child(2)').remove();
  dom.find('a:contains("initial portions to show")').hide();
  let quantities = getQuantities(dom.html(), 4);
  dom = $('<div>' + dom.html() + '<hr>' + calcNutrients(ingredientKeys, quantities) + '</div>');
  let details = dom.find('.ldetails');
  let keep = true;
  details.find('tr').each(function () {
    let me = $(this);
    me.text().includes('vatten') && (keep = false);
    me.text().includes('makrokomponenter') && me.hide();
    me.text().includes('aska') && (keep = false);
    me.text().includes('aska') && me.after('<tr style="display:none"></tr>');
    !keep && me.addClass('detailed');
  });
  details.find('h2').append('<span class="showNutrionDetails">Visa detaljer</span>');
  addEvent('.showNutrionDetails', 'click', () => {
    let me = $('.showNutrionDetails');
    let text = me.text();
    me.text(text.includes('Visa') ? 'Dölj detaljer' : 'Visa detaljer');
    $('.ldetails .detailed')[text.includes('Visa') ? 'show' : 'hide']();
  });
  dom.find('.nChart').addClass('in-recept');
  return dom.html();
}