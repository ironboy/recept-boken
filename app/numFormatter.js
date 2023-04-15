function numFormatter(x, decimals = 1) {
  let y = Intl.NumberFormat('sv-SE', {
    minimumFractionDigits: x && decimals,
    maximumFractionDigits: decimals
  }).format(x);
  return isNaN(x) ? '0' : y;
}