const express = require('express');
const fs = require('fs');
const path = require('path');
const { execSync } = require("child_process");
const app = express();

app.use(express.static(path.join(__dirname, '../')));
app.use(express.json({ limit: '100MB' }));

app.get('/edit', (req, res) => res.sendFile(path.join(__dirname, '../edit.html')));

app.post('/api/md', (req, res) => {
  let backupDir = path.join(__dirname, '../', 'recept', 'backup');
  let thePath = path.join(__dirname, '../', 'recept', 'recept.md');
  let backupPath = path.join(backupDir, `recept-${new Date().toLocaleString('sv-SE')}.md`);
  fs.cpSync(thePath, backupPath);
  let a = fs.readdirSync(backupDir).sort();
  for (let i = 0; i < a.length - 5; i++) { // keep 5 backups, delete older
    fs.rmSync(path.join(backupDir, a[i]));
  }
  let b = fs.writeFileSync(thePath, req.body.md, 'utf-8');
  execSync('git add . && git commit -am "Update recept.md" && git push');
  res.json({ ok: true });
});

app.listen(6003, () => console.log('Listening on http://localhost:6003'));