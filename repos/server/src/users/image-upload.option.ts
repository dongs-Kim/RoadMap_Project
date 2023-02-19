import multer from 'multer';
import fs from 'fs-extra';
import path from 'path';
import { BadRequestException } from '@nestjs/common';

export const UPLOAD_PROFILE_PATH =
  process.env.NODE_ENV === 'production'
    ? 'static/profile'
    : 'static-dev/profile';

export const profileImageOption = {
  storage: multer.diskStorage({
    destination(req, file, cb) {
      const profilePath =
        process.env.NODE_ENV === 'production'
          ? path.join(__dirname, '../../public', UPLOAD_PROFILE_PATH)
          : path.join(__dirname, '../public', UPLOAD_PROFILE_PATH);
      fs.ensureDirSync(profilePath);
      cb(null, profilePath);
    },
    filename(req, file, cb) {
      let error;
      const user_id = (req.user as any)?.id;
      if (!user_id) {
        error = new BadRequestException();
      }
      const ext = path.extname(file.originalname);
      cb(error, `${user_id}.profile${ext}`);
    },
  }),
  fileFilter(req, file, cb) {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new BadRequestException('이미지 파일을 업로드해 주세요'), false);
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
};
