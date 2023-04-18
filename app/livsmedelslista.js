function livsmedelslista() {
  addEvent('[name="search"]', 'keyup', () => {
    let livs = location.hash === '#livsmedelslista';
    let focused = $('[name="search"]:focus');
    let val = focused.val();
    $('[name="search"]').not(focused).val(val);
    livs && (searchLivsmedel = val);
    !livs && (searchRecept = val);
    livs && $('.livsmedel').html(makeList());
  });
  const makeList = () => {
    let s = searchLivsmedel.toLowerCase();
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
    <div class="livsmedel">${makeList()}</div>
  `;
}