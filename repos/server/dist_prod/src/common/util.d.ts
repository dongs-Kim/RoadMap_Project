export declare const UPLOAD_CONTENTS_PATH: string;
export declare const UPLOAD_CONTENTS_FULL_PATH: string;
export declare function getContentsImageFilename(id: string, ext: string): string;
export declare function moveTempImageToContents(id: string, tempImages?: string[], contents?: string): {
    contents: string;
    contentsImages: string[];
};
export declare function getImagesInContents(images: string[], contents?: string): string[];
export declare function removeContentsImage(id: string): Promise<void>;
