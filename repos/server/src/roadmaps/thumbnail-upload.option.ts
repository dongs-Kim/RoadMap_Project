import multer from 'multer';
import fs from 'fs-extra';
import path from 'path';
import { BadRequestException } from '@nestjs/common';
import { PUBLIC_PATH } from 'src/config/configuration';

export const UPLOAD_THUMBNAIL_PATH =
  process.env.NODE_ENV === 'production'
    ? 'static/thumbnail'
    : 'static-dev/thumbnail';

export const UPLOAD_THUMBNAIL_FULL_PATH = path.join(
  PUBLIC_PATH,
  UPLOAD_THUMBNAIL_PATH,
);

export function getThumbnailFilename(roadmap_id: string, ext: string) {
  return `${roadmap_id}.thumbnail${ext}`;
}

export const thumbnailOption = {
  storage: multer.diskStorage({
    destination(req, file, cb) {
      fs.ensureDirSync(UPLOAD_THUMBNAIL_FULL_PATH);
      cb(null, UPLOAD_THUMBNAIL_FULL_PATH);
    },
    filename(req, file, cb) {
      let error;
      const roadmap_id = req.params['id'];
      if (!roadmap_id) {
        error = new BadRequestException();
      }
      const ext = path.extname(file.originalname);
      cb(error, getThumbnailFilename(roadmap_id, ext));
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
