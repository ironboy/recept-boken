const cheerio = require('cheerio');
const fs = require('fs');

async function harvestSlugs() {
  let url = 'http://matkalkyl.se/livsmedel.php';
  let response = await (await fetch(url)).arrayBuffer();
  let html = new TextDecoder('iso-8859-1').decode(response);
  const $ = cheerio.load(html);
  let slugs = [...$('a[href^="http://matkalkyl.se/se-"]')]
    .map(x => $(x).attr('href').split('/se-')[1].split('.php')[0]);
  return slugs;
}

async function harvestOne(slug) {
  let url = `http://matkalkyl.se/se-${slug}.php`;
  let response = await (await fetch(url)).arrayBuffer();
  let html = new TextDecoder('iso-8859-1').decode(response);
  const $ = cheerio.load(html);
  let data = { namn: $('h1 em').text() };
  for (let h2 of [...$('h2:not(h2:contains("Info"))')].reverse().map(x => $(x))) {
    let key = h2.text().split(' ')[0].toLowerCase();
    data[key] = {};
    let trs = h2.next('table').find('tr');
    for (let tr of [...trs].map(x => $(x))) {
      let td = [...tr.find('td')]
        .map(x => $(x).text().toLowerCase())
        .map(x => isNaN(+x) ? x : +x)
      if (!td[0]) { continue; }
      data[key][td[0]] = { per100g: td[1], enhet: td[2], ...(td[3] ? { RDI: td[3] } : {}) };
    }
  }
  return data;
}

let data = {};
async function start() {
  let slugs = await harvestSlugs();
  let co = 1;
  for (let slug of slugs) {
    data[slug] = await harvestOne(slug);
    console.log(co++, '/', slugs.length);
  }
  fs.writeFileSync('./___narings-data.json', JSON.stringify(data, '', '  '), 'utf-8');
}

start();