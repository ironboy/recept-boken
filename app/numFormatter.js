function numFormatter(x, decimals = 1) {
  x = isNaN(x) ? 0 : x;
  let y = Intl.NumberFormat('sv-SE', {
    minimumFractionDigits: x && decimals,
    maximumFractionDigits: decimals
  }).format(x);
  return isNaN(x) ? '0' : y;
}