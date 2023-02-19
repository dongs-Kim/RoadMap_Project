const { execSync } = require("child_process");
const fs = require("fs-extra");
const path = require("path");

const serverDir = path.join(__dirname, "../repos/server");
const clientDir = path.join(__dirname, "../repos/client");
const distDir = path.join(serverDir, "dist");
const distProdDir = path.join(serverDir, "dist_prod");
const publicDir = path.join(distProdDir, "public");
const profileStaticDir = path.join(serverDir, "public/static/profile");
const thumbnailStaticDir = path.join(serverDir, "public/static/thumbnail");

console.log('rm dist folder....');
fs.rmSync(distDir, { recursive: true, force: true });

console.log('rm dist_prod folder....');
fs.rmSync(distProdDir, { recursive: true, force: true });

console.log('build server....');
console.log(execSync(`cd ${serverDir} && npm i && npm run build`).toString());

console.log('copy server...');
fs.copySync(distDir, distProdDir);

console.log('build client....');
console.log(execSync(`cd ${clientDir} && npm i && npm run build`).toString());

console.log('copy client...');
fs.copySync(path.join(clientDir, 'build'), publicDir);

console.log('create static folder link...');
fs.ensureDirSync(profileStaticDir);
fs.ensureDirSync(thumbnailStaticDir);
console.log(execSync(`mklink /d "${path.join(publicDir, "static/profile")}" "${profileStaticDir}"`).toString());
console.log(execSync(`mklink /d "${path.join(publicDir, "static/thumbnail")}" "${thumbnailStaticDir}"`).toString());
