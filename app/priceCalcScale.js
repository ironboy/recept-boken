function priceCalcScale() {
  let p = $('.price-per-portion');
  if (!p.length) { return; }
  let fontSize = 20;
  p.css({ fontSize: '' });
  while (p.height() > 50 && fontSize > 12) {
    fontSize -= 0.5;
    p.css({ fontSize });
  }
}