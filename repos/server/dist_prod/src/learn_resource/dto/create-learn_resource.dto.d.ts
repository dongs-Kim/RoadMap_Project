export declare class CreateLearnResourceDto {
    id?: string;
    category: string;
    name: string;
    mode: 'new' | 'modify';
    url?: string[];
    contents?: string;
    temp_images?: string[];
    contents_images?: string[];
}
