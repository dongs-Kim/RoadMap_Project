import { Reply } from './reply.entity';
import { RoadmapItem } from './roadmap_item.entity';
import { RoadmapEdge } from './roadmap_edge.entity';
import { User } from './user.entity';
export declare class Roadmap {
    id: string;
    category: string;
    public: boolean;
    title: string;
    contents?: string;
    thumbnail?: string;
    bgcolor?: string;
    contents_images?: string[];
    created_at: Date;
    updated_at: Date;
    User: User;
    RoadmapItems: RoadmapItem[];
    RoadmapEdges: RoadmapEdge[];
    Replies: Reply[];
    LikeUsers: User[];
    StoringUsers: User[];
}
