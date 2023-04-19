function livsmedelslista() {
  livsmedelslista.makeList = () => {
    let s = searchLivsmedel.toLowerCase();
    let listdata = [
      ...ndata.filter(x => x.namn.toLowerCase().indexOf(s) === 0),
      ...ndata.filter(x => x.namn.toLowerCase().indexOf(s) > 0)
    ];
    return listdata
      .map(x => /*html*/`<p>
      <a class="cap" href="#livsmedelsdetaljer/${x.slug}">
        ${x.namn.toLowerCase().split(s).join(
        '<span class="searched">' + s + '</span>')}
      </a>
    </p>`);
  }
  return /*html*/`
    <div class="livsmedel">${livsmedelslista.makeList()}</div>
  `;
}