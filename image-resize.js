const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const fullSizePath = path.join(__dirname, 'images', 'full-size');
const resizedPath = path.join(__dirname, 'images', 'resized');

let resizeWidth = 200;
for (let x of fs.readdirSync(fullSizePath)) {
  if (x.slice(-4) !== '.jpg') { continue; }
  let imgPath = path.join(fullSizePath, x);
  let savePath = path.join(resizedPath,
    x.replace('.jpg', '-w' + resizeWidth + '.jpg'));
  sharp(imgPath)
    .resize({ width: resizeWidth })
    .sharpen({ m2: 5, sigma: 2 })
    .toFile(savePath);
}