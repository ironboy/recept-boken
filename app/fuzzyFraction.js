function fuzzyFraction(x) {
  let p = 1 / 6, c = 0;
  while (c++ <= 1 / p) {
    let d = (c * x) % 1;
    let e = d < 0.5 ? d : 1 - d;
    if (e < p) {
      let n = Math.round(x / (1 / c));
      let whole = Math.floor(x);
      n = n - whole * c;
      return (whole ? whole : '')
        + (n ? (whole ? '&nbsp;' : '')
          + '<span class="fraction"><sup>' + n
          + '</sup>/<sub>' + c + '</sub></span>' : '');
    }
  }
}