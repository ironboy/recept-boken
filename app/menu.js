function menu() {
  $('body').append('<header/>');
  $('header').html(/*html*/`<nav>
    <a href="#recept">Recept</a>
    <a href="#livsmedelslista">Livsmedel / Näring</a>
  </nav>`);
}