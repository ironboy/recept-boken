const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const fullSizePath = path.join(__dirname, 'images', 'full-size');
const resizedPath = path.join(__dirname, 'images', 'resized');

for (let x of fs.readdirSync(fullSizePath)) {
  for (let resizeWidth of [200, 1000, 1500, 2000]) {
    if (x.slice(-4) !== '.jpg') { continue; }
    let imgPath = path.join(fullSizePath, x);
    let savePath = path.join(resizedPath,
      x.replace('.jpg', '-w' + resizeWidth + '.jpg'));
    sharp(imgPath)
      .resize({ width: resizeWidth })
      .sharpen({ m2: 5, sigma: 2 })
      .toFile(savePath);
  }
}