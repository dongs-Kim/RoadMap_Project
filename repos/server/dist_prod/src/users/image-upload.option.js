"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileImageOption = exports.UPLOAD_PROFILE_PATH = void 0;
const multer_1 = __importDefault(require("multer"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const common_1 = require("@nestjs/common");
exports.UPLOAD_PROFILE_PATH = process.env.NODE_ENV === 'production'
    ? 'static/profile'
    : 'static-dev/profile';
exports.profileImageOption = {
    storage: multer_1.default.diskStorage({
        destination(req, file, cb) {
            const profilePath = process.env.NODE_ENV === 'production'
                ? path_1.default.join(__dirname, '../../public', exports.UPLOAD_PROFILE_PATH)
                : path_1.default.join(__dirname, '../public', exports.UPLOAD_PROFILE_PATH);
            fs_extra_1.default.ensureDirSync(profilePath);
            cb(null, profilePath);
        },
        filename(req, file, cb) {
            var _a;
            let error;
            const user_id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
            if (!user_id) {
                error = new common_1.BadRequestException();
            }
            const ext = path_1.default.extname(file.originalname);
            cb(error, `${user_id}_${Date.now()}.profile${ext}`);
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
//# sourceMappingURL=image-upload.option.js.map