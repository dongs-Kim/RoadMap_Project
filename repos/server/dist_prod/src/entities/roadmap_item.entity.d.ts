import { Roadmap } from './roadmap.entity';
export declare class RoadmapItem {
    id: string;
    name: string;
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
    Roadmap: Roadmap;
}
