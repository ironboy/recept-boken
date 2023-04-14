function globalEvents() {
  function resizer() {
    let x = $('.recept-in-list img');
    let y = $('.recept-in-list');
    let noRound = x.outerHeight() === y.outerHeight() - 20;
    $('.recept-in-list img').css({
      'border-bottom-left-radius': noRound ? 0 : '',
      'border-bottom': noRound ? 0 : ''
    });
  }
  $(window).resize(resizer);
  window.showImageOnLoad = img => $(img).addClass('visible') && resizer();
  window.imageOnError = img => img.src = '/images/ui/missing-image.jpg';
}