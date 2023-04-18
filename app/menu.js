function menu() {
  $('body').append('<header/>');
  $('header').html(/*html*/`<nav>
    <a href="#matladan">Matlådan</a>
    <a href="#recept">Recept</a>
    <a href="#livsmedelslista">Livsmedel/Näring</a>
    <input type="text" name="search" placeholder="Sök / filtrera">
  </nav>`);
  $('body').append('<footer/>');
  $('footer').html(/*html*/`<nav>
    <input type="text" name="search" placeholder="Sök / filtrera">
  </nav>`);
}