import multer from 'multer';
import fs from 'fs-extra';
import path from 'path';
import { BadRequestException } from '@nestjs/common';

export const UPLOAD_THUMBNAIL_PATH = 'static-dev/thumbnail';

export const thumbnailOption = {
  storage: multer.diskStorage({
    destination(req, file, cb) {
      const thumbnailPath =
        process.env.NODE_ENV === 'production'
          ? path.join(__dirname, '../../public', UPLOAD_THUMBNAIL_PATH)
          : path.join(__dirname, '../public', UPLOAD_THUMBNAIL_PATH);
      fs.ensureDirSync(thumbnailPath);
      cb(null, thumbnailPath);
    },
    filename(req, file, cb) {
      let error;
      const roadmap_id = req.params['id'];
      if (!roadmap_id) {
        error = new BadRequestException();
      }
      const ext = path.extname(file.originalname);
      cb(error, `${roadmap_id}.thumbnail${ext}`);
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
