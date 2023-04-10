function pack(data) {
  let string = JSON.stringify(data);
  let c = btoa([...pako.deflate(new TextEncoder()
    .encode(string))]
    .map(x => String.fromCharCode(x)).join(''));
  return c;
}