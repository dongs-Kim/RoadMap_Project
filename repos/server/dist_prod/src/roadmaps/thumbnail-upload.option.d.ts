import multer from 'multer';
export declare const UPLOAD_THUMBNAIL_PATH: string;
export declare const UPLOAD_THUMBNAIL_FULL_PATH: string;
export declare function getThumbnailFilename(roadmap_id: string, ext: string): string;
export declare const thumbnailOption: {
    storage: multer.StorageEngine;
    fileFilter(req: any, file: any, cb: any): void;
    limits: {
        fileSize: number;
    };
};
