"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeContentsImage = exports.getImagesInContents = exports.moveTempImageToContents = exports.getContentsImageFilename = exports.UPLOAD_CONTENTS_FULL_PATH = exports.UPLOAD_CONTENTS_PATH = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const glob_1 = require("glob");
const path_1 = __importDefault(require("path"));
const short_uuid_1 = __importDefault(require("short-uuid"));
const configuration_1 = require("../config/configuration");
exports.UPLOAD_CONTENTS_PATH = process.env.NODE_ENV === 'production'
    ? 'static/contents'
    : 'static-dev/contents';
exports.UPLOAD_CONTENTS_FULL_PATH = path_1.default.join(configuration_1.PUBLIC_PATH, exports.UPLOAD_CONTENTS_PATH);
function getContentsImageFilename(id, ext) {
    return `${id}_${short_uuid_1.default.generate()}.contents${ext}`;
}
exports.getContentsImageFilename = getContentsImageFilename;
function moveTempImageToContents(id, tempImages, contents) {
    const contentsImages = [];
    tempImages === null || tempImages === void 0 ? void 0 : tempImages.forEach((tempImage) => {
        if (!(contents === null || contents === void 0 ? void 0 : contents.includes(tempImage))) {
            fs_extra_1.default.removeSync(path_1.default.join(configuration_1.PUBLIC_PATH, tempImage));
            return;
        }
        const tempImagePath = path_1.default.join(configuration_1.PUBLIC_PATH, tempImage);
        const ext = path_1.default.extname(tempImagePath);
        const newFileName = getContentsImageFilename(id, ext);
        const contentsPath = `/${exports.UPLOAD_CONTENTS_PATH}/${newFileName}`;
        fs_extra_1.default.ensureDirSync(path_1.default.join(configuration_1.PUBLIC_PATH, exports.UPLOAD_CONTENTS_PATH));
        fs_extra_1.default.renameSync(tempImagePath, path_1.default.join(configuration_1.PUBLIC_PATH, contentsPath));
        contents = contents === null || contents === void 0 ? void 0 : contents.replace(tempImage, contentsPath);
        contentsImages.push(contentsPath);
    });
    return { contents, contentsImages };
}
exports.moveTempImageToContents = moveTempImageToContents;
function getImagesInContents(images, contents) {
    return images.filter((imagePath) => {
        if (contents === null || contents === void 0 ? void 0 : contents.includes(imagePath)) {
            return true;
        }
        fs_extra_1.default.removeSync(path_1.default.join(configuration_1.PUBLIC_PATH, imagePath));
        return false;
    });
}
exports.getImagesInContents = getImagesInContents;
async function removeContentsImage(id) {
    const files = await (0, glob_1.glob)(`${exports.UPLOAD_CONTENTS_FULL_PATH}/${id}*`.replace(/\\/g, '/'));
    files.forEach((file) => {
        fs_extra_1.default.removeSync(file);
    });
}
exports.removeContentsImage = removeContentsImage;
//# sourceMappingURL=util.js.map