$('body').append('<textarea></textarea>');
$('<div>Fixa till</div>').appendTo('body').on('click', fixTables);
$('<div class="disabled">Spara</div>').appendTo('body').on('click', save);
$('textarea').on('keyup', async () => {
  let scrollY = top.frames[0].scrollY;
  await top.frames[0].start($('textarea').val());
  top.frames[0].scrollTo(0, scrollY);
  $('div:last-of-type').removeClass('disabled');
  saved === $('textarea').val()
    && $('div:last-of-type').addClass('disabled');
});

let saved;

function fixTables() {
  fixNumbering();
  let windows = $('textarea').val().includes('\r');
  let x = $('textarea').val().split('\r').join('').split('\n');
  let inTable = false, rows = [], tables = [], table;
  // extract
  for (let row of x) {
    let latestInTable = inTable;
    inTable = row[0] === '|';
    if (inTable && !latestInTable) {
      table = [];
      tables.push(table);
      rows.push('---table');
    }
    if (inTable) {
      row.includes('---') || table.push(
        [...row.split('|').slice(1, -1).map(x => x.trim()), ...[...new Array(6)].map(x => '')].slice(0, 6)
      );
      table[0] = 'Ingrediens, Slug, Antal, Enhet, Vikt, Pris/kg'.split(', ');
    }
    else {
      rows.push(row);
    }
  }
  // fix
  tables = tables.map(table => {
    let lengths = [];
    for (let row of table) {
      let co = -1;
      for (let cell of row) {
        lengths[++co] = Math.max(lengths[co] || 0, cell.length);
      }
    }
    let rowCo = 0;
    table.splice(1, 0, [...new Array(lengths.length)].map(x => ''));
    for (let row of table) {
      let co = -1;
      for (let cell of row) {
        co++;
        row[co] = cell[[2, 4, 5].includes(co) ? 'padStart' : 'padEnd'](lengths[co], ' ');
      }
      table[rowCo] = '| ' + row.join(' | ') + ' |';
      rowCo++;
    }
    table[1] = table[1].replace(/ /g, '-');
    return table.join('\n');
  });
  $('textarea').val(rows.join(windows ? '\r\n' : '\n').replace(/---table/g, () => tables.shift()));
  saved === $('textarea').val()
    && $('div:last-of-type').addClass('disabled');
}

function fixNumbering() {
  let windows = $('textarea').val().includes('\r');
  let x = $('textarea').val().split('\r').join('').split('\n');
  let lastRowMatched, counter, xCounter = 0;
  for (let row of x) {
    let match = row.match(/^\d{1,}\./g);
    if (match && !lastRowMatched) {
      counter = 1;
    }
    if (match && lastRowMatched) {
      counter++;
      x[xCounter] = row.replace(/^\d{1,}\./g, counter + '.');
    }
    lastRowMatched = match;
    xCounter++;
  }
  $('textarea').val(x.join(windows ? '\r\n' : '\n'));
}

async function save() {
  let md = $('textarea').val(), div = $('div:last-of-type');
  if (div.hasClass('disabled')) {
    return;
  }
  div.addClass('disabled').hide();
  await fetch('/api/md', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ md })
  });
  let scrollY = top.frames[0].scrollY;
  await top.frames[0].start();
  top.frames[0].scrollTo(0, scrollY);
  saved = md;
  setTimeout(() => div.show(), 500);
}

function start(md) {
  saved = md;
  $('textarea').val(md);
  fixTables();
  if ($('textarea').val() !== saved) {
    $('div:last-of-type').removeClass('disabled');
  }
}