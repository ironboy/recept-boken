function globalEvents() {

  function resizer() {
    let x = $('.recept-in-list img');
    let y = $('.recept-in-list');
    let noRound = x.outerHeight() === y.outerHeight() - 20;
    $('.recept-in-list img').css({
      'border-bottom-left-radius': noRound ? 0 : '',
      'border-bottom': noRound ? 0 : ''
    });
    let lspan = $('.lheading');
    lspan.data().setPos && lspan.data().setPos();
  }
  $(window).resize(resizer);

  window.showImageOnLoad = img => {
    let me = $(img);
    me.addClass('visible').attr('alt',
      (me.next().find('h3').text()
        || me.next('h1').text()) +
      (me.attr('src').includes('missing-image') ?
        ' - bild saknas' : '')
    ) && resizer();
  }

  window.imageOnError = img => img.src = '/images/ui/missing-image.jpg';
}