function livsmedelslista() {
  addEvent('[name="search"]', 'keyup', () => {
    search = $('[name = "search"]').val();
    $('.livsmedel').html(makeList());
  });
  const makeList = () => {
    let s = search.toLowerCase();
    let listdata = [
      ...ndata.filter(x => x.namn.toLowerCase().indexOf(s) === 0),
      ...ndata.filter(x => x.namn.toLowerCase().indexOf(s) > 0)
    ];
    return listdata
      .map(x => /*html*/`<p>
      <a class="cap" href="#livsmedelsdetaljer/${x.slug}">
        ${x.namn.toLowerCase().split(s).join('<span>' + s + '</span>')}
      </a>
    </p>`);
  }
  return /*html*/`
    <h2>Livsmedel</h2>
    <input type="text" name="search"
      placeholder="Sök / Filtrera" value="${search}">
    <div class="livsmedel">${makeList()}</div>
  `;
}