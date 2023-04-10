function livsmedelsdetaljer(show, perHeading = 'Mängd/100g', showRDIPercent = false) {
  let slug = location.hash.split('/').pop();
  show = show || { ...ndataObj[slug] };
  let name = show.namn || '404: Kan ej hitta detta livsmedel...';
  let html = /*html*/`
    <table class="ldetails">
      <tr><td colspan="4">
        <h2 class="cap">${name}</h2>
      </td></tr>
  `;
  for (let key in show) {
    if (typeof show[key] === 'string') { continue; }
    html += /*html*/`
      <tr><td colspan="4">
       <h3 class="cap">${key}</h3>
      </td></tr>
      <tr>
        <td><b>Ämne</b></td>
         <td><b>${showRDIPercent && ['vitaminer', 'mineralämnen'].includes(key) ? 'RDI %' : ''}</b></td>
        <td><b>${['vitaminer', 'mineralämnen'].includes(key) ? 'RDI' : ''}</b></td>
        <td><b>${perHeading}</b></td>
      </tr>
    `;
    for (let subKey in show[key]) {
      let a = show[key][subKey];
      html += /*html*/`<tr>
        <td>${subKey.indexOf('summa') === 0 ? `<i>${subKey}</i>` : subKey}</td>
        <td>${showRDIPercent && a.RDI ? numFormatter(a.per100g * 100 / a.RDI, 0) + '%' : ''}</td>
        <td>${(a.RDI ? numFormatter(a.RDI) : '') + (a.RDI ? ' ' + a.enhet : '')}</td>
        <td>${numFormatter(a.per100g)} ${a.enhet}</td>
      </tr>`;
    }
  }
  html += /*html*/`
    </table>
    ${!ndataObj[slug] ? '' : `<p><i>${show.src ? 'Källa: ' + show.src :
      `Alla näringsvärden kommer från Livsmedelsverkets 
      Livsmedelsdatabas.`}</i></p>`}
  `;
  // Livsmedelsdatabas, version 2015-01-19.
  let dom = $('<div>' + html + '</div>');
  let afterTr = dom.find('tr:contains("fibrer")');
  let moveDown = ['alkohol', 'aska', 'avfall']
    .map(x => dom.find('tr:contains("' + x + '")'));
  moveDown.forEach(x => afterTr.after(x));
  return dom.html();
}