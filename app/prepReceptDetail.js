function prepReceptDetail(x) {
  let dom = $('<div>' + x + '</div>');
  let ingredientKeys = [];
  dom.find('table').addClass('ingredients');
  dom.find('h3:contains("Gör så här")').replaceWith('<hr><h2>Gör så här</h2>');
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
  dom.find('.nChart').remove();
  return dom.html();
}