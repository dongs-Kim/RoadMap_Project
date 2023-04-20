"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tempImageOption = exports.getTempFilename = exports.UPLOAD_TEMP_IMAGE_FULL_PATH = exports.UPLOAD_TEMP_IMAGE_PATH = void 0;
const multer_1 = __importDefault(require("multer"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const common_1 = require("@nestjs/common");
const short_uuid_1 = __importDefault(require("short-uuid"));
const configuration_1 = require("../config/configuration");
exports.UPLOAD_TEMP_IMAGE_PATH = process.env.NODE_ENV === 'production' ? 'static/temp' : 'static-dev/temp';
exports.UPLOAD_TEMP_IMAGE_FULL_PATH = path_1.default.join(configuration_1.PUBLIC_PATH, exports.UPLOAD_TEMP_IMAGE_PATH);
function getTempFilename(ext) {
    return `${short_uuid_1.default.generate()}.temp${ext}`;
}
exports.getTempFilename = getTempFilename;
exports.tempImageOption = {
    storage: multer_1.default.diskStorage({
        destination(req, file, cb) {
            fs_extra_1.default.ensureDirSync(exports.UPLOAD_TEMP_IMAGE_FULL_PATH);
            cb(null, exports.UPLOAD_TEMP_IMAGE_FULL_PATH);
        },
        filename(req, file, cb) {
            const ext = path_1.default.extname(file.originalname);
            cb(null, getTempFilename(ext));
        },
    }),
    fileFilter(req, file, cb) {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        }
        else {
            cb(new common_1.BadRequestException('이미지 파일을 업로드해 주세요'), false);
        }
    },
    limits: { fileSize: 5 * 1024 * 1024 },
};
//# sourceMappingURL=temp-image-upload.option.js.map