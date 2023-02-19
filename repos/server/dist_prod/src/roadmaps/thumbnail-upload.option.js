"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.thumbnailOption = exports.getThumbnailFilename = exports.UPLOAD_THUMBNAIL_FULL_PATH = exports.UPLOAD_THUMBNAIL_PATH = void 0;
const multer_1 = __importDefault(require("multer"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const common_1 = require("@nestjs/common");
const configuration_1 = require("../config/configuration");
exports.UPLOAD_THUMBNAIL_PATH = process.env.NODE_ENV === 'production'
    ? 'static/thumbnail'
    : 'static-dev/thumbnail';
exports.UPLOAD_THUMBNAIL_FULL_PATH = path_1.default.join(configuration_1.PUBLIC_PATH, exports.UPLOAD_THUMBNAIL_PATH);
function getThumbnailFilename(roadmap_id, ext) {
    return `${roadmap_id}_${Date.now()}.thumbnail${ext}`;
}
exports.getThumbnailFilename = getThumbnailFilename;
exports.thumbnailOption = {
    storage: multer_1.default.diskStorage({
        destination(req, file, cb) {
            fs_extra_1.default.ensureDirSync(exports.UPLOAD_THUMBNAIL_FULL_PATH);
            cb(null, exports.UPLOAD_THUMBNAIL_FULL_PATH);
        },
        filename(req, file, cb) {
            let error;
            const roadmap_id = req.params['id'];
            if (!roadmap_id) {
                error = new common_1.BadRequestException();
            }
            const ext = path_1.default.extname(file.originalname);
            cb(error, getThumbnailFilename(roadmap_id, ext));
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
//# sourceMappingURL=thumbnail-upload.option.js.map