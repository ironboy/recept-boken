function navigate() {
  let startTime = new Date();
  $('main').length || $('body').append('<main/>');
  let x = location.hash.slice(1).split('/')[0];
  x = window[x] ? x : 'recept';
  window.scrollTo(0, 0);
  let html = window[x](), runAfter = () => { };
  html instanceof Array && ([html, runAfter] = html);
  $('main').html(html);
  runAfter();
  console.log(...niceLog('Render:', x, Date.now() - startTime, 'ms'));
  $('nav a').removeClass('active');
  x === 'livsmedelsdetaljer' && (x = 'livsmedelslista');
  x === 'receptdetaljer' && (x = 'recept');
  $(`nav a[href="#${x}"]`).addClass('active');
}