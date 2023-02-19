import multer from 'multer';
export declare const UPLOAD_THUMBNAIL_PATH: string;
export declare const thumbnailOption: {
    storage: multer.StorageEngine;
    fileFilter(req: any, file: any, cb: any): void;
    limits: {
        fileSize: number;
    };
};
