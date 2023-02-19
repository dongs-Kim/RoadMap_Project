import { Reply } from './reply.entity';
import { Roadmap } from './roadmap.entity';
export declare class User {
    id: string;
    email: string;
    password: string;
    nickname: string;
    comment?: string;
    image?: string;
    created_at: Date;
    updated_at: Date;
    Roadmaps: Roadmap[];
    Replies: Reply[];
    LikeRoadmaps: Roadmap[];
    StoredRoadmaps: Roadmap[];
}
