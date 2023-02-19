import multer from 'multer';
export declare const UPLOAD_PROFILE_PATH: string;
export declare const profileImageOption: {
    storage: multer.StorageEngine;
    fileFilter(req: any, file: any, cb: any): void;
    limits: {
        fileSize: number;
    };
};
