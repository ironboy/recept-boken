function printEtikett() {
  let d = new Date().toISOString().slice(0, 10);
  d = prompt('Tillagningsdatum (ÅÅÅÅ-MM-DD)', d);
  if (!d) { return; }
  let numberOf = +prompt('Antal etiketter', '4');
  if (!numberOf) { return; }
  let a = $('h2,h3,table:first,ol,hr').hide();
  let nChart = $('.nChart').css({ marginBottom: 20 })
  let wDay = ['sön', 'mån', 'tis', 'ons', 'tor', 'fre', 'lör'][new Date(d).getDay()];
  wDay && (d = wDay + 'dag ' + d);
  let b = $(`<h3>Tillagad: ${d}<br><br></h3>`).insertAfter('h1');
  let visibleImages = $('.visible').removeClass('visible');
  let dButton = $('.showNutrionDetails:contains("Dölj")');
  dButton.click();
  let clones = [...new Array(numberOf - 1)].map(x => $('main').clone());
  for (let clone of clones) { $('body').append(clone); }
  $('body').addClass('hiddenOnScreen');
  window.print();
  $('body').removeClass('hiddenOnScreen');
  a.show();
  b.remove();
  nChart.css({ marginBottom: '' });
  visibleImages.addClass('visible');
  for (let clone of clones) { clone.remove(); }
  dButton.click();
}