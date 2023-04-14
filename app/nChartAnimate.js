async function nChartAnimate(name) {
  await sleep(100);
  let eLevel = Math.max(Math.min(parseInt($('tr:contains("energi") td:last').text()), 400) / 4, 15) / 100;
  let vh = 40 * (1 - eLevel);
  if (vh > 14 && vh < 19) { vh = 17; /* small lie, but need space for heading */ }
  $('.e-line').css({ top: Math.max(11, (vh + 1.5)) + 'vh' });
  $('.dia').addClass('animate').css({ marginTop: vh + 'vh' });
  let p = [...$('.epercent')].map(x => parseInt(x.innerText));
  let s = p.map(x => 0);
  let co = 0, lspan;
  while (co++ < 50) {
    await sleep(20);
    for (let i = 0; i < s.length; i++) {
      s[i] += p[i] / 50;
      $('.epercentAnimate').eq(i).text(Math.round(s[i]) + '%');
    };
    lspan = $('.lheading');
    name && lspan.text(name.slice(0, 1 + name.length * co / 40));
  }
  lspan.addClass('animate');
  let hVh = 40 - Math.max(17, vh);
  hVh -= vh < 17 && vh;
  let css = vh < 17 ? { bottom: '6.8vh' } : { top: '2vh' };
  $('.hori-line').css(css);
  name && lspan.css({ bottom: 'calc(' + hVh + 'vh - 56px)' });
  await sleep(1800);
  $('.hori-line').addClass('animate');
  await sleep(500);
  $('.vert-line').addClass('animate');
  await sleep(200);
  $('.e-line').addClass('animate');
}