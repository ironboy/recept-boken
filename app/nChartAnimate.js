function nChartAnimate(name) {
  setTimeout(() => {
    let eLevel = Math.max(Math.min(parseInt($('tr:contains("energi") td:last').text()), 400) / 4, 15) / 100;
    let vh = 40 * (1 - eLevel);
    if (vh > 14 && vh < 19) { vh = 17; /* small lie, but need space for heading */ }
    $('.e-line').css({ top: Math.max(11, (vh + 1.5)) + 'vh' });
    $('.dia').addClass('animate').css({ marginTop: vh + 'vh' });
    //$('.lheading').addClass('animate').css({ marginTop: 40 * eLevel + 'vh' });
    let p = [...$('.epercent')].map(x => parseInt(x.innerText));
    let s = p.map(x => 0);
    let co = 0;
    let interval = setInterval(() => {
      for (let i = 0; i < s.length; i++) {
        s[i] += p[i] / 50;
        $('.epercentAnimate').eq(i).text(Math.round(s[i]) + '%');
      };
      let lspan = $('.lheading');
      name && lspan.text(name.slice(0, 1 + name.length * co / 40));
      if (++co === 50) {
        clearInterval(interval);
        lspan.addClass('animate');
        let hVh = 40 - Math.max(17, vh);
        hVh -= vh < 17 && vh;
        let css = vh < 17 ? { bottom: '6.8vh' } : { top: '2vh' };
        $('.hori-line').css(css);
        name && lspan.css({ bottom: 'calc(' + hVh + 'vh - 56px)' });
        setTimeout(() => $('.hori-line').addClass('animate'), 1800);
        setTimeout(() => $('.vert-line').addClass('animate'), 2300);
        setTimeout(() => $('.e-line').addClass('animate'), 2500);
      }
    }, 20);
  }, 100);
}