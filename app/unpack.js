function unpack(data) {
  const string = new TextDecoder()
    .decode(pako.inflate(atob(data).split('')
      .map(x => x.charCodeAt(0))));
  const toMB = x => (x.length / 1024 ** 2).toFixed(2);
  console.log(...niceLog('Compressed nutrition data size:', toMB(data), 'MB'));
  console.log(...niceLog('Uncompressed nutrition data size:', toMB(string), 'MB'));
  return JSON.parse(string);
}