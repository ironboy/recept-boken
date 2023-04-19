function navigate(log = true) {
  addEvent('[name="search"]', 'keyup', () => {
    let livs = location.hash === '#livsmedelslista';
    let focused = $('[name="search"]:focus');
    let val = focused.val();
    $('[name="search"]').not(focused).val(val);
    livs && (searchLivsmedel = val);
    !livs && (searchRecept = val);
    livs && $('.livsmedel').html(livsmedelslista.makeList());
    !livs && recept.search();
  });
  let startTime = new Date();
  $('main').length || $('header').after('<main/>');
  let x = location.hash.slice(1).split('/')[0];
  x = window[x] ? x : 'recept';
  $('main').attr('class', x);
  $('body')[x === 'recept' ? 'addClass' : 'removeClass']('receptlista');
  window.scrollTo(0, 0);
  let html = window[x](), runAfter = () => { };
  html instanceof Array && ([html, runAfter] = html);
  $('main').html(html);
  runAfter();
  log && console.log(...niceLog('Render:', x, Date.now() - startTime, 'ms'));
  $('nav a').removeClass('active');
  if (x === 'recept' || x == 'livsmedelslista') {
    $('body').addClass('searchable');
    $('[name="search"]').val(x === 'recept' ? searchRecept : searchLivsmedel);
  }
  else {
    $('body').removeClass('searchable')
  }
  x === 'livsmedelsdetaljer' && (x = 'livsmedelslista');
  x === 'receptdetaljer' && (x = 'recept');
  $(`nav a[href="#${x}"]`).addClass('active');
  top.location.pathname !== '/edit' && $('[name="search"]:visible').focus();
}