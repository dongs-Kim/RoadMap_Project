"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.thumbnailOption = exports.UPLOAD_THUMBNAIL_PATH = void 0;
const multer_1 = __importDefault(require("multer"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const common_1 = require("@nestjs/common");
exports.UPLOAD_THUMBNAIL_PATH = process.env.NODE_ENV === 'production'
    ? 'static/thumbnail'
    : 'static-dev/thumbnail';
exports.thumbnailOption = {
    storage: multer_1.default.diskStorage({
        destination(req, file, cb) {
            const thumbnailPath = process.env.NODE_ENV === 'production'
                ? path_1.default.join(__dirname, '../../public', exports.UPLOAD_THUMBNAIL_PATH)
                : path_1.default.join(__dirname, '../public', exports.UPLOAD_THUMBNAIL_PATH);
            fs_extra_1.default.ensureDirSync(thumbnailPath);
            cb(null, thumbnailPath);
        },
        filename(req, file, cb) {
            let error;
            const roadmap_id = req.params['id'];
            if (!roadmap_id) {
                error = new common_1.BadRequestException();
            }
            const ext = path_1.default.extname(file.originalname);
            cb(error, `${roadmap_id}.thumbnail${ext}`);
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