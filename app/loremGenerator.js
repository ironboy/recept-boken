function loremGenerator(paras = 3) {
  return loremBank.sort(() => .5 - Math.random()).slice(0, paras);
}