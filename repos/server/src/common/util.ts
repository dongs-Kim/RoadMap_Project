import fs from 'fs-extra';
import { glob } from 'glob';
import path from 'path';
import shortUUID from 'short-uuid';
import { PUBLIC_PATH } from 'src/config/configuration';

export const UPLOAD_CONTENTS_PATH =
  process.env.NODE_ENV === 'production'
    ? 'static/contents'
    : 'static-dev/contents';

export const UPLOAD_CONTENTS_FULL_PATH = path.join(
  PUBLIC_PATH,
  UPLOAD_CONTENTS_PATH,
);

export function getContentsImageFilename(id: string, ext: string) {
  return `${id}_${shortUUID.generate()}.contents${ext}`;
}

export function moveTempImageToContents(
  id: string,
  tempImages?: string[],
  contents?: string,
) {
  const contentsImages: string[] = [];
  tempImages?.forEach((tempImage) => {
    // contents에 이미지가 없는 경우 삭제
    if (!contents?.includes(tempImage)) {
      fs.removeSync(path.join(PUBLIC_PATH, tempImage));
      return;
    }

    // contents에 이미지가 있는 경우 영구 이미지로 변경
    const tempImagePath = path.join(PUBLIC_PATH, tempImage);
    const ext = path.extname(tempImagePath);
    const newFileName = getContentsImageFilename(id, ext);
    const contentsPath = `/${UPLOAD_CONTENTS_PATH}/${newFileName}`;
    fs.ensureDirSync(path.join(PUBLIC_PATH, UPLOAD_CONTENTS_PATH));
    fs.renameSync(tempImagePath, path.join(PUBLIC_PATH, contentsPath));
    contents = contents?.replace(tempImage, contentsPath);
    contentsImages.push(contentsPath);
  });

  return { contents, contentsImages };
}

export function getImagesInContents(images: string[], contents?: string) {
  return images.filter((imagePath) => {
    if (contents?.includes(imagePath)) {
      return true;
    }
    fs.removeSync(path.join(PUBLIC_PATH, imagePath));
    return false;
  });
}

export async function removeContentsImage(id: string) {
  const files = await glob(
    `${UPLOAD_CONTENTS_FULL_PATH}/${id}*`.replace(/\\/g, '/'),
  );
  files.forEach((file) => {
    fs.removeSync(file);
  });
}
