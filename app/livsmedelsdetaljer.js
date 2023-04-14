function livsmedelsdetaljer(show, perHeading = 'Mängd/100g', showRDIPercent = false) {
  let makroOrder = ('energi, protein, kolhydrater, fibrer, fett, alkohol, ' +
    'fullkorn totalt, salt, vatten, aska, (skal etc.) avfall ').split(', ');
  let slug = location.hash.split('/').pop();
  show = show || { ...ndataObj[slug] };
  let name = show.namn || '404: Kan ej hitta detta livsmedel...';
  let [chart, makrosInChart, energyFrom] = show.namn ? nChart(show) : [];
  if (makrosInChart) {
    let iOf = x => makrosInChart.includes(x) ? makrosInChart.indexOf(x) : 1000;
    makroOrder.sort((a, b) => iOf(a) - iOf(b));
  }
  let odd = false, f;
  let html = /*html*/`
    ${chart || ''}
    <table class="ldetails">
      <tr><td colspan="4">
        <h2 class="${showRDIPercent ? '' : 'lname'} cap">
          ${showRDIPercent ? name : '<span class="lheading">&nbsp;</span>'}
        </h2>
      </td></tr>
  `;
  for (let key in show) {
    if (typeof show[key] === 'string') { continue; }
    let makros = key === 'makrokomponenter';
    html += /*html*/`
      <tr class="heading"><td colspan="4">
       <h3 class="cap">${key}</h3>
      </td></tr>
      <tr class="heading">
        <td><b>Ämne</b></td>
         <td><b>
          ${showRDIPercent && ['vitaminer', 'mineralämnen'].includes(key) ? 'RDI %' : ''}
        </b></td>
        <td><b>
          ${['vitaminer', 'mineralämnen'].includes(key) ? 'RDI' : ''}
          ${makros ? 'Energi' : ''}
        </b></td>
        <td><b>${perHeading}</b></td>
      </tr>
    `;
    if (odd) {
      html += '<tr style="display:none"></tr>';
      odd = !odd;
    }
    for (let subKey of makros ? makroOrder : Object.keys(show[key])) {
      odd = !odd;
      let a = show[key][subKey];
      (subKey === '(skal etc.) avfall ') && (subKey = 'avfall (skal etc.)')
      if (!a) { continue; }
      html += /*html*/`<tr>
        <td>${subKey.indexOf('summa') === 0 ? `<i>${subKey}</i>` : subKey}</td>
        <td>${showRDIPercent && a.RDI ? numFormatter(a.per100g * 100 / a.RDI, 0) + '%' : ''}</td>
        <td ${makros && makrosInChart.includes(subKey) ? `class="x${subKey}"` : ''}>
          ${(a.RDI ? numFormatter(a.RDI) : '') + (a.RDI ? ' ' + a.enhet : '')}
          ${makros && (f = energyFrom.find(({ n }) => n === subKey)) ? `
            <span class="epercent">${f.p}%</span>
            <span class="epercentAnimate">0%</span>
          ` : ''}
        </td>
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
  nChartAnimate(!showRDIPercent && name);
  // Livsmedelsdatabas, version 2015-01-19.
  return html;
}