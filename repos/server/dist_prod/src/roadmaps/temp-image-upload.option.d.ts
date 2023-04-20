import multer from 'multer';
export declare const UPLOAD_TEMP_IMAGE_PATH: string;
export declare const UPLOAD_TEMP_IMAGE_FULL_PATH: string;
export declare function getTempFilename(ext: string): string;
export declare const tempImageOption: {
    storage: multer.StorageEngine;
    fileFilter(req: any, file: any, cb: any): void;
    limits: {
        fileSize: number;
    };
};
