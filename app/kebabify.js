function kebabify(str) {
  return str
    .toLowerCase().normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/\s/g, '-')
    .replace(/[^a-z\-]/g, '');
}