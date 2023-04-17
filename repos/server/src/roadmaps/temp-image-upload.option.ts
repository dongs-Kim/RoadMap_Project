import multer from 'multer';
import fs from 'fs-extra';
import path from 'path';
import { BadRequestException } from '@nestjs/common';
import shortUUID from 'short-uuid';
import { PUBLIC_PATH } from 'src/config/configuration';

export const UPLOAD_TEMP_IMAGE_PATH =
  process.env.NODE_ENV === 'production' ? 'static/temp' : 'static-dev/temp';

export const UPLOAD_TEMP_IMAGE_FULL_PATH = path.join(
  PUBLIC_PATH,
  UPLOAD_TEMP_IMAGE_PATH,
);

export function getTempFilename(ext: string) {
  return `${shortUUID.generate()}_${Date.now()}.temp${ext}`;
}

export const tempImageOption = {
  storage: multer.diskStorage({
    destination(req, file, cb) {
      fs.ensureDirSync(UPLOAD_TEMP_IMAGE_FULL_PATH);
      cb(null, UPLOAD_TEMP_IMAGE_FULL_PATH);
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, getTempFilename(ext));
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
