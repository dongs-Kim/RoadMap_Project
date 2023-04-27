import { EN_ROADMAP_ITEM_REQUIRED, EN_ROADMAP_ITEM_STATUS } from 'src/common/enums';
import { User } from 'src/entities/user.entity';
import { CreateRoadmapDto } from './create-roadmap.dto';
import { LearnResource } from 'src/entities/learn_resource';
export declare class SaveRoadmapDto {
    roadmap: CreateRoadmapDto;
    nodes: RoadmapNodeDto[];
    edges: RoadmapEdgeDto[];
    mode: 'new' | 'copy' | 'modify';
    user?: User;
}
export declare class RoadmapNodeDto {
    id: string;
    position: {
        x: number;
        y: number;
    };
    type: string;
    zIndex: number;
    width?: number;
    height?: number;
    data: {
        name: string;
        category?: string;
        description?: string;
        status?: EN_ROADMAP_ITEM_STATUS;
        bgcolor: string;
        border: boolean;
        url?: string;
        required?: EN_ROADMAP_ITEM_REQUIRED;
        learnResources?: LearnResource[];
        temp_images?: string[];
        contents_images?: string[];
        bold?: boolean;
    };
}
export declare class RoadmapEdgeDto {
    id: string;
    type: string;
    source: string;
    sourceHandle: string;
    target: string;
    data: {
        color: string;
        lineType: string;
    };
}
