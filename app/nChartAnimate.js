function nChartAnimate() {
  setTimeout(() => {
    $('.dia').addClass('animate');
    let p = [...$('.epercent')].map(x => parseInt(x.innerText));
    let s = p.map(x => 0);
    let co = 0;
    let interval = setInterval(() => {
      for (let i = 0; i < s.length; i++) {
        s[i] += p[i] / 50;
        $('.epercentAnimate').eq(i).text(Math.round(s[i]) + '%');
      };
      ++co === 50 && clearInterval(interval);
    }, 20);
  }, 100);
}