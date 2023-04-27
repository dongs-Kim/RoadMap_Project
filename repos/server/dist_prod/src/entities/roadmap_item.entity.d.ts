import { Roadmap } from './roadmap.entity';
import { LearnResource } from './learn_resource';
export declare class RoadmapItem {
    id: string;
    name: string;
    category?: string;
    description?: string;
    status?: string;
    required?: string;
    type: string;
    positionX: number;
    positionY: number;
    bgcolor: string;
    border: boolean;
    zIndex: number;
    url?: string;
    width?: number;
    height?: number;
    bold?: boolean;
    contents_images?: string[];
    Roadmap: Roadmap;
    LearnResources: LearnResource[];
}
