import { User } from './user.entity';
import { RoadmapItem } from './roadmap_item.entity';
import { LearnResourceReply } from './learn_resource_reply.entity';
export declare class LearnResource {
    id: string;
    category: string;
    name: string;
    url?: string[];
    contents?: string;
    contents_images?: string[];
    created_at: Date;
    User: User;
    LikeUsers: User[];
    RoadmapItems: RoadmapItem[];
    Replies: LearnResourceReply[];
}
