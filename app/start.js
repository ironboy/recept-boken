let fetchUncompressedAndCompress = false; // get data for compressed json file
let loremBank;

async function start() {
  globalEvents();
  console.log(...niceLog('Total script & styles load time', Date.now() - startTime, 'ms'));
  console.log('-'.repeat(_cl));
  startTime = Date.now();
  loremBank = (await (await (fetch('/json/lorem.json')))
    .json()).split('</p>').filter(x => x).map(x => x + '</p>')
  try {
    ndataObj = unpack(localStorage.ndata);
    const { etag } = Object.fromEntries(
      [...(await fetch('/json/extra-data.json', { method: 'head' })).headers.entries()]
    );
    if (etag !== localStorage.etagExtraData) {
      localStorage.etagExtraData = etag;
      console.log('Extra data changed, rebuilding cached data...');
      throw new Error();
    }
    console.log('Using locally stored nutrition data.');
  } catch (e) {
    if (fetchUncompressedAndCompress) {
      ndataObj = await (await fetch('/json/narings-data.json')).json();
    }
    else {
      ndataObj = unpack(await (await fetch('/json/narings-data-compressed.json')).json());
      let extraData = await (await fetch('/json/extra-data.json')).json();
      addExtraData(ndataObj, extraData);
    }
    try {
      localStorage.ndata = pack(ndataObj);
      if (fetchUncompressedAndCompress) {
        console.log(localStorage.ndata);
        return;
      }
      console.log('Stored nutrition data locally for future use.');
    } catch (e) { };
  }
  let rawMd = await (await fetch('/_recept.md')).text();
  console.log('Loading', '/_recept.md');
  console.log(...niceLog('Data load time:', Date.now() - startTime, 'ms'));
  console.log('-'.repeat(_cl));
  let startTimeProcess = Date.now();
  $("body").contents().each(function () {
    (this.nodeType === 8 || this.tagName === 'SCRIPT') && $(this).remove();
  });
  receptMd = prepRecept(rawMd);
  let slugs = Object.keys(ndataObj);
  ndata = Object.values(ndataObj).map((x, i) => ({ ...x, slug: slugs[i] }));
  ndata.sort((a, b) => a.namn.toLowerCase() > b.namn.toLowerCase() ? 1 : -1);
  menu();
  console.log(...niceLog('Post processing data', Date.now() - startTimeProcess, 'ms'));
  window.onhashchange = navigate;
  navigate();
  console.log('-'.repeat(_cl) + '\n\n');
  setTimeout(() => showCalls(true));
}