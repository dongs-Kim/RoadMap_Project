const { execSync } = require("child_process");
const fs = require("fs-extra");
const path = require("path");

const serverDir = path.join(__dirname, "../repos/server");
const distProdDir = path.join(serverDir, "dist_prod");
const publicDir = path.join(distProdDir, "public");
const profileStaticDir = path.join(serverDir, "public/static/profile");
const thumbnailStaticDir = path.join(serverDir, "public/static/thumbnail");

console.log('create static folder link...');
fs.ensureDirSync(profileStaticDir);
fs.ensureDirSync(thumbnailStaticDir);
console.log(execSync(`mklink /d "${path.join(publicDir, "static/profile")}" "${profileStaticDir}"`).toString());
console.log(execSync(`mklink /d "${path.join(publicDir, "static/thumbnail")}" "${thumbnailStaticDir}"`).toString());
